export default function AuditTable({ rows }) {
  return (
    <div className="scroll">
      <table>
        <thead><tr><th>Fecha</th><th>Alias</th><th>Acción</th><th>Resultado</th><th>IP</th><th>Detalle</th></tr></thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan="6" className="empty">Sin eventos todavía.</td></tr>}
          {rows.map((e) => (
            <tr key={e.eventoId}>
              <td>{new Date(e.fechaUtc + 'Z').toLocaleString()}</td>
              <td>{e.alias ?? '—'}</td>
              <td>{e.accion}</td>
              <td className={e.exito ? 'win' : 'lose'}>{e.exito ? 'Correcto' : 'Fallido'}</td>
              <td>{e.direccionIp}</td>
              <td>{e.detalle ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
