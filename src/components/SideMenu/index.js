import React, { Children } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { AssignmentInd, Domain, Contacts, Assignment, Dashboard } from '@material-ui/icons';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Header from '../Header';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRouter = (text) => {
    history.push(`/${text}`);
  }

  const findIcon = (name) => {
    switch (name) {
      case 'Empresas':
        return <Domain />;
      case 'Cargos':
        return <AssignmentInd />;
      case 'Contatos':
        return <Contacts />;
      case 'Despesas':
        return <Contacts />;
      case 'Fornecedores':
        return <Assignment />;
      case 'Funcionarios':
        return <Assignment />;
      case 'Terceirizados':
        return <Assignment />;
      case 'Usuarios':
        return <Assignment />;
      case 'Documentos':
        return <Assignment />;
      case 'Marcas':
        return <Assignment />;
      case 'Produtos':
        return <Assignment />;
      default:
        return name;
    }
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Obras'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon onClick={() => handleRouter(text.toLocaleLowerCase())} >{index % 2 === 0 ? <Dashboard /> : <Dashboard />}</ListItemIcon>
              <ListItemText primary={text} onClick={() => handleRouter(text.toLocaleLowerCase())} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            'Empresas',
            'Cargos',
            'Contatos',
            'Despesas',
            'Fornecedores',
            'Funcionarios',
            'Terceirizados',
            'Usuarios',
            'Documentos',
            'Marcas',
            'Produtos',
          ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon onClick={() => handleRouter(text.toLocaleLowerCase())}>{findIcon(text)}</ListItemIcon>
              <ListItemText primary={text} onClick={() => handleRouter(text.toLocaleLowerCase())} />
            </ListItem>
          ))}
        </List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
