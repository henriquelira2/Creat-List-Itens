
import * as React from 'react';
import './styles.css'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

import ImagenProduct from "../../assets/produto-icon.png";
import ImagenItem from "../../assets/item-icon.png";
import NewMarca from '../../components/NewMarca';
import NewItem from '../../components/NewItem';

function NewProducts() {
    const [openModal1, setOpenModal1] = React.useState(false);
    const [openModal2, setOpenModal2] = React.useState(false);
    const handleOpenModal1 = () => setOpenModal1(true);
    const handleOpenModal2 = () => setOpenModal2(true);

    const handleCloseModal1 = () => setOpenModal1(false);
    const handleCloseModal2 = () => setOpenModal2(false);

    return (
        <>
            <Header />
            <div className='Container'>

                <div className='modal' style={{ backgroundColor: '#FDDED9' }}>
                    <img className="img-products" src={ImagenProduct} alt="" />
                    <button className='btn-novalista' onClick={handleOpenModal1}>Nova Marca</button>
                    <Modal
                        open={openModal1}
                        onClose={handleCloseModal1}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className='box-modal'>
                            <div className='close-modal' >
                                <button className='btn-close-modal' onClick={handleCloseModal1}> <CloseIcon /></button>
                            </div>
                            <NewMarca />
                        </Box>
                    </Modal>
                </div>

                <div className='modal' style={{ backgroundColor: '#90dfe6' }}>
                    <img className="img-products" src={ImagenItem} alt="" />
                    <button className='btn-novalista' onClick={handleOpenModal2}>Novo Item</button>
                    <Modal
                        open={openModal2}
                        onClose={handleCloseModal2}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className='box-modal'>
                            <div className='close-modal' >
                                <button className='btn-close-modal' onClick={handleCloseModal2}> <CloseIcon /></button>
                            </div>
                            <NewItem />
                        </Box>
                    </Modal>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default NewProducts
