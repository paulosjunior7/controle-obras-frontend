import React from 'react';
import { Button,Paper , Grid, TextField, FormControl , Typography  } from '@material-ui/core';
import useStyles from './CadastrarFornecedores.styles';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function CadastrarFornecedores() {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <FormControl onSubmit={handleSubmit(onSubmit)} size="small">
     
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        <Link color="inherit" href="/" onClick={() => history.push('/fornecedores')}>
          Fornecedores
        </Link>
        <Link color="inherit" onClick={() => history.push('/fornecedores/cadastro')}>
          Cadastrar Fornecedores
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
          Cadastrar Fornecedores
      </Typography>
        <Grid
          container
          spacing={3}
          item
          xs={12}
          direction="row"
        >
          <Grid item xs={12} md={8}>
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
          </Grid>
          <Grid item xs={12} md={2}>
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
              label="Estado"
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

export default CadastrarFornecedores;
