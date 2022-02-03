import React, { useEffect, useState } from "react";
//import countries from "./countriesName.json";
import { ProductsServices } from 'sdk';
import style from "./CountryTag.module.scss";

interface CountryPageProps {
  country: any;
  status: string;
  opcoList: any;
}



const CountryTag: React.FC<CountryPageProps> = ({ country, status, opcoList }) => {
  const [countryName, setCountryName] = useState<any>(
    {}
  );
  useEffect(() => {
    opcoList.forEach(element => {
      if (element.countryCode === country) {
        setCountryName(element)
      }
    });
  }, [country]);

  let tagClass = "";
  switch (status) {
    case "ACTIVE":
      tagClass = style.active;
      break;
    case "FOR_TESTING":
      tagClass = style.active;
      break;
    case "INACTIVE":
      tagClass = style.desactive;
      break;
    case "NOT_AVAILABLE":
      tagClass = style.null;
      break;
  }

  return (
    <div title={status} className={style.container}>
      <h4 className={`${style.tag} ${tagClass}`}> {countryName.countryName}</h4>
    </div>
  );
};

export default CountryTag;
