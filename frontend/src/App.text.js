import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Ayurveda Guide header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Ayurveda Guide/i);
  expect(linkElement).toBeInTheDocument();
});
