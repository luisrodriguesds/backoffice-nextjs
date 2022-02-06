import Link from "next/link";
import React, { useEffect, useState } from "react";
// import "./MenuItem.scss";
import style from './MenuItem.module.scss';


//str.replace(/ /g, '')

interface MenuItemProps {
  menuText: string;
  menuIcon: string;
  animationClass: string;
  routeTo();
  setShowText(value: boolean);
  route: string
}

const MenuItem: React.FC<MenuItemProps> = ({ menuText, menuIcon, animationClass, routeTo, setShowText, route }: MenuItemProps) => {
  //const iconUrl = menuText.replace(/ /g, "");

  const [active, setActive] = useState(false);

  useEffect(() => {
    animationClass === "menuSelected" ? setActive(true) : setActive(false);
  }, [animationClass]);

  return (
    <Link passHref href={`/${route}`}>
    <a className={style.menuContainerReact}>
      <img style={{ backgroundColor: `${active ? "#dfdfdf" : ""}` }} onClick={() => { setShowText(false); }} onMouseEnter={() => { setShowText(true); }}
        className={style.menuImageReact} src={menuIcon} />
      <h1 style={{ backgroundColor: `${active ? "#dfdfdf" : ""}`, fontWeight: `${active ? "bold" : "normal"}` }}
        onClick={() => { setShowText(false); }} onMouseEnter={() => { setShowText(true); }} className={`${style.menuTextReact} ${animationClass}`} >{menuText}</h1>
    </a>
    </Link>
  );
};

export default MenuItem;
