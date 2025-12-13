import { useState } from "react";
import api from "./api";

export default function Admin() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const addSweet = async () => {
    await api.post("/sweets", {
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
    });
    alert("Sweet added");
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <br />
      <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <br />
      <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <br />
      <input placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
      <br />
      <button onClick={addSweet}>Add Sweet</button>
    </div>
  );
}
