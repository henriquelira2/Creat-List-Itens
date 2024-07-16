import './styles.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Collapsible from '../../components/CollapsibleUpload';

import CircularProgress from '@mui/material/CircularProgress';

import PDF from '../../assets/PDF.png';

interface PdfFile {
    id: number;
    filename: string;
    uploaded_at: string;
}

const SaveList: React.FC = () => {
    const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingD, setLoadingD] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carregamento

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://creat-list-itens.onrender.com/pdf_files');
                if (Array.isArray(response.data)) {
                    // Ordenar os dados pelo ID de forma decrescente
                    const sortedData = response.data.sort((a: PdfFile, b: PdfFile) => b.id - a.id);
                    setPdfFiles(sortedData);
                    setIsLoading(false); // Finalizou o carregamento
                } else {
                    setError('Formato de resposta inesperado');
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                setError('Ocorreu um erro ao buscar os arquivos PDF.');
                console.error('Ocorreu um erro ao buscar os arquivos PDF!', error);
            }
        };

        fetchData();
    }, []);

    const handleDownload = async (id: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://creat-list-itens.onrender.com/pdf_files/${id}/download`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Lista-de-Itens-${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            setError('Ocorreu um erro ao buscar os arquivos PDF.');
            console.error('Ocorreu um erro ao buscar os arquivos PDF!', error);
        }
    };

    const handleDelete = async (id: number) => {
        setLoadingD(true);
        try {
            const response = await axios.delete(`https://creat-list-itens.onrender.com/pdf_files/${id}`);
            if (response.status === 200) {
                setPdfFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
                alert('Arquivo PDF deletado com sucesso');
            } else {
                alert('Erro ao deletar arquivo PDF');
            }
        } catch (error) {
            console.error('Erro ao deletar arquivo PDF:', error);
            alert('Erro ao deletar arquivo PDF');
        } finally {
            setLoadingD(false);
        }
    };

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="savelist">
                    <div className="loading" style={{ height: '100vh' }}><CircularProgress size={50} /></div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className='heigth-savelist'>
                <div className="savelist">
                    {error && <div className="error">{error}</div>}
                    {pdfFiles.map(file => (
                        <div className="box-item" key={file.id}>
                            <Collapsible title="Download">
                                <button
                                    style={{ backgroundColor: 'gray', color: 'white', width: '100%', padding: '5px' }}
                                    className='btn-collaps btn-upload'
                                    onClick={() => handleDownload(file.id)}
                                >
                                    {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Baixar'}
                                </button>
                                <button
                                    style={{ backgroundColor: 'gray', color: 'white', width: '100%', padding: '5px' }}
                                    className='btn-delete'
                                    onClick={() => handleDelete(file.id)}
                                >
                                    {loadingD ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Deletar'}
                                </button>
                            </Collapsible>
                            <div className="box-img-pdf">
                                <img className="img-pdf" src={PDF} alt={file.filename} />
                            </div>
                            <div className="sub-box-item">
                                <span className="box-item-title"> Lista de Produtos {file.id}</span>
                                <div className="sub-box-item-text">
                                    <span className="box-item-data"> {new Date(file.uploaded_at).toLocaleDateString()}</span>
                                    <span className="box-item-hora"> {new Date(file.uploaded_at).toLocaleTimeString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );


};

export default SaveList;
