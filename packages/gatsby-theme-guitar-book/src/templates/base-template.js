import PropTypes from 'prop-types';
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import SEO from '../components/seo';
import ContentWrapper from '../components/content-wrapper';
import PageHeader from '../components/page-header';
import Footer from '../components/footer';
import PageContent from '../components/page-content';

const HeaderWrapper = styled.div`
  h1 {
    margin-top: -285px;
    padding-top: 285px;
    display: inline-block;
  }
  h2 {
    margin-top: -229px;
    padding-top: 285px;
    display: inline-block;
  }
`;

const BaseTemplate = ({
  id,
  seoTitle,
  seoDescription,
  contentTitle,
  isFavouriteContent,
  contentDescription,
  subheader,
  location,
  pageContext,
  children,
}) => {
  const data = useStaticQuery(graphql`
    query BaseTemplateQuery {
      sitePage(fields: { id: { eq: ${id} } }) {
        fields {
          image
        }
      }
      contentfulGlobalSettings {
        siteName
        description
      }
    }
  `);
  const { hash, pathname } = location;
  const { contentfulGlobalSettings, sitePage } = data;
  const { siteName, description } = contentfulGlobalSettings;
  const { sidebarContents, adSense, baseUrl } = pageContext;
  const pages = sidebarContents
    ?.reduce((acc, { pages }) => acc.concat(pages), [])
    .filter((page) => !page.anchor);

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription || description}
        siteName={siteName}
        baseUrl={baseUrl}
        adSense={adSense}
        image={sitePage.fields.image}
      />
      <ContentWrapper>
        <PageHeader
          title={contentTitle}
          favourite={isFavouriteContent}
          description={contentDescription}
        />
        <hr />
        {subheader && (
          <>
            {subheader}
            <hr />
          </>
        )}
        <PageContent title={seoTitle} pathname={pathname} pages={pages} hash={hash}>
          <HeaderWrapper style={{ whiteSpace: 'break-spaces' }}>{children}</HeaderWrapper>
        </PageContent>
        <Footer />
      </ContentWrapper>
    </>
  );
};

BaseTemplate.propTypes = {
  id: PropTypes.number.isRequired,
  isFavouriteContent: PropTypes.bool.isRequired,
  seoTitle: PropTypes.string.isRequired,
  seoDescription: PropTypes.string.isRequired,
  contentTitle: PropTypes.string.isRequired,
  contentDescription: PropTypes.element.isRequired,
  subheader: PropTypes.element,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

export default BaseTemplate;
