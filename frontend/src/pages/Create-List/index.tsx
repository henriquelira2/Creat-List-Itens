import React, { useState } from 'react';
import "./styles.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CollapsibleSection from '../../components/CollapsibleSection';

import jsPDF from 'jspdf';


const sections = [
  {
    index: 1,
    title: "PRODUTOS YPE",
    items: [
      { id: "ype1", label: "AMACIANTE YPE ACONCHEGO 2LT" },
      { id: "ype2", label: "AGUA SANITARIA YPE PRO 1L" }
    ]
  },
  {
    index: 2,
    title: "PRODUTOS URCA",
    items: [
      { id: "urca1", label: "AMACIANTE URCA BRISA DA PRIMAVERA LEVE 2L PAG" },
      { id: "urca2", label: "AMACIANTE URCA BRISA DA PRIMAVERA LEVE 2L PAG" },
      { id: "urca3", label: "AMACIANTE URCA " }
    ]
  },
  {
    index: 3,
    title: "PRODUTOS MONANGE",
    items: [
      { id: "monange1", label: "COND MONANGE 325ML RESTAURA Q EU GOSTO 325ML" }
    ]
  },

  {
    index: 5,
    title: "PRODUTOS ELSEVE",
    items: [
      { id: "elseve1", label: "COND CAB LISOS 200ML ELSEVE" }
    ]
  },
];

function CreateList() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ id: string, label: string }[]>([]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Gerar PDF
    const doc = new jsPDF();

    let yOffset = 10;

    sections.forEach(section => {
      const { title, items } = section;

      // Verifica se há itens marcados nesta seção
      const selectedItems = checkedItems.filter(item => items.some(i => i.id === item.id));

      // Se houver itens marcados, adicionar ao PDF
      if (selectedItems.length > 0) {

        doc.setDrawColor(0);
        doc.setLineWidth(0.2);

        // Definindo os limites da tabela
        const startX = 10;
        const startY = yOffset;
        const cellWidth = 180;
        const cellHeight = 8;

        doc.rect(startX, startY, cellWidth, cellHeight);

        // Títulos das colunas (usando o título da seção)
        doc.setFont('helvetica', 'bold');
        doc.text(title, startX + 2, startY + 5);

        // Itens da lista
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

    // Enviar o PDF para o backend
    await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData
    }).then(response => {
      if (response.ok) {
        console.log('PDF enviado com sucesso');
      } else {
        console.error('Erro ao enviar o PDF');
      }
    });
  };

  return (
    <>
      <Header />
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
          />
        ))}
        <button type="submit">Salvar Lista</button>
      </form>
      <Footer />
    </>
  );
}

export default CreateList;