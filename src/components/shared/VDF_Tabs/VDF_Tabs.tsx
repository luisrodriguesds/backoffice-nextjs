import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import style from './VDF_Tabs.module.scss';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}>
      {value === index && (
        <div className={style.tabItemContent}>
          <Box p={3}>{children}</Box>
        </div>
      )}
    </div>
  );
};

const VDF_Tabs = ({ tabTitle, tabContent, value, setValue, transparent = false }) => {
  // const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={style.container}>
      <div className={!transparent ? style.tabs : style.tabsTransparent}>
        <Tabs value={value} onChange={handleChange} TabIndicatorProps={{ style: { background: 'black' } }}>
          {tabTitle.map((el, index) => (
            <Tab key={Math.random()} label={el} />
          ))}
        </Tabs>

        {tabContent.map((el, index) => (
          <TabPanel key={Math.random()} value={value} index={index}>
            {el}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

export default VDF_Tabs;
