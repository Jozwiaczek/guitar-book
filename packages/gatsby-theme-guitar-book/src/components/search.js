import PropTypes from 'prop-types';
import React, { useMemo, useRef, useState, useCallback } from 'react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import useKey from 'react-use/lib/useKey';
import Highlighter from 'react-highlight-words';
import { TextField } from '@apollo/space-kit/TextField';
import { css } from '@emotion/core';
import { position, size, transparentize } from 'polished';

import { getSlug } from '../utils/helpers';
import { colors } from '../utils/colors';
import breakpoints from '../utils/breakpoints';
import { HEADER_HEIGHT } from '../utils/constants';

const borderRadius = 5;
const border = `1px solid ${colors.text3}`;
const verticalAlign = css({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
});

const Hotkey = styled.div(verticalAlign, size(24), {
  border,
  borderColor: colors.text4,
  color: colors.text4,
  borderRadius,
  textAlign: 'center',
  lineHeight: 1.125,
  right: 10,
  pointerEvents: 'none',
});

const HotkeyIcon = styled.div`
  border: ${border};
  border-color: ${colors.text4};
  border-radius: ${borderRadius}px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HotkeyBar = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${colors.text3};
  color: ${colors.text4};
  align-items: center;
  padding-left: 1rem;
  gap: 10px;
  @media (hover: none) and (pointer: coarse) {
    display: none;
  }
`;

const boxShadowColor = transparentize(0.9, 'black');
export const boxShadow = `${boxShadowColor} 0 2px 12px`;

const Container = styled.div({
  flexGrow: 1,
  marginRight: 40,
  color: colors.text2,
  position: 'relative',
  zIndex: 1,
  [breakpoints.md]: {
    marginRight: 0,
  },
});

const SuggestionBox = styled.div({
  width: '100%',
  maxWidth: '100%',
  minWidth: 'auto',
  marginTop: 14,
  position: 'absolute',
  background: 'white',
  borderRadius,
  boxShadow,
  maxHeight: `calc(100vh - ${HEADER_HEIGHT}px - 32px)`,
  padding: 0,
  border,
  display: 'flex',
  flexDirection: 'column',
});

const Suggestions = styled.div`
  flex-grow: 1;
  max-height: calc(100vh - ${HEADER_HEIGHT}px - 32px - 50px);
  overflow-y: scroll;
`;

const Suggestion = styled.div((props) => ({
  color: 'inherit',
  background: 'none',
  textDecoration: 'none',
  padding: '20px 32px',
  borderBottom: `1px solid ${colors.divider}`,
  backgroundColor: props.isSelected && transparentize(0.5, colors.divider),
  ':hover': {
    cursor: 'pointer',
  },
}));

const Title = styled.div({
  marginBottom: 4,
  fontSize: 22,
  color: colors.text1,
  textAlign: 'initial',
});

const Author = styled.div({
  marginBottom: 0,
  fontSize: 18,
  fontWeight: 'normal',
  color: 'inherit',
});

const Lyrics = styled.div({});

const NoResultsInfo = styled.p({
  padding: 32,
  marginBottom: 0,
  textAlign: 'center',
});

const Overlay = styled.div(
  position('fixed', 0),
  (props) =>
    !props.visible && {
      opacity: 0,
      visibility: 'hidden',
    },
  {
    backgroundColor: transparentize(0.5, colors.text2),
    transitionProperty: 'opacity, visibility',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-in-out',
    zIndex: 1,
  },
);

export default function Search(props) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [result, setResult] = useState([]);
  const [mouseOver, setMouseOver] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const resultsRefs = useRef([]);
  const suggestionsRef = useRef();
  const resultLimit = 10;
  const inputRef = useRef(null);

  const data = useStaticQuery(graphql`
    query {
      allContentfulSong {
        edges {
          node {
            title
            author {
              name
            }
            lyrics {
              json
            }
          }
        }
      }
    }
  `);

  const resultContentful = useMemo(
    () =>
      data.allContentfulSong.edges.map(({ node }) => {
        const authorName = node.author.name;
        return {
          title: node.title,
          lyrics: node.lyrics.json.content.reduce((externalAcc, { content }) => {
            const joinedValues = content.reduce(
              (innerAcc, { value }) => `${innerAcc} ${value}`,
              '',
            );
            return `${externalAcc} ${joinedValues}`;
          }, ''),
          slug: getSlug(authorName, node.title),
          author: authorName,
        };
      }),
    [],
  );

  const search = useCallback((searchText) => {
    searchText = searchText.trim();
    setSelectedIndex(0);
    if (!searchText) return [];
    const searchRegExp = new RegExp(searchText, 'i');
    return resultContentful
      .map((n) => {
        n.filter = {
          title: n.title.search(searchRegExp),
          author: n.author.search(searchRegExp),
          lyrics: n.lyrics.search(searchRegExp),
        };

        return n;
      })
      .filter(
        ({ filter: { title, author, lyrics } }) => title !== -1 || author !== -1 || lyrics !== -1,
      )
      .sort(
        (
          { filter: { title: titleA, author: authorA, lyrics: lyricsA } },
          { filter: { title: titleB, author: authorB, lyrics: lyricsB } },
        ) => {
          if (titleA !== -1 && titleB !== -1) return titleA - titleB;
          if (titleA !== -1) return -1;
          if (titleB !== -1) return 1;

          if (authorA !== -1 && authorB !== -1) return authorA - authorB;
          if (authorA !== -1) return -1;
          if (authorB !== -1) return 1;

          if (lyricsA !== -1 && lyricsB !== -1) return lyricsA - lyricsB;
          if (lyricsA !== -1) return -1;
          if (lyricsB !== -1) return 1;
          return 1;
        },
      )
      .slice(0, resultLimit);
  }, []);

  function navigateTo(slug) {
    navigate(slug);
    setMouseOver(false);
    setValue('');
    inputRef.current.blur();
  }

  // focus the input when the slash key is pressed
  useKey(
    (event) => event.key === '/' && inputRef.current !== document.activeElement,
    (event) => {
      event.preventDefault();
      inputRef.current.focus();
    },
  );

  // select item up/down
  useKey(
    (event) =>
      (event.key === 'ArrowUp' || event.key === 'ArrowDown') && resultsShown && result.length,
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setSelectedIndex((prevState) => {
        const index =
          (prevState + (event.key === 'ArrowUp' ? (prevState === 0 ? 0 : -1) : 1)) %
          Math.min(resultLimit, result.length);
        suggestionsRef.current.scrollTo({
          behavior: 'smooth',
          block: 'center',
          top: resultsRefs.current[index].offsetTop,
        });
        return index;
      });
    },
  );

  // navigate to selected item
  useKey(
    (event) => event.key === 'Enter' && resultsShown,
    (event) => {
      event.preventDefault();
      if (result.length > selectedIndex) {
        navigateTo(result[selectedIndex].slug);
      }
    },
  );

  // blur input on esc
  useKey(
    (event) => event.key === 'Escape' && inputRef.current === document.activeElement,
    (event) => {
      event.preventDefault();
      setValue('');
      inputRef.current.blur();
    },
  );

  function onChange(event) {
    setValue(event.target.value);
    setResult(search(event.target.value));
  }

  function onFocus() {
    setFocused(true);
  }
  function onBlur() {
    setFocused(false);
  }

  const HighlightLabel = ({ label }) => (
    <Highlighter
      autoEscape
      highlightStyle={{ background: colors.primaryLight }}
      searchWords={[value]}
      textToHighlight={label}
    />
  );

  const resultsShown = (focused && value.trim()) || (mouseOver && value.trim());
  return (
    <>
      <Overlay visible={resultsShown} />
      <Container>
        <TextField
          type="search"
          size="large"
          inputAs={
            <input
              ref={inputRef}
              id="input"
              autoComplete="off"
              style={{
                fontSize: 16,
                boxShadow: resultsShown ? boxShadow : 'none',
              }}
            />
          }
          value={value}
          placeholder={`Search ${props.siteName}`}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
        {!focused && !value && <Hotkey>/</Hotkey>}
        {resultsShown && (
          <>
            <SuggestionBox>
              <div>
                {result.length ? (
                  <Suggestions ref={suggestionsRef}>
                    {result.map((res, index) => (
                      <Suggestion
                        key={index}
                        isSelected={index === selectedIndex}
                        ref={(el) => (resultsRefs.current[index] = el)}
                        onMouseEnter={() => {
                          setMouseOver(true);
                        }}
                        onMouseMove={() =>
                          selectedIndex === index ? undefined : setSelectedIndex(index)
                        }
                        onMouseLeave={() => setMouseOver(false)}
                        onClick={() => navigateTo(res.slug)}
                      >
                        <Title>
                          <HighlightLabel label={res.title} />
                        </Title>
                        <Author>
                          <HighlightLabel label={res.author} />
                        </Author>
                        <Lyrics>
                          <HighlightLabel
                            label={res.lyrics.substr(
                              res.filter.lyrics < 0 ? 0 : res.filter.lyrics,
                              20,
                            )}
                          />
                        </Lyrics>
                      </Suggestion>
                    ))}
                  </Suggestions>
                ) : (
                  <NoResultsInfo>No results found for query &quot;{value}&quot;</NoResultsInfo>
                )}
                <HotkeyBar>
                  <HotkeyIcon>
                    <svg width="15" height="15">
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      >
                        <path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3" />
                      </g>
                    </svg>
                  </HotkeyIcon>
                  <div>to select</div>
                  <HotkeyIcon>
                    <svg width="15" height="15">
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      >
                        <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3" />
                      </g>
                    </svg>
                  </HotkeyIcon>
                  <HotkeyIcon>
                    <svg width="15" height="15">
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      >
                        <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3" />
                      </g>
                    </svg>
                  </HotkeyIcon>
                  <div>to navigate</div>
                  <HotkeyIcon>
                    <svg width="15" height="15">
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      >
                        <path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956" />
                      </g>
                    </svg>
                  </HotkeyIcon>
                  <div>to close</div>
                </HotkeyBar>
              </div>
            </SuggestionBox>
          </>
        )}
      </Container>
    </>
  );
}

Search.propTypes = {
  siteName: PropTypes.string.isRequired,
};
