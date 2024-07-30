"use client";

import Image from "next/image";
// import styles from "./page.module.css";

import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    content: "",
    author: "",
  });
  const [data, setData] = useState([]);
  const [titleToSearch, setTitleToSearch] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí enviarás los datos a tu endpoint
    const response = await fetch("http://localhost:3000/articles/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const newData = await response.json();
    console.log("newData", newData);
    setData([...data, newData]);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/articles/${id}`, {
      method: "DELETE",
    });

    const newData = await response.json();
    console.log("newData", newData);
    setData(data.filter((item) => item.id !== id));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // buscar por título
    const response = await fetch(
      `http://localhost:3000/articles/?title=${titleToSearch}`
    );
    const newData = await response.json();
    setData(newData);
  };

  const handleChangeTitleToSearch = (e) => {
    setTitleToSearch(e.target.value);
  };

  useEffect(() => {
    // consumir endpoint get localhost:3000/articles
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/articles/");
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Buscar</h1>
        <input
          type="text"
          name="titleToSearch"
          placeholder="ingresa el título a buscar"
          value={titleToSearch}
          onChange={handleChangeTitleToSearch}
        />
        <button onClick={handleSearch}>Buscar</button>

        <form onSubmit={handleSubmit}>
          <h2>Agregar Articulo</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "100px",
            }}
          >
            <input
              type="text"
              name="title"
              placeholder="título"
              value={formData.title}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              placeholder="fecha de publicación"
              value={formData.date}
              onChange={handleChange}
            />
            <input
              type="text"
              name="author"
              placeholder="autor"
              value={formData.author}
              onChange={handleChange}
            />
          </div>

          <textarea
            type="text"
            name="content"
            placeholder="content"
            value={formData.content}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Agregar</button>
        </form>

        <h2>Articulos</h2>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha de Publicación</th>
              <th>Autor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.date}</td>
                <td>{item.author}</td>
                <td>{item.contetn}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
