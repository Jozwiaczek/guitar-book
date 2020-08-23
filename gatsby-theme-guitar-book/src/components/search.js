import PropTypes from 'prop-types';
import React, {useRef, useState} from 'react';
import {graphql, useStaticQuery} from 'gatsby';
import styled from '@emotion/styled';
import useKey from 'react-use/lib/useKey';
import {HEADER_HEIGHT} from '../utils';
import {TextField} from '@apollo/space-kit/TextField';
import {colors} from '../utils/colors';
import breakpoints from '../utils/breakpoints';
import {css} from '@emotion/core';
import {position, size, transparentize} from 'polished';

const borderRadius = 5;
const border = `1px solid ${colors.text3}`;
const verticalAlign = css({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)'
});

const Hotkey = styled.div(verticalAlign, size(24), {
  border,
  borderColor: colors.text4,
  color: colors.text4,
  borderRadius,
  textAlign: 'center',
  lineHeight: 1.125,
  right: 10,
  pointerEvents: 'none'
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
    marginRight: 0
  }
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
  border
});

const Suggestion = styled.div({
  color: 'inherit',
  background: 'none',
  textDecoration: 'none',
  padding: '20px 32px',
  borderBottom: `1px solid ${colors.divider}`,

  ':hover': {
    backgroundColor: transparentize(0.5, colors.divider),
    cursor: 'pointer'
  }
});

const Title = styled.div({
  marginBottom: 4,
  fontSize: 22,
  color: colors.text1,
  textAlign: 'initial'
});

const Author = styled.div({
  marginBottom: 0,
  fontSize: 18,
  fontWeight: 'normal',
  color: 'inherit'
});

const Lyrics = styled.div({});

const NoResultsInfo = styled.p({
  padding: 32,
  marginBottom: 0,
  textAlign: 'center'
});

const Overlay = styled.div(
  position('fixed', 0),
  props =>
    !props.visible && {
      opacity: 0,
      visibility: 'hidden'
    },
  {
    backgroundColor: transparentize(0.5, colors.text2),
    transitionProperty: 'opacity, visibility',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-in-out',
    zIndex: 1
  }
);

export default function Search(props) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const data = useStaticQuery(graphql`
    query {
      allFile {
        edges {
          node {
            childMdx {
              frontmatter {
                title
                description
              }
              slug
              rawBody
            }
          }
        }
      }
    }
  `);

  const nodes = data.allFile.edges;

  // SORTING
  // 1. title
  // 2. author
  // 3. lyrics

  // FILTER
  // first 10 records per search

  console.log('L:171 | slug: ', nodes);
  console.log('L:173 | value: ', value);
  // TODO: perPage: 10 records
  // TODO: change desc into author

  // focus the input when the slash key is pressed
  useKey(
    event =>
      event.keyCode === 191 && event.target.tagName.toUpperCase() !== 'INPUT',
    event => {
      event.preventDefault();
      inputRef.current.focus();
    }
  );

  function onChange(event) {
    setValue(event.target.value);
  }

  function onFocus() {
    setFocused(true);
  }
  function onBlur() {
    setFocused(false);
  }

  const noResults = false;

  const resultsShown = focused && value.trim();
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
              style={{
                fontSize: 16,
                boxShadow: resultsShown ? boxShadow : 'none'
              }}
            />
          }
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          placeholder={`Search ${props.siteName}`}
        />
        {!focused && !value && <Hotkey>/</Hotkey>}
        {resultsShown &&
          <SuggestionBox>
            {noResults ?
              <NoResultsInfo>No results found for query &quot;{value}&quot;</NoResultsInfo>:
              <>
                <Suggestion>
                  <Title>Wehikuł Czasu</Title>
                  <Author>Dżem</Author>
                  <Lyrics>Pamitam dobrze ideał swój, ...</Lyrics>
                </Suggestion>
                <Suggestion>
                  <Title>Wehikuł Czasu</Title>
                  <Author>Dżem</Author>
                  <Lyrics>Pamitam dobrze ideał swój, ...</Lyrics>
                </Suggestion>
              </>
            }
          </SuggestionBox>
        }
      </Container>
    </>
  );
}

Search.propTypes = {
  siteName: PropTypes.string.isRequired,
};
