import styled from 'styled-components';
import { darken } from 'polished';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;

  tbody {
    tr {
      & + tr {
        border-top: 1px solid #eee;
      }
      td:first-child {
        padding-right: ${props => (props.small ? '200' : '50')}px;
      }

      td:last-child {
        padding-left: 0px;
        display: flex;
        justify-content: flex-end;
        flex: 1;
      }
    }
  }
`;

export const StyledTd = styled.td`
  text-align: ${props => props.position};
  padding: 20px 0;
  color: #666;

  a {
    color: #4d85ee;

    &:hover {
      color: ${darken(0.1, '#4d85ee')};
    }
  }

  button {
    background: none;
    border: 0;
    color: #de3b3b;
    padding: 0;
    font-size: 16px;
    margin-left: 20px;

    &:hover {
      color: ${darken(0.1, '#de3b3b')};
    }
  }
`;

export const StyledTh = styled.th`
  text-align: ${props => props.position};
`;
