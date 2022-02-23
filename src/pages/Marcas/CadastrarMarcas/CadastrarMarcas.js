import React, { useEffect, useState } from 'react';
import { Button, Paper, Grid, Breadcrumbs, Typography, Link } from '@material-ui/core';
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import { CREATE_DESPESA, UPDATE_DESPESA, GET_MARCAS, CREATE_MARCA, UPDATE_MARCA } from '../../../services';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from "react-toastify";
import InputText from '../../../components/InputText';
import useStyles from './CadastrarMarcas.styles';

const CadastrarMarca = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const isEditing = Number(params.id) > 0;

  const { loading, error, data } = useQuery(GET_MARCAS, {
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
        descricao: data?.brands?.findall?.items[0].description,
      });
    }
  }, [loading, params])

  const [createMarca] = useMutation(CREATE_MARCA, {
    onCompleted: () => {
      toast.success("Marca cadastrada com sucesso!");
      history.push('/marcas');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const [updateMarca] = useMutation(UPDATE_MARCA, {
    onCompleted: () => {
      toast.success("Marca alterada com sucesso!");
      history.push('/marcas');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const onSubmit = async (data) => {
    const newData = {
      variables: {
        id: Number(params.id),
        brand: {
          description: data.descricao,
          active: true
        }
      }
    };

    isEditing ? await updateMarca(newData) : await createMarca(newData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        <Link color="inherit" onClick={() => history.push('/marcas')}>
          Marcas
        </Link>
        <Link color="inherit" onClick={() => history.push('/marcas/cadastro')}>
          Cadastrar Marcas
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
            {isEditing ? 'Editar Marca' : 'Cadastrar Marca'}
          </Typography>
          <Grid
            container
            spacing={3}
            item
            xs={12}
            direction="row"
            className={classes.borderBottom}
          >
            <Grid item xs={12} md={12}>
              <InputText
                control={control}
                label="Descrição"
                name="descricao"
                error={errors?.descricao}
                required="Descrição é Obrigatória"
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
                onClick={() => history.push('/marcas')}
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

export default CadastrarMarca;
