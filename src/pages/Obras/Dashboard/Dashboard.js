import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import Chart from '../../../components/Chart';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// import { Container } from './styles';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function Dashboard() {
  
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const TOTAIS = {
    Materiais: 'R$ 53000,00',
    MaoObra: 'R$ 52000,00',
    ValorLote: 'R$ 52000,00',
    ValorVenda: 'R$ 52000,00',
    Custo: 'R$ 52000,00',
    Despesas: 'R$ 52000,00',
    Documentacao: 'R$ 52000,00',
    LucroBruto: 'R$ 52000,00',
    LucroLiquido: 'R$ 52000,00',
    ValorM2: 'R$ 52000,00',
  }

  return (
    <React.Fragment>
  <div className={classes.root}>
  <Grid container spacing={3}>
  <Grid
    container
    spacing={3}
    item
    xs={12}
    direction="row"
  >
    <Grid item xs={2} sm={2}>
      <Paper className={classes.paper}>
      <Typography component="h6" variant="h6">
           {TOTAIS.Materiais}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Materiais
      </Typography>
      </Paper>
    </Grid>
    <Grid item xs={2} sm={2}>
      <Paper className={classes.paper}>
      <Typography component="h6" variant="h6">
      {TOTAIS.MaoObra}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Mão de Obra
      </Typography>
      </Paper>
    </Grid>
    <Grid item xs={2} sm={2}>
      <Paper className={classes.paper}>
      <Typography component="h6" variant="h6">
      {TOTAIS.Documentacao}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Documentação
      </Typography>
      </Paper>
    </Grid>
    <Grid item xs={2} sm={2}>
      <Paper className={classes.paper}>
      <Typography component="h6" variant="h6">
      {TOTAIS.Despesas}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Despesas Diversas
      </Typography>
      </Paper>
    </Grid>
    <Grid item xs={2} sm={2}>
      <Paper className={classes.paper}>
      <Typography component="h6" variant="h6">
      {TOTAIS.ValorLote}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Valor Lote
      </Typography>
      </Paper>
    </Grid>
    <Grid item xs={2} sm={2}>
      <Paper className={classes.paper}>
      <Typography component="h6" variant="h6">
      {TOTAIS.ValorM2}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Valor M2
      </Typography>
      </Paper>
    </Grid>
    </Grid>
    <Grid
          container
          spacing={3}
          item
          xs={12}
          direction="row"
        >
          <Grid item xs={2} sm={2}>
      <Paper className={classes.paper}>
      <Typography component="h6" variant="h6">
      {TOTAIS.Custo}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Custo
      </Typography>
      </Paper>
    </Grid>
    <Grid item xs={2} sm={2}>
      <Paper className={classes.paper}>
      <Typography component="h6" variant="h6">
      {TOTAIS.ValorVenda}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Valor de venda
      </Typography>
      </Paper>
    </Grid>
    <Grid item xs={2} sm={2}>
      <Paper className={classes.paper}>
      <Typography component="h6" variant="h6">
      {TOTAIS.LucroBruto}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Lucro Bruto
      </Typography>
      </Paper>
    </Grid>
    <Grid item xs={2} sm={2}>
      <Paper className={classes.paper}>
      <Typography component="h6" variant="h6">
      {TOTAIS.LucroLiquido}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Lucro Liquído
      </Typography>
      </Paper>
    </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          item
          xs={12}
          direction="row"
        >
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
      </Grid>
      </Grid>
  </Grid>
      </div>
      </React.Fragment>
  );
}

export default Dashboard;

