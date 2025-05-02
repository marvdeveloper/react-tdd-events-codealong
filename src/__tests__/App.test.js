// __tests__/App.test.js

import { render, screen } from "@testing-library/react";
import App from "../App";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";  // Import user-event

// Test the initial state of the page
test("pizza checkbox is initially unchecked", () => {
  render(<App />);
  
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  // Expect the checkbox to be unchecked initially
  expect(addPepperoni).not.toBeChecked();
});

test("toppings list initially contains only cheese", () => {
  render(<App />);
  
  // Expect only one list item (Cheese) to be present initially
  expect(screen.getAllByRole("listitem").length).toBe(1);
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
});

// Test the effect of clicking the checkbox
test("checkbox appears as checked when user clicks it", () => {
  render(<App />);
  
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  // Simulate clicking the checkbox
  userEvent.click(addPepperoni);
  
  // Expect the checkbox to be checked
  expect(addPepperoni).toBeChecked();
});

test("topping appears in toppings list when checked", () => {
  render(<App />);
  
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  // Simulate clicking the checkbox
  userEvent.click(addPepperoni);

  // Expect two list items: Cheese and Pepperoni
  expect(screen.getAllByRole("listitem").length).toBe(2);
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument();
});

// Test the effect of clicking the checkbox a second time (removes topping)
test("selected topping disappears when clicked a second time", () => {
  render(<App />);
  
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  // Click the checkbox to add pepperoni
  userEvent.click(addPepperoni);
  
  // Expect checkbox to be checked and toppings list to contain pepperoni
  expect(addPepperoni).toBeChecked();
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument();

  // Click again to remove pepperoni
  userEvent.click(addPepperoni);

  // Expect checkbox to be unchecked and no pepperoni in the toppings list
  expect(addPepperoni).not.toBeChecked();
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
});
