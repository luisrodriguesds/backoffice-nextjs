import React, { useEffect } from "react";
import style from "./IconTableField.module.scss";
import MaskImg from "../Png/mask.png";
import { useState } from "react";

interface AppsPageProps {
  icon: any;
  promisseFunc: any;
}

const IconTableField: React.FC<AppsPageProps> = ({ icon,  promisseFunc}) => {
  const [imgSrc, setImgSrc] = useState('');
  let fullSrc = '';
  useEffect(() => {
    if(icon?.url !== undefined) setImgSrc(icon.url);
    else if (icon?.id !== undefined) {
      promisseFunc(icon.id).then((appImg) => {
        if (appImg.config && appImg.config.url) {
          fullSrc = appImg.config.baseURL + appImg.config.url;
          setImgSrc(fullSrc);
        }
      })
    }
    else setImgSrc('null');
    
  }, []);
  return (
    <>
      {imgSrc !== 'null' &&
        <div
          className={style.container}
          style={{ backgroundImage: `url(${MaskImg})` }}
        >
          <img className={style.image} src={imgSrc} />
        </div>}
    </>
  );
};

export default IconTableField;
