import AsyncSelect from 'react-select/async';
import styled from 'styled-components';

export const StyledAsyncSelect = styled(AsyncSelect)`
  margin: 0;
  padding: 0;

  width: ${props => (props.small ? '198px' : '100%')};
`;

export const customStyles = {
  option: (provided, state) => {
    let backgroundColor = '#fff';
    let color = '#666';

    if (state.isFocused) backgroundColor = '#f4a7b2';
    if (state.isSelected) backgroundColor = '#ccc';
    if (state.isSelected) color = '#fff';
    if (state.isFocused && !state.isSelected) color = '#fff';

    return {
      ...provided,
      background: backgroundColor,
      color,
      padding: 20,
      cursor: state.isSelected ? 'not-allowed' : 'default',
      zIndex: 99,
    };
  },
  placeholder: (provided, state) => ({
    ...provided,
    color: '#999',
    height: !state.isFocused ? '12px' : '4px',
    paddingLeft: '4px',
  }),
  singleValue: provided => ({
    ...provided,
    color: '#999',
    minHeight: '1px',
    height: '24px',
    paddingTop: '10px',
  }),
  container: provided => ({
    ...provided,
    display: 'inline-block',
    minHeight: '1px',
    textAlign: 'left',
    border: 'none',
    margin: '0',
  }),
  control: provided => ({
    ...provided,
    minHeight: '1px',
    height: '45px',
    paddingLeft: '2px',
    margin: '0',
    padding: '0',
  }),
  input: provided => ({
    ...provided,
    minHeight: '1px',
    height: '40px',
    color: '#999',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    minHeight: '1px',
    paddingTop: '0',
    paddingBottom: '0',
    margin: '0',
  }),
  indicatorSeparator: provided => ({
    ...provided,
    border: 'none',
  }),
  clearIndicator: provided => ({
    ...provided,
    minHeight: '0',
    margin: '0',
  }),
  valueContainer: provided => ({
    ...provided,
    height: '40px',
    paddingTop: '0',
  }),
  loadingIndicator: provided => ({
    ...provided,
    minHeight: '1px',
    height: '21px',
    marginTop: '2px',
  }),
};
