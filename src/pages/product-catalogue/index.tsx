import { NextPage } from "next"
import ProductCataloguePage from "../../components/ProductCatalogue/ProductCataloguePage/ProductCataloguePage"


const ProductCatalogueNextPage: NextPage = (props) => {
  return (
    <ProductCataloguePage permissionsList={[]} />
  )
}

export default ProductCatalogueNextPage
