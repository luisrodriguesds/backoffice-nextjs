import type { NextPage } from 'next'
import { useEffect } from 'react'
import ProductCatalogueOpco from '../components/ProductCatalogue/ProductCatalogueOpco/ProductCatalogueOpco'


const Home: NextPage = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      document.cookie = process.env.NEXT_PUBLIC_TOKEN || ''
      console.log(process.env.NODE_ENV)
    }
  }, [])

  return (
    <div>
      <ProductCatalogueOpco />
    </div>
  )
}

export default Home
