import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 66px auto;
  padding: 0 30px;
`;

export const Content = styled.div`
  width: 100%;
  background: #fff;
  padding: 30px 30px 10px 30px;
  border-radius: 4px;

  input {
    margin-bottom: 20px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: column;
    }
  }
`;
