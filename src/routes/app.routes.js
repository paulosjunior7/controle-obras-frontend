import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideMenu from '../components/SideMenu'
import Produtos from '../pages/Produtos';
import CadastrarProduto from '../pages/Produtos/CadastrarProduto';
import Cargos from '../pages/Cargos';
import Contatos from '../pages/Contatos';
import Despesas from '../pages/Despesas';
import Documentos from '../pages/Documentos';
import Empresas from '../pages/Empresas';
import Fornecedores from '../pages/Fornecedores';
import Funcionarios from '../pages/Funcionarios';
import Marcas from '../pages/Marcas';
import Obras from '../pages/Obras';
import Terceirizados from '../pages/Terceirizados';
import Usuarios from '../pages/Usuarios';
import CadastrarMarcas from '../pages/Marcas/CadastrarMarcas';
import CadastrarFornecedores from '../pages/Fornecedores/CadastrarFornecedores/CadastrarFornecedores';
import CadastrarContatos from '../pages/Contatos/CadastrarContatos';
import CadastrarCargos from '../pages/Cargos/CadastrarCargos';
import SignIn from '../pages/SignIn';

const AppRoutes = ({ children }) => {

  return (
    <Router>
      <SideMenu>
        <Switch>

          <Route exact path="/produtos" component={Produtos} />
          <Route exact path="/produtos/cadastro" component={CadastrarProduto} />
          <Route exact path="/produtos/editar/:id" component={CadastrarProduto} />

          <Route exact path="/cargos" component={Cargos} />
          <Route exact path="/cargos/cadastro" component={CadastrarCargos} />
          <Route exact path="/cargos/editar/:id" component={Cargos} />

          <Route exact path="/contatos" component={Contatos} />
          <Route exact path="/contatos/cadastro" component={CadastrarContatos} />
          <Route exact path="/contatos/editar/:id" component={Contatos} />

          <Route exact path="/despesas" component={Despesas} />
          <Route exact path="/despesas/cadastro" component={Despesas} />
          <Route exact path="/despesas/editar/:id" component={Despesas} />

          <Route exact path="/documentos" component={Documentos} />
          <Route exact path="/documentos/cadastro" component={Documentos} />
          <Route exact path="/documentos/editar/:id" component={Documentos} />

          <Route exact path="/empresas" component={Empresas} />
          <Route exact path="/empresas/cadastro" component={Empresas} />
          <Route exact path="/empresas/editar/:id" component={Empresas} />

          <Route exact path="/fornecedores" component={Fornecedores} />
          <Route exact path="/fornecedores/cadastro" component={CadastrarFornecedores} />
          <Route exact path="/fornecedores/editar/:id" component={Fornecedores} />

          <Route exact path="/funcionarios" component={Funcionarios} />
          <Route exact path="/funcionarios/cadastro" component={Funcionarios} />
          <Route exact path="/funcionarios/editar/:id" component={Funcionarios} />

          <Route exact path="/marcas" component={Marcas} />
          <Route exact path="/marcas/cadastro" component={CadastrarMarcas} />
          <Route exact path="/marcas/editar/:id" component={Marcas} />

          <Route exact path="/obras" component={Obras} />
          <Route exact path="/obras/cadastro" component={Obras} />
          <Route exact path="/obras/editar/:id" component={Obras} />

          <Route exact path="/terceirizados" component={Terceirizados} />
          <Route exact path="/terceirizados/cadastro" component={Terceirizados} />
          <Route exact path="/terceirizados/editar/:id" component={Terceirizados} />

          <Route exact path="/usuarios" component={Usuarios} />
          <Route exact path="/usuarios/cadastro" component={Usuarios} />
          <Route exact path="/usuarios/editar/:id" component={Usuarios} />

        </Switch>
      </SideMenu>
    </Router>
  );
}

export default AppRoutes;

