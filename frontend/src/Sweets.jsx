import { useEffect, useState } from "react";
import api from "./api";

export default function Sweets() {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/sweets")
      .then((res) => setSweets(res.data))
      .catch(() => setError("Failed to load sweets"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Sweets</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {sweets.length === 0 && <p>No sweets available</p>}

      <ul>
        {sweets.map((s) => (
          <li key={s.id}>
            {s.name} ₹{s.price} | Qty: {s.quantity}
            <button disabled={s.quantity === 0} style={{ marginLeft: "10px" }}>
              Purchase
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
