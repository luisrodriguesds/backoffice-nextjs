import React, { useEffect, useState } from 'react';
import { Grid, InputLabel, TextField } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { setOpcoData, setCurrentCountryData } from '../../../stores/product-catalogue';
// import { OpcoService, ProductCatalogueServices } from 'sdk';
import opco from "./opco.json";
import style from './ProductCatalogueOpco.module.scss';

const ProductCatalogueOpco: React.FC = () => {
  const dispatch = useDispatch();
  const serviceAddons = useSelector((state: any) => state.serviceAddons)
  const [opcoList, setOpcoList] = useState<any[]>(opco);
  const [selectedOpco, setSelectedOpco] = useState<any>({
    callingCode: '',
    countryCode: '',
    countryName: '',
    currencyPattern: '',
    eligibilityCheckServiceId: '',
    locale: '',
  });

  // useEffect(() => {
  //   OpcoService.getOpco().then((res) => {
  //     setOpcoList(res.data);
  //     dispatch(setOpcoData(res.data));
  //   });
  // }, []);

  function handleOpcoChange(
    event: React.ChangeEvent<{}>,
    newValue: {
      callingCode: string;
      countryCode: string;
      countryName: string;
      currencyPattern: string;
      eligibilityCheckServiceId: string;
      locale: string;
    }
  ) {
    async function setStates(newValue: any) {
      setSelectedOpco(newValue);
      const currentCountryEmpty = {
        history: [],
        countryCode: newValue.countryCode,
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
      // await ProductCatalogueServices.getProductCatalogueByCountry(newValue.countryCode)
      //   .then((res) => {
      //     const completeControlProds = res.data.productTOC.filter((el) => el.category === 'complete_control');
      //     const dataPlanProds = res.data.productTOC.filter((el) => el.category === 'data_plan_only');
      //     const currentCountry = {
      //       history: res.data.history,
      //       countryCode: newValue.countryCode,
      //       productTOC: [
      //         {
      //           category: 'complete_control',
      //           products: completeControlProds.length ? completeControlProds[0].products : [],
      //         },
      //         {
      //           category: 'data_plan_only',
      //           products: dataPlanProds.length ? dataPlanProds[0].products : [],
      //         },
      //       ],
      //     };

      //     dispatch(setCurrentCountryData(currentCountry));
      //   })
      //   .catch((res) => {
      //     const currentCountryEmpty = {
      //       history: [],
      //       countryCode: newValue.countryCode,
      //       productTOC: [
      //         {
      //           category: 'complete_control',
      //           products: [],
      //         },
      //         {
      //           category: 'data_plan_only',
      //           products: [],
      //         },
      //       ],
      //     };
      //     dispatch(setCurrentCountryData(currentCountryEmpty));
      //   });
    }
    setStates(newValue);
  }

  return (
    <div className={style.container}>
      {console.log(serviceAddons)}
      <Grid container direction='row'>
        <Grid item xs={6}>
          <InputLabel
            classes={{ root: style.labelSelectOpco }}
            children='Edit and publish the products to be shown in VApp'
          />
          {opcoList && opcoList.length ? (
            <div className={style.opcoInput}>
              <Autocomplete
                className={style.autocomplete}
                aria-label='Country'
                id='Country'
                options={opcoList}
                getOptionLabel={(option) => option.countryName}
                value={selectedOpco}
                onChange={(event, newValue) => {
                  handleOpcoChange(event, newValue);
                }}
                renderInput={(params) => <TextField {...params} placeholder='Select Opco' variant='outlined' />}
                disableClearable
              />
            </div>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductCatalogueOpco;
