import React from 'react';
import PropTypes from 'prop-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styled from '@emotion/styled';
import { BLOCKS } from '@contentful/rich-text-types';
import striptags from 'striptags';
import Slugger from 'github-slugger';

const Wrapper = styled.div`
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

const getAnchorSlug = (value) => {
  const text = striptags(value);
  const slugger = new Slugger();
  return slugger.slug(text);
};

const HTMLField = ({ json, options }) => {
  const formattedOptions = {
    ...options,
    renderNode: {
      ...(options?.renderNode ? options.renderNode : null),
      [BLOCKS.HEADING_1]: (node, children) => <h1 id={getAnchorSlug(children[0])}>{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 id={getAnchorSlug(children[0])}>{children}</h2>,
    },
  };

  return (
    <Wrapper style={{ whiteSpace: 'break-spaces' }}>
      {documentToReactComponents(json, formattedOptions)}
    </Wrapper>
  );
};

HTMLField.propTypes = {
  json: PropTypes.object.isRequired,
  options: PropTypes.object,
};

export default HTMLField;
