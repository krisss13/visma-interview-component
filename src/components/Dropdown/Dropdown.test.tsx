import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
    const addressList = ['Address 1', 'Address 2', 'Address 3'];
    const setSelectedAddress = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly with initial selected address', () => {
        const selectedAddress = 'Address 1';
        render(
            <Dropdown
                addressList={addressList}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
            />
        );
        expect(screen.getByRole('dropdown-title')).toBeVisible();
    });

    it('should render correctly with no selected address', () => {
        render(
            <Dropdown
                addressList={addressList}
                selectedAddress={''}
                setSelectedAddress={setSelectedAddress}
            />
        );
        expect(screen.getByText('Select address')).toBeInTheDocument();
    });
    it('should open the dropdown on click', () => {
        render(<Dropdown addressList={addressList} selectedAddress={''} setSelectedAddress={setSelectedAddress}/>);
        const combobox = screen.getByRole('combobox');
        const comboboxWrapper = screen.getByRole('combobox-wrapper');

        fireEvent.click(combobox);

        expect(comboboxWrapper).toHaveClass('open');
    });

    it('should select an address on click', () => {
        const selectedAddress = 'Address 1';
        render(
            <Dropdown
                addressList={addressList}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
            />);
        const combobox = screen.getByRole('combobox');
        const addressOption = screen.queryAllByText(selectedAddress)[1];

        fireEvent.click(combobox);
        fireEvent.click(addressOption);

        expect(setSelectedAddress).toHaveBeenCalledWith(selectedAddress);
        expect(combobox).not.toHaveClass('open');
    });

});