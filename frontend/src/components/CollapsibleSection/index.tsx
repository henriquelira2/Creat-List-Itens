import React from 'react';

interface CollapsibleSectionProps {
  index: number;
  activeIndex: number | null;
  onToggle: (index: number) => void;
  title: string;
  items: { id: string, label: string }[];
  onCheckboxChange: (item: { id: string, label: string }) => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ index, activeIndex, onToggle, title, items, onCheckboxChange }) => {
  return (
    <div className={`type ${activeIndex !== index && activeIndex !== null ? 'hidden' : ''}`}>
      <button type="button" className={`collapsible ${activeIndex === index ? 'border' : ''}`} onClick={() => onToggle(index)}>
        {title}
      </button>
      <div className={`content ${activeIndex === index ? 'active' : ''}`}>
        {items.map(item => (
          <div className='checkbox-item' key={item.id}>
            <input 
              type="checkbox" 
              id={item.id} 
              name={item.id} 
              value={item.label} 
              onChange={() => onCheckboxChange(item)}
            />
            <label htmlFor={item.id}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollapsibleSection;
