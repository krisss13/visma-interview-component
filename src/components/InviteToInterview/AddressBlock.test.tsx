import { render, fireEvent, screen } from '@testing-library/react';
import AddressBlock from './AddressBlock';

describe('AddressBlock', () => {
    it('should toggle the section when the button is clicked', () => {
        const addressList = ['Address 1', 'Address 2'];
        const setAddressList = jest.fn();

        render(<AddressBlock addressList={addressList} setAddressList={setAddressList} />);

        const toggleButton = screen.getByRole('button');
        fireEvent.click(toggleButton);

        const inputPlaceholder = (screen.queryByPlaceholderText(/Add new address/i));
        expect(inputPlaceholder).toBeInTheDocument();

        fireEvent.click(toggleButton);
        expect(inputPlaceholder).not.toBeInTheDocument();
    });

    it('should add a new address when the "Save" button is clicked', () => {
        const addressList = ['Address 1', 'Address 2'];
        const setAddressList = jest.fn();

        render(<AddressBlock addressList={addressList} setAddressList={setAddressList} />);

        const toggleButton = screen.getByRole('button');
        fireEvent.click(toggleButton);

        const newAddressInput = screen.getByPlaceholderText('Add new address');
        fireEvent.change(newAddressInput, { target: { value: 'New Address' } });
        fireEvent.keyDown(newAddressInput, { key: 'Enter', code: 'Enter' });

        expect(setAddressList).toHaveBeenCalledTimes(1);
        expect(setAddressList).toHaveBeenCalledWith([...addressList, 'New Address']);
        expect(screen.getByText('You successfully added a new address : New Address')).toBeInTheDocument();
    });
});
