import React from 'react';
import PropTypes from 'prop-types';

import SEO from './components/seo';
import ContentWrapper from './components/content-wrapper';
import PageHeader from '../page-header';
import Footer from '../footer';
import PageContent from '../page-content';

const TemplateBase = ({
  title,
  description,
  isFavourite,
  contentDescription,
  subheader,
  location,
  pageContext,
  children,
  headings,
  data,
}) => {
  const { hash, pathname } = location;
  const { contentfulGlobalSettings, sitePage } = data;
  const { siteName } = contentfulGlobalSettings;
  const { sidebarContents, adSense, baseUrl } = pageContext;
  const pages = sidebarContents?.reduce((acc, { pages }) => acc.concat(pages), []);

  return (
    <>
      <SEO
        title={title}
        description={description}
        siteName={siteName}
        baseUrl={baseUrl}
        adSense={adSense}
        image={sitePage.fields.image}
      />
      <ContentWrapper>
        <PageHeader
          title={title}
          favourite={isFavourite}
          description={contentDescription || description}
        />
        <hr />
        {subheader && (
          <>
            {subheader}
            <hr />
          </>
        )}
        <PageContent
          title={title}
          pathname={pathname}
          pages={pages}
          hash={hash}
          headings={headings}
        >
          {children}
        </PageContent>
        <Footer />
      </ContentWrapper>
    </>
  );
};

TemplateBase.propTypes = {
  data: PropTypes.shape({
    sitePage: PropTypes.object,
    contentfulGlobalSettings: PropTypes.object,
  }).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  contentDescription: PropTypes.element,
  subheader: PropTypes.element,
  isFavourite: PropTypes.bool,
  headings: PropTypes.array,
};

export default TemplateBase;
