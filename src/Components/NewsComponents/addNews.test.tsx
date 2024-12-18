import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddNews from './AddNews';

describe('AddNews Component', () => {
    test('renders AddNews component correctly', () => {
        render(<AddNews />);
        expect(screen.getByText('Add New News')).toBeInTheDocument();
        expect(screen.getByLabelText('Headline')).toBeInTheDocument();
        expect(screen.getByLabelText('Creation Date')).toBeInTheDocument();
        expect(screen.getByLabelText('Url')).toBeInTheDocument();
    });

    test('updates headline state on input change', () => {
        render(<AddNews />);
        const headlineInput : HTMLInputElement = screen.getByLabelText('Headline');
        fireEvent.change(headlineInput, { target: { value: 'New Headline' } });
        expect(headlineInput.value).toBe('New Headline');
    });

    test('updates creationDate state on input change', () => {
        render(<AddNews />);
        const dateInput: HTMLInputElement = screen.getByLabelText('Creation Date');
        fireEvent.change(dateInput, { target: { value: '2024-12-17' } });
        expect(dateInput.value).toBe('2024-12-17');
    });

    test('updates url state on input change', () => {
        render(<AddNews />);
        const urlInput : HTMLInputElement = screen.getByLabelText('Url');
        fireEvent.change(urlInput, { target: { value: 'http://example.com' } });
        expect(urlInput.value).toBe('http://example.com');
    });
});
