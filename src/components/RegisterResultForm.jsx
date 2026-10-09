import { useState } from 'react';
import { registrarResultado } from '../api/endpoints';
import Button from './Button';
import TextField from './TextField';

const EMPTY = { jugadorId: '', juegoId: '', arbitroId: '', puntaje: '', temporada: '' };

export default function RegisterResultForm({ token, onRegistered }) {
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const data = await registrarResultado(token, {
        jugadorId: Number(form.jugadorId), juegoId: Number(form.juegoId),
        arbitroId: Number(form.arbitroId), puntaje: Number(form.puntaje), temporada: form.temporada.trim()
      });
      setMsg({ ok: true, text: data.mensaje });
      setForm(EMPTY);
      onRegistered?.();
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-box" onSubmit={handleSubmit}>
      <h3>Registrar resultado</h3>
      <div className="grid5">
        <TextField label="JugadorId" type="number" min="1" required value={form.jugadorId} onChange={set('jugadorId')} />
        <TextField label="JuegoId" type="number" min="1" required value={form.juegoId} onChange={set('juegoId')} />
        <TextField label="ArbitroId" type="number" min="1" required value={form.arbitroId} onChange={set('arbitroId')} />
        <TextField label="Puntaje (0–10)" type="number" min="0" max="10" step="0.01" required value={form.puntaje} onChange={set('puntaje')} />
        <TextField label="Temporada" placeholder="2025-2" pattern="\d{4}-[12]" required value={form.temporada} onChange={set('temporada')} />
      </div>
      <Button type="submit" loading={loading}>Registrar resultado</Button>
      {msg && <p className={`msg ${msg.ok ? 'win' : 'lose'}`} role="status">{msg.text}</p>}
    </form>
  );
}
