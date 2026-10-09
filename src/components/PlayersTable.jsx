export default function PlayersTable({ rows }) {
  return (
    <table>
      <thead><tr><th>Id</th><th>Alias</th><th>Nombre</th><th>Equipo</th><th>Nivel</th></tr></thead>
      <tbody>
        {rows.length === 0 && <tr><td colSpan="5" className="empty">Sin coincidencias.</td></tr>}
        {rows.map((j) => (
          <tr key={j.jugadorId}>
            <td>{j.jugadorId}</td><td>{j.alias}</td>
            <td>{j.nombre} {j.apellidos}</td><td>{j.equipo}</td><td>{j.nivel}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
