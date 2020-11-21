/* global preval */
import PropTypes from 'prop-types';
import React from 'react';
import TextFit from 'react-textfit';
import { Global, css } from '@emotion/core';
import { IconArrowRight } from '@apollo/space-kit/icons/IconArrowRight';

import { smallCaps } from '../utils/typography';

const { fonts, image } = preval`
  const fs = require('fs');
  const path = require('path');

  function getBase64(path) {
    const fontPath = require.resolve('source-sans-pro/' + path);
    const base64Font = fs.readFileSync(fontPath, 'base64');
    return 'data:application/x-font-woff;charset=utf-8;base64,' + base64Font;
  }

  const base64Regular = getBase64('/WOFF2/TTF/SourceSansPro-Regular.ttf.woff2');
  const base64Semibold = getBase64('/WOFF2/TTF/SourceSansPro-Semibold.ttf.woff2');

  const cssPath = require.resolve('source-sans-pro/source-sans-pro.css');
  const fonts = fs
    .readFileSync(cssPath, 'utf-8')
    .replace('WOFF2/TTF/SourceSansPro-Regular.ttf.woff2', base64Regular)
    .replace('WOFF2/TTF/SourceSansPro-Semibold.ttf.woff2', base64Semibold);

  const imagePath = path.resolve(__dirname, '../assets/images/social-bg.jpg');
  const base64Image = fs.readFileSync(imagePath, 'base64');

  module.exports = {
    fonts,
    image: 'data:image/jpeg;base64,' + base64Image
  };
`;

export default function SocialCard({ subtitle, category, title }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        width: 1200,
        height: 628,
        padding: 80,
        fontFamily: "'Source Sans Pro'",
        color: 'black',
        backgroundImage: `url(${image})`,
      }}
    >
      <Global
        styles={css`
          ${fonts}
          svg.arrow-icon path {
            vector-effect: none;
            stroke-width: 4px;
          }
        `}
      />
      <div
        style={{
          fontSize: 32,
          fontWeight: 600,
          marginBottom: 16,
          color: 'black',
          ...smallCaps,
        }}
      >
        {subtitle}
        {category && (
          <>
            {' '}
            <IconArrowRight
              className="arrow-icon"
              style={{
                width: '0.5em',
                height: '0.5em',
                verticalAlign: '0.05em',
              }}
            />{' '}
            {category}
          </>
        )}
      </div>
      <TextFit
        min={80}
        max={120}
        style={{
          width: '100%',
          height: 250,
          marginBottom: 'auto',
          lineHeight: 1.2,
          colors: 'black',
        }}
      >
        {title.replace(/\s+(\S*)$/, '\xA0$1')}
      </TextFit>
      <div>
        <svg viewBox="0 0 440.7 178.23" style={{ height: 105 }}>
          <g fill="#2d2b2d">
            <path d="M188.87 88.58v.23a36.51 36.51 0 01-73 0v-.23H98.22v33.07H82.6a12.77 12.77 0 000-14.7c-3-4.5-4.49-11.43-4.49-18.37H0c0 66.73 30.83 89.65 64.82 89.65 45.06 0 61.27-34.78 79.44-34.78 15 0 52.23 21.38 68.78 1.32 13-15.82 7.31-44.67 7.31-44.67l151.45-.12a11.52 11.52 0 008.51 5.34v2.9c-1.82.35-3.16 1.42-3.16 2.7 0 1.55 2 2.82 4.48 2.82s4.48-1.27 4.48-2.82c0-1.28-1.33-2.35-3.16-2.7v-2.93a18 18 0 006-2 21.11 21.11 0 017.2-1.9v3.28c-1.83.36-3.16 1.43-3.16 2.7 0 1.56 2 2.83 4.48 2.83s4.48-1.27 4.48-2.83c0-1.27-1.34-2.34-3.17-2.7v-3.51a102.16 102.16 0 0116.33.78v4c-1.83.36-3.16 1.42-3.16 2.7 0 1.56 2 2.83 4.48 2.83s4.48-1.27 4.48-2.83c0-1.28-1.34-2.34-3.16-2.7v-3.65c8.41 1 15.36 2.19 16.25 1a9.61 9.61 0 002-5.34s4.75.33 4.75-9.42z" />
            <path d="M152.37 121.62a32.85 32.85 0 0032.76-31h-6.58a26.26 26.26 0 01-52.36 0h-6.58a32.85 32.85 0 0032.76 31z" />
          </g>
          <g fill="#2d2b2d">
            <path d="M26.78 35.83C26.78 13.36 41.01 0 59.28 0a28.24 28.24 0 0120.75 8.7l-6.51 7.85c-3.45-3.36-7.48-6-13.86-6-12.18 0-20.37 9.45-20.37 24.86 0 15.66 7.27 25.16 21 25.16 3.82 0 7.6-1.1 9.79-3V42.76h-12.9v-10h23.86v30.28c-4.58 4.62-12.52 8.15-21.93 8.15-18.52 0-32.33-12.64-32.33-35.36zM107.54 39.82V1.29h12.18v39.48c0 15 5.59 19.87 13.9 19.87s14.2-4.92 14.2-19.87V1.29h11.71v38.56c0 22.55-10 31.37-25.91 31.37s-26.08-8.85-26.08-31.4zM188.2 1.29h12.18v68.67H188.2zM243.22 11.51h-19.77V1.29h51.82v10.25h-19.82v58.42h-12.23zM307.45 1.29h14.28l22.38 68.67h-12.86l-10.46-36.57c-2.18-7.26-4.2-15.1-6.21-22.64h-.42c-1.89 7.61-3.91 15.38-6.09 22.64l-10.54 36.54h-12.44zm-9.16 40.51h32.34v9.49h-32.31zM363.13 1.29h23.14c14.28 0 25.29 5 25.29 20.37 0 14.76-11 21.46-25.29 21.46h-11v26.84h-12.14zm21.88 32.09c9.41 0 14.53-3.91 14.53-11.72s-5.12-10.62-14.53-10.62h-9.7v22.34zm-1 6.49l8.82-7.27 21.44 37.36h-13.72z" />
          </g>
          <g fill="#2d2b2d">
            <path d="M235.17 109.19h10.28c7.61 0 12.49 2.89 12.49 9.21 0 3.95-2 7.11-5.86 8.26v.23c4.91.83 8.2 3.9 8.2 9.15 0 7.29-5.53 11-14.1 11h-11zm9.19 16.68c7.77 0 10.92-2.74 10.92-7.21 0-5.31-3.66-7.26-10.61-7.26h-6.85v14.47zm1.1 19c7.54 0 12.17-2.72 12.17-8.79 0-5.45-4.43-8-12.17-8h-7.64v16.83zM271.55 133.29c0-9.24 5.76-14.55 12.39-14.55s12.4 5.31 12.4 14.55-5.76 14.44-12.4 14.44-12.39-5.27-12.39-14.44zm22.12 0c0-7.27-4.15-12.31-9.73-12.31s-9.73 5-9.73 12.31 4.16 12.2 9.73 12.2 9.73-4.89 9.73-12.2zM308.06 133.29c0-9.24 5.76-14.55 12.39-14.55s12.4 5.31 12.4 14.55-5.76 14.44-12.4 14.44-12.39-5.27-12.39-14.44zm22.12 0c0-7.27-4.15-12.31-9.73-12.31s-9.72 5-9.72 12.31 4.15 12.2 9.72 12.2 9.73-4.89 9.73-12.2zM346.32 105.72h2.52v30.48h.12l13.63-16.73h2.93l-9 10.93 10.5 16.68h-2.83l-9.16-14.79-6.19 7.27v7.52h-2.52z" />
          </g>
        </svg>
      </div>
    </div>
  );
}

SocialCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  category: PropTypes.string,
};
