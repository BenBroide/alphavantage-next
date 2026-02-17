import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import ViewSwitcher from '../ViewSwitcher';

type ViewType = 'cards' | 'tiles' | 'table';

describe('ViewSwitcher', () => {
  const mockOnViewChange = jest.fn();

  beforeEach(() => {
    mockOnViewChange.mockClear();
  });

  it('should render all three view buttons', () => {
    render(<ViewSwitcher viewType="cards" onViewChange={mockOnViewChange} />);
    
    expect(screen.getByTitle('Cards View')).toBeInTheDocument();
    expect(screen.getByTitle('Tiles View')).toBeInTheDocument();
    expect(screen.getByTitle('Table View')).toBeInTheDocument();
  });

  it('should highlight active view', () => {
    render(<ViewSwitcher viewType="cards" onViewChange={mockOnViewChange} />);
    
    const cardsButton = screen.getByTitle('Cards View');
    expect(cardsButton).toHaveClass('bg-white', 'text-blue-600');
  });

  it('should call onViewChange when button clicked', () => {
    render(<ViewSwitcher viewType="cards" onViewChange={mockOnViewChange} />);
    
    const tilesButton = screen.getByTitle('Tiles View');
    fireEvent.click(tilesButton);
    
    expect(mockOnViewChange).toHaveBeenCalledWith('tiles');
  });

  it('should switch between all views', () => {
    render(<ViewSwitcher viewType="cards" onViewChange={mockOnViewChange} />);
    
    fireEvent.click(screen.getByTitle('Tiles View'));
    expect(mockOnViewChange).toHaveBeenCalledWith('tiles');
    
    fireEvent.click(screen.getByTitle('Table View'));
    expect(mockOnViewChange).toHaveBeenCalledWith('table');
  });
});
