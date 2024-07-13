import React, { useState } from 'react';
import './styles.css';
import { CircularProgress } from '@mui/material';

function NewMarca() {
    const [marca, setMarca] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://creat-list-itens.onrender.com/add-marca', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ marca })
            });

            const data = await response.json();

            setTimeout(() => {
                setLoading(false);
            }, 1000);

            setMessage(data.message);
        } catch (error) {
            console.error('Erro ao adicionar marca:', error);
            setMessage('Erro ao adicionar marca');
        }
    };

    return (
        <>
            <div className='background-top' style={{ backgroundColor: '#FDDED9' }}>
                <div className='title-marca'>Adicione uma nova marca</div>
            </div>

            <form className='form-marca' onSubmit={handleSubmit}>
                <div className='title-input'>
                    <div style={{ background: 'white', textAlign: 'center', width: '45px' }}>Marca</div>
                </div>
                <input
                    className='input-marca'
                    type="text"
                    placeholder='EX: Produtos YPE'
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                />
                <button style={{ backgroundColor: '#FDDED9' }} className='buttom-salvar' type="submit">  {loading ? <CircularProgress size={20} /> : 'Salvar'}</button>
                {message && <div className='message'>{message}</div>}
            </form>
        </>
    );
}

export default NewMarca;
