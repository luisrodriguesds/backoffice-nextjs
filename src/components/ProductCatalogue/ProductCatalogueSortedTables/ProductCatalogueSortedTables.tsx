import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VDF_TableOrdenated from '../../shared/VDF_TableOrdenated/VDF_TableOrdenated';
import { ProductCatalogueServices } from 'sdk';
import { OrdenatedTableModel } from 'sdk/models/interfaces/product-catalogue/product-catalogue-models';
import { setCompleteControlData, setDataPlanData } from '../../../stores/product-catalogue';
import style from './ProductCatalogueSortedTables.module.scss';

type RowData = {
  name: string;
};

const ProductCatalogueSortedTables: React.FC = () => {
  const dispatch = useDispatch();
  const [rowsCompleteData, setRowsCompleteData] = useState<RowData[]>([]);
  const [rowsDataPlan, setRowsDataPlan] = useState<RowData[]>([]);

  const currentCountryProductTOC = useSelector((state: any) => {
    return state.productCatalogue.catalogue.currentCountry.productTOC;
  });

  const products = useSelector((state: any) => {
    return state.productCatalogue.catalogue.products;
  });

  useEffect(() => {
    const newObj: RowData[] = [];
    async function InitCompleteControl() {
      if (currentCountryProductTOC[0].products) {
        currentCountryProductTOC[0].products.map((el) => {
          const results = products.filter((item) => item.id === el.productId);
          if (results.length === 0) {
            ProductCatalogueServices.getProductDeletedById(el.productId).then((res) => {
              newObj.push({ name: res.data.name });
            });
          }
          if (results.length !== 0) {
            newObj.push({ name: results[0].name });
          }
        });
      }
      await setRowsCompleteData(newObj);
    }

    InitCompleteControl();
    //////////////////////////////////////////////////////////////////////////////

    async function InitDataPlan() {
      const newObj2: RowData[] = [];
      if (currentCountryProductTOC[1]?.products) {
        currentCountryProductTOC[1].products.map((el) => {
          const results = products.filter((item) => item.id === el.productId);
          if (results.length === 0) {
            ProductCatalogueServices.getProductDeletedById(el.productId).then((res) => {
              newObj2.push({ name: res.data.name });
            });
          }
          if (results.length !== 0) newObj2.push({ name: results[0].name });
        });
      }
      setRowsDataPlan(newObj2);
    }
    InitDataPlan();
  }, [currentCountryProductTOC]);

  const handleSetRowCompleteData = (rowData) => {
    setRowsCompleteData(rowData);

    const newObj: OrdenatedTableModel[] = [];
    rowData.map((el, index) => {
      const results = products.filter((item) => item.name === el.name);
      newObj.push({
        name: el.name,
        priorityOrder: index + 1,
        productId: results[0].id,
      });
    });
    dispatch(setCompleteControlData(newObj));
  };

  const handleSetRowDataPlan = (rowData) => {
    setRowsCompleteData(rowData);

    const newObj: OrdenatedTableModel[] = [];
    rowData.map((el, index) => {
      const results = products.filter((item) => item.name === el.name);
      newObj.push({
        name: el.name,
        priorityOrder: index + 1,
        productId: results[0].id,
      });
    });
    dispatch(setDataPlanData(newObj));
  };

  return (
    <div className={style.container}>
      <div className={style.gridItem}>
        {currentCountryProductTOC[0].products ? (
          <VDF_TableOrdenated
            rows={rowsCompleteData}
            setRows={handleSetRowCompleteData}
            content={() => <></>}
            hasTitle={true}
            title={'Complete Control'}
            emptyMessage={'No products under this category'}
          />
        ) : (
          ''
        )}
      </div>
      <div className={style.gridItem}>
        {currentCountryProductTOC[1]?.products && (
          <VDF_TableOrdenated
            rows={rowsDataPlan}
            setRows={handleSetRowDataPlan}
            content={() => <></>}
            hasTitle={true}
            title={'Data Plan only'}
            emptyMessage={'No products under this category'}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCatalogueSortedTables;
