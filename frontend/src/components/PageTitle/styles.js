import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 30px;

  > div {
    display: flex;
    align-items: baseline;

    span {
      color: #666;
      margin-left: 10px;
    }

    h1 {
      font-size: 24px;
      font-weight: bold;
    }
  }

  div.buttonGroup {
    max-width: 395px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
