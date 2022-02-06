import axios from 'axios'
import type { NextPage } from 'next'
import Image from "next/image";
import { useEffect } from 'react'
import { http } from '../sdk/config/http-client'
import LoginBanner from "../../public/images/login_banner.png";

const Home: NextPage = () => {

  return (
      <Image 
        alt="main-screen"
        src={LoginBanner}
        layout="fill"
        objectFit="cover"
        quality={100}
      />
  )
}

export default Home
