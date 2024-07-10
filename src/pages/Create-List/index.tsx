import React, { useState } from 'react';
import "./styles.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CollapsibleSection from '../../components/CollapsibleSection';

function CreateList() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const sections = [
    {
      index: 1,
      title: "PRODUTOS YPE",
      items: [{ id: "ype1", label: "AMACIANTE YPE ACONCHEGO 2LT" }, { id: "ype2", label: "AGUA SANITARIA YPE PRO 1L" }]
    },
    {
      index: 2,
      title: "PRODUTOS URCA",
      items: [{ id: "urca1", label: "AMACIANTE URCA BRISA DA PRIMAVERA LEVE 2L PAG" }]
    },
    {
      index: 3,
      title: "PRODUTOS MONANGE",
      items: [{ id: "monange1", label: "COND MONANGE 325ML RESTAURA Q EU GOSTO 325ML" }]
    },
    {
      index: 4,
      title: "PRODUTOS KOLENE",
      items: [{ id: "kolene1", label: "COND KOLENE CURVATURA MANTEIGAABACATE 300ML" }]
    },
    {
      index: 5,
      title: "PRODUTOS ELSEVE",
      items: [{ id: "elseve1", label: "COND CAB LISOS 200ML ELSEVE" }]
    }
  ];

  return (
    <>
      <Header />
      <form className='box-create-list' action="">
        {sections.map(section => (
          <CollapsibleSection
            key={section.index}
            index={section.index}
            activeIndex={activeIndex}
            onToggle={handleToggle}
            title={section.title}
            items={section.items}
          />
        ))}
      </form>
      <Footer />
    </>
  );
}

export default CreateList;
