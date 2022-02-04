import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { http } from '../sdk/config/http-client'
import LoginBanner from "../../public/images/login_banner.png";

const Home: NextPage = () => {
  async function mainLoad(){
    try {
      const auth = await http.get('/users/authenticated')
    } catch (error) {
      console.log(error, 'error sso')
    }

    try {
      const api = axios.create()

      const sso = await api.get('/api/freeway/sso-url')
      console.log(sso.data)
      window.location = sso.data
    } catch (error) {
      console.log(error, 'error sso')
    }
  }
  
  useEffect(() => {
    // mainLoad()
    // if (process.env.NODE_ENV === 'development') {
    //   document.cookie = process.env.NEXT_PUBLIC_TOKEN || ''
    //   console.log(process.env.NODE_ENV)
    // }

    
  }, [])

  return (
    <Layout>
      <img src={LoginBanner.src} alt="main-scre" />
    </Layout>
  )
}

export default Home
