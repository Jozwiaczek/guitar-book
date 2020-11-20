import React, { createContext, useContext } from 'react';

import { navigate } from 'gatsby';
import PropTypes from 'prop-types';

export const CustomLinkContext = createContext();

const CustomLink = (props) => {
  const { pathPrefix, baseUrl } = useContext(CustomLinkContext);
  const linkProps = { ...props };
  if (props.href) {
    if (props.href.startsWith('/')) {
      linkProps.onClick = function handleClick(event) {
        const href = event.target.getAttribute('href');
        if (href.startsWith('/')) {
          event.preventDefault();
          navigate(href.replace(pathPrefix, ''));
        }
      };
    } else if (!props.href.startsWith('#') && !props.href.startsWith(baseUrl)) {
      linkProps.target = '_blank';
      linkProps.rel = 'noopener noreferrer';
    }
  }

  return <a {...linkProps} />;
};

CustomLink.propTypes = {
  href: PropTypes.string,
};

export default CustomLink;
