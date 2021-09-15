import { Button, Divider, FormControl, Grid, Paper, TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import useStyles from './Detalhes.styles';

function Detalhes() {
  const history = useHistory();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const classes = useStyles();

  return (
    <FormControl onSubmit={handleSubmit(onSubmit)} size="small">
      <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid
          container
          spacing={3}
          item
          xs={12}
          direction="row"
        >
          <Grid item xs={12} md={3}>
            <TextField
              label="Identificador"
              name="identificador"
              variant="outlined"
              size="small"
              fullWidth
              {...register("identificador", { required: "Indentificação é obrigatório" })}
              error={errors.identificacao}
              helperText={errors?.identificacao?.message}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Status"
              name="status"
              variant="outlined"
              size="small"
              fullWidth
              {...register("status", { required: "Status é obrigatório" })}
              error={errors.status}
              helperText={errors?.status?.message}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              id="date"
              label="Data Início"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              id="date"
              label="Data Finalização"
              type="date"
              defaultValue="2017-05-24"
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
        <Divider variant="grid" />
        <Grid
          container
          spacing={3}
          item
          xs={12}
          direction="row"
        >
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
          <Grid item xs={12} md={8}>
            <TextField
              label="Endereço"
              name="endereço"
              variant="outlined"
              size="small"
              fullWidth
              {...register("endereço", { required: "Endereço é obrigatório" })}
              error={errors.endereço}
              helperText={errors?.endereço?.message}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="Número"
              name="numero"
              variant="outlined"
              size="small"
              fullWidth
              {...register("numero", { required: "Numero é obrigatório" })}
              error={errors.numero}
              helperText={errors?.numero?.message}
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
          <Grid item xs={12} md={3}>
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
              label="Área Lote"
              name="arealote"
              variant="outlined"
              size="small"
              fullWidth
              {...register("arealote", { required: "Área lote é obrigatório" })}
              error={errors.arealote}
              helperText={errors?.arealote?.message}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Área Construída"
              name="areaconstruida"
              variant="outlined"
              size="small"
              fullWidth
              {...register("areaconstruida", { required: "Área Construida é obrigatório" })}
              error={errors.areaconstruida}
              helperText={errors?.areaconstruida?.message}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Inscrição Municipal"
              name="inscricaomunicipal"
              variant="outlined"
              size="small"
              fullWidth
              {...register("inscricaomunicipal", { required: "Inscrição Municipal é obrigatório" })}
              error={errors.inscricaomunicipal}
              helperText={errors?.inscricaomunicipal?.message}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Alvará"
              name="alvara"
              variant="outlined"
              size="small"
              fullWidth
              {...register("alvara", { required: "Alvará é obrigatório" })}
              error={errors.alvara}
              helperText={errors?.alvara?.message}
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
              label="Uso de Solo"
              name="usodesolo"
              variant="outlined"
              size="small"
              fullWidth
              {...register("usodesolo", { required: "Uso de Solo é obrigatório" })}
              error={errors.usodesolo}
              helperText={errors?.usodesolo?.message}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="CNO"
              name="cno"
              variant="outlined"
              size="small"
              fullWidth
              {...register("cno", { required: "CNO é obrigatório" })}
              error={errors.cno}
              helperText={errors?.cno?.message}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="ART"
              name="art"
              variant="outlined"
              size="small"
              fullWidth
              {...register("art", { required: "Art é obrigatório" })}
              error={errors.art}
              helperText={errors?.art?.message}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Matricula Mãe"
              name="matriculamae"
              variant="outlined"
              size="small"
              fullWidth
              {...register("matriculamae", { required: "Matricula Mãe é obrigatório" })}
              error={errors.matriculamae}
              helperText={errors?.matriculamae?.message}
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

export default Detalhes;
