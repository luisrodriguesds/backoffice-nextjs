import Link from "next/link";
import React from "react";
// import "./Header.scss";
import InfoIcon from '../../../public/icons/Info.png';
import style from './Header.module.scss';


interface HeaderProps {
  username: string;
  eventHandlers: {
    routeTo()
  }
}

const Header: React.FC <HeaderProps> = (props:HeaderProps) => {
  return (
    <Link href={'/'} passHref>    
      <div className={style.headerReact}> 
        <img alt="Info" className={style.sidebarInfoReact} src={InfoIcon.src} onClick={() => {props.eventHandlers.routeTo();}} />
        <span className={style.usernameTextReact}>{props.username}</span>
      </div>
    </Link>
  )
}

export default Header;



