import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 12px;
      height: 24px;
      width: auto;
    }

    > a {
      font-weight: bold;
      font-size: 16px;
      color: #ee4d64;
      border-right: 1px solid #979797;
      margin-right: 30px;
      padding-right: 30px;
    }

    ul {
      display: flex;
      align-items: center;

      li {
        margin-right: 20px;

        a {
          color: #999999;
          font-weight: bold;
          font-size: 16px;

          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  strong {
    font-weight: bold;
    font-size: 14px;
    color: #666;
  }

  button {
    background: none;
    border: 0;
    color: #de3b3b;
    font-size: 14px;

    &:hover {
      color: ${darken(0.1, '#de3b3b')};
    }
  }
`;
