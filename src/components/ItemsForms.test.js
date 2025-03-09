import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShoppingList from "../components/ShoppingList";

describe("ItemForm", () => {
  test("adds a new item to the list when the form is submitted", () => {
    const mockOnAddItem = jest.fn();
    const initialItems = [];
    
    render(<ShoppingList items={initialItems} onAddItem={mockOnAddItem} />);

    // Get form elements
    const nameInput = screen.getByLabelText(/name/i);
    const categorySelect = screen.getByLabelText(/category/i);
    
    // Count initial number of items with category "Dessert"
    const initialDessertCategories = screen.queryAllByText(/Dessert/i).filter(
      element => element.classList.contains('category')
    ).length;
    
    // Fill out the form
    fireEvent.change(nameInput, { target: { value: 'Ice Cream' } });
    fireEvent.change(categorySelect, { target: { value: 'Dessert' } });
    
    // Submit the form
    fireEvent.submit(screen.getByRole('form'));

    // Verify the results
    expect(mockOnAddItem).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Ice Cream',
        category: 'Dessert',
        id: expect.any(String)
      })
    );

    // Re-render with new item
    render(<ShoppingList 
      items={[{ id: '1', name: 'Ice Cream', category: 'Dessert' }]} 
      onAddItem={mockOnAddItem} 
    />);

    // Verify the item appears in the list
    expect(screen.getByText('Ice Cream')).toBeInTheDocument();
    
    // Count final number of items with category "Dessert"
    const finalDessertCategories = screen.queryAllByText(/Dessert/i).filter(
      element => element.classList.contains('category')
    ).length;
    
    expect(finalDessertCategories).toBe(initialDessertCategories + 1);
  });

  // Add more tests as needed...
});