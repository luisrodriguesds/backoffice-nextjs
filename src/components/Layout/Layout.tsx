
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { http } from "../../sdk/config/http-client";
import Header from "../header/Header";
import HelloWorld from "../hello-world";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Layout.module.scss";
const permissionsList: string[] = [
  'CREATE_APPS',
  'CREATE_DEVICES',
  'CREATE_HARDWARE',
  'CREATE_PRODUCTS',
  'EDIT_APPS',
  'EDIT_DEVICES',
  'EDIT_HARDWARE',
  'EDIT_PRODUCTS',
  'TRIGGER_DEVICE_ACTION',
  'VIEW_APPS',
  'VIEW_CLIENT_CONFIG',
  'VIEW_DEVICES',
  'FAILED_DEVICES',
  'VIEW_CUSTOMERS',
  'VIEW_HARDWARE',
  'VIEW_TRANSLATIONS',
  'IMPORT_TRANSLATIONS',
  'DEPLOY_CONFIGURATIONS',
  'VIEW_USERS',
  'VIEW_PRODUCTS',
  'DEVICE_SHARE_VIEW',
  'DEVICE_SHARE_ACTION',
  'VIEW_REPORTS',
  'DELETE_APPS',
  'DELETE_DEVICES',
  'DELETE_HARDWARE',
  'DELETE_PRODUCTS',
  'VIEW_TACS',
  'CREATE_TACS',
  'UPDATE_TACS',
  'DELETE_TACS',
  'VIEW_RECIPE',
  'CREATE_RECIPE',
  'EDIT_RECIPE',
  'VIEW_FEATURE_TAG',
  'CREATE_FEATURE_TAG',
  'VIEW_TOC',
  'CREATE_TOC',
  'UPDATE_TOC',
  'VIEW_TELURI',
  'CREATE_TELURI',
  'UPDATE_TELURI',
  'DELETE_TELURI',
  'AEP_WRITE',
  'AEP_READ',
  'CREATE_ADDON',
  'UPDATE_ADDON',
  'DELETE_ADDON',
  'VIEW_ADDON',
  'DE', 'ES', 'GB', 'NL',
  'IT', 'PT', 'IE', 'ZA', 
  'GR', 'IS', 'MY', 'RO', 
  'HU', 'TR', 'CZ', 'AL',
];

const eventHandlers = {
  routeTo: () => console.log("routeTo")
}


const Layout: NextPage = ({ children }) => {
  const router = useRouter()

  async function mainLoad(){
    try {
      await http.get('/users/authenticated')
    } catch (error) {
      console.log(error)
      try {
        const api = axios.create()  
        const sso = await api.get('/api/freeway/sso-url')
        window.location = sso.data
      } catch (error) {
        console.log(error, 'error sso')
      }
    }
  }
  
  useEffect(() => {
    mainLoad()
  }, [router.asPath])

  return (
    <div className={styles.main}>
      <Header username="DevAppLocal" eventHandlers={eventHandlers} />
      <div className={styles.containerFluid}>
        <div className={styles.row}>
          <div className={styles.sidebar}>
            <Sidebar permissionsList={permissionsList} userName='react_dev_app_local@debugger.com'  />
          </div>
          <div className={styles.content}>
          {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;