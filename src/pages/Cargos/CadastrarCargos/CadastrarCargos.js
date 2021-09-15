import React from 'react';
import { Button,Paper , Grid, TextField, Typography, Breadcrumbs, Link } from '@material-ui/core';
import useStyles from './CadastrarCargos.styles';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

function CadastrarCargos() {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        <Link color="inherit" href="/" onClick={() => history.push('/cargos')}>
          Cargos
        </Link>
        <Link color="inherit" onClick={() => history.push('/cargos/cadastro')}>
          Cadastrar Cargo
        </Link>
      </Breadcrumbs>
       <Paper  className={classes.paper}>
    <Grid container spacing={3}>
      <Typography
        variant="h5"
        size={18}
        color="neutralPrimary"
        className={classes.title}
        weight="semibold"
      >
          Cadastrar Cargo
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
            <TextField 
              label="Descrição"
              name="descricao" 
              variant="outlined"
              size="small"
              fullWidth
              {...register("descricao", { required: "Descrição é obrigatório" })}
              error={errors.descricao}
              helperText={errors?.descricao?.message}
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
                onClick={() =>  history.push('/cargos')}
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
