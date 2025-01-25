import Item from "./components/Item.jsx";
import { useState } from "react";
import Form from "./components/Form.jsx";
import { useApp } from "./ThemedApp";

export default function App() {

  const { mode } = useApp();

  const [data, setData] = useState([
    { id: 1, content: "Hello, World!", name: "Alice" },
    { id: 2, content: "React is fun.", name: "Bob" },
    { id: 3, content: "Yay, interesting.", name: "Chris" },
  ]);

  const [showForm, setShowForm] = useState(false);

  const remove = (id) => {
    setData(data.filter((item) => item.id !== id));
  }

  const add = (content, name) => {
    const id = data ? data[data.length - 1]?.id + 1 : 1;
    setData([...data, { id, content, name }]);
  }

  return (
    <div
      style={{
        minHeight: 1500,
        background: mode === "dark" ? "black" : "white",
        color: mode === "dark" ? "white" : "black",
        paddingTop: 20,
      }}
    >
      <div style={{ maxWidth: 600, margin: "20px auto" }}>
        <h1
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          Yaycha
          <h1>
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                width: 32,
                height: 32,
                borderRadius: 50,
                border: "0 none",
                backgroundColor: showForm ? "#dc3545" : "#0d6efd",
                color: "white",
              }}
            >
              {showForm ? "x" : "+"}
            </button>

            <button
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              style={{
                marginLeft: 8,
                padding: "0 20px",
                height: 32,
                borderRadius: 32,
                border: "0 none",
                background: mode === "dark" ? "#333" : "#ddd",
                color: mode === "dark" ? "white" : "black",
              }}
            >
              {mode === "dark" ? "Light" : "Dark"}
            </button>
          </h1>
        </h1>

        {showForm && <Form add={add} />}
      </div>
    </div>
  );
}