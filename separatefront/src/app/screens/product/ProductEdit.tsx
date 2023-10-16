import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import {
  BooleanInput,
  Edit,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
  useUpdate,
} from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { BigDecimalNumberInput } from "../../../core/components/number/BigDecimalNumberInput";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";

const PRODUCT = gql(`query Product($id: ID!) {
	product(id: $id) {
		id
		name
		price
		special
	}
}`);
const UPDATE_PRODUCT = gql(`mutation UpdateProduct($input: ProductInput!) {
	updateProduct(input: $input) {
		id
		name
    price
    special
	}
}`);

export const ProductEdit = () => {
  const queryOptions = {
    meta: {
      query: PRODUCT,
      resultDataPath: null,
    },
  };

  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_PRODUCT } };
        const options = { returnPromise: true };

        await update("Product", params, options);

        notify("ra.notification.updated", { messageArgs: { smart_count: 1 } });
        redirect("list", "Product");
      } catch (response: any) {
        console.log("update failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
    },
    [update, notify, redirect]
  );

  return (
    <Edit<ItemType> mutationMode="pessimistic" queryOptions={queryOptions}>
      <SimpleForm onSubmit={save}>
        <TextInput source="name" required={true} />
        <BigDecimalNumberInput source="price" required={true} />
        <BooleanInput source="special" />
      </SimpleForm>
    </Edit>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PRODUCT>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["product"], undefined>;
