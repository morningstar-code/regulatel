# API en Vercel – Producción

Para que el admin y la API funcionen en Vercel:

1. **Ruta única que Vercel sí sirve**  
   El frontend llama a **`/api/route?path=...`** (ej. `GET /api/route?path=admin/session`, `GET /api/route?path=news`). Esas peticiones las atiende el archivo **`api/route.ts`** (un solo archivo, sin subcarpeta). Vercel no sirve bien los catch-all en subcarpeta (`api/route/[...path].ts`), por eso se usa query `?path=`.

2. **Handlers en `server/api-handlers/`**  
   La lógica está en `server/api-handlers/`. `api/route.ts` lee el query `path`, reescribe `req.url` a `/api/...` y despacha al handler correspondiente.

3. **Root Directory en Vercel (muy importante)**  
   Si ves HTML en lugar de JSON o 404 en `/api/*`:
   - En Vercel: **Settings → General → Root Directory** debe estar **vacío** (raíz del repositorio).
   - Si Root Directory apunta a un subcarpeta (ej. `frontend`), la carpeta `api/` no se incluye en el despliegue y todas las peticiones /api/* devuelven el SPA (index.html).

4. **Comprobar en producción**  
   - Abre `https://tu-dominio.vercel.app/api/health`. Debe devolver JSON: `{ "ok": true, "api": true }`.  
   - Si devuelve HTML o 404, repasa el punto 3 y redeploya.

5. **Variables de entorno**  
   Configura en Vercel: `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`. Sin `DATABASE_URL`, el login y el admin responderán 503.

6. **Si ves 401 y "devolvió una página" o HTML**  
   La **Deployment Protection** (protección por contraseña o Vercel Authentication) intercepta las peticiones a `/api/*` y devuelve una página de login (401 + HTML).  
   **Solución:** En Vercel → **Settings → Deployment Protection** → desactiva la protección para el entorno que uses (Production/Preview) o configura una excepción para que las rutas `/api` no requieran contraseña. No puede configurarse por `vercel.json`; solo desde el dashboard.
