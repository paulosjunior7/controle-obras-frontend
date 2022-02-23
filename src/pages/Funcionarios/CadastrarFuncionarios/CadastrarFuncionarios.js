import React, { useState, useEffect } from 'react';
import { Button, Paper, Grid, FormControl, Typography, } from '@material-ui/core';
import useStyles from './CadastrarFuncionarios.styles';
import { useForm } from "react-hook-form";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { CREATE_FUNCIONARIO, GET_FUNCIONARIOS, UPDATE_FUNCIONARIO } from '../../../services';
import InputText from '../../../components/InputText';
import { toast } from "react-toastify";
import Select from '../../../components/Select'
import { useMutation, useQuery } from '@apollo/client';

import { useHistory, useParams } from 'react-router-dom';

function CadastrarFuncionarios() {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const isEditing = Number(params.id) > 0;

  const { loading, error, data } = useQuery(GET_FUNCIONARIOS, {
    variables: {
      filter: { companyId: 1, id: Number(params.id) },
    }
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (isEditing) {
      reset({
        name: data?.employees?.findall?.items[0].name,
        cpf: data?.employees?.findall?.items[0].cpf,
        address: data?.employees?.findall?.items[0].address,
        cellPhone: data?.employees?.findall?.items[0].cellPhone,
        city: data?.employees?.findall?.items[0].city,
        complement: data?.employees?.findall?.items[0].complement,
        eMail: data?.employees?.findall?.items[0].eMail,
        neighbourhood: data?.employees?.findall?.items[0].neighbourhood,
        number: data?.employees?.findall?.items[0].number,
        state: data?.employees?.findall?.items[0].state,
        telephone: data?.employees?.findall?.items[0].telephone,
        zipCode: data?.employees?.findall?.items[0].zipCode,
      });
    }
  }, [loading, params]);


  const [createFuncionario] = useMutation(CREATE_FUNCIONARIO, {
    onCompleted: () => {
      toast.success("Colaborador cadastrado com sucesso!");
      history.push('/funcionarios');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const [updateFuncionario] = useMutation(UPDATE_FUNCIONARIO, {
    onCompleted: () => {
      toast.success("Colaborador alterado com sucesso!");
      history.push('/funcionarios');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const onSubmit = async (data) => {
    const newData = {
      variables: {
        id: Number(params.id),
        employee: {
          name: data.name,
          cpf: data.cpf,
          address: data.address,
          cellPhone: data.cellPhone,
          city: data.city,
          complement: data.complement,
          eMail: data.eMail,
          neighbourhood: data.neighbourhood,
          number: data.number,
          state: data.state,
          telephone: data.telephone,
          zipCode: data.zipCode,
          responsibilityId: 2,
          active: true
        }
      }
    };


    isEditing ? await updateFuncionario(newData) : await createFuncionario(newData);
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        <Link color="inherit" onClick={() => history.push('/funcionarios')}>
          Colaboradores
        </Link>
        <Link color="inherit" onClick={() => history.push('/funcionarios/cadastro')}>
          Cadastrar Colaboradores
        </Link>
      </Breadcrumbs>

      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Typography
            variant="h5"
            size={18}
            color="neutralPrimary"
            className={classes.title}
            weight="semibold"
          >
            Cadastrar Colaborador
          </Typography>
          <Grid
            container
            spacing={3}
            item
            xs={12}
            direction="row"
          >

            <Grid item xs={6} md={4}>
              <InputText
                control={control}
                label={"Nome"}
                name="name"
                error={errors?.name}
                required="Nome é Obrigatório"
                required="O Nome é obrigatório"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <Select />
            </Grid>
            <Grid item xs={12} md={2}>
              <InputText
                control={control}
                label="CPF"
                name="cpf"
                error={errors?.cpf}
                required="CPF é Obrigatório"
              />
            </Grid>
            <Grid item xs={2} md={2}>
              <InputText
                control={control}
                label="CEP"
                name="zipCode"
                error={errors?.zipCode}
                required="CEP é Obrigatório"
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            item
            xs={12}
            direction="row"
          >

            <Grid item xs={8} md={6}>
              <InputText
                control={control}
                label="Endereço"
                name="address"
                error={errors?.address}
                required="Endereço é Obrigatório"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <InputText
                control={control}
                label="Número"
                name="number"
                error={errors?.number}
                required="Número é Obrigatório"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <InputText
                control={control}
                label="Bairro"
                name="neighbourhood"
                error={errors?.neighbourhood}
                required="Bairro é Obrigatório"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <InputText
                control={control}
                label="Cidade"
                name="city"
                error={errors?.city}
                required="Cidade é Obrigatório"
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            item
            xs={12}
            direction="row"
          >
            <Grid item xs={12} md={1}>
              <InputText
                control={control}
                label="UF"
                name="state"
                error={errors?.state}
                required="Estado é Obrigatório"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputText
                control={control}
                label="Complemento"
                name="complement"
                error={errors?.complement}
                required="Complemento é Obrigatório"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <InputText
                control={control}
                label="Telefone"
                name="telephone"
                error={errors?.telephone}
                required="telefone é Obrigatório"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <InputText
                control={control}
                label="Celular"
                name="cellPhone"
                error={errors?.cellPhone}
                required="Celular é Obrigatório"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputText
                control={control}
                label="E-mail"
                name="eMail"
                error={errors?.eMail}
                required="E-mail é Obrigatório"
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            item
            xs={12}
            direction="row"
          >
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
                onClick={() => history.push('/contatos')}
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
          </Grid>
        </Grid>
      </Paper>
    </form>
  )
}

export default CadastrarFuncionarios;
