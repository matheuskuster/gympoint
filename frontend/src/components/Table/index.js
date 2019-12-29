import React from 'react';
import PropTypes from 'prop-types';

import { StyledTable, StyledTd, StyledTh } from './styles';

export function Table({ small, children }) {
  return <StyledTable small={small}>{children}</StyledTable>;
}

export function Td({ position, children }) {
  return <StyledTd position={position}>{children}</StyledTd>;
}

export function Th({ position, children }) {
  return <StyledTh position={position}>{children}</StyledTh>;
}

Table.propTypes = {
  children: PropTypes.element.isRequired,
  small: PropTypes.bool,
};

Td.propTypes = {
  position: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Th.propTypes = {
  position: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Table.defaultProps = {
  small: false,
};

Th.defaultProps = {
  position: 'center',
  children: '',
};

Td.defaultProps = {
  position: 'center',
  children: '',
};
