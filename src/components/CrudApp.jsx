"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import CrudForm from "./CrudForm";

export default function CrudApp() {
  const [db, setDb] = useState(); //generamos un estado donde guardaremos la info de la base de datos
  const [dataToEdit, setDataToEdit] = useState(); //este estado permite manejar dinámicamente información de la página
  const [loading, setLoading] = useState(); //este estado nos permite controlar si el componente Loader aparece en pantalla

  //función que busca información en la base de datos y la aloja en el hook correspondiente

  const getData = async () => {
    const res = await axios.get("http://localhost:5050/personajes"); //Le pido a axios que me traiga la info del endpoint del JsonServer
    const json = res.data; //axios me lo devuelve en la propiedad "data" de su respuesta
    setDb(json);
  };

  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  //función que crea información en la base de datos

  const createData = async (data) => {
    data.id = Date.now(); //retorna milisegundos que usamos como id
    axios.post("http://localhost:5050/personajes", data); //data es la información de los inputs del formulario
    getData();
  };

  //función que actualiza la información en la base de datos

  const updateData = async (data) => {
    let endpoint = `http://localhost:5050/personajes/${data.id}`; //el endpoint se modifica dependiendo del id que recibe la funcion

    let options = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      data: JSON.stringify(data),
    };

    await axios(endpoint, options);

    getData();
  };

  //funcion que elimina la informacion de la base de datos

  const deleteData = async (id, name) => {
    let isDelete = window.confirm(
      `Estás seguro de que deseas eliminar a ${name} de la base de datos?`
    );

    if (isDelete) {
      let endpoint = `http://localhost:5050/personajes/${id}`;
      let options = {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      };
      await axios(endpoint, options);
      getData();
    } else {
      return; //corta la ejecución de deleteData y no se borra nada
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="p-14 text-2xl font-extrabold">CRUD App</h2>
      <CrudForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      {loading && <Loader />}
      {db && (
        <CrudTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      )}
    </div>
  );
}
