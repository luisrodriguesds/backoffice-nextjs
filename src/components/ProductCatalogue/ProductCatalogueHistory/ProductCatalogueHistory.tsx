import React, { useEffect, useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import style from './ProductCatalogueHistory.module.scss';
import { useSelector } from 'react-redux';

const ProductCatalogueHistory: React.FC = () => {
  const [historyList, setHistoryList] = useState<any>([]);

  const currentCountryHistory = useSelector((state: any) => {
    return state.productCatalogue.catalogue.currentCountry.history;
  });

  useEffect(() => {
    setHistoryList([...currentCountryHistory].reverse());
  }, [JSON.stringify(currentCountryHistory)]);

  return (
    <div className={style.container}>
      <h3 className={style.tittle}>Audit History</h3>
      <TableContainer className={style.tableContainer} component={Paper}>
        <Table className='tableContainer' stickyHeader classes={{ root: style.table }}>
          <TableHead>
            <TableRow>
              <TableCell align='left' component='th'>
                <b className={style.tableTitle}>Date</b>
              </TableCell>
              <TableCell align='left' component='th'>
                <b className={style.tableTitle}>User</b>
              </TableCell>
              <TableCell align='left' component='th'>
                <b className={style.tableTitle}>Change</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyList.map((item, index) => (
              <TableRow key={index}>
                <TableCell align='left' component='td'>
                  <h3 className={style.tableCell}>{item.activityDate}</h3>
                </TableCell>
                <TableCell align='left' component='td'>
                  <h3 className={style.tableCell}>{item.email}</h3>
                </TableCell>
                <TableCell align='left' component='td'>
                  <h3 className={style.tableCell}>{item.activity}</h3>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductCatalogueHistory;
