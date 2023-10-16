/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInteger: any;
  Date: any;
  DateTime: any;
  LocalDateTime: any;
  LocalTime: any;
  Long: any;
  Time: any;
  Timestamp: any;
  Url: any;
  Void: any;
};

export type Customer = {
  __typename?: "Customer";
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
};

export type CustomerFilterInput = {
  email?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type CustomerInput = {
  email?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
};

export type CustomerOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<CustomerOrderByProperty>;
};

export enum CustomerOrderByProperty {
  Email = "EMAIL",
  Id = "ID",
  Name = "NAME",
}

export type CustomerResultPage = {
  __typename?: "CustomerResultPage";
  content?: Maybe<Array<Maybe<Customer>>>;
  totalElements: Scalars["Long"];
};

export type Mutation = {
  __typename?: "Mutation";
  deleteCustomer?: Maybe<Scalars["Void"]>;
  deleteOrder?: Maybe<Scalars["Void"]>;
  deleteOrderLine?: Maybe<Scalars["Void"]>;
  deleteProduct?: Maybe<Scalars["Void"]>;
  updateCustomer: Customer;
  updateOrder: OrderDto;
  updateOrderLine: OrderLineDto;
  updateProduct: Product;
};

export type MutationDeleteCustomerArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteOrderArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteOrderLineArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteProductArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateCustomerArgs = {
  input: CustomerInput;
};

export type MutationUpdateOrderArgs = {
  input: OrderDtoInput;
};

export type MutationUpdateOrderLineArgs = {
  input: OrderLineDtoInput;
};

export type MutationUpdateProductArgs = {
  input: ProductInput;
};

export type OffsetPageInput = {
  number: Scalars["Int"];
  size: Scalars["Int"];
};

export type OrderDto = {
  __typename?: "OrderDto";
  amount?: Maybe<Scalars["BigDecimal"]>;
  customer?: Maybe<Customer>;
  date: Scalars["Date"];
  id?: Maybe<Scalars["ID"]>;
  number?: Maybe<Scalars["String"]>;
};

export type OrderDtoInput = {
  amount?: InputMaybe<Scalars["BigDecimal"]>;
  customer?: InputMaybe<CustomerInput>;
  date: Scalars["Date"];
  id?: InputMaybe<Scalars["ID"]>;
  number?: InputMaybe<Scalars["String"]>;
};

export type OrderDtoResultPage = {
  __typename?: "OrderDtoResultPage";
  content?: Maybe<Array<Maybe<OrderDto>>>;
  totalElements: Scalars["Long"];
};

export type OrderFilterInput = {
  customerName?: InputMaybe<Scalars["String"]>;
  dateMin?: InputMaybe<Scalars["Date"]>;
  number?: InputMaybe<Scalars["String"]>;
};

export type OrderLineDto = {
  __typename?: "OrderLineDto";
  id?: Maybe<Scalars["ID"]>;
  order?: Maybe<OrderDto>;
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars["BigDecimal"]>;
};

export type OrderLineDtoInput = {
  id?: InputMaybe<Scalars["ID"]>;
  order?: InputMaybe<OrderDtoInput>;
  product?: InputMaybe<ProductInput>;
  quantity?: InputMaybe<Scalars["BigDecimal"]>;
};

export type OrderLineFilterInput = {
  orderId?: InputMaybe<Scalars["Long"]>;
};

export type OrderLineOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<OrderLineOrderByProperty>;
};

export enum OrderLineOrderByProperty {
  ProductName = "PRODUCT_NAME",
  ProductPrice = "PRODUCT_PRICE",
}

export type OrderOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<OrderOrderByProperty>;
};

export enum OrderOrderByProperty {
  Date = "DATE",
  Number = "NUMBER",
}

export type Product = {
  __typename?: "Product";
  id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
  price: Scalars["BigDecimal"];
  special?: Maybe<Scalars["Boolean"]>;
};

export type ProductFilterInput = {
  name?: InputMaybe<Scalars["String"]>;
  priceMax?: InputMaybe<Scalars["BigDecimal"]>;
  priceMin?: InputMaybe<Scalars["BigDecimal"]>;
};

export type ProductInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
  price: Scalars["BigDecimal"];
  special?: InputMaybe<Scalars["Boolean"]>;
};

export type ProductOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<ProductOrderByProperty>;
};

export enum ProductOrderByProperty {
  Name = "NAME",
  Price = "PRICE",
}

export type ProductResultPage = {
  __typename?: "ProductResultPage";
  content?: Maybe<Array<Maybe<Product>>>;
  totalElements: Scalars["Long"];
};

export type Query = {
  __typename?: "Query";
  checkAuthenticated?: Maybe<Scalars["Void"]>;
  customer: Customer;
  customerList: CustomerResultPage;
  order: OrderDto;
  orderLine: OrderLineDto;
  orderLineList: Array<Maybe<OrderLineDto>>;
  orderList: OrderDtoResultPage;
  product: Product;
  productList: ProductResultPage;
  userInfo?: Maybe<UserInfo>;
  userPermissions?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type QueryCustomerArgs = {
  id: Scalars["ID"];
};

export type QueryCustomerListArgs = {
  filter?: InputMaybe<CustomerFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<CustomerOrderByInput>>>;
};

export type QueryOrderArgs = {
  id: Scalars["ID"];
};

export type QueryOrderLineArgs = {
  id: Scalars["ID"];
};

export type QueryOrderLineListArgs = {
  filter?: InputMaybe<OrderLineFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<OrderLineOrderByInput>>>;
};

export type QueryOrderListArgs = {
  filter?: InputMaybe<OrderFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<OrderOrderByInput>>>;
};

export type QueryProductArgs = {
  id: Scalars["ID"];
};

export type QueryProductListArgs = {
  filter?: InputMaybe<ProductFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<ProductOrderByInput>>>;
};

export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type UserInfo = {
  __typename?: "UserInfo";
  avatar?: Maybe<Scalars["String"]>;
  fullName?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type UpdateProductMutationVariables = Exact<{
  input: ProductInput;
}>;

export type UpdateProductMutation = {
  __typename?: "Mutation";
  updateProduct: {
    __typename?: "Product";
    id?: string | null;
    name: string;
    price: any;
    special?: boolean | null;
  };
};

export type ProductQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ProductQuery = {
  __typename?: "Query";
  product: {
    __typename?: "Product";
    id?: string | null;
    name: string;
    price: any;
    special?: boolean | null;
  };
};

export type ProductListQueryVariables = Exact<{
  filter?: InputMaybe<ProductFilterInput>;
  sort?: InputMaybe<
    Array<InputMaybe<ProductOrderByInput>> | InputMaybe<ProductOrderByInput>
  >;
  page?: InputMaybe<OffsetPageInput>;
}>;

export type ProductListQuery = {
  __typename?: "Query";
  productList: {
    __typename?: "ProductResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "Product";
      id?: string | null;
      name: string;
      price: any;
      special?: boolean | null;
    } | null> | null;
  };
};

export type DeleteProductMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteProductMutation = {
  __typename?: "Mutation";
  deleteProduct?: any | null;
};

export type UserInfoQueryVariables = Exact<{ [key: string]: never }>;

export type UserInfoQuery = {
  __typename?: "Query";
  userInfo?: {
    __typename?: "UserInfo";
    id: string;
    fullName?: string | null;
    avatar?: string | null;
  } | null;
};

export type CheckAuthenticatedQueryVariables = Exact<{ [key: string]: never }>;

export type CheckAuthenticatedQuery = {
  __typename?: "Query";
  checkAuthenticated?: any | null;
};

export type UserPermissionsQueryVariables = Exact<{ [key: string]: never }>;

export type UserPermissionsQuery = {
  __typename?: "Query";
  userPermissions?: Array<string | null> | null;
};

export const UpdateProductDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateProduct" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ProductInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateProduct" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                { kind: "Field", name: { kind: "Name", value: "special" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;
export const ProductDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Product" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "product" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                { kind: "Field", name: { kind: "Name", value: "special" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductQuery, ProductQueryVariables>;
export const ProductListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ProductList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "ProductFilterInput" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sort" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ProductOrderByInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OffsetPageInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "productList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filter" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sort" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "content" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "special" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "totalElements" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductListQuery, ProductListQueryVariables>;
export const DeleteProductDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteProduct" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteProduct" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;
export const UserInfoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "userInfo" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userInfo" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "fullName" } },
                { kind: "Field", name: { kind: "Name", value: "avatar" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserInfoQuery, UserInfoQueryVariables>;
export const CheckAuthenticatedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "checkAuthenticated" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "checkAuthenticated" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CheckAuthenticatedQuery,
  CheckAuthenticatedQueryVariables
>;
export const UserPermissionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "userPermissions" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "userPermissions" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserPermissionsQuery,
  UserPermissionsQueryVariables
>;
