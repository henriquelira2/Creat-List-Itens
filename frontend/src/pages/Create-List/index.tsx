/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import "./styles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CollapsibleSection from '../../components/CollapsibleSection';
import CircularProgress from '@mui/material/CircularProgress';
import jsPDF from 'jspdf';

function CreateList() {
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [checkedItems, setCheckedItems] = useState<{ id: string, label: string }[]>([]);
  const [sections, setSections] = useState<{ index: number, title: string, items: { id: string, label: string }[] }[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://creat-list-itens.onrender.com/products');
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const data = await response.json();

      const formattedSections = data.map((product: any, index: number) => ({
        index: index + 1,
        title: product.marca,
        items: product.items.map((item: string, itemIndex: number) => ({
          id: `${product.marca}-${itemIndex}`,
          label: item
        }))
      }));

      setIsLoading(false);
      setSections(formattedSections);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleCheckboxChange = (item: { id: string, label: string }) => {
    setCheckedItems(prev =>
      prev.some(checkedItem => checkedItem.id === item.id)
        ? prev.filter(checkedItem => checkedItem.id !== item.id)
        : [...prev, item]
    );
  };

  const handleDeleteSection = async (index: number, title: string) => {
    const confirmDelete = window.confirm(`Você tem certeza que deseja deletar a marca ${title} e todos os seus itens?`);
    if (confirmDelete) {
      try {
        const response = await fetch('https://creat-list-itens.onrender.com/delete-marca', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ marca: title })
        });

        if (!response.ok) {
          throw new Error('Erro ao deletar a marca');
        }

        console.log('Marca deletada com sucesso');
        fetchProducts(); // Recarrega a lista de produtos
      } catch (error) {
        console.error('Erro ao deletar a marca:', error);
      }
    }
  };

  const handleDeleteItem = async (item: { id: string, label: string }, title: string) => {
    const confirmDelete = window.confirm(`Você tem certeza que deseja deletar o item ${item.label} da marca ${title}?`);
    if (confirmDelete) {
      try {
        const response = await fetch('https://creat-list-itens.onrender.com/delete-item', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ marca: title, item: item.label })
        });

        if (!response.ok) {
          throw new Error('Erro ao deletar o item');
        }

        setSections(sections.map(section => ({
          ...section,
          items: section.items.filter(i => i.id !== item.id),
        })));
        console.log('Item deletado com sucesso');
      } catch (error) {
        console.error('Erro ao deletar o item:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Gerar PDF
    const doc = new jsPDF();
    let yOffset = 10;

    sections.forEach(section => {
      const { title, items } = section;

      const selectedItems = checkedItems.filter(item => items.some(i => i.id === item.id));

      if (selectedItems.length > 0) {
        doc.setDrawColor(0);
        doc.setLineWidth(0.2);

        const startX = 10;
        const startY = yOffset;
        const cellWidth = 180;
        const cellHeight = 8;

        doc.rect(startX, startY, cellWidth, cellHeight);
        doc.setFont('helvetica', 'bold');
        doc.text(title, startX + 2, startY + 5);

        doc.setFont('helvetica', 'normal');
        selectedItems.forEach((item, index) => {
          const textX = startX + 2;
          const textY = startY + 5 + (index + 1) * cellHeight;
          doc.text(item.label, textX, textY);
          doc.rect(startX, startY + (index + 1) * cellHeight, cellWidth, cellHeight);
        });

        yOffset += (selectedItems.length + 1) * cellHeight + 5;
        yOffset += 10;
      }
    });

    doc.save('lista_de_produtos.pdf');
    const pdfData = doc.output('blob');

    const formData = new FormData();
    formData.append('file', pdfData, 'lista_de_produtos.pdf');

    try {
      const response = await fetch('https://creat-list-itens.onrender.com/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar o PDF');
      }

      console.log('PDF enviado com sucesso');
    } catch (error) {
      console.error('Erro ao enviar o PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchLoading(true);

    try {
      const response = await fetch(`https://creat-list-itens.onrender.com/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const data = await response.json();

      const formattedSections = data.map((product: any, index: number) => ({
        index: index + 1,
        title: product.marca,
        items: product.items.map((item: string, itemIndex: number) => ({
          id: `${product.marca}-${itemIndex}`,
          label: item
        }))
      }));

      setSections(formattedSections);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <form className='box-create-list' onSubmit={handleSubmit}>
          <div className="loading" style={{ height: '100vh' }}><CircularProgress size={50} /></div>
        </form>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="search-box">
        <input
          type="text"
          className="input-text-search"
          placeholder="Buscar marca"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn-search" onClick={handleSearch} disabled={searchLoading}>
          {searchLoading ? <CircularProgress size={20} /> : 'Buscar'}
        </button>
      </div>
      <form className='box-create-list' onSubmit={handleSubmit}>
        {sections.map(section => (
          <CollapsibleSection
            key={section.index}
            index={section.index}
            activeIndex={activeIndex}
            onToggle={handleToggle}
            title={section.title}
            items={section.items}
            onCheckboxChange={handleCheckboxChange}
            onDeleteSection={handleDeleteSection}
            onDeleteItem={handleDeleteItem}
          />
        ))}
        <button className='btn-salvar' type="submit" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : 'SALVAR'}
        </button>
      </form>
      <Footer />
    </>
  );
}

export default CreateList;
