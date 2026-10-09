import Button from './Button';

export default function Navbar({ alias, rol, onLogout }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="mark" />
        <strong>TorneoGG</strong>
        <span className="tag">panel de jugador</span>
      </div>
      <div className="who">
        <span><b>{alias}</b> · {rol}</span>
        <Button variant="ghost" onClick={onLogout}>Salir</Button>
      </div>
    </header>
  );
}
