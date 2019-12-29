import React from 'react';
import { MdSentimentDissatisfied, MdSentimentSatisfied } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function NotFound({ text, happy }) {
  return (
    <Container>
      {happy ? (
        <MdSentimentSatisfied size={120} color="#EE4D64" />
      ) : (
        <MdSentimentDissatisfied size={120} color="#EE4D64" />
      )}

      {text}
    </Container>
  );
}

NotFound.propTypes = {
  text: PropTypes.string.isRequired,
  happy: PropTypes.bool,
};

NotFound.defaultProps = {
  happy: false,
};
