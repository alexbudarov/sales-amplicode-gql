import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  BooleanField,
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  NumberInput,
  TextField,
  TextInput,
} from "react-admin";

const PRODUCT_LIST = gql(`query ProductList($filter: ProductFilterInput
$sort: [ProductOrderByInput]
$page: OffsetPageInput) {
	productList(filter: $filter
sort: $sort
page: $page) {
content {		id
		name
		price
		special
}		totalElements
	}
}`);

const DELETE_PRODUCT = gql(`mutation DeleteProduct($id: ID!) {
	deleteProduct(id: $id) 
}`);

export const ProductList = () => {
  const queryOptions = {
    meta: {
      query: PRODUCT_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

  const filters = [
    <TextInput source="name" />,
    <NumberInput source="priceMax" />,
    <NumberInput source="priceMin" />,
  ];

  return (
    <List<ItemType> queryOptions={queryOptions} exporter={false} filters={filters}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" sortable={false} />

        <TextField source="name" />
        <NumberField source="price" />
        <BooleanField source="special" sortable={false} />

        <EditButton />
        <DeleteButton
          mutationMode="pessimistic"
          mutationOptions={{ meta: { mutation: DELETE_PRODUCT } }}
        />
      </Datagrid>
    </List>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PRODUCT_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["productList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;
