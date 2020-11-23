import PropTypes from 'prop-types';
import React from 'react';

import styled from '@emotion/styled';

import { transparentize } from 'polished';

import { Link } from 'gatsby';

import breakpoints from '../utils/breakpoints';
import { colors } from '../utils/colors';

import Logo from './logo';

const Container = styled.aside({
  flexShrink: 0,
  width: 312,
  height: '100vh',
  padding: 24,
  borderRight: `1px solid ${colors.divider}`,
  overflowY: 'auto',
  position: 'sticky',
  top: 0,
});

const ResponsiveContainer = styled(Container)((props) => ({
  [breakpoints.md]: {
    height: '100%',
    backgroundColor: 'white',
    boxShadow: `0 0 48px ${transparentize(0.75, 'black')}`,
    position: 'fixed',
    zIndex: 2,
    opacity: props.open ? 1 : 0,
    visibility: props.open ? 'visible' : 'hidden',
    transform: props.open ? 'none' : 'translateX(-100%)',
    transitionProperty: 'transform, opacity, visibility',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-in-out',
  },
}));

const Header = styled.div({
  display: 'flex',
  marginBottom: 24,
});

const StyledLink = styled(Link)({
  color: colors.text1,
  textDecoration: 'none',
});

const Sidebar = React.forwardRef((props, ref) => {
  const content = (
    <>
      <Header>
        <StyledLink to="/">
          <Logo />
        </StyledLink>
      </Header>
      <div className={props.className}>{props.children}</div>
    </>
  );

  if (props.responsive) {
    return (
      <ResponsiveContainer ref={ref} open={props.open}>
        {content}
      </ResponsiveContainer>
    );
  }

  return <Container>{content}</Container>;
});

Sidebar.displayName = 'Sidebar';

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  responsive: PropTypes.bool,
  className: PropTypes.string,
};

export default Sidebar;
