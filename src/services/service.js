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
