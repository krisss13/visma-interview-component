import React, { useState } from 'react';
import { DropdownType } from '../../type/Dropdown';

const Dropdown: React.FC<DropdownType> = ({addressList, selectedAddress, setSelectedAddress}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOptionClick = (value: string) => {
        setSelectedAddress(value);
        setIsOpen(false);
    };

    const selectBlock = addressList.map((row, index) => {
        return (
            <li
                onClick={() => handleOptionClick(row)}
                key={`opt_${index}`}
                id={`opt_${index}`}
                className="combobox-list-item"
                aria-selected="false">
                {row}
            </li>
        )
    })

    return (
        <div
            className={`combobox-wrapper ${isOpen ? 'open' : ''}`}
            role="combobox-wrapper"
        >
            <div
                onClick={() => setIsOpen(!isOpen)}
                role="combobox"
                id="combobox"
                className="btn dropdown-toggle"
                aria-expanded="true"
                aria-owns="comboboxList"
                aria-haspopup="listbox"
                aria-multiselectable="false"
            >
                <div className="combobox-input">
                    {selectedAddress
                        ? <span role="dropdown-title">{selectedAddress}</span>
                        : <span>Select address</span>
                    }
                </div>
            </div>
            <div className={`combobox-dropdown ${isOpen ? 'show' : ''}`}>
                <ul role="listbox" id="comboboxList" className="combobox-list"
                    aria-labelledby="comboboxLabel" aria-multiselectable="false">
                    {selectBlock}
                </ul>
            </div>
        </div>
    );
}

export default Dropdown;