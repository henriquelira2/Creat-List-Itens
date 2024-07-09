import React, { useState } from 'react';
import "./styles.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function CreateList() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  return (
    <>
      <Header />
      <div className='box-create-list'>

        <div className={`type  ${activeIndex !== 1 && activeIndex !== null ? 'hidden' : ''}`}>
          <button type="button" className={`collapsible  ${activeIndex === 1 ? 'border' : ''}`} onClick={() => handleToggle(1)}>
            Open Collapsible1
          </button>

          <div className={`content ${activeIndex === 1 ? 'active' : ''}`}>
            <p>Content for index1 </p>
          </div>
        </div>

        <div className={`type  ${activeIndex !== 2 && activeIndex !== null ? 'hidden' : ''}`}>
          <button type="button" className={`collapsible  ${activeIndex === 2 ? 'border' : ''}`} onClick={() => handleToggle(2)}>
            Open Collapsible2
          </button>

          <div className={`content ${activeIndex === 2 ? 'active' : ''}`}>
            <p>2</p>
          </div>
        </div>

        <div className={`type  ${activeIndex !== 3 && activeIndex !== null ? 'hidden' : ''}`}>
          <button type="button" className={`collapsible  ${activeIndex === 3 ? 'border' : ''}`} onClick={() => handleToggle(3)}>
            Open Collapsible3
          </button>

          <div className={`content ${activeIndex === 3 ? 'active' : ''}`}>
            <p>3</p>
          </div>
        </div>

        <div className={`type  ${activeIndex !== 4 && activeIndex !== null ? 'hidden' : ''}`}>
          <button type="button" className={`collapsible  ${activeIndex === 4 ? 'border' : ''}`} onClick={() => handleToggle(4)}>
            Open Collapsible4
          </button>

          <div className={`content ${activeIndex === 4 ? 'active' : ''}`}>
            <p>4</p>
          </div>
        </div>

        <div className={`type  ${activeIndex !== 5 && activeIndex !== null ? 'hidden' : ''}`}>
          <button type="button" className={`collapsible  ${activeIndex === 5 ? 'border' : ''}`} onClick={() => handleToggle(5)}>
            Open Collapsible5
          </button>

          <div className={`content ${activeIndex === 5 ? 'active' : ''}`}>
            <p>20</p>
          </div>
        </div>


      </div>
      <Footer />
    </>
  )
}

export default CreateList
