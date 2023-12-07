export default function CrudTableRow({ personaje, setDataToEdit, deleteData }) {
  let { name, lastname, id } = personaje;

  return (
    <tr className="flex justify-between gap-8 shadow-lg mb-6 items-center p-4 animate-fade ">
      <td className="text-lg">{name}</td>
      <td className="text-lg">{lastname}</td>
      <td>
        <button onClick={() => setDataToEdit(personaje)} className="border-2 rounded border-gray-500 p-1 px-2 mr-4 hover:bg-green-800 transition-all ease-in-out">Editar</button>
        <button onClick={() => deleteData(id, name)} className="border-2 rounded border-gray-500 p-1 px-2 hover:bg-orange-500 transition-all ease-in-out ">Eliminar</button>
      </td>
    </tr>
  );
}
