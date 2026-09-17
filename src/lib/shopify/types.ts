export type Money = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: SelectedOption[];
  price: Money;
  compareAtPrice: Money | null;
  image: ShopifyImage | null;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  productType: string;
  totalInventory: number | null;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  options: ProductOption[];
  variants: ProductVariant[];
};

export type ProductListItem = Pick<
  Product,
  | "id"
  | "handle"
  | "title"
  | "availableForSale"
  | "priceRange"
  | "featuredImage"
  | "productType"
  | "tags"
  | "totalInventory"
>;

export type CartAttribute = {
  key: string;
  value: string;
};

export type CartLine = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  attributes: CartAttribute[];
  merchandise: {
    id: string;
    title: string;
    selectedOptions: SelectedOption[];
    image: ShopifyImage | null;
    product: {
      handle: string;
      title: string;
    };
    price: Money;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  lines: CartLine[];
};

export type ShopifyConnection<T> = {
  edges: { node: T }[];
};
