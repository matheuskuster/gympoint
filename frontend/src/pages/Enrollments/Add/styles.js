import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 66px auto;
  padding: 0 30px;
`;

export const Content = styled.div`
  width: 100%;
  background: #fff;
  padding: 30px 30px 10px 30px;
  border-radius: 4px;

  input {
    width: 198px;
  }

  input:read-only {
    background: #f5f5f5;
  }

  div.inputBox {
    label.async_label {
      margin-top: -10px;
    }

    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    > div {
      display: flex;
      flex-direction: column;
    }

    div.dateGroup {
      margin: 0;
      padding: 0;
      width: 198px;
      margin-left: -25px;
      margin-top: -18px;

      input {
        margin-left: -20px;
        width: 144px;
        border-radius: 4px 0 0 4px;
        font-size: 14px;
      }

      svg {
        position: relative;
        right: -164px;
        top: 18px;
        border: 1px solid #ddd;
        border-left: 0px;
        box-sizing: content-box;
        padding: 11px;
        padding-top: 12px;
        border-radius: 4px;
      }

      svg[disabled] {
        background: #f5f5f5;
      }
    }
  }
`;
