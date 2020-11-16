import '../prism.less';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import styled from '@emotion/styled';
import { Button } from '@apollo/space-kit/Button';

import { Helmet } from 'react-helmet';

import { IconLayoutModule } from '@apollo/space-kit/icons/IconLayoutModule';

import { graphql, useStaticQuery } from 'gatsby';

import { size } from 'polished';

import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

import { colors } from '../utils/colors';
import breakpoints from '../utils/breakpoints';

import Search from './search';
import Header from './header';
import DocsetSwitcher from './docset-switcher';
import { useResponsiveSidebar } from './responsive-sidebar';
import Layout from './layout';
import FlexWrapper from './flex-wrapper';
import Sidebar from './sidebar';
import SidebarNav from './sidebar-nav';
import MenuButton from './menu-button';
import Toolbox from './toolbox';

const Main = styled.main({
  flexGrow: 1,
});

const ButtonWrapper = styled.div({
  flexGrow: 1,
});

const StyledButton = styled(Button)({
  width: '100%',
  ':not(:hover)': {
    backgroundColor: colors.background,
  },
});

const StyledIcon = styled(IconLayoutModule)(size(16), {
  marginLeft: 'auto',
});

const MobileNav = styled.div({
  display: 'none',
  [breakpoints.md]: {
    display: 'flex',
    alignItems: 'center',
    color: colors.text1,
  },
});

const HeaderInner = styled.span({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 32,
});

const GA_EVENT_CATEGORY_SIDEBAR = 'Sidebar';

function handleToggleAll(expanded) {
  trackCustomEvent({
    category: GA_EVENT_CATEGORY_SIDEBAR,
    action: 'Toggle all',
    label: expanded ? 'expand' : 'collapse',
  });
}

function handleToggleCategory(label, expanded) {
  trackCustomEvent({
    category: GA_EVENT_CATEGORY_SIDEBAR,
    action: 'Toggle category',
    label,
    value: Number(expanded),
  });
}

export default function PageLayout(props) {
  const data = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
            siteName
          }
        }
      }
    `,
  );

  const {
    sidebarRef,
    openSidebar,
    sidebarOpen,
    handleWrapperClick,
    handleSidebarNavLinkClick,
  } = useResponsiveSidebar();

  const buttonRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function openMenu() {
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  const pathname = decodeURI(props.location.pathname);
  const { siteName, title } = data.site.siteMetadata;
  const { subtitle, sidebarContents } = props.pageContext;

  const { logoLink, menuTitle } = props.pluginOptions;

  const sidebarTitle = <span className="title-sidebar">{subtitle || siteName}</span>;

  return (
    <Layout>
      <Helmet titleTemplate={['%s', subtitle, title].filter(Boolean).join(' - ')}>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Helmet>
      <FlexWrapper onClick={handleWrapperClick}>
        <Sidebar
          responsive
          className="sidebar"
          open={sidebarOpen}
          ref={sidebarRef}
          title={siteName}
          logoLink={logoLink}
        >
          <HeaderInner>
            <ButtonWrapper ref={buttonRef}>
              <StyledButton
                feel="flat"
                color={colors.primary}
                size="small"
                style={{ display: 'flex' }}
                onClick={openMenu}
              >
                {sidebarTitle}
                <StyledIcon />
              </StyledButton>
            </ButtonWrapper>
          </HeaderInner>
          {sidebarContents && (
            <SidebarNav
              contents={sidebarContents}
              pathname={pathname}
              onToggleAll={handleToggleAll}
              onToggleCategory={handleToggleCategory}
              onLinkClick={handleSidebarNavLinkClick}
            />
          )}
        </Sidebar>
        <Main>
          <Header>
            <MobileNav>
              <MenuButton onClick={openSidebar} />
            </MobileNav>
            <Search siteName={siteName} />
            <Toolbox pathname={pathname} />
          </Header>
          {props.children}
        </Main>
      </FlexWrapper>
      <DocsetSwitcher
        siteName={menuTitle || siteName}
        open={menuOpen}
        buttonRef={buttonRef}
        onClose={closeMenu}
        {...props.pluginOptions}
      />
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  pluginOptions: PropTypes.object.isRequired,
};
