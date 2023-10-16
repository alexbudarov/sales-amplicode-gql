import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import {
  BooleanInput,
  Create,
  SimpleForm,
  TextInput,
  useCreate,
  useNotify,
  useRedirect,
} from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { BigDecimalNumberInput } from "../../../core/components/number/BigDecimalNumberInput";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";

const UPDATE_PRODUCT = gql(`mutation UpdateProduct($input: ProductInput!) {
	updateProduct(input: $input) {
		id
		name
    price
    special
	}
}`);

export const ProductCreate = () => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [create] = useCreate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_PRODUCT } };
        const options = { returnPromise: true };

        await create("Product", params, options);

        notify("ra.notification.created", { messageArgs: { smart_count: 1 } });
        redirect("list", "Product");
      } catch (response: any) {
        console.log("create failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [create, notify, redirect]
  );

  return (
    <Create<ItemType> redirect="list">
      <SimpleForm onSubmit={save}>
        <TextInput source="name" required={true} />
        <BigDecimalNumberInput source="price" required={true} />
        <BooleanInput source="special" />
      </SimpleForm>
    </Create>
  );
};

const PRODUCT_TYPE = gql(`query Product($id: ID!) {
	product(id: $id) {
		id
		name
		price
		special
	}
}`);

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PRODUCT_TYPE>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["product"], undefined>;
