import React, { useEffect, useState } from 'react';
import { Button, Paper, Grid, Breadcrumbs, Typography, Link } from '@material-ui/core';
import useStyles from './CadastrarProduto.styles';
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import { CREATE_PRODUCT, UPDATE_PRODUCT, GET_PRODUCTS } from '../../../services';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from "react-toastify";
import InputText from '../../../components/InputText';

const CadastrarProduto = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const isEditing = Number(params.id) > 0;

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: { companyId: 1, id: Number(params.id) },
    }
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (isEditing) {
      reset({
        descricao: data?.products?.findall?.items[0].description,
        detalhe: data?.products?.findall?.items[0].detail
      });
    }
  }, [loading, params])

  console.log('data', data)

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        <Link color="inherit" onClick={() => history.push('/produtos')}>
          Produtos
        </Link>
        <Link color="inherit" onClick={() => history.push('/produtos/cadastro')}>
          Cadastrar Produtos
        </Link>
      </Breadcrumbs>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Typography
            variant="h5"
            size={17}
            color="neutralPrimary"
            className={classes.title}
            weight="semibold"
          >
            {isEditing ? 'Editar Produto' : 'Cadastrar Produto'}
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
              <InputText
                control={control}
                label="Descrição"
                name="descricao"
                error={errors?.descricao}
                required="Descrição é Obrigatória"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputText
                control={control}
                label="Detalhe"
                name="detalhe"
                error={errors?.detalhe}
                required="Detalhe é Obrigatória"
              />
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
  )
}

export default CadastrarProduto;
