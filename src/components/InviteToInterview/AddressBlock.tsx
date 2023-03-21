import React, { useState, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import './AddressBlock.css';
import {AddressType} from '../../type/Address';
import Dropdown from '../Dropdown';

const AddressBlock: React.FC<AddressType> = ({addressList, setAddressList}) => {
    const [isSectionOpen, setIsSectionOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [alertTitle, setAlertTitle] = useState("");
    const handleToggle = () => {
        setIsSectionOpen(!isSectionOpen);
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewAddress(event.target.value);
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewAddress();
        }
    };
    const addNewAddress = () => {
        setAddressList([...addressList, newAddress]);
        setAlertTitle(newAddress);
        setNewAddress('');
    };


    useEffect(() => {
        const timeId = setTimeout(() => {
            setAlertTitle("")
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }, []);

    useEffect(() => {
        if (!isSectionOpen) {
            setNewAddress('');
        }
    }, [isSectionOpen])

    if (!addressList) {
        return null;
    }

    return (
        <div className="address-block">
            <button onClick={handleToggle} type="button" className="btn btn-link">
                <span className={`vismaicon vismaicon-${isSectionOpen ? 'remove-circle red' : 'add-circle'}`}/>
                Add interview location
            </button>

            {isSectionOpen && (
                <div className="address-block_container">
                    <Dropdown
                        addressList={addressList}
                        selectedAddress={selectedAddress}
                        setSelectedAddress={setSelectedAddress}
                    />
                    <div className="add-address-block">
                        <div className="input-group">
                            <input
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                value={newAddress}
                                type="text"
                                className="form-control"
                                placeholder="Add new address"
                            />
                            <span onClick={() => setNewAddress('')} className="clear-btn">
                                <span className="close"/>
                            </span>
                        </div>
                        <button onClick={() => addNewAddress()} className="save-button">
                            <span className="vismaicon vismaicon-save"/>
                        </button>
                    </div>
                </div>
            )}
            {alertTitle && (
                <div className="alert alert-success" role="alert">
                    <strong>Well done!</strong> You successfully added a new address : {alertTitle}
                </div>
            )}
        </div>
    );
}

export default AddressBlock;