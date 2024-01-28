import React, { useState } from 'react';
import styled from 'styled-components';

const Tooltip = ({ text, children, customTextStyle }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <Container className='Tooltip'>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}  >
                {children}
            </div>

            {showTooltip &&(
                <div className='tooltip__text' style={customTextStyle}>
                    {text}
                </div>
            )}
        </Container>
    );
};

const Container = styled.div`
      position: relative;
    /* display:inline-block; */
     cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
 

  .tooltip__text {
    position: absolute;
    top: -190%;
    left: -10%;
    transform: translateX(-50%);
     background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 8px 12px;
     z-index: 1000;
    white-space: nowrap;
    text-align: center;
    font-size: 12px;
    transition: 0.5s ease-in-out;
   }
   @media only screen and (max-width:1120px){
     
   justify-content: center;
  
   }
`;

export default Tooltip;
