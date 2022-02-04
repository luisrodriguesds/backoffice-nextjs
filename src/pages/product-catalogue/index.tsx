import { NextPage } from "next"
import Layout from "../../components/Layout/Layout"
import ProductCataloguePage from "../../components/ProductCatalogue/ProductCataloguePage/ProductCataloguePage"


const ProductCatalogueNextPage: NextPage = (props) => {
  return (
    <Layout>
      <ProductCataloguePage permissionsList={[]} />
    </Layout>
  )
}

export default ProductCatalogueNextPage
