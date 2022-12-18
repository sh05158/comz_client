import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { HomeContainer } from '~/containers';
import { Redirect } from "react-router-dom"; //import Redirect first
// import logo from "~/asset/logo_new.png";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: #E6A996;
    padding: 25px 0;
`;

const box_init = {
    opacity: "0",
};

const box_active = {
    opacity: "1",
    transition: "opacity 4000ms , visibility 4000ms",
};

const box_hidden = {
    opacity: "0",
    transition: "opacity 4000ms , visibility 4000ms",
};



const Home: React.FC = () => {

    const [value, setValue] = useState(0);

    const [loading,setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        },6000);
    },[]);

    useEffect(() => {
        console.log(loading);
    },[loading]);


    useEffect(function(){
       if(value == 0){
           setValue(1);

           setTimeout(function(){
               // @ts-ignore

               setValue(2);


           },3000);

       }


    }, [value]);

    if(loading){
        return <Redirect to="/room" />
    }


    return(
        <Wrapper>
            <img id="splashImage" src="asset/logo_new.png" style={value == 0 ? box_init : (value == 1 ? box_active : box_hidden)} alt="logo" />
            <HomeContainer/>
        </Wrapper>


    )
}

export default Home;