import React, { useEffect, useState } from 'react';
import { Button, Paper, Grid, Breadcrumbs, Link, Typography } from '@material-ui/core';
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import { CREATE_DESPESA, UPDATE_DESPESA, GET_DESPESAS } from '../../../services';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from "react-toastify";
import InputText from '../../../components/InputText';
import useStyles from './CadastrarDespesas.styles';

const CadastrarDespesa = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const isEditing = Number(params.id) > 0;

  const { loading, error, data } = useQuery(GET_DESPESAS, {
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
        descricao: data?.expenses?.findall?.items[0].description,
      });
    }
  }, [loading, params])

  const [createDespesa] = useMutation(CREATE_DESPESA, {
    onCompleted: () => {
      toast.success("Despesa cadastrada com sucesso!");
      history.push('/despesas');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const [updateDespesa] = useMutation(UPDATE_DESPESA, {
    onCompleted: () => {
      toast.success("Despesa alterada com sucesso!");
      history.push('/despesas');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const onSubmit = async (data) => {
    const newData = {
      variables: {
        id: Number(params.id),
        expense: {
          description: data.descricao,
          active: true
        }
      }
    };

    isEditing ? await updateDespesa(newData) : await createDespesa(newData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        <Link color="inherit" onClick={() => history.push('/despesas')}>
          Despesas
        </Link>
        <Link color="inherit" onClick={() => history.push('/despesas/cadastro')}>
          Cadastrar Despesa
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
            {isEditing ? 'Editar Despesa' : 'Cadastrar Despesa'}
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

export default CadastrarDespesa;
