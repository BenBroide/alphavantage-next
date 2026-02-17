import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import Home from '../page';

describe('Home Page', () => {
  it('should render with Select a Stock: heading', () => {
    render(<Home />);
    expect(screen.getByText('Select a Stock:')).toBeInTheDocument();
  });

  it('should render view switcher buttons', () => {
    render(<Home />);
    expect(screen.getByTitle('Cards View')).toBeInTheDocument();
    expect(screen.getByTitle('Tiles View')).toBeInTheDocument();
    expect(screen.getByTitle('Table View')).toBeInTheDocument();
  });

  it('should start with cards view selected', () => {
    render(<Home />);
    const cardsButton = screen.getByTitle('Cards View');
    expect(cardsButton).toHaveClass('bg-white', 'text-blue-600');
  });

  it('should switch views when button clicked', () => {
    render(<Home />);
    
    const tilesButton = screen.getByTitle('Tiles View');
    fireEvent.click(tilesButton);
    expect(tilesButton).toHaveClass('bg-white', 'text-blue-600');
  });

  it('should render stock data', () => {
    const { container } = render(<Home />);
    const stockLinks = container.querySelectorAll('a[href^="/stock/"]');
    expect(stockLinks.length).toBeGreaterThan(0);
  });
});
