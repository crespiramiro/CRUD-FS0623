import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  lastname: "",
  id: null,
};

export default function CrudForm({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) {
  const [form, setForm] = useState(initialForm);

  //funciones manejadoras - Handlers

  const handleChange = (e) => {
    //el usuario escribe name:"Bob" lastname:"Esponja"

    setForm({
      ...form, //me traigo al estado como estaba
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    //Queremos que antes de que se envíe el form se analicen algunas cosas
    e.preventDefault(); //detener el comportamiento por defecto del submit, para que no se me guarde cualquier cosa en el form

    const dataRegEx = /^[A-Z][a-z]+$/; //esta regex determina que se reciba un string con su primera letra en mayúscula y el resto en minúscula

    if (!form.name || !form.lastname) {
      alert("datos incompletos");
      return;
    }

    if (!dataRegEx.test(form.name) || !dataRegEx.test(form.lastname)) {
      alert("Solo se aceptan letras, las primeras en mayúscula");
      return;
    }

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]); //cada vez que dataToEdit cambie, useEffect se vuelve a accionar

  return (
    <div className="flex flex-col justify-center items-center border-4 p-4 rounded">
      <h3 className="text-lg font-bold pb-4">{dataToEdit ? "Editar" : "Agregar"}</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={form.name}
          className="border-4 p-2 mr-4"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Apellido"
          onChange={handleChange}
          value={form.lastname}
          className="border-4 p-2 mr-4"
        />

        <input type="submit" value="Enviar" className="rounded border-2 border-emerald-700 mr-4 p-2 hover:scale-[1.2] transition-all ease-in-out  hover:bg-emerald-700 hover:text-white" />

        <input type="reset" value="Limpiar" onClick={handleReset}  className="rounded border-2 border-emerald-700 p-2 hover:scale-[1.2] transition-all ease-in-out  hover:bg-emerald-700 hover:text-white"/>
      </form>
    </div>
  );
}
