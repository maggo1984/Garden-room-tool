import React, { useState } from 'react';

const basePrice = 0;

const claddingOptions = [
  { name: "Thermowood", price: 0 },
  { name: "Cedar", price: 2900 },
  { name: "Fluted Composite", price: 1750 },
  { name: "Painted Timber", price: 1500 },
];

const doorOptions = [
  "Single UPVC", "Single Solid UPVC", "Double UPVC 4ft", "Double UPVC 5ft", "Double UPVC 6ft",
  "Aluminium Bi-Fold 2.4m", "Aluminium Bi-Fold 3m", "Aluminium Bi-Fold 3.6m", "Aluminium Bi-Fold 4m",
  "Aluminium Bi-Fold 5m", "Aluminium Bi-Fold 6m", "Aluminium French 1.2m", "Aluminium French 1.8m",
  "Aluminium French 2.1m", "Aluminium Patio 2.4m", "Aluminium Patio 3m", "Aluminium Patio 3.6m",
  "Aluminium Patio 4m", "Corner Aluminium Bi-Fold (3x2)", "Corner Aluminium Bi-Fold (3x1)",
  "Aluminium Single Door"
].map((name, i) => ({ name, price: 500 + i * 150 }));

const windowOptions = [
  "T1 UPVC", "T2 UPVC", "T3 UPVC", "T4 UPVC", "T5 UPVC", "T6 UPVC", "T7 UPVC", "T8 UPVC", "T9 UPVC",
  "T10 UPVC", "T11 UPVC", "T12 UPVC", "T13 UPVC", "T14 UPVC", "T15 UPVC", "T16 UPVC", "T17 UPVC",
  "T18 UPVC", "T19 UPVC", "T20 UPVC", "T21 UPVC", "T22 UPVC", "T23 UPVC", "T24 UPVC", "T25 UPVC",
  "T10 LEA UPVC", "T12 LEA UPVC", "T15 LEA UPVC", "Corner Window C1 Aluminium", "Corner Window C2 Aluminium",
  "Corner Window C15 Aluminium", "Roof Light"
].map((name, i) => ({ name, price: 200 + i * 10 }));

const extras = [
  { name: "Internal Partition", price: 500 },
  { name: "Internal Door", price: 350 },
  { name: "Canopy", price: 1200 },
  { name: "Decking", price: 950 },
  { name: "Wing/Overhang", price: 800 },
  { name: "Paint Finish", price: 700 },
  { name: "Cedar Oil", price: 320 },
  { name: "Access Charge", price: 200 },
];

const sizes = [];
const widths = [8, 10, 12, 14, 16, 18, 20, 22, 24];
const depths = [6, 8, 10, 12, 14];
for (let w of widths) {
  for (let d of depths) {
    sizes.push({ label: `${w}ft x ${d}ft`, price: 4000 + w * d * 30 });
  }
}

const models = ["Dalbury", "Walton", "Dukesbury", "Kingsley", "Huntington"];

export default function App() {
  const [model, setModel] = useState(models[0]);
  const [size, setSize] = useState(sizes[0]);
  const [cladding, setCladding] = useState(claddingOptions[0]);
  const [doors, setDoors] = useState([]);
  const [windows, setWindows] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const addItem = (item, setList) => {
    setList(prev => [...prev, item]);
  };

  const toggleExtra = (extra) => {
    setSelectedExtras(prev =>
      prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra]
    );
  };

  const total =
    (size?.price || 0) +
    (cladding?.price || 0) +
    doors.reduce((sum, d) => sum + d.price, 0) +
    windows.reduce((sum, w) => sum + w.price, 0) +
    selectedExtras.reduce((sum, e) => sum + e.price, 0);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Elite Garden Room Pricing Tool</h1>

      <label>
        <strong>Model:</strong>{" "}
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          {models.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>

      <div style={{ marginTop: "1rem" }}>
        <strong>Size:</strong>{" "}
        <select value={size.label} onChange={(e) => setSize(sizes.find(s => s.label === e.target.value))}>
          {sizes.map((s) => (
            <option key={s.label}>{s.label}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <strong>Cladding:</strong>{" "}
        <select value={cladding.name} onChange={(e) => setCladding(claddingOptions.find(c => c.name === e.target.value))}>
          {claddingOptions.map((c) => (
            <option key={c.name}>{c.name} {c.price > 0 ? `(+£${c.price})` : "(Included)"}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <strong>Add Doors:</strong><br />
        {doorOptions.map((d, i) => (
          <button key={i} onClick={() => addItem(d, setDoors)} style={{ margin: "0.25rem" }}>
            {d.name} (£{d.price})
          </button>
        ))}
        <ul>
          {doors.map((d, i) => (
            <li key={i}>{d.name} (£{d.price})</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <strong>Add Windows:</strong><br />
        {windowOptions.map((w, i) => (
          <button key={i} onClick={() => addItem(w, setWindows)} style={{ margin: "0.25rem" }}>
            {w.name} (£{w.price})
          </button>
        ))}
        <ul>
          {windows.map((w, i) => (
            <li key={i}>{w.name} (£{w.price})</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <strong>Optional Extras:</strong><br />
        {extras.map((e, i) => (
          <label key={i} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={selectedExtras.includes(e)}
              onChange={() => toggleExtra(e)}
            />
            {" "}
            {e.name} (£{e.price})
          </label>
        ))}
      </div>

      <div style={{ marginTop: "2rem", fontSize: "1.5rem", fontWeight: "bold" }}>
        Total Price: £{total.toLocaleString()}
      </div>
    </div>
  );
}
