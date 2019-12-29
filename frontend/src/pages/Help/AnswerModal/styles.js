import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  form {
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 20px;
      line-height: 26px;
    }

    textarea {
      border-radius: 4px;
      border: 1px solid #ddd;
      resize: none;
      margin-bottom: 20px;
      padding: 13px;
      color: #999;
      font-family: 'Roboto';
      font-size: 16px;
    }

    button {
      height: 45px;
      background: #ee4d64;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      border: none;
      border-radius: 4px;

      transition: 0.2s all ease;

      &:hover {
        background: ${darken(0.06, '#ee4d64')};
      }
    }
  }
`;
