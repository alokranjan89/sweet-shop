import { useEffect, useState } from "react";
import api from "./api";

export default function Sweets() {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await api.get("/sweets"); // ✅ FIXED
        setSweets(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load sweets");
      }
    };

    fetchSweets();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Available Sweets</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {sweets.length === 0 && <p>No sweets available</p>}

      <ul>
        {sweets.map((sweet) => (
          <li key={sweet.id}>
            <b>{sweet.name}</b> | ₹{sweet.price} | Qty: {sweet.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
