import React from 'react';
import styled from 'styled-components';

const Rectangle14 = styled.div`
position: absolute;
width: 147px;
height: 204px;
left: 58px;
top: 467px;

/* #EAEAEA - Background Grey */

background: #EAEAEA;
border-radius: 3px;
`
const WaterFont = styled.div`
position: absolute;
width: 112px;
height: 20px;
left: 76px;
top: 492px;

/* h5/Regular 18px */

font-family: 'Roboto', sans-serif;;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 21px;
display: flex;
align-items: center;

/* #959595 - Mid Grey 2 */

color: #959595;
`
const CupsText=styled.h5`
position: absolute;
width: 106px;
height: 22px;
left: 79px;
top: 606px;

/* h5/Medium 18px */

font-family: 'Roboto', sans-serif;;
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 21px;
display: flex;
align-items: center;

/* #959595 - Mid Grey 2 */

color: #959595;
`
const Of8Text =styled.h6`
position: absolute;
width: 50px;
height: 16px;
left: 105px;
top: 632px;

/* Text/Regular 14px */

font-family: 'Roboto', sans-serif;;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 16px;
display: flex;
align-items: center;

/* #959595 - Mid Grey 2 */

color: #959595;
`
//This component tracks user water intake
const WaterCard = () => {
  
  return (
    <div>  
    <Rectangle14/>
      <WaterFont>
        Water Tracker
      </WaterFont>
      <CupsText>
        6 cups so far
      </CupsText>
      <Of8Text>
        out of 8
      </Of8Text>
    </div>
      
    
);
  
}

export default WaterCard;