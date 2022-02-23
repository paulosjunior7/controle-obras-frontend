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
import { GET_PRODUCTS, UPDATE_PRODUCT } from '../../services';
import { toast } from "react-toastify";
import useStyles from './Produtos.styles';

const Produtos = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState({});

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { loading, refetch, data } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: { companyId: 1, active: true },
      pagination: {
        pageNumber: page + 1,
        pageSize: rowsPerPage
      }
    }
  });

  const [updateProdutos] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      toast.success("Produto inativado com sucesso!");
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
        product: {
          detail: item.detail,
          description: item.description,
          active: false
        }
      }
    };

    if (item.id > 0) {
      updateProdutos(newData)
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
        description={item.description}
        handleInative={handleInative} />
      <Grid container item xs={12} justify="space-between">
        <Typography
          variant="h6"
          size={14}
          color="neutralPrimary"
          className={classes.title}
          weight="400"
        >
          Produtos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => history.push('/produtos/cadastro')}
        >
          Adicionar Produto
        </Button>
      </Grid>
      <TableContainer component={Paper}>

        <Table className={classes.table} size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell>Detalhes</TableCell>
              <TableCell align="right" />
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.products.findall.items.map((item) => (
              <TableRow key={item.description} hover>
                <TableCell component="th" scope="row">
                  {item.description}
                </TableCell>
                <TableCell >
                  {item.detail}
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
                        history.push(`/produtos/editar/${item.id}`)
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
          count={data?.products.findall.totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          hideNextButton={!data?.products?.findall.pageInfo.hasNextPage}
          hidePrevButton={!data?.products?.findall.pageInfo.hasPreviousPage}
        />
      </TableContainer>
    </Grid>

  );
}

export default Produtos;
