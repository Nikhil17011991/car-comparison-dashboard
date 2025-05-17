import React, { useState } from "react";

const dummyCars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Camry",
    price: 25000,
    weight: 3300,
    rating: 4.2,
  },
  {
    id: 2,
    brand: "Honda",
    model: "Accord",
    price: 26000,
    weight: 3200,
    rating: 4.5,
  },
  {
    id: 3,
    brand: "Tesla",
    model: "Model 3",
    price: 39000,
    weight: 3550,
    rating: 4.8,
  },
  {
    id: 4,
    brand: "Ford",
    model: "Fusion",
    price: 24000,
    weight: 3400,
    rating: 4.1,
  },
];

export default function App() {
  const [selectedCars, setSelectedCars] = useState([]);
  const [sortKey, setSortKey] = useState("price");

  const toggleSelect = (id) => {
    setSelectedCars((prev) =>
      prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
    );
  };

  const sortedCars = [...dummyCars].sort((a, b) => a[sortKey] - b[sortKey]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Car Comparison Dashboard</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Sort by:</label>
        <select
          className="border p-2 rounded"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="weight">Weight</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sortedCars.map((car) => (
          <div key={car.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold">
              {car.brand} {car.model}
            </h2>
            <p>Price: ${car.price}</p>
            <p>Weight: {car.weight} lbs</p>
            <p>Rating: ⭐ {car.rating}</p>
            <button
              onClick={() => toggleSelect(car.id)}
              className={`mt-2 px-4 py-2 rounded text-white ${
                selectedCars.includes(car.id) ? "bg-red-500" : "bg-blue-600"
              }`}
            >
              {selectedCars.includes(car.id) ? "Remove" : "Compare"}
            </button>
          </div>
        ))}
      </div>

      {selectedCars.length >= 2 && (
        <div className="border-t pt-4">
          <h2 className="text-2xl font-bold mb-2">Comparison</h2>
          <div className="overflow-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-left">Attribute</th>
                  {selectedCars.map((id) => {
                    const car = dummyCars.find((c) => c.id === id);
                    return (
                      <th key={id} className="border px-4 py-2 text-left">
                        {car.brand} {car.model}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {["price", "weight", "rating"].map((attr) => (
                  <tr key={attr}>
                    <td className="border px-4 py-2 font-medium">{attr.toUpperCase()}</td>
                    {selectedCars.map((id) => {
                      const car = dummyCars.find((c) => c.id === id);
                      return (
                        <td key={id} className="border px-4 py-2">
                          {attr === "price"
                            ? `$${car[attr]}`
                            : attr === "rating"
                            ? `⭐ ${car[attr]}`
                            : car[attr]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
