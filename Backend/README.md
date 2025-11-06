# Sports Backend - Egresado Leyendas

API con **Node.js + Express + MongoDB** para gestionar **Deportes** y **Equipos**, con **auto-matrícula** de jugadores y envío de correos HTML estilo Epic (Gmail Nodemailer). Incluye **Swagger** en `/api/docs`.

## 🚀 Inicio rápido
```bash
npm i
cp .env.example .env
# edita .env con MONGO_URI, EMAIL_USER, EMAIL_PASS (contraseña de aplicación Gmail)
npm run dev
```

- API: `http://localhost:4000`
- Docs: `http://localhost:4000/api/docs`

## 📩 Correos (Producción)
- Usa Gmail con **pool** y timeouts.
- Recomendado: **2FA + contraseña de aplicación**.
- Variables: `EMAIL_USER`, `EMAIL_PASS`, `MAIL_FROM_NAME`, `MAIL_FROM_ADDR`.

## 🔐 Seguridad y observabilidad
- `helmet`, `cors`, `morgan` activados.
- `autoIndex` desactivado en producción para Mongo.

## 🧭 Endpoints clave
- `POST /api/teams` → crear equipo (envía correo al capitán).
- `POST /api/teams/auto-enroll` → auto-matricular jugador y notificar por correo.
- `GET /api/docs` → documentación Swagger.

