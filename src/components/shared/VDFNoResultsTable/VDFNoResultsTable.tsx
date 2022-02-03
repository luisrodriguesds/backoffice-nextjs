import React from 'react';

import style from './VDFNoResultsTable.module.scss';

const VDFNoResultsTable = () => {
  return (
    <div className={style.flexContainer}>
      <div className={style.noResultsContainer}>
        <h3>No results found</h3>
        <h4>We couldn’t find what you’re looking for.</h4>
      </div>
    </div>
  );
};

export default VDFNoResultsTable;
