import { cartFragment, productFragment, productListFragment } from "./fragments";

export const getProductsQuery = /* GraphQL */ `
  query getProducts($first: Int = 24, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...ProductListFragment
        }
      }
    }
  }
  ${productListFragment}
`;

export const getProductByHandleQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
  ${productFragment}
`;

export const getProductTypesQuery = /* GraphQL */ `
  query getProductTypes {
    productTypes(first: 50) {
      edges {
        node
      }
    }
  }
`;

export const getCartQuery = /* GraphQL */ `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
  ${cartFragment}
`;
