// Home.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../page'; // Adjust the import path as needed
import axios from 'axios';

// Mock the axios module
jest.mock('axios');

describe('Home Component', () => {
  const mockData = [
    { id: 1, payload: { message: 'Test data 1' }, timestamp: new Date().toISOString() },
    { id: 2, payload: { message: 'Test data 2' }, timestamp: new Date().toISOString() },
  ];

  beforeEach(() => {
    // Mock the Axios GET request to return mock data
    axios.get.mockResolvedValue({ data: mockData });
  });

  test('renders initial data from API', async () => {
    render(<Home />);

    // Check if the table headers are present
    expect(screen.getByText(/Timestamp/i)).toBeInTheDocument();
    expect(screen.getByText(/Data/i)).toBeInTheDocument();
  });
});