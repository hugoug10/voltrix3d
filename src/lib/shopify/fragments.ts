export const imageFragment = /* GraphQL */ `
  fragment ImageFragment on Image {
    url
    altText
    width
    height
  }
`;

export const moneyFragment = /* GraphQL */ `
  fragment MoneyFragment on MoneyV2 {
    amount
    currencyCode
  }
`;

export const productVariantFragment = /* GraphQL */ `
  fragment ProductVariantFragment on ProductVariant {
    id
    title
    availableForSale
    quantityAvailable
    selectedOptions {
      name
      value
    }
    price {
      ...MoneyFragment
    }
    compareAtPrice {
      ...MoneyFragment
    }
    image {
      ...ImageFragment
    }
  }
  ${moneyFragment}
  ${imageFragment}
`;

export const productFragment = /* GraphQL */ `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    tags
    productType
    totalInventory
    priceRange {
      minVariantPrice {
        ...MoneyFragment
      }
      maxVariantPrice {
        ...MoneyFragment
      }
    }
    featuredImage {
      ...ImageFragment
    }
    images(first: 8) {
      edges {
        node {
          ...ImageFragment
        }
      }
    }
    options {
      id
      name
      values
    }
    variants(first: 100) {
      edges {
        node {
          ...ProductVariantFragment
        }
      }
    }
  }
  ${productVariantFragment}
`;

export const productListFragment = /* GraphQL */ `
  fragment ProductListFragment on Product {
    id
    handle
    title
    availableForSale
    productType
    totalInventory
    tags
    priceRange {
      minVariantPrice {
        ...MoneyFragment
      }
      maxVariantPrice {
        ...MoneyFragment
      }
    }
    featuredImage {
      ...ImageFragment
    }
  }
  ${moneyFragment}
  ${imageFragment}
`;

export const cartFragment = /* GraphQL */ `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        ...MoneyFragment
      }
      totalAmount {
        ...MoneyFragment
      }
      totalTaxAmount {
        ...MoneyFragment
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          attributes {
            key
            value
          }
          cost {
            totalAmount {
              ...MoneyFragment
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              price {
                ...MoneyFragment
              }
              image {
                ...ImageFragment
              }
              product {
                handle
                title
              }
            }
          }
        }
      }
    }
  }
  ${moneyFragment}
  ${imageFragment}
`;
