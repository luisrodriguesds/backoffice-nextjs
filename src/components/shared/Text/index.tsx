// import * as React from 'react';
// import { ITextProps } from './configs';
// import Svg from '../Svg';

// const Text = ({ title, text }: ITextProps) => {
//   const styleH4 = {
//     fontStyle: 'normal',
//     fontWeight: 'bold',
//     fontSize: '20px',
//     lineHeight: '23px',
//   };

//   const styleP = {
//     fontStyle: 'normal',
//     fontWeight: 'normal',
//     fontSize: '14px',
//     lineHeight: '16px',
//   };

//   const styleCenter = {
//     textAlign: 'center',
//   };

//   const resolveText = () => {
//     if (text instanceof Array) {
//       return text.map((p) => <p style={styleP}>{p}</p>);
//     } else {
//       return <p style={styleP}>{text}</p>;
//     }
//   };

//   return (
//     <div style={styleCenter}>
//       {title && <h4 style={styleH4}>{title}</h4>}
//       {text && resolveText()}
//     </div>
//   );
// };

// export default Text;
