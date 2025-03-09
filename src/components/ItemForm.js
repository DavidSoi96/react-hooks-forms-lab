import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function ItemForm({ onItemFormSubmit }) {
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("Produce");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim()) {  // Only submit if itemName is not empty
      const newItem = {
        id: uuid(),
        name: itemName,
        category: itemCategory,
      };
      onItemFormSubmit(newItem);
      setItemName(""); // Reset form after submission
    }
  };

  return (
    <form className="NewItem" onSubmit={handleSubmit} role="form">
      <label htmlFor="itemName">Name</label>
      <input
        id="itemName"
        type="text"
        name="name"
        placeholder="Item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <label htmlFor="itemCategory">Category</label>
      <select
        id="itemCategory"
        name="category"
        value={itemCategory}
        onChange={(e) => setItemCategory(e.target.value)}
      >
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Dessert">Dessert</option>
      </select>
      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
