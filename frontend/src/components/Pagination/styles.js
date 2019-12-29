import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  height: 45px;
  margin-top: 50px;
  display: flex;
  justify-content: center;

  > div {
    background: #fff;
    width: 220px;
    height: 100%;
    border-radius: 4px;

    display: flex;
    justify-content: space-between;

    ul {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
    }

    > button {
      background: #ee4d64;
      border: none;
      padding: 0 4px;
      height: 32px;
      align-self: center;
      margin: 0 8px;
      border-radius: 4px;
      transition: 0.2s ease all;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: ${darken(0.1, '#ee4d64')};
      }
    }
  }
`;

export const NumberButton = styled.button.attrs({
  type: 'button',
})`
  color: ${props => (props.active ? '#fff' : '#666')};
  padding: 8px 11px;
  background: ${props => (props.active ? '#ee4d64' : 'none')};
  border: none;
  border-radius: 4px;
  transition: 0.2s ease all;

  &:hover {
    background: ${props => !props.disabled && lighten(0.1, '#ee4d64')};
    cursor: ${props => props.disabled && 'default'};
    color: #fff;
  }
`;
