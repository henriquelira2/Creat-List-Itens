import React, { useState, useEffect } from 'react';
import './styles.css';
import { CircularProgress } from '@mui/material';

interface Marca {
    marca: string;
}

function NewItem() {
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [selectedMarca, setSelectedMarca] = useState<string>('');
    const [newItem, setNewItem] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const response = await fetch('https://creat-list-itens.onrender.com/marcas');
                const data: Marca[] = await response.json();
                setMarcas(data);
            } catch (error) {
                console.error('Erro ao buscar marcas:', error);
            }
        };

        fetchMarcas();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://creat-list-itens.onrender.com/add-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ marca: selectedMarca, item: newItem }),
            });

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
            alert('Erro ao adicionar item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='background-top' style={{backgroundColor:'#90DFE6'}}>
                <div className='title-marca'>Adicione um nova item na lista</div>
            </div>

            <form className='form-marca' onSubmit={handleSubmit}>
                <div className='title-input'>
                    <div style={{ background: 'white', textAlign: 'center', width: '45px' }}>Marca</div>
                </div>
                <select 
                    name="marcas" 
                    id="marcas" 
                    className='input-select' 
                    required 
                    value={selectedMarca}
                    onChange={(e) => setSelectedMarca(e.target.value)}
                >
                    <option value="--">Select</option>
                    {marcas.map((marca, index) => (
                        <option key={index} value={marca.marca}>{marca.marca}</option>
                    ))}
                </select>
                <div className='title-input'>
                    <div style={{ background: 'white', textAlign: 'center', width: '45px' }}>Item</div>
                </div>
                <input 
                    className='input-item' 
                    type="text" 
                    placeholder='EX: AMACIANTE YPE ACONCHEGO 2LT' 
                    required 
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <button style={{backgroundColor:'#90DFE6'}} className='buttom-salvar' type="submit">  {loading ? <CircularProgress size={20} /> : 'Salvar'}</button>
            </form>
        </>
    );
}

export default NewItem;
