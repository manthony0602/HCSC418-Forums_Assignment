import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import BasicForm from './BasicForm'; // Adjust the path based on your file structure

// Mock the fetch API
global.fetch = jest.fn();

describe('BasicForm', () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear any previous fetch mocks before each test
  });

  test('renders form correctly', () => {
    render(<BasicForm />);
    expect(screen.getByText(/Forum Sign-Up/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone:/i)).toBeInTheDocument();
  });

  test('displays error message for empty name field', () => {
    render(<BasicForm />);
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByText(/Full Name is required/i)).toBeInTheDocument();
  });

  test('displays error message for invalid email', () => {
    render(<BasicForm />);
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByText(/Enter a valid email/i)).toBeInTheDocument();
  });

  test('displays error message for invalid phone number', () => {
    render(<BasicForm />);
    fireEvent.change(screen.getByLabelText(/Phone:/i), {
      target: { value: '123' },
    });
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByText(/Phone must be 10 digits/i)).toBeInTheDocument();
  });

  test('submits the form when all fields are valid', async () => {
    render(<BasicForm />);

    // Fill the form with valid data
    fireEvent.change(screen.getByLabelText(/Name:/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Phone:/i), {
      target: { value: '1234567890' },
    });

    // Mock the successful response from the server
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ message: 'Form submitted successfully' }),
    });

    // Submit the form
    fireEvent.submit(screen.getByRole('form'));

    // Check that fetch was called with the correct URL and method
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:5000/submit',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '1234567890',
          }),
        })
      );
    });

    // Check that no error messages are shown after successful submission
    expect(
      screen.queryByText(/Full Name is required/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Enter a valid email/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Phone must be 10 digits/i)
    ).not.toBeInTheDocument();

    // Optionally, check if the success message or any other UI change after success
    expect(
      screen.getByText(/Form submitted successfully/i)
    ).toBeInTheDocument();
  });
});
