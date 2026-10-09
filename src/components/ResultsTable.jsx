export default function ResultsTable({ rows }) {
  return (
    <table>
      <thead><tr><th>Juego</th><th>Puntaje</th><th>Temporada</th><th>Fecha</th></tr></thead>
      <tbody>
        {rows.length === 0 && <tr><td colSpan="4" className="empty">Aún no tienes resultados registrados.</td></tr>}
        {rows.map((r) => (
          <tr key={r.resultadoId}>
            <td><span className="badge">{r.claveJuego}</span>{r.juego}</td>
            <td className="score">{Number(r.puntaje).toFixed(2)}</td>
            <td>{r.temporada}</td>
            <td>{new Date(r.fechaReg).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
