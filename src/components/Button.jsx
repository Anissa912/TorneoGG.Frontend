export default function Button({ variant = 'primary', loading = false, children, ...props }) {
  return (
    <button className={`btn btn-${variant}`} {...props} disabled={loading || props.disabled}>
      {loading ? 'Procesando…' : children}
    </button>
  );
}
