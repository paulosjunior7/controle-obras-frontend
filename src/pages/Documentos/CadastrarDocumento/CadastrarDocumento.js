import React, { useEffect, useState } from 'react';
import { Button, Paper, Grid, Breadcrumbs, Link, Typography } from '@material-ui/core';
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import { CREATE_DOCUMENTACAO, UPDATE_DOCUMENT, GET_DOCUMENTOS } from '../../../services';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from "react-toastify";
import InputText from '../../../components/InputText';
import useStyles from './CadastrarDocumento.styles';

const CadastrarDocumentacao = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const isEditing = Number(params.id) > 0;

  const { loading, error, data } = useQuery(GET_DOCUMENTOS, {
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
        descricao: data?.documentations?.findall?.items[0].description,
      });
    }
  }, [loading, params])

  const [createDocumentacao] = useMutation(CREATE_DOCUMENTACAO, {
    onCompleted: () => {
      toast.success("Documento cadastrado com sucesso!");
      history.push('/documentos');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const [updateDocumentacao] = useMutation(UPDATE_DOCUMENT, {
    onCompleted: () => {
      toast.success("Documento alterado com sucesso!");
      history.push('/documentos');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const onSubmit = async (data) => {
    const newData = {
      variables: {
        id: Number(params.id),
        documentation: {
          description: data.descricao,
          active: true
        }
      }
    };

    isEditing ? await updateDocumentacao(newData) : await createDocumentacao(newData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        <Link color="inherit" onClick={() => history.push('/documentos')}>
          Documentos
        </Link>
        <Link color="inherit" onClick={() => history.push('/documentos/cadastro')}>
          Cadastrar Documentos
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
            {isEditing ? 'Editar Documento' : 'Cadastrar Documento'}
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
                onClick={() => history.push('/documentos')}
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

export default CadastrarDocumentacao;
