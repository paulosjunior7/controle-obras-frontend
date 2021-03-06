import React, { useState, useEffect } from 'react';
import { Button, Paper, Grid, FormControl, Typography, } from '@material-ui/core';
import useStyles from './CadastrarContatos.styles';
import { useForm } from "react-hook-form";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { GET_CONTATOS, CREATE_CONTATO, UPDATE_CONTATO } from '../../../services';
import InputText from '../../../components/InputText';
import { toast } from "react-toastify";

import { useMutation, useQuery } from '@apollo/client';

import { useHistory, useParams } from 'react-router-dom';

function CadastrarContatos() {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const isEditing = Number(params.id) > 0;
  const [tipoContato, setTipoContato] = useState('fisica');
  const isFisica = tipoContato === 'fisica';

  const { loading, error, data } = useQuery(GET_CONTATOS, {
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
        descricao: data?.peoples?.findall?.items[0].description,
        neighbourhood: data?.peoples?.findall?.items[0].neighbourhood,
        fantasyName: data?.peoples?.findall?.items[0].fantasyName,
        number: data?.peoples?.findall?.items[0].number,
        state: data?.peoples?.findall?.items[0].state,
        telephone: data?.peoples?.findall?.items[0].telephone,
        zipCode: data?.peoples?.findall?.items[0].zipCode,
        active: data?.peoples?.findall?.items[0].active,
        address: data?.peoples?.findall?.items[0].address,
        cellPhone: data?.peoples?.findall?.items[0].cellPhone,
        city: data?.peoples?.findall?.items[0].city,
        cnpj: data?.peoples?.findall?.items[0].cnpj,
        cpf: data?.peoples?.findall?.items[0].cpf,
        complement: data?.peoples?.findall?.items[0].complement,
        corporateName: data?.peoples?.findall?.items[0].corporateName,
        creationDate: data?.peoples?.findall?.items[0].creationDate,
        eMail: data?.peoples?.findall?.items[0].eMail,
        typePeople: data?.peoples?.findall?.items[0].typePeople,
      });
    }
  }, [loading, params, isFisica]);


  const [createContato] = useMutation(CREATE_CONTATO, {
    onCompleted: () => {
      toast.success("Contato cadastrado com sucesso!");
      history.push('/contatos');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })

  const [updateContato] = useMutation(UPDATE_CONTATO, {
    onCompleted: () => {
      toast.success("Contato alterado com sucesso!");
      history.push('/contatos');
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  })


  const onSubmit = async (data) => {
    const newData = {
      variables: {
        id: Number(params.id),
        people: {
          neighbourhood: data.neighbourhood,
          number: data.number,
          state: data.state,
          telephone: data.telephone,
          zipCode: data.zipCode,
          address: data.address,
          cellPhone: data.cellPhone,
          city: data.city,
          cnpj: data.cnpj ?? "",
          cpf: data.cpf ?? "",
          complement: data.complement,
          corporateName: data.corporateName,
          eMail: data.eMail,
          fantasyName: data.fantasyName,
          typePeople: tipoContato,
          active: true
        }
      }
    };


    isEditing ? await updateContato(newData) : await createContato(newData);
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        <Link color="inherit" onClick={() => history.push('/contatos')}>
          Contatos
        </Link>
        <Link color="inherit" onClick={() => history.push('/contatos/cadastro')}>
          Cadastrar Contatos
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
            Cadastrar Contato
          </Typography>
          <Grid
            container
            spacing={3}
            item
            xs={12}
            direction="row"
          >
            <Grid item xs={12} md={12}>
              <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="fisica" onChange={(event) => setTipoContato(event.target.value)}>
                  <FormControlLabel value="fisica" labelPlacement="end" checked={tipoContato === 'fisica'} control={<Radio />} label="F??sica" />
                  <FormControlLabel value="juridica" labelPlacement="end" checked={tipoContato === 'juridica'} control={<Radio />} label="Jur??dica" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
              <InputText
                control={control}
                label={isFisica ? "Nome" : "Raz??o social"}
                name="corporateName"
                error={errors?.corporateName}
                required={`${isFisica ? 'Nome' : 'Raz??o social'} ?? Obrigat??rio`}
              />
            </Grid>
            {!isFisica && (
              <Grid item xs={4} md={4}>
                <InputText
                  control={control}
                  label="Nome Fantasia"
                  name="fantasyName"
                  error={errors?.fantasyName}
                  required={'Nome Fantasia ?? Obrigat??rio'}
                />
              </Grid>)}
            <Grid item xs={12} md={2}>
              {
                isFisica ? (
                  <InputText
                    control={control}
                    label="CPF"
                    name="cpf"
                    error={errors?.cpf}
                    required="CPF ?? Obrigat??rio"
                  />
                ) :
                  (
                    <InputText
                      control={control}
                      label="CNPJ"
                      name="cnpj"
                      error={errors?.cnpj}
                      required="CNPJ ?? Obrigat??rio"
                    />
                  )
              }
            </Grid>
            <Grid item xs={12} md={2}>
              <InputText
                control={control}
                label="CEP"
                name="zipCode"
                error={errors?.zipCode}
                required="CEP ?? Obrigat??rio"
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
                label="Endere??o"
                name="address"
                error={errors?.address}
                required="Endere??o ?? Obrigat??rio"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <InputText
                control={control}
                label="N??mero"
                name="number"
                error={errors?.number}
                required="N??mero ?? Obrigat??rio"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <InputText
                control={control}
                label="Bairro"
                name="neighbourhood"
                error={errors?.neighbourhood}
                required="Bairro ?? Obrigat??rio"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <InputText
                control={control}
                label="Cidade"
                name="city"
                error={errors?.city}
                required="Cidade ?? Obrigat??rio"
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
                required="Estado ?? Obrigat??rio"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputText
                control={control}
                label="Complemento"
                name="complement"
                error={errors?.complement}
                required="Complemento ?? Obrigat??rio"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <InputText
                control={control}
                label="Telefone"
                name="telephone"
                error={errors?.telephone}
                required="telefone ?? Obrigat??rio"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <InputText
                control={control}
                label="Celular"
                name="cellPhone"
                error={errors?.cellPhone}
                required="Celular ?? Obrigat??rio"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputText
                control={control}
                label="E-mail"
                name="eMail"
                error={errors?.eMail}
                required="E-mail ?? Obrigat??rio"
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

export default CadastrarContatos;
