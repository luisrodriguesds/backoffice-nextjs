import React from 'react';

import upIcon from '../../../../public/icons/up.png';
import downIcon from '../../../../public/icons/down.png';
import xIcon from '../../../../public/icons/x.png';

import styles from './VDF_TableOrdenated.module.scss';
import { useDispatch } from 'react-redux';
import { setDeviceUidInputData } from '../../../stores/product-form';

interface VDF_TalbleOrdenatedProps {
  rows: Array<RowData>;
  setRows: Function;
  content: any;
  tags?: string[];
  hasTitle?: boolean;
  title?: string;
  emptyMessage?: string;
}

type RowData = {
  name: string;
  label: string;
};

const VDF_TableOrdenated: React.FC<VDF_TalbleOrdenatedProps> = ({
  rows,
  setRows,
  content,
  hasTitle = false,
  title = '',
  emptyMessage = '',
  tags,
}) => {
  const dispatch = useDispatch();
  const handleUp = (index: number) => {
    const current = rows[index];
    const above = rows[index - 1];

    rows.splice(index, 1, above);
    rows.splice(index - 1, 1, current);

    setRows([...rows]);
    onRowChange(rows, tags);
  };

  const handleDown = (index: number) => {
    const current = rows[index];
    const below = rows[index + 1];

    rows.splice(index, 1, below);
    rows.splice(index + 1, 1, current);

    setRows([...rows]);
    onRowChange(rows, tags);
  };

  const handleRemove = (index: number) => {
    rows.splice(index, 1);
    setRows([...rows]);
    onRowChange(rows, tags);
  };

  function onRowChange(rows) {
    const finalObj = [];
    rows.map((item: any, position: any) => {
      if (item.name === 'bluetooth') {
        finalObj.push({
          preference: position + 1,
          input: item.name,
          additionalInfo: {
            keyPrefixes: tags,
          },
        });
      } else {
        finalObj.push({
          preference: position + 1,
          input: item.name,
        });
      }
    });
    dispatch(setDeviceUidInputData(finalObj));
  }

  const tableButtonUp = (index) => (
    <>{index !== 0 && <img onClick={() => handleUp(index)} src={upIcon} alt='upArrow' />}</>
  );

  const tableButtonDown = (index) => (
    <>{index < rows.length - 1 && <img onClick={() => handleDown(index)} src={downIcon} alt='downArrow' />}</>
  );

  const tableButtonRemove = (index) => <img onClick={() => handleRemove(index)} src={xIcon} alt='remove' />;

  const tableContent = (index, row) => (
    <div className={styles.tableDiv}>
      <div className={styles.topContent}>
        <div>
          <span className={styles.indexTab}>{index + 1}.</span> {row.label ? row.label : row.name}
        </div>
        <div className={styles.buttonsDiv}>
          {tableButtonUp(index)}
          {tableButtonDown(index)}
          {tableButtonRemove(index)}
        </div>
      </div>
      <div>{content(row)}</div>
    </div>
  );
  return (
    <div className={styles.tableContainer}>
      <table>
        {hasTitle && (
          <thead>
            <tr>
              <th className={styles.tableTitle}>{title}</th>
            </tr>
          </thead>
        )}

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className={styles.tdLine}>{tableContent(index, row)}</td>
            </tr>
          ))}
          {rows.length === 0 && emptyMessage !== '' && (
            <tr>
              <td>
                <h3 className={styles.emptyMessage}>{emptyMessage}</h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default VDF_TableOrdenated;
