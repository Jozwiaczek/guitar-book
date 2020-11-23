import '../prism.less';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import PropTypes from 'prop-types';
import React, { useRef, useState, cloneElement } from 'react';
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
import Menu from './menu/menu';
import { useResponsiveSidebar } from './responsive-sidebar';
import Layout from './layout';
import Sidebar from './sidebar';
import SidebarNav from './sidebar-nav';
import MenuButton from './menu/menu-button';
import Toolbox from './toolbox';
import { getSidebarContent } from '../utils/sidebar';

const FlexWrapper = styled.div({
  display: 'flex',
  minHeight: '100vh',
  maxWidth: 1440,
  margin: '0 auto',
});

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
        contentfulGlobalSettings {
          siteName
          menuLabel
        }
        allContentfulSidebar {
          edges {
            node {
              items {
                ... on ContentfulPage {
                  id
                  title
                  isHomepage
                  description
                  sys {
                    contentType {
                      sys {
                        id
                      }
                    }
                  }
                }
                ... on ContentfulSidebarSongs {
                  name
                  songs {
                    id
                    title
                    author {
                      name
                    }
                  }
                  sys {
                    contentType {
                      sys {
                        id
                      }
                    }
                  }
                }
                ... on ContentfulPage {
                  id
                  title
                  isHomepage
                  description
                  sys {
                    contentType {
                      sys {
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  );

  const {
    sidebarRef,
    openSidebar,
    sidebarOpen,
    closeSidebar,
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
    closeSidebar();
  }

  const pathname = decodeURI(props.location.pathname);
  const { siteName, menuLabel } = data.contentfulGlobalSettings;

  const sidebarTitle = <span className="title-sidebar">{menuLabel || 'Menu'}</span>;

  const sidebarContents = getSidebarContent(data.allContentfulSidebar.edges);

  return (
    <Layout>
      <Helmet titleTemplate={['%s', siteName].filter(Boolean).join(' - ')}>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Helmet>
      <FlexWrapper onClick={handleWrapperClick}>
        <Sidebar
          responsive
          className="sidebar"
          open={sidebarOpen}
          ref={sidebarRef}
          title={siteName}
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
          {cloneElement(props.children, { ...props.children.props })}
        </Main>
      </FlexWrapper>
      <Menu
        siteName={menuLabel || 'Menu'}
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
