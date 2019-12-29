import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 700px;
  margin: 60px auto;
  padding: 0 30px;
`;

export const Content = styled.div`
  width: 100%;
  background: #fff;
  padding: 30px 30px 10px 30px;
  border-radius: 4px;

  label {
    color: #000;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  ul {
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      padding: 16px 0 16px 0;

      &:last-child {
        border: 0;
      }

      p {
        font-size: 16px;
        color: #666;
      }

      button {
        background: none;
        border: none;
        font-size: 15px;
        color: #4d85ee;
        transition: 0.3s ease all;

        &:hover {
          color: ${darken(0.1, '#4d85ee')};
          transition: 0.2s ease all;
        }
      }
    }
  }
`;
