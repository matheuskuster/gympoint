import React, { useRef, useEffect } from 'react';

import { useField } from '@rocketseat/unform';
import makeAnimated from 'react-select/animated';

import { StyledAsyncSelect, customStyles } from './styles';

export default function ReactSelect({
  name,
  label,
  multiple,
  options,
  ...rest
}) {
  const ref = useRef();
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const animatedComponents = makeAnimated();

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;

    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;

    if (!multiple) {
      return options.find(option => option.id === defaultValue);
    }

    return options.filter(option => defaultValue.includes(option.id));
  }

  return (
    <>
      {label && (
        <label className="async_label" htmlFor={fieldName}>
          {label}
        </label>
      )}

      <StyledAsyncSelect
        name={fieldName}
        aria-label={fieldName}
        isMulti={multiple}
        styles={customStyles}
        defaultValue={getDefaultValue()}
        loadingMessage={() => 'Carregando...'}
        noOptionsMessage={() => 'Não encontrado'}
        components={animatedComponents}
        theme={theme => ({
          ...theme,
          borderRadius: 4,
          colors: {
            ...theme.colors,
            primary: '#ee4d64',
          },
        })}
        getOptionValue={option => option.id}
        ref={ref}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}
