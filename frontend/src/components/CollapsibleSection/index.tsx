import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

interface CollapsibleSectionProps {
  index: number;
  activeIndex: number | null;
  onToggle: (index: number) => void;
  title: string;
  items: { id: string, label: string }[];
  onCheckboxChange: (item: { id: string, label: string }) => void;
  onDeleteSection: (index: number, title: string) => void;
  onDeleteItem: (item: { id: string, label: string }, title: string) => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ index, activeIndex, onToggle, title, items, onCheckboxChange, onDeleteSection, onDeleteItem }) => {
  return (
    <div className={`type ${activeIndex !== index && activeIndex !== null ? 'hidden' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button type="button" className={`collapsible ${activeIndex === index ? 'border' : ''}`} onClick={() => onToggle(index)}>
          {title}
        </button>
        <IconButton className='btn-delet-marca' aria-label="delete" onClick={() => onDeleteSection(index, title)}>
          <DeleteIcon className='delet-marca-icon' />
        </IconButton>
      </div>
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
            <IconButton className='btn-delet-item' aria-label="delete" onClick={() => onDeleteItem(item, title)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollapsibleSection;
