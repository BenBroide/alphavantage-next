import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import StockCard from '../StockCard';
import { Stock } from '@/types/stock';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock StockLogo component
jest.mock('@/components/StockLogo', () => {
  return function MockStockLogo({ symbol }: { symbol: string }) {
    return <div data-testid="stock-logo">{symbol}</div>;
  };
});

describe('StockCard', () => {
  const mockStock: Stock = {
    symbol: 'AAPL',
    name: 'Apple Inc.',
  };

  it('should render stock symbol and name', () => {
    render(<StockCard stock={mockStock} />);
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    expect(screen.getByTestId('stock-logo')).toHaveTextContent('AAPL');
  });

  it('should link to stock detail page', () => {
    const { container } = render(<StockCard stock={mockStock} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/stock/AAPL');
  });

  it('should render stock logo', () => {
    render(<StockCard stock={mockStock} />);
    expect(screen.getByTestId('stock-logo')).toBeInTheDocument();
  });

  it('should have hover effects', () => {
    const { container } = render(<StockCard stock={mockStock} />);
    const card = container.querySelector('.hover\\:shadow-lg');
    expect(card).toBeInTheDocument();
  });
});
