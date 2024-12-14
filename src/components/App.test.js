import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('Renders the app start', () => {
    render(<App />); 
    const linkElement = screen.getByText(/SpendTrack/i);
    expect(linkElement).toBeInTheDocument();
  });