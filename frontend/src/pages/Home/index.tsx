import React from 'react'
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


import ImagenMiddle from "../../assets/click1.png";
import ImagenLeft from "../../assets/image_processin2.png";
import ImagenRight from "../../assets/image_processin5.png";

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <div className='Container'>

                <div className='box left'>
                    <button className='btn-lista' onClick={() => navigate("/Listas-Salvas")}>Listas Salvas</button>
                    <img className="img-lista" src={ImagenLeft} alt="" />
                </div>

                <div className='box middle'>
                    <img className="img-novalista" src={ImagenMiddle} alt="" />
                    <button className='btn-novalista' onClick={() => navigate("/Nova-Lista")}>Nova Lista</button>
                </div>

                <div className='box right'>
                    <button className='btn-lista' onClick={() => navigate("/Novos-Produtos")} style={{fontSize:'20px'}}>Novos Produtos</button>
                    <img className="img-storege" src={ImagenRight} alt="" />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home


