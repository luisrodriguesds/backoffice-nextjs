import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Products } from '../../../sdk/models/interfaces/product-catalogue/product-catalogue-models';
// import { Products } from 'sdk/models/interfaces/product-catalogue/product-catalogue-models';
import { setCompleteControlData, setDataPlanData } from '../../../stores/product-catalogue';
import style from './ProductCatalogueAvaliableProducts.module.scss';

const ProductCatalogueAvaliableProducts: React.FC = () => {
  const dispatch = useDispatch();
  const [avaliableProducts, setAvaliableProducts] = useState([] as Products[]);
  const products = useSelector((state: any) => {
    return state.productCatalogue.catalogue.products;
  });

  const currentCountryProductTOC = useSelector((state: any) => {
    return state.productCatalogue.catalogue.currentCountry.productTOC;
  });

  const currentCountryCode = useSelector((state: any) => {
    return state.productCatalogue.catalogue.currentCountry.countryCode;
  });

  useEffect(() => {
    const newObj: Products[] = [];
    const alreadyShownProducts = [...currentCountryProductTOC[0].products, ...currentCountryProductTOC[1].products];

    if (alreadyShownProducts.length !== 0) {
      products.map((el: any) => {
        const index = alreadyShownProducts
          .map(function (e) {
            return e.productId;
          })
          .indexOf(el.id);

        const indexAvbProd = el.countries
          .map(function (e) {
            return e.countryCode;
          })
          .indexOf(currentCountryCode);

        if (el.deleted === false && index === -1 && indexAvbProd !== -1) newObj.push(el);
      });
    } else {
      products.map((el: any) => {
        const indexAvbProd = el.countries
          .map(function (e) {
            return e.countryCode;
          })
          .indexOf(currentCountryCode);
        if (el.deleted === false && indexAvbProd !== -1) newObj.push(el);
      });
    }
    setAvaliableProducts(newObj);
  }, [currentCountryCode, currentCountryProductTOC]);

  const addCompleteControl = (element) => {
    const newCompleteControl = [
      ...currentCountryProductTOC[0].products,
      { productId: element.id, priorityOrder: currentCountryProductTOC[0].products.length + 1 },
    ];

    dispatch(setCompleteControlData(newCompleteControl));
  };

  const addDataPlan = (element) => {
    const newCompleteControl = [
      ...currentCountryProductTOC[1].products,
      { productId: element.id, priorityOrder: currentCountryProductTOC[1].products.length + 1 },
    ];

    dispatch(setDataPlanData(newCompleteControl));
  };

  return (
    <div>
      <h3 className={style.tittle}>Avaliable Products</h3>
      <div className={style.divAvbProd}>
        {avaliableProducts.map((el: Products, index) => (
          <div key={Math.random()} className={style.itemAvbProd}>
            <h4 className={style.avbProd}>{el.name}</h4>
            <div className={style.divButtons}>
              <button className={style.whiteButton} onClick={() => addCompleteControl(el)}>
                Complete Control
              </button>
              <button className={style.whiteButton} onClick={() => addDataPlan(el)}>
                Data Plan Only
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalogueAvaliableProducts;
