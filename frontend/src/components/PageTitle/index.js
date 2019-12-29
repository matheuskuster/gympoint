import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function PageTitle({
  title,
  resultNumber,
  contentNumber,
  children,
}) {
  return (
    <Container>
      <div>
        <h1>{title}</h1>
        <span>
          {resultNumber !== 0 &&
            `${contentNumber} de ${resultNumber} resultados`}
        </span>
      </div>

      <div className="buttonGroup">{children}</div>
    </Container>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  resultNumber: PropTypes.number,
  contentNumber: PropTypes.number,
};

PageTitle.defaultProps = {
  resultNumber: 0,
  contentNumber: 0,
};
