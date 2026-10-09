export default function Stat({ value, label, tone }) {
  return (
    <div className="stat">
      <div className={`n ${tone ?? ''}`}>{value}</div>
      <div className="l">{label}</div>
    </div>
  );
}
