import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { useQuery, useMutation } from '@apollo/client';
import { GET_CARGOS, UPDATE_CARGO } from '../../services';



// const fetchArtists = async (input, cb) => {
//   if (input && input.trim().length < 4) {
//     return [];
//   }

//   const { loading, error, data } = useQuery(GET_CARGOS, {
//     variables: {
//       filter: { companyId: 1, id: Number(params.id) },
//     }
//   });  

//   if (data) {
//     return data?.responsibilities?.findall?.items.map(
//       (a) => ({
//         label: a.description,
//         value: a.description
//       })
//     );
//   }

//   return [];
// };

const Select = () => {
  const [cargo, setCargo] = useState([]);

  const { loading, error, data, fetchMore } = useQuery(GET_CARGOS, {
    variables: {
      filter: { companyId: 1 },
    }
  });

  useEffect(() => {
    const resp = data?.responsibilities?.findall?.items.map(
      (a) => ({
        label: a.description,
        value: a.id
      }));
    console.log("data", resp)

    setCargo(resp);
  }, [data])

  console.log('cargo', cargo)

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
            noOptionsMessage={() => t('SEM_OPCOES')}
            loadingMessage={() => t('CARREGANDO')}
            loadingMoreOptions={loadingMore}
            loadingMoreOptionsLabel={t('CARREGANDO_MAIS')}
            onEndReached={loadMore}
            {...propsToSelect}
          />
        )}
      />
    </Grid>

  );
};

export default Select;
