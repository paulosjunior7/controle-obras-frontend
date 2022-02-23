import React, { useEffect, useState } from 'react';
import { Button, Paper, Grid, Breadcrumbs, Link, Typography } from '@material-ui/core';
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import { GET_EMPRESAS, UPDATE_EMPRESA, CREATE_EMPRESA } from '../../../services';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from "react-toastify";
import InputText from '../../../components/InputText';
import useStyles from './CadastrarEmpresa.styles';

const CadastrarEmpresa = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const isEditing = Number(params.id) > 0;

  const { loading, error, data } = useQuery(GET_EMPRESAS, {
    variables: {
      filter: { active: true, id: Number(params.id) },
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
        fantasyName: data?.companies?.findall?.items[0].fantasyName,
        corporateName: data?.companies?.findall?.items[0].corporateName,
        neighbourhood: data?.companies?.findall?.items[0].neighbourhood,
        number: data?.companies?.findall?.items[0].number,
        state: data?.companies?.findall?.items[0].state,
        telephone: data?.companies?.findall?.items[0].telephone,
        zipCode: data?.companies?.findall?.items[0].zipCode,
        address: data?.companies?.findall?.items[0].address,
        active: data?.companies?.findall?.items[0].active,
        cellPhone: data?.companies?.findall?.items[0].cellPhone,
        city: data?.companies?.findall?.items[0].city,
        complement: data?.companies?.findall?.items[0].complement,
        cnpj: data?.companies?.findall?.items[0].cnpj,
        eMail: data?.companies?.findall?.items[0].eMail,
      });
    }
  }, [loading, params])

  const [createEmpresa] = useMutation(CREATE_EMPRESA, {
    onCompleted: () => {
      toast.success("Empresa cadastrada com sucesso!");
      history.push('/empresas');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const [updateEmpresa] = useMutation(UPDATE_EMPRESA, {
    onCompleted: () => {
      toast.success("Empresa alterada com sucesso!");
      history.push('/empresas');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const onSubmit = async (data) => {
    console.log("data", data)
    const newData = {
      variables: {
        id: Number(params.id),
        company: {
          fantasyName: data.fantasyName,
          corporateName: data.corporateName,
          neighbourhood: data.neighbourhood,
          number: data.number,
          state: data.state,
          telephone: data.telephone,
          zipCode: data.zipCode,
          address: data.address,
          active: data.active,
          cellPhone: data.cellPhone,
          city: data.city,
          complement: data.complement,
          cnpj: data.cnpj,
          eMail: data.eMail,
          active: true
        }
      }
    };

    isEditing ? await updateEmpresa(newData) : await createEmpresa(newData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        <Link color="inherit" onClick={() => history.push('/empresas')}>
          Empresas
        </Link>
        <Link color="inherit" onClick={() => history.push('/empresas/cadastro')}>
          Cadastrar Empresas
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
            {isEditing ? 'Editar Empresa' : 'Cadastrar Empresa'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputText
                control={control}
                label="Nome Fantasia"
                name="fantasyName"
                error={errors?.fantasyName}
                required="Nome Fantasia é Obrigatória"
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                control={control}
                label="Razão Social"
                name="corporateName"
                error={errors?.corporateName}
                required="Razão Social é Obrigatória"
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                control={control}
                label="Bairro"
                name="neighbourhood"
                error={errors?.neighbourhood}
                required="Bairro é Obrigatório"
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                control={control}
                label="Número"
                name="number"
                error={errors?.number}
                required="Número é Obrigatório"
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                control={control}
                label="UF"
                name="state"
                error={errors?.state}
                required="UF é Obrigatória"
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                control={control}
                label="Telefone"
                name="telephone"
                error={errors?.telephone}
                required="Telefone é Obrigatória"
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                control={control}
                label="CEP"
                name="zipCode"
                error={errors?.zipCode}
                required="CEP é Obrigatório"
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                control={control}
                label="Endereço"
                name="address"
                error={errors?.address}
                required="Endereço é Obrigatório"
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                control={control}
                label="Celular"
                name="cellPhone"
                error={errors?.cellPhone}
                required="Celular é Obrigatório"
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                control={control}
                label="Cidade"
                name="city"
                error={errors?.city}
                required="Cidade é Obrigatória"
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                control={control}
                label="Complemento"
                name="complement"
                error={errors?.complement}
                required="Complemento é Obrigatório"
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                control={control}
                label="CNPJ"
                name="cnpj"
                error={errors?.cnpj}
                required="CNPJ é Obrigatório"
              />
            </Grid>
            <Grid item xs={6}>
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
            justify="flex-end"
            className={classes.buttons}
          >
            <Grid item>
              <Button
                data-testid="btn-cancelar-edicao"
                variant="subtle"
                onClick={() => history.push('/empresas')}
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

export default CadastrarEmpresa;






