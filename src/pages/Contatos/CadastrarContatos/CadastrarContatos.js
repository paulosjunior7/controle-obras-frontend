import React, { useState } from 'react';
import { Button,Paper , Grid, TextField, FormControl , Typography , Select , MenuItem} from '@material-ui/core';
import useStyles from './CadastrarContatos.styles';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

function CadastrarContatos() {
  const classes = useStyles();
  const history = useHistory();
  const [tipoContato, setTipoContato] = useState('fisica');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);


  return (
    <FormControl onSubmit={handleSubmit(onSubmit)} size="small">
     
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        <Link color="inherit" href="/" onClick={() => history.push('/contatos')}>
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
        <Grid item xs={12} md={8}>
        <FormControl component="fieldset">
            <RadioGroup row aria-label="position" name="position" defaultValue="fisica"  onChange={(event) => setTipoContato(event.target.value)}>
              <FormControlLabel value="fisica" labelPlacement="end" checked={tipoContato === 'fisica'} control={<Radio />} label="Física" />
              <FormControlLabel value="juridica" labelPlacement="end"  checked={tipoContato === 'juridica'} control={<Radio />} label="Jurídica" />
            </RadioGroup>
        </FormControl>
        </Grid>
      <Grid item xs={12} md={8}>
      {
        tipoContato === 'fisica' ? (
          <TextField
        label="Nome"
        name="nome"
        variant="outlined"
        size="small"
        fullWidth
        {...register("nome", { required: "Nome é obrigatório" })}
        error={errors.nome}
        helperText={errors?.nome?.message}
      />
        ) : (
          <TextField
        label="Razão Social"
        name="razaosocial"
        variant="outlined"
        size="small"
        fullWidth
        {...register("razaosocial", { required: "Razão Social é obrigatório" })}
        error={errors.razaosocial}
        helperText={errors?.razaosocial?.message}
      />
        )
      }
      </Grid>
          <Grid item xs={12} md={2}>
            {
              tipoContato === 'fisica' ? (
                <TextField
                  label="CPF"
                  name="cpf"
                  variant="outlined"
                  size="small"
                  fullWidth
                  {...register("cpf", { required: "CPF é obrigatório" })}
                  error={errors.cpf}
                  helperText={errors?.cpf?.message}
                />
              ) : 
              (
                <TextField
                  label="CNPJ"
                  name="cnpj"
                  variant="outlined"
                  size="small"
                  fullWidth
                  {...register("cnpj", { required: "CNPJ é obrigatório" })}
                  error={errors.cnpj}
                  helperText={errors?.cnpj?.message}
                />
              )
            }
          </Grid>
          <Grid item xs={12} md={2}>
          <TextField
              label="CEP"
              name="cep"
              variant="outlined"
              size="small"
              fullWidth
              {...register("cep", { required: "CEP é obrigatório" })}
              error={errors.cep}
              helperText={errors?.cep?.message}
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
             
          <Grid item xs={12} md={6}>
          <TextField
              label="Endereço"
              name="endereco"
              variant="outlined"
              size="small"
              fullWidth
              {...register("endereco", { required: "Endereço é obrigatório" })}
              error={errors.endereco}
              helperText={errors?.endereco?.message}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="Número"
              name="numero"
              variant="outlined"
              size="small"
              fullWidth
              {...register("numero", { required: "Número é obrigatório" })}
              error={errors.numero}
              helperText={errors?.numero?.message}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="Bairro"
              name="bairro"
              variant="outlined"
              size="small"
              fullWidth
              {...register("bairro", { required: "Bairro é obrigatório" })}
              error={errors.bairro}
              helperText={errors?.bairro?.message}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="Cidade"
              name="cidade"
              variant="outlined"
              size="small"
              fullWidth
              {...register("cidade", { required: "Cidade é obrigatório" })}
              error={errors.cidade}
              helperText={errors?.cidade?.message}
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
            <TextField
              label="UF"
              name="estado"
              variant="outlined"
              size="small"
              fullWidth
              {...register("estado", { required: "Estado é obrigatório" })}
              error={errors.estado}
              helperText={errors?.estado?.message}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Complemento"
              name="complemento"
              variant="outlined"
              size="small"
              fullWidth
              {...register("complemento", { required: "Complemento é obrigatório" })}
              error={errors.complemento}
              helperText={errors?.complemento?.message}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="Telefone"
              name="telefone"
              variant="outlined"
              size="small"
              fullWidth
              {...register("telefone", { required: "Telefone é obrigatório" })}
              error={errors.telefone}
              helperText={errors?.telefone?.message}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="Celular"
              name="celular"
              variant="outlined"
              size="small"
              fullWidth
              {...register("celular", { required: "Celular é obrigatório" })}
              error={errors.celular}
              helperText={errors?.celular?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="E-mail"
              name="email"
              variant="outlined"
              size="small"
              fullWidth
              {...register("email", { required: "E-mail Construida é obrigatório" })}
              error={errors.email}
              helperText={errors?.email?.message}
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
    </FormControl>
  )
}

export default CadastrarContatos;
