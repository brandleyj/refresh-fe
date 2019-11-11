import React from 'react';
import styled from 'styled-components';

const YourProfile = styled.h2`
position: absolute;
width: 231px;
height: 149px;
left: 51px;
top: 51px;

/* h2/Regular 30px */

font-family:'Roboto', sans-serif;
font-style: normal;
font-weight: normal;
font-size: 30px;
line-height: 35px;
display: flex;
align-items: center;

/* #959595 - Mid Grey 2 */

color: #959595;
`

const HeaderCard = () => {
  
    return (

      <div>
        <YourProfile>Your Profile</YourProfile>
      </div>

      
         
  );
    
  }
  
  export default HeaderCard;