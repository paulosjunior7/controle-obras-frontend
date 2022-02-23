import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from '@bayon/i18n';
import { Grid, Select } from '@bayon/commons';

import useQuerySelect from './hooks/useQuerySelect';
import useFormInjection from '../hooks/useFormInjection';
import { getErrorMessage } from '../utils/getErrorMessage';
import { removeProps } from '../utils/removeProps';
import { SELECT_PROPS_NOT_ALLOWED } from './constants/selectProps';

const QuerySelectField = ({
  name,
  label,
  query,
  onQuery,
  extractResult,
  defaultValue,
  autoSelect,
  disabled,
  clearOnDisabled,
  afterChange,
  grid,
  rules,
  onLoadMore,
  queryConfig,
  ...rest
}) => {
  const { t } = useTranslation('smarts');

  const { errors, control, setValue, clearErrors } = useFormContext();

  const formInjection = useFormInjection();
  const injectedDisabled = formInjection(disabled);

  const { items, loadMore, onFilter, loading, loadingMore } = useQuerySelect({
    query,
    onQuery,
    extractResult,
    onLoadMore,
    disabled: injectedDisabled,
    config: queryConfig,
  });

  useEffect(() => {
    if (injectedDisabled && name && clearOnDisabled) {
      setValue(name, null);
      clearErrors(name);
    }
  }, [clearOnDisabled, injectedDisabled, name]);

  useEffect(() => {
    if (autoSelect && items.length === 1) {
      setValue(name, items[0]);
    }
  }, [items, name, autoSelect]);

  const handleChange = (newValue, onChange) => {
    const isEmptyValue = Array.isArray(newValue) && newValue.length === 0;
    const currentValue = !isEmptyValue ? newValue : null;
    onChange(currentValue);
    formInjection(afterChange, { currentValue });
  };

  const error = getErrorMessage(errors, name);

  const propsToSelect = removeProps(rest, SELECT_PROPS_NOT_ALLOWED);

  return (
    <Grid item {...grid}>
      <Controller
        control={control}
        name={name}
        rules={formInjection(rules)}
        defaultValue={formInjection(defaultValue)}
        render={({ onChange, value }) => (
          <Select
            id={name}
            name={name}
            label={formInjection(label)}
            onChange={(newValue) => handleChange(newValue, onChange)}
            value={value}
            isLoading={loading}
            options={items}
            placeholder={t('SELECIONE_OPCAO')}
            required={!!formInjection(rules)?.required}
            disabled={injectedDisabled}
            isError={!!error}
            errorMessage={error?.message}
            onInputChange={onFilter}
            noOptionsMessage={() => 'SEM OPÇÕES'}
            loadingMessage={() => 'CARREGANDO'}
            loadingMoreOptions={loadingMore}
            loadingMoreOptionsLabel={'CARREGANDO MAIS'}
            onEndReached={loadMore}
            {...propsToSelect}
          />
        )}
      />
    </Grid>
  );
};

QuerySelectField.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Função chamada após uma mudança no valor do field
   */
  afterChange: PropTypes.func,
  /**
   * Seleciona por padrão a primeira opção do select
   */
  autoSelect: PropTypes.bool,
  /**
   * Controla se o field será limpado ao ser desabilitado, por padrão ja vem habilitado
   *
   * @default true
   */
  clearOnDisabled: PropTypes.bool,
  /**
   * Valor padrão do field
   *
   * obs.: Em alguns casos valores providos por requisiões devem ser controlados pelo setValue
   */
  defaultValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Controla se o field está desabilitado
   */
  disabled: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  /**
   * Extrai as opções do select da query
   */
  extractResult: PropTypes.func.isRequired,
  /**
   * Props do componente <Grid />
   */
  grid: PropTypes.object,
  /**
   * Label do field
   */
  label: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * Nome do field
   */
  name: PropTypes.string.isRequired,
  /**
   * Opções a serem passadas para o fetchMore
   */
  onLoadMore: PropTypes.func,
  /**
   * Função para passar filtros para a query
   */
  onQuery: PropTypes.func,
  /**
   * Query que select buscara as opções
   */
  query: PropTypes.shape({
    definitions: PropTypes.arrayOf(PropTypes.object).isRequired,
    kind: PropTypes.oneOf(['Document']).isRequired,
    loc: PropTypes.object,
  }).isRequired,
  /**
   * Configurações a serem passadas para a lazyQuery
   */
  queryConfig: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Regras de validação no mesmo formato do register
   */
  rules: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

QuerySelectField.defaultProps = {
  getOptionValue: (o) => o?.value,
  getOptionLabel: (o) => o?.label ?? '',
  label: '',
  isMulti: false,
  disabled: false,
  autoSelect: false,
  placeholder: '',
  defaultValue: null,
  afterChange: () => { },
  grid: {
    xs: 6,
  },

  fullWidth: true,
  isClearable: true,
  clearOnDisabled: true,
  rules: {},
};

export default React.memo(QuerySelectField);
