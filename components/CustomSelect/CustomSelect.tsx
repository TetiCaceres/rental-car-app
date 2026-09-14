'use client';

import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import css from './CustomSelect.module.css';

interface CustomSelectProps {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  formatOption?: (value: string) => string;
  formatSelected?: (value: string) => string;
}

export default function CustomSelect({
  label,
  placeholder,
  value,
  options,
  onChange,
  formatOption = v => v,
  formatSelected = v => v,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={css.field} ref={wrapperRef}>
      <span className={css.label}>{label}</span>

      <div className={`${css.combo} ${isOpen ? css.comboOpen : ''}`}>
        <button
          type="button"
          className={css.trigger}
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span className={value ? css.valueText : css.placeholderText}>
            {value ? formatSelected(value) : placeholder}
          </span>
          {isOpen ? (
            <FiChevronUp size={18} className={css.chevron} />
          ) : (
            <FiChevronDown size={18} className={css.chevron} />
          )}
        </button>

        {isOpen && (
          <ul className={css.dropdown}>
            {options.map(option => (
              <li key={option}>
                <button
                  type="button"
                  className={`${css.option} ${
                    option === value ? css.optionSelected : ''
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {formatOption(option)}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
