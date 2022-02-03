import React, { useEffect, useState, useMemo } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import ProductCatalogueOpco from '../ProductCatalogueOpco/ProductCatalogueOpco';
import style from './ProductCataloguePage.module.scss';
import ProductCatalogueSortedTables from '../ProductCatalogueSortedTables/ProductCatalogueSortedTables';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCountryData, setProductsData } from '../../../stores/product-catalogue';
// import { ProductCatalogueServices, ProductsServices } from 'sdk';
import ProductCatalogueAvaliableProducts from '../ProductCatalogueAvaliableProducts/ProductCatalogueAvaliableProducts';
import ProductCatalogueHistory from '../ProductCatalogueHistory/ProductCatalogueHistory';
import Button from '../../shared/Button/Button';
import VDFToast from '../../shared/VDFToast/VDFToast';
import VDFErrorMessage from '../../shared/VDFErrorMessage/VDFErrorMessage';
import usePermission from '../../../hooks/usePermissions';
import { ProductCatalogueServices, ProductsServices } from '../../../sdk';

interface ProductCataloguePageProps {
  permissionsList: string[];
}

const ProductCataloguePage: React.FC<ProductCataloguePageProps> = (props: ProductCataloguePageProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [publishedMessage, setPublishedMessage] = useState(false);
  const [hasAPIError, setHasAPIError] = React.useState(false);
  const [apiErrorMessage, setAPIErrorMessage] = React.useState('');

  const createTOC = 'CREATE_TOC';
  const updateTOC = 'UPDATE_TOC';
  const [hasPermission] = usePermission();

  let checkIfHasPermission = (permissionsName) => {
    let perm = hasPermission(permissionsName, props.permissionsList);
    return perm;
  };

  const currentCountryCode = useSelector((state: any) => {
    return state.productCatalogue.catalogue.currentCountry.countryCode;
  });

  const currentCountryProductTOC = useSelector((state: any) => {
    return state.productCatalogue.catalogue.currentCountry.productTOC;
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [prod] = await Promise.all([ProductsServices.getProducts()]);

      dispatch(setProductsData([...prod.data]));
      setLoading(false);
    }

    load();
  }, []);

  const currentCountry = useSelector((state: any) => {
    return state.productCatalogue.catalogue.currentCountry.countryCode;
  });

  const handleSave = () => {
    ProductCatalogueServices.registerSave(currentCountry, currentCountryProductTOC)
      .then((res) => {
        setSaved(true);
        setSavedMessage(true);
        setPublishedMessage(false);
        reFetchDataToUpdate();
      })
      .catch((err) => {
        setError(err);
      });
  };

  const reFetchDataToUpdate = () => {
    ProductCatalogueServices.getProductCatalogueByCountry(currentCountryCode)
      .then((res) => {
        dispatch(setCurrentCountryData({ ...res.data, countryCode: currentCountryCode }));
      })
      .catch((res) => {
        const currentCountryEmpty = {
          history: [],
          countryCode: currentCountryCode,
          productTOC: [
            {
              category: 'complete_control',
              products: [],
            },
            {
              category: 'data_plan_only',
              products: [],
            },
          ],
        };
        dispatch(setCurrentCountryData(currentCountryEmpty));
      });
  };

  const handlePublish = () => {
    ProductCatalogueServices.registerPublish(currentCountry, currentCountryProductTOC)
      .then((res) => {
        setSavedMessage(false);
        setPublishedMessage(true);
        reFetchDataToUpdate();
      })
      .catch((err) => {
        setError(err);
      });
  };

  function setError(err): void {
    setSavedMessage(false);
    setPublishedMessage(false);
    setHasAPIError(true);
    setAPIErrorMessage(err.data.message);
  }

  return (
    <div className={style.pageContainer}>
      {loading ? (
        <div className={style.centerPage}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <h1 className={style.pageTittle}>Product Catalogue</h1>
          <ProductCatalogueOpco />
          {currentCountry !== '' && (
            <>
              <Grid container className={style.gridContainer}>
                <Grid item xs={6} className={style.gridTables}>
                  <ProductCatalogueSortedTables />
                </Grid>
                <Grid item xs={6} className={style.gridItem}>
                  <ProductCatalogueAvaliableProducts />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} className={style.actionsGrid}>
                  <div>
                    {saved && savedMessage && !publishedMessage && (
                      <VDFToast
                        type='success'
                        text='The product table of content was successfully updated'
                        closeButton={true}
                        onClose={() => setSavedMessage(false)}
                      />
                    )}
                    {!savedMessage && publishedMessage && (
                      <VDFToast
                        type='success'
                        text='Product was successfully published'
                        closeButton={true}
                        onClose={() => setPublishedMessage(false)}
                      />
                    )}
                    {hasAPIError && <VDFErrorMessage errorMessage={apiErrorMessage} />}
                  </div>
                  <div className={style.buttonGrid}>
                    {saved && checkIfHasPermission(createTOC) && (
                      <Button color='white' text='Publish' clickFn={handlePublish} />
                    )}
                    {checkIfHasPermission(updateTOC) && <Button color='black' text='Save' clickFn={handleSave} />}
                  </div>
                </Grid>
                <Grid item xs={12} className={style.gridItem}>
                  <ProductCatalogueHistory />
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCataloguePage;
