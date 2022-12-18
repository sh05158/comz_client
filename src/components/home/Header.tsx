import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  align-items: center;
  justify-content: center;
    width: 100%;
    height: 0px;
    padding-top: 0px;
    & img {
        display: block;
        margin: 0 auto;
    }
`;

const Header: React.FC = () => {
    return(
        <Wrapper>
            {/* <img src='/asset/kakao_logo.png' alt="logo"/> */}
        </Wrapper>
    )
}

export default Header;
