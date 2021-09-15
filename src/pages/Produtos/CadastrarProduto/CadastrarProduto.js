import React, { useEffect, useState } from 'react';
import { Button, Paper, Grid, TextField, Typography } from '@material-ui/core';
import useStyles from './CadastrarProduto.styles';
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import { CREATE_PRODUCT, UPDATE_PRODUCT, GET_PRODUCTS } from '../../../services';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from "react-toastify";
import Loader from '../../../components/Loader';

const CadastrarProduto = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const isEditing = Number(params.id) > 0;

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: { companyId: 11, id: Number(params.id) },
    }
  });

  const methods = useForm();

  useEffect(() => {

    if (Number(params.id) > 0) {
      methods.reset({
        descricao: data?.products?.findall?.items[0].description,
        detalhe: data?.products?.findall?.items[0].detail
      })
    }
  }, [data, params])


  const [createProdutos] = useMutation(CREATE_PRODUCT, {
    onCompleted: () => {
      toast.success("Produto cadastrado com sucesso!");
      history.push('/produtos');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const [updateProdutos] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      toast.success("Produto alterado com sucesso!");
      history.push('/produtos');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const onSubmit = async (data) => {
    const newData = {
      variables: {
        id: Number(params.id),
        product: {
          description: data.descricao,
          detail: data.detalhe,
          active: true
        }
      }
    };

    isEditing ? await updateProdutos(newData) : await createProdutos(newData);
  }

  return (
    <FormProvider {...methods} >
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Typography
              variant="h5"
              size={17}
              color="neutralPrimary"
              className={classes.title}
              weight="semibold"
            >
              Cadastrar Produto
            </Typography>
            <Grid
              container
              spacing={3}
              item
              xs={12}
              direction="row"
              className={classes.borderBottom}
            >
              <Grid item xs={12} md={6}>
                <Controller
                  name="descricao"
                  control={methods.control}
                  render={({ field, name }) => (
                    <TextField
                      {...field}
                      name="descricao"
                      label="Descrição"
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={methods.errors.descricao}
                      helperText={methods.errors?.descricao?.message}
                    // {...methods.register("descricao", { required: "Descrição é obrigatório" })}
                    />
                  )} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  control={methods.control}
                  name="detalhe"
                  render={({ field, name }) => (
                    <TextField
                      {...field}
                      name={name}
                      label="Detalhe"
                      variant="outlined"
                      size="small"
                      fullWidth
                    // {...methods.register("detalhe")}
                    />
                  )} />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={3}
              item
              xs={12}
              direction="row"
              justify="flex-end"
              className={classes.buttons}
            >
              <Grid item>
                <Button
                  data-testid="btn-cancelar-edicao"
                  variant="subtle"
                  onClick={() => history.push('/produtos')}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                  Cadastrar
                </Button>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </FormProvider  >
  )
}

export default CadastrarProduto;
