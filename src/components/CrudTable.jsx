import CrudTableRow from "./CrudTableRow";

export default function CrudTable({ data, setDataToEdit, deleteData }) {
  return (
    <div className="flex flex-col mt-12 items-center">
      <h3 className="text-lg font-bold mb-4 underline">Lista de personajes</h3>
      <table className="flex flex-col gap-2">
        <thead>
          <tr className="flex gap-4">
            <th>Nombre</th>
            <th>Apellido</th>
            <th className="transform translate-x-[4.5rem]">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td>Sin datos para mostrar</td>
            </tr>
          )}

          {data.length !== 0 &&
            data.map((personaje, index) => (
              <CrudTableRow
                key={index}
                personaje={personaje}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
