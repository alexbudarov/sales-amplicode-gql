import { DevSupport } from "@react-buddy/ide-toolbox";
import { AdminContext, AdminUI, Loading, Resource } from "react-admin";
import { useAuthProvider } from "../authProvider/useAuthProvider";
import { getProductRecordRepresentation } from "../core/record-representation/getProductRecordRepresentation";
import { dataProvider } from "../dataProvider/graphqlDataProvider";
import { ComponentPreviews, useInitial } from "../dev";
import { i18nProvider } from "../i18nProvider";
import { AdminLayout } from "./AdminLayout";
import { ProductCreate } from "./screens/product/ProductCreate";
import { ProductEdit } from "./screens/product/ProductEdit";
import { ProductList } from "./screens/product/ProductList";

export const App = () => {
  const { authProvider, loading } = useAuthProvider();

  if (loading) {
    return (
      <Loading
        loadingPrimary="Loading"
        loadingSecondary="The page is loading, just a moment please"
      />
    );
  }

  return (
    <AdminContext
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
    >
      <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
        <AdminUI layout={AdminLayout} requireAuth={true}>
          <Resource
            name="Product"
            list={ProductList}
            recordRepresentation={getProductRecordRepresentation}
            create={ProductCreate}
            edit={ProductEdit}
          />
        </AdminUI>
      </DevSupport>
    </AdminContext>
  );
};
