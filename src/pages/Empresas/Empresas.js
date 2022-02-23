import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TablePagination,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Grid,
  Tooltip,
  IconButton,
  Typography,
} from '@material-ui/core';
import Loader from '../../components/Loader';
import Dialog from '../../components/Dialog';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPRESAS, UPDATE_EMPRESA } from '../../services';
import { toast } from "react-toastify";
import useStyles from './Empresas.styles';

const Empresas = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState({});

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { loading, refetch, data } = useQuery(GET_EMPRESAS, {
    variables: {
      filter: { active: true },
      pagination: {
        pageNumber: page + 1,
        pageSize: rowsPerPage
      }
    }
  });

  const [updateEmpresa] = useMutation(UPDATE_EMPRESA, {
    onCompleted: () => {
      toast.success("Empresa inativada com sucesso!");
      refetch();
      setItem({});
      setOpen(false);
    },
    onError: (error) => {
      toast.warning(error.message);
      setItem({});
      refetch();
      setOpen(false);
    }
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleInative = () => {
    const newData = {
      variables: {
        id: Number(item.id),
        company: {
          active: false,
          cnpj: item.cnpj,
          corporateName: item.corporateName
        }
      }
    };

    if (item.id > 0) {
      updateEmpresa(newData)
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Grid container spacing={3}>
      <Dialog
        open={open}
        setOpen={setOpen}
        dialogText="Confirma a inativação?"
        description={item.fantasyName}
        handleInative={handleInative} />
      <Grid container item xs={12} justify="space-between">
        <Typography
          variant="h6"
          size={14}
          color="neutralPrimary"
          className={classes.title}
          weight="semibold"
        >
          Empresas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => history.push('/empresas/cadastro')}
        >
          Adicionar Empresa
        </Button>
      </Grid>
      <TableContainer component={Paper}>

        <Table className={classes.table} size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Razão Social</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell align="right" />
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.companies.findall.items.map((item) => (
              <TableRow key={item.description} hover>
                <TableCell component="th" scope="row">
                  {item.fantasyName}
                </TableCell>
                <TableCell >
                  {item.cnpj}
                </TableCell>
                <TableCell >
                  {item.telephone}
                </TableCell>
                <TableCell align="right" className={classes.botoes}>
                  <Tooltip
                    placement="top"
                    title="Excluir"
                    color="white"
                  >
                    <IconButton
                      variant="subtle"
                      onClick={() => {
                        setOpen(true);
                        setItem(item);
                      }
                      }
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="right" className={classes.botoes}>
                  <Tooltip
                    placement="top"
                    title="editar"
                    color="white"
                  >
                    <IconButton
                      variant="subtle"
                      onClick={() =>
                        history.push(`/empresas/editar/${item.id}`)
                      }
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          labelRowsPerPage="Linhas por Página"
          count={data?.companies.findall.totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          hideNextButton={!data?.companies?.findall.pageInfo.hasNextPage}
          hidePrevButton={!data?.companies?.findall.pageInfo.hasPreviousPage}
        />
      </TableContainer>
    </Grid>

  );
}

export default Empresas;
