import React, { ReactNode, useState } from "react";
// import "./Sidebar.scss";
import MenuItem from "../MenuItem/MenuItem";
import usePermission from '../../hooks/usePermissions';
import style from './Sidebar.module.scss';


//Menu Items Icons

import MenuIcon from '../../../public/icons/Menu.png';
import CloseIcon from '../../../public/icons/Close.png';

//import Menu

import menu from '../../constants/menu';


interface SidebarProps {
  userName? :string;
  permissionsList?: string[];
  children?: ReactNode;
  eventHandlers?: {
    routeTo: (identifier: string) => void
  }
}

const Sidebar: React.FC = (props: SidebarProps) => {
  const [showText, setShowText] = useState(false);
  const [hasPermission, hasDebugFeaturesPermission] = usePermission();
  const [active, setActive] = useState(-1);

  return (
    <div
      className={`${!showText ? style.sidebarReact : style.sidebarOpenReact}`}
      onMouseEnter={() => {
        setShowText(true);
      }}
      onMouseLeave={() => {
        setShowText(false);
      }}
    >
      <div
        className={style.sidebarTopReact}
        onClick={() => {
          setShowText(!showText);
        }}
      >
        {showText ? (
          <img
            alt="Close menu"
            className={style.sidebarMenuButtonReact}
            src={CloseIcon.src}
          />
        ) : (
          <img
            alt="Open menu"
            className={style.sidebarMenuButtonReact}
            src={MenuIcon.src}
          />
        )}
      </div>
      <div className={style.sidebarMenuIconsReact}>
        {menu.map((item, index) => (
          <div key={item.id} onClick={(e) => setActive(index)}>
            {item.auth
              && props.permissionsList
              && (hasPermission(item.Permission, props.permissionsList) || hasDebugFeaturesPermission(props.userName))
              && (<MenuItem
                animationClass={`${index === active ? "menuSelected" : "menuNotSelected"
                  }`}
                menuText={item.name}
                menuIcon={item.iconSrc}
                routeTo={() => props.eventHandlers?.routeTo(item.route)}
                route={item.route}
                setShowText={(value) => { setShowText(value) }}
              />
              )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default Sidebar;
