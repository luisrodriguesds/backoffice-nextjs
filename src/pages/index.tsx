import type { NextPage } from 'next'
import ProductCatalogueOpco from '../components/ProductCatalogue/ProductCatalogueOpco/ProductCatalogueOpco'
import { Provider } from 'react-redux'
import store from "../stores/store";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Nextjs</h1>
      <Provider store={store}>
        <ProductCatalogueOpco />
      </Provider>
    </div>
  )
}

export default Home
