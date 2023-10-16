/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "mutation UpdateProduct($input: ProductInput!) {\n\tupdateProduct(input: $input) {\n\t\tid\n\t\tname\n    price\n    special\n\t}\n}":
    types.UpdateProductDocument,
  "query Product($id: ID!) {\n\tproduct(id: $id) {\n\t\tid\n\t\tname\n\t\tprice\n\t\tspecial\n\t}\n}":
    types.ProductDocument,
  "query ProductList($filter: ProductFilterInput\n$sort: [ProductOrderByInput]\n$page: OffsetPageInput) {\n\tproductList(filter: $filter\nsort: $sort\npage: $page) {\ncontent {\t\tid\n\t\tname\n\t\tprice\n\t\tspecial\n}\t\ttotalElements\n\t}\n}":
    types.ProductListDocument,
  "mutation DeleteProduct($id: ID!) {\n\tdeleteProduct(id: $id) \n}":
    types.DeleteProductDocument,
  "\n  query userInfo {\n   userInfo {\n     id\n     fullName\n     avatar\n   }\n  }\n":
    types.UserInfoDocument,
  "\n query checkAuthenticated {\n   checkAuthenticated\n }\n":
    types.CheckAuthenticatedDocument,
  "\n  query userPermissions {\n   userPermissions\n  }\n":
    types.UserPermissionsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation UpdateProduct($input: ProductInput!) {\n\tupdateProduct(input: $input) {\n\t\tid\n\t\tname\n    price\n    special\n\t}\n}"
): (typeof documents)["mutation UpdateProduct($input: ProductInput!) {\n\tupdateProduct(input: $input) {\n\t\tid\n\t\tname\n    price\n    special\n\t}\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Product($id: ID!) {\n\tproduct(id: $id) {\n\t\tid\n\t\tname\n\t\tprice\n\t\tspecial\n\t}\n}"
): (typeof documents)["query Product($id: ID!) {\n\tproduct(id: $id) {\n\t\tid\n\t\tname\n\t\tprice\n\t\tspecial\n\t}\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query ProductList($filter: ProductFilterInput\n$sort: [ProductOrderByInput]\n$page: OffsetPageInput) {\n\tproductList(filter: $filter\nsort: $sort\npage: $page) {\ncontent {\t\tid\n\t\tname\n\t\tprice\n\t\tspecial\n}\t\ttotalElements\n\t}\n}"
): (typeof documents)["query ProductList($filter: ProductFilterInput\n$sort: [ProductOrderByInput]\n$page: OffsetPageInput) {\n\tproductList(filter: $filter\nsort: $sort\npage: $page) {\ncontent {\t\tid\n\t\tname\n\t\tprice\n\t\tspecial\n}\t\ttotalElements\n\t}\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation DeleteProduct($id: ID!) {\n\tdeleteProduct(id: $id) \n}"
): (typeof documents)["mutation DeleteProduct($id: ID!) {\n\tdeleteProduct(id: $id) \n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query userInfo {\n   userInfo {\n     id\n     fullName\n     avatar\n   }\n  }\n"
): (typeof documents)["\n  query userInfo {\n   userInfo {\n     id\n     fullName\n     avatar\n   }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n query checkAuthenticated {\n   checkAuthenticated\n }\n"
): (typeof documents)["\n query checkAuthenticated {\n   checkAuthenticated\n }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query userPermissions {\n   userPermissions\n  }\n"
): (typeof documents)["\n  query userPermissions {\n   userPermissions\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
