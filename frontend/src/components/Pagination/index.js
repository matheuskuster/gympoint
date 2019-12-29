import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container, NumberButton } from './styles';

export default function Pagination({ page, numberOfPages, setPage }) {
  return (
    <Container>
      <div>
        <button
          disabled={page <= 1}
          type="button"
          onClick={() => setPage(page - 1)}
        >
          <MdChevronLeft size={24} color="#fff" />
        </button>
        <ul>
          <li>
            <NumberButton
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              {page <= 1 ? '' : page - 1}
            </NumberButton>
          </li>
          <li>
            <NumberButton active>{page}</NumberButton>
          </li>
          <li>
            <NumberButton
              disabled={page + 1 > numberOfPages && page !== 1}
              onClick={() => setPage(page + 1)}
            >
              {page + 1 <= numberOfPages || page === 1 ? page + 1 : ''}
            </NumberButton>
          </li>
        </ul>
        <button
          disabled={page + 1 > numberOfPages && page !== 1}
          type="button"
          onClick={() =>
            (page + 1 <= numberOfPages || page === 1) && setPage(page + 1)
          }
        >
          <MdChevronRight size={24} color="#fff" />
        </button>
      </div>
    </Container>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
