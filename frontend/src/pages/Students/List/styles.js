import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 66px auto;
  padding: 0 30px;

  div.notFound {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 30px;
    color: #ee4d64;
    font-weight: bold;

    svg {
      margin-bottom: 20px;
      margin-top: 60px;
    }
  }

  label {
    display: flex;
    align-items: center;

    svg {
      position: relative;
      right: -30px;
      z-index: 1;
    }

    input {
      height: 36px;
      min-width: 200px;
      padding: 0 5px 0 40px;
      border-radius: 4px;
      border: 1px solid #ddd;
      color: #999;
      font-size: 14px;

      &::placeholder {
        color: #999;
      }
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  background: #fff;
  padding: 30px 30px 10px 30px;
  border-radius: 4px;
`;
