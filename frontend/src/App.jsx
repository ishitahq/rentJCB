import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [machines, setMachines] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [available, setAvailable] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(25000);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Fetch data
  useEffect(() => {
    fetch("http://localhost:5000/machines")
      .then(res => res.json())
      .then(data => {
        setMachines(data);
        setFiltered(data);
      })
      .catch(err => console.log(err));
  }, []);

  // Filtering logic
  useEffect(() => {
    let result = [...machines];

    if (category) {
      result = result.filter(m => m.category === category);
    }

    if (location) {
      result = result.filter(m => m.location === location);
    }

    if (available !== "") {
      result = result.filter(m => m.available === true);
    }

    if (search) {
      result = result.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    result = result.filter(
      m => m.price_per_day >= minPrice && m.price_per_day <= maxPrice
    );

    if (sortOrder === "low") {
      result.sort((a, b) => a.price_per_day - b.price_per_day);
    }

    if (sortOrder === "high") {
      result.sort((a, b) => b.price_per_day - a.price_per_day);
    }

    setFiltered(result);
  }, [category, location, available, minPrice, maxPrice, search, sortOrder, machines]);

  const clearFilters = () => {
    setCategory("");
    setLocation("");
    setAvailable("");
    setMinPrice(0);
    setMaxPrice(25000);
    setSearch("");
    setSortOrder("");
  };

  return (
    <div className="container">
      <h1 className="site-title">RentJCB</h1>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search machine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Excavator">Excavator</option>
          <option value="Crane">Crane</option>
          <option value="Loader">Loader</option>
        </select>

        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">All Locations</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Bangalore">Bangalore</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

        <div className="price-box">
          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <label className="availability-toggle">
          <input
            type="checkbox"
            checked={available === "true"}
            onChange={(e) =>
              setAvailable(e.target.checked ? "true" : "")
            }
          />
          Available only
        </label>

        <button className="clear-btn" onClick={clearFilters}>
          Clear
        </button>

      </div>

      {/* Result count */}
      <p className="results-count">
        Showing {filtered.length} of {machines.length} machines
      </p>

      {/* Machine cards */}
      <div className="grid">
        {filtered.map(machine => (
          <div
            key={machine.id}
            className={`card ${!machine.available ? "unavailable-card" : ""}`}
          >
            <h3>{machine.name}</h3>
            <p>Category: {machine.category}</p>
            <p>Location: {machine.location}</p>
            <p>Price: ₹{machine.price_per_day}/day</p>
            <p className={machine.available ? "available" : "unavailable"}>
              {machine.available ? "Available" : "Not Available"}
            </p>
            {machine.available && (
              <button className="book-btn">Book</button>
              )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="no-results">No machines match your filters.</p>
      )}
    </div>
  );
}

export default App;