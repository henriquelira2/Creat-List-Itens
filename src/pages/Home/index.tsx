import React from 'react'
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


import ImagenMiddle from "../../assets/click2.png";

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <div className='Container'>
                <div className='box left'></div>
                <div className='box middle'>
                    <img className="img-novalista" src={ImagenMiddle} alt="" />
                    <button className='btn-novalista'onClick={() => navigate("/Teste")}>Nova Lista</button>
                </div>
                <div className='box right'></div>
            </div>
            <Footer />
        </>
    )
}

export default Home


