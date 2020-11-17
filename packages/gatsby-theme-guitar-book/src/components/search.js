import PropTypes from 'prop-types';
import React, { useMemo, useRef, useState, useCallback } from 'react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import useKey from 'react-use/lib/useKey';
import Highlighter from 'react-highlight-words';

import { TextField } from '@apollo/space-kit/TextField';

import { css } from '@emotion/core';

import { position, size, transparentize } from 'polished';

import { getSlug, HEADER_HEIGHT } from '../utils';
import { colors } from '../utils/colors';
import breakpoints from '../utils/breakpoints';

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
  overflowY: 'auto',
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
});

const Suggestion = styled.div({
  color: 'inherit',
  background: 'none',
  textDecoration: 'none',
  padding: '20px 32px',
  borderBottom: `1px solid ${colors.divider}`,

  ':hover': {
    backgroundColor: transparentize(0.5, colors.divider),
    cursor: 'pointer',
  },
});

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

  // focus the input when the slash key is pressed
  useKey(
    (event) => event.keyCode === 191 && event.target.tagName.toUpperCase() !== 'INPUT',
    (event) => {
      event.preventDefault();
      inputRef.current.focus();
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

  const resultsShown = (focused && value.trim()) || mouseOver;
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
          <SuggestionBox>
            {result.length ? (
              <>
                {result.map((res, index) => (
                  <Suggestion
                    key={index}
                    onMouseEnter={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}
                    onClick={() => {
                      navigate(`${res.slug}`);
                      setMouseOver(false);
                      setValue('');
                    }}
                  >
                    <Title>
                      <HighlightLabel label={res.title} />
                    </Title>
                    <Author>
                      <HighlightLabel label={res.author} />
                    </Author>
                    <Lyrics>
                      <HighlightLabel
                        label={res.lyrics.substr(res.filter.lyrics < 0 ? 0 : res.filter.lyrics, 20)}
                      />
                    </Lyrics>
                  </Suggestion>
                ))}
              </>
            ) : (
              <NoResultsInfo>No results found for query &quot;{value}&quot;</NoResultsInfo>
            )}
          </SuggestionBox>
        )}
      </Container>
    </>
  );
}

Search.propTypes = {
  siteName: PropTypes.string.isRequired,
};
