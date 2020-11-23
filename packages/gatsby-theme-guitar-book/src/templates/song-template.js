import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { graphql, Link as GLink } from 'gatsby';
import styled from '@emotion/styled';
import { Tooltip } from '@apollo/space-kit/Tooltip';

import { VideoBox } from '../components/video-box';
import { Verse } from '../components/chords/verse';
import { AllChordsPreview } from '../components/chords/allChordsPreview';
import { getSlug } from '../utils/helpers';
import { colors } from '../utils/colors';
import TemplateBase from '../components/base/template-base';

const StyledHeader = styled(GLink)`
  font-size: 1.4rem;
  text-decoration: none;
  color: ${colors.primary};
  &:hover {
    opacity: ${colors.hoverOpacity};
    text-decoration: none;
  }
  &:active {
    color: ${colors.text3};
  }
`;

export default function SongTemplate({ location, data, pageContext }) {
  const { contentfulSong } = data;
  const { title, author, favourite, videoLink, lyrics } = contentfulSong;
  const [allChords, setAllChords] = useState([]);

  return (
    <TemplateBase
      data={data}
      location={location}
      title={title}
      description={author.name}
      isFavourite={!!favourite}
      pageContext={pageContext}
      contentDescription={
        <Tooltip content="Show author">
          <StyledHeader to={getSlug(author.name)}>{author.name}</StyledHeader>
        </Tooltip>
      }
      subheader={videoLink && <VideoBox videoUrl={videoLink} />}
    >
      <p style={{ whiteSpace: 'break-spaces' }}>
        <Verse text={lyrics.lyrics} setAllChords={setAllChords} />
      </p>
      {allChords.length && <AllChordsPreview allChords={allChords} />}
    </TemplateBase>
  );
}

SongTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const SongTemplateQuery = graphql`
  query SongTemplateQuery($id: String) {
    sitePage(fields: { id: { eq: $id } }) {
      fields {
        image
      }
    }
    contentfulSong(id: { eq: $id }) {
      lyrics {
        lyrics
      }
      favourite
      title
      videoLink
      author {
        name
      }
    }
    contentfulGlobalSettings {
      siteName
      description
    }
  }
`;
