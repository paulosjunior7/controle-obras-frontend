import React, { useEffect, useState } from 'react';
import { Button, Paper, Grid, Breadcrumbs, Link, Typography } from '@material-ui/core';
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import { CREATE_CARGO, UPDATE_CARGO, GET_CARGOS } from '../../../services';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from "react-toastify";
import InputText from '../../../components/InputText';
import useStyles from './CadastrarCargos.styles';

const CadastrarCargos = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const isEditing = Number(params.id) > 0;

  const { loading, error, data } = useQuery(GET_CARGOS, {
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
        descricao: data?.responsibilities?.findall?.items[0].description,
      });
    }
  }, [loading, params])

  const [createCargo] = useMutation(CREATE_CARGO, {
    onCompleted: () => {
      toast.success("Cargo cadastrado com sucesso!");
      history.push('/cargos');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const [updateCargo] = useMutation(UPDATE_CARGO, {
    onCompleted: () => {
      toast.success("Cargo alterado com sucesso!");
      history.push('/cargos');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const onSubmit = async (data) => {
    const newData = {
      variables: {
        id: Number(params.id),
        responsibility: {
          description: data.descricao,
          active: true
        }
      }
    };

    isEditing ? await updateCargo(newData) : await createCargo(newData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        <Link color="inherit" onClick={() => history.push('/cargos')}>
          Cargos
        </Link>
        <Link color="inherit" onClick={() => history.push('/cargos/cadastro')}>
          Cadastrar Cargo
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
            {isEditing ? 'Editar Cargo' : 'Cadastrar Cargo'}
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
                onClick={() => history.push('/despesas')}
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

export default CadastrarCargos;
