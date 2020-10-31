import PropTypes from "prop-types";
import React, { createContext, useContext } from "react";
import { graphql, navigate } from "gatsby";
import SEO from "./seo";
import ContentWrapper from "./content-wrapper";
import PageHeader from "./page-header";
import Footer from "./footer";
import PageContent from "./page-content";
import { VideoBox } from "./videoBox";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const CustomLinkContext = createContext();

function CustomLink(props) {
  const { pathPrefix, baseUrl } = useContext(CustomLinkContext);

  const linkProps = { ...props };
  if (props.href) {
    if (props.href.startsWith("/")) {
      linkProps.onClick = function handleClick(event) {
        const href = event.target.getAttribute("href");
        if (href.startsWith("/")) {
          event.preventDefault();
          navigate(href.replace(pathPrefix, ""));
        }
      };
    } else if (!props.href.startsWith("#") && !props.href.startsWith(baseUrl)) {
      linkProps.target = "_blank";
      linkProps.rel = "noopener noreferrer";
    }
  }

  return <a {...linkProps} />;
}

CustomLink.propTypes = {
  href: PropTypes.string
};

export default function Template(props) {
  const { hash, pathname } = props.location;
  const { file, site, contentfulSong } = props.data;
  const { frontmatter, headings, fields } =
    file.childMarkdownRemark || file.childMdx;
  const { title, description } = site.siteMetadata;
  const {
    sidebarContents,
    githubUrl,
    twitterHandle,
    adSense,
    baseUrl
  } = props.pageContext;

  const pages = sidebarContents
    .reduce((acc, { pages }) => acc.concat(pages), [])
    .filter(page => !page.anchor);

  const formattedContentful = {
    id: contentfulSong.id,
    title: contentfulSong.title,
    videoLink: contentfulSong.videoLink,
    lyrics: contentfulSong.lyrics.lyrics,
    lyrics2: contentfulSong.lyrics2.lyrics2,
    json: contentfulSong.childContentfulSongLyrics2RichTextNode.json,
    author: contentfulSong.author.name
  };

  console.log("L:168 | formattedContentful: ", formattedContentful.lyrics2);

  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || description}
        siteName={title}
        baseUrl={baseUrl}
        image={fields.image}
        twitterHandle={twitterHandle}
        adSense={adSense}
      />
      <ContentWrapper>
        <PageHeader {...frontmatter} />
        <hr />
        {formattedContentful.videoLink && (
          <>
            <VideoBox videoUrl={formattedContentful.videoLink} />
            <hr />
          </>
        )}
        <PageContent
          title={frontmatter.title}
          graphManagerUrl={fields.graphManagerUrl}
          pathname={pathname}
          pages={pages}
          headings={headings}
          hash={hash}
          githubUrl={githubUrl}
        >
          <CustomLinkContext.Provider
            value={{
              pathPrefix: site.pathPrefix,
              baseUrl
            }}
          >
            <div style={{ whiteSpace: "break-spaces" }}>
              {formattedContentful.lyrics}
            </div>
            <br />
            <br />
            <div style={{ whiteSpace: "break-spaces" }}>
              {documentToReactComponents(formattedContentful.json)}
              {console.log(
                "L:196 | documentToReactComponents(formattedContentful.json): ",
                documentToReactComponents(formattedContentful.json)
              )}
            </div>
            {/*{file.childMdx ? (*/}
            {/*  <MDXProvider components={components}>*/}
            {/*    <MDXRenderer>{file.childMdx.body}</MDXRenderer>*/}
            {/*  </MDXProvider>*/}
            {/*) : (*/}
            {/*  renderAst(file.childMarkdownRemark.htmlAst)*/}
            {/*)}*/}
          </CustomLinkContext.Provider>
        </PageContent>
        <Footer />
      </ContentWrapper>
    </>
  );
}

Template.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query PageQuery($id: String) {
    site {
      pathPrefix
      siteMetadata {
        title
        description
      }
    }
    contentfulSong {
      id
      author {
        name
      }
      title
      lyrics {
        lyrics
      }
      lyrics2 {
        lyrics2
      }
      childContentfulSongLyrics2RichTextNode {
        json
      }
      videoLink
    }
    file(id: { eq: $id }) {
      childMarkdownRemark {
        frontmatter {
          title
          description
        }
        headings(depth: h2) {
          value
        }
        fields {
          image
          graphManagerUrl
        }
        htmlAst
      }
      childMdx {
        frontmatter {
          title
          description
          ytLink
        }
        headings(depth: h2) {
          value
        }
        fields {
          image
          graphManagerUrl
        }
        body
      }
    }
  }
`;
