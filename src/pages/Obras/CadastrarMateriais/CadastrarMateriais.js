import { Button, Paper, FormControl, Typography , Grid, TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import useStyles from './CadadastrarMateriais.styles';

const CadastrarMateriais = () => {
  const history = useHistory();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const classes = useStyles();

  return (
    <FormControl onSubmit={handleSubmit(onSubmit)} size="small">
      <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Typography
        variant="h6"
        size={18}
        color="neutralPrimary"
        className={classes.title}
        weight="semibold"
      >
      Novo Material
      </Typography>
      <Grid
          container
          spacing={3}
          item
          xs={12}
          direction="row"
        >
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Produto"
              name="produto"
              variant="outlined"
              size="small"
              fullWidth
              {...register("produto", { required: "Produto é obrigatório" })}
              error={errors.produto}
              helperText={errors?.produto?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Grupo"
              name="numero"
              variant="outlined"
              size="small"
              fullWidth
              {...register("grupo", { required: "Grupo é obrigatório" })}
              error={errors.grupo}
              helperText={errors?.grupo?.message}
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
          <Grid item xs={12} md={3}>
            <TextField
              label="Quantidade"
              name="quantidade"
              variant="outlined"
              size="small"
              fullWidth
              {...register("quantidade", { required: "Quantidade é obrigatório" })}
              error={errors.quantidade}
              helperText={errors?.quantidade?.message}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Valor"
              name="valor"
              variant="outlined"
              size="small"
              fullWidth
              {...register("valor", { required: "Valor é obrigatório" })}
              error={errors.valor}
              helperText={errors?.valor?.message}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="unidade"
              name="unidade"
              variant="outlined"
              size="small"
              fullWidth
              {...register("unidade", { required: "Unidade é obrigatório" })}
              error={errors.unidade}
              helperText={errors?.unidade?.message}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Data da Compra"
              type="date"
              className={classes.textField}
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
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
          <Grid item xs={12} md={4}>
            <TextField
              label="Fornecedor"
              name="fornecedor"
              variant="outlined"
              size="small"
              fullWidth
              {...register("fornecedor", { required: "Fornecedor é obrigatório" })}
              error={errors.fornecedor}
              helperText={errors?.fornecedor?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Marca"
              name="marca"
              variant="outlined"
              size="small"
              fullWidth
              {...register("marca", { required: "Marca é obrigatório" })}
              error={errors.marca}
              helperText={errors?.marca?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Investidor"
              name="investidor"
              variant="outlined"
              size="small"
              fullWidth
              {...register("investidor", { required: "Investidor é obrigatório" })}
              error={errors.investidor}
              helperText={errors?.investidor?.message}
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
  );
}

export default CadastrarMateriais;
