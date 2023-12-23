export default function CrudTableRow({ personaje, setDataToEdit, deleteData }) {
  let { name, lastname, id } = personaje;

  return (
    <tr className="flex justify-between gap-8 shadow-lg mb-6 items-center p-4 animate-fade ">
      <td className="text-lg">{name}</td>
      <td className="text-lg">{lastname}</td>
      <td>
        <button onClick={() => setDataToEdit(personaje)} className="border-2 rounded border-blue-400 p-1 px-2 mr-4 hover:bg-blue-400 transition-all ease-in-out">Editar</button>
        <button onClick={() => deleteData(id, name)} className="border-2 rounded border-red-700 p-1 px-2 hover:bg-red-700 hover:text-white transition-all ease-in-out ">Eliminar</button>
      </td>
    </tr>
  );
}
