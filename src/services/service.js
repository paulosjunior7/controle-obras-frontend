import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
    query Produtos($filter: ProductFilterByInputType, $pagination: PaginationDetailsType){
      products {
        findall(filter: $filter, pagination: $pagination ) {
          totalCount
          items {
            id
            description
            detail
            active
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
`;

export const CREATE_PRODUCT = gql`
  mutation createProdutos(
      $product: ProductInputType!
  ){
    products {
      createProduct(product: $product) 
      {
        id
        description
        detail
        active
      }
    }
  }
`

export const UPDATE_PRODUCT = gql`
mutation ( $id: Int!, $product : ProductInputType!) {
  products {
    updateProduct(id: $id, product: $product) {
      id
      description
      detail
    }
  }
}
`

export const GET_DOCUMENTOS = gql`
    query Documentos($filter: DocumentationFilterByInputType, $pagination: PaginationDetailsType){
      documentations {
        findall(filter: $filter, pagination: $pagination) {
          totalCount
          items {
            id
            description
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
`;

export const CREATE_DOCUMENTACAO = gql`
  mutation createDocumentacao(
      $documentation: DocumentationInputType!
  ){
    documentations {
      createDocumentation(documentation: $documentation) 
      {
        id
        description
        active
      }
    }
  }
`

export const UPDATE_DOCUMENT = gql`
mutation ( $id: Int!, $documentation : DocumentationInputType!) {
  documentations {
    updateDocumentation(id: $id, documentation: $documentation) {
      id
      description
    }
  }
}
`


export const GET_DESPESAS = gql`
    query Expenses($filter: ExpenseFilterByInputType, $pagination: PaginationDetailsType){
      expenses {
        findall(filter: $filter, pagination: $pagination) {
          totalCount
          items {
            id
            description
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
`;

export const CREATE_DESPESA = gql`
  mutation createDespesa(
      $expense: ExpenseInputType!
  ){
    expenses {
      createExpense(expense: $expense) 
      {
        id
        description
        active
      }
    }
  }
`

export const UPDATE_DESPESA = gql`
mutation updateDespesa( $id: Int!, $expense : ExpenseInputType!) {
  expenses {
    updateExpense(id: $id, expense: $expense) {
      id
      description
    }
  }
}
`
export const GET_MARCAS = gql`
    query Marcas($filter: BrandFilterByInputType, $pagination: PaginationDetailsType){
      brands {
        findall(filter: $filter, pagination: $pagination) {
          totalCount
          items {
            id
            description
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
`;

export const UPDATE_MARCA = gql`
mutation ( $id: Int!, $brand : BrandInputType!) {
  brands {
    updateBrand(id: $id, brand : $brand) {
      id
      description
    }
  }
}
`;

export const CREATE_MARCA = gql`
  mutation createMarca(
      $brand: BrandInputType!
  ){
    brands {
      createBrand(brand: $brand) 
      {
        id
        description
        active
      }
    }
  }
`;

export const GET_CARGOS = gql`
    query Cargos($filter: ResponsibilityFilterByInputType, $pagination: PaginationDetailsType){
      responsibilities {
        findall(filter: $filter, pagination: $pagination) {
          totalCount
          items {
            id
            description
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
`;


export const UPDATE_CARGO = gql`
mutation ( $id: Int!, $responsibility : ResponsibilityInputType!) {
  responsibilities {
    updateResponsibility(id: $id, responsibility : $responsibility) {
      id
      description
    }
  }
}
`;

export const CREATE_CARGO = gql`
  mutation createMarca(
      $responsibility: ResponsibilityInputType!
  ){
    responsibilities {
      createResponsibility(responsibility: $responsibility) 
      {
        id
        description
        active
      }
    }
  }
`;

export const GET_EMPRESAS = gql`
  query getEmpresas($filter: CompanyFilterByInputType!, $pagination : PaginationDetailsType){
    companies {
      findall(filter: $filter, pagination: $pagination) {
        totalCount
        items {
          id
          fantasyName
          corporateName
          neighbourhood
          number
          state
          telephone
          zipCode
          address
          active
          cellPhone
          city
          complement
          cnpj
          eMail
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`

export const UPDATE_EMPRESA = gql`
mutation updateEmpresa( $id: Int!, $company : CompanyInputType!) {
  companies {
    updateCompany(id: $id, company : $company) {
      id
        neighbourhood
        number
        state
        telephone
        zipCode
        active
        address
        cellPhone
        city
        cnpj
        complement
        corporateName
        eMail
        fantasyName
    }
  }
}
`;

export const CREATE_EMPRESA = gql`
  mutation createEmpresa( 
      $company : CompanyInputType!
  ) {
    companies {
      createCompany(company : $company) {
        id
        neighbourhood
        number
        state
        telephone
        zipCode
        active
        address
        cellPhone
        city
        cnpj
        complement
        corporateName
        eMail
        fantasyName
      }
    }
  }
`;


export const GET_CONTATOS = gql`
query getContatos($filter: PeopleFilterByInputType!, $pagination : PaginationDetailsType){
  peoples {
    findall(filter: $filter, pagination: $pagination) {
      totalCount
      items {
        id
        neighbourhood
        number
        state
        telephone
        zipCode
        active
        address
        cellPhone
        changeDate
        city
        cnpj
        cpf
        complement
        corporateName
        creationDate
        eMail
        fantasyName
        typePeople
        company {
          id
          neighbourhood
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
`;

export const CREATE_CONTATO = gql`
  mutation createContato(
    $people: PeopleInputType!
  ) {
    peoples {
      createPeople(people : $people) {
        id
        neighbourhood
        number
        state
        telephone
        zipCode
        active
        address
        cellPhone
        city
        cnpj
        cpf
        complement
        corporateName
        eMail
        fantasyName
        typePeople
        company {
          id
        }
      }
    }
  }
`;


export const UPDATE_CONTATO = gql`
mutation updatePeople( $id: Int!, $people: PeopleInputType!) {
  peoples {
    updatePeople(id: $id, people : $people) {
      id
      neighbourhood
      number
      state
      telephone
      zipCode
      active
      address
      cellPhone
      city
      cnpj
      cpf
      complement
      corporateName
      eMail
      fantasyName
      typePeople
      company {
        id
      }
    }
  }
}
`;


export const GET_FUNCIONARIOS = gql`
query getFuncionarios($filter: EmployeeFilterByInputType!, $pagination : PaginationDetailsType){
  employees {
    findall(filter: $filter, pagination: $pagination) {
      totalCount
      items {
        id
        neighbourhood
        number
        state
        telephone
        zipCode
        active
        address
        cellPhone
        changeDate
        city
        cpf
        complement
        name
        creationDate
        eMail
        responsibility {
          id
        }
        changeUser {
          id
          userName
        }
        registrationUser {
          id
          userName
        }
        company {
          id
          corporateName
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
`;


export const UPDATE_FUNCIONARIO = gql`
mutation updateFuncionario( $id: Int!, $employee: EmployeeInputType!) {
  employees {
    updateEmployee(id: $id, employee : $employee) {
      id
      neighbourhood
      number
      state
      telephone
      zipCode
      active
      address
      cellPhone
      changeDate
      city
      cpf
      complement
      name
      creationDate
      eMail
      responsibility {
        id
      }
    }
  }
}
`;

export const CREATE_FUNCIONARIO = gql`
  mutation createFuncionario(
    $employee: EmployeeInputType!
  ) {
    employees {
      createEmployee(employee : $employee) {
        id
        neighbourhood
        number
        state
        telephone
        zipCode
        active
        address
        cellPhone
        city
        cpf
        name
      }
    }
  }
`
