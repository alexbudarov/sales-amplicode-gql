import { Product } from "../../gql/graphql";

export function getProductRecordRepresentation(entityInstance?: Partial<Product> | null): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.name != null) {
    return String(entityInstance.name);
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
