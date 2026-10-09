# TorneoGG.Frontend

React + Vite. Login, Dashboard protegido y panel de administración (jugadores, registrar resultado, bitácora).

```
src/
  api/         client.js (JWT + errores), endpoints.js
  auth/        AuthContext (sesión), ProtectedRoute
  components/  Button, TextField, Navbar, Stat, ResultsTable, PlayersTable, AuditTable, RegisterResultForm, AdminPanel
  pages/       LoginPage, DashboardPage
```

## Desarrollo
```
npm install
npm run dev     # http://localhost:5173  (proxy /api -> http://localhost:5000; ajusta el puerto en vite.config.js)
npm run build   # genera dist/ para Apache
```

## Producción (EC2 Frontend)
Sube `dist/` a `/var/www/torneogg` y usa `deploy/apache-torneogg.conf` (proxy al Backend privado + headers de seguridad) y los archivos `fail2ban-*` de `deploy/`.
