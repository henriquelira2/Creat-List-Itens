import './styles.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Collapsible from '../../components/CollapsibleUpload';

import PDF from '../../assets/PDF.png';

interface PdfFile {
    id: number;
    filename: string;
    uploaded_at: string;
}

const SaveList: React.FC = () => {
    const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/pdf_files');
                if (Array.isArray(response.data)) {
                    setPdfFiles(response.data);
                } else {
                    setError('Unexpected response format');
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                setError('There was an error fetching the PDF files.');
                console.error('There was an error fetching the PDF files!', error);
            }
        };

        fetchData();
    }, []);

    const handleDownload = async (id: number) => {
        try {
            const response = await axios.get(`http://localhost:3001/pdf_files/${id}/download`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `pdf-file-${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            setError('There was an error downloading the PDF file.');
            console.error('There was an error downloading the PDF file!', error);
        }
    };

    return (
        <>
            <Header />
            <div className='heigth-savelist' >
                <div className="savelist">
                    {error && <div className="error">{error}</div>}
                    {pdfFiles.map(file => (
                        <div className="box-item" key={file.id}>
                            <Collapsible title="Download">
                                <button className='btn-collaps' onClick={() => handleDownload(file.id)}>Baixar</button>
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
