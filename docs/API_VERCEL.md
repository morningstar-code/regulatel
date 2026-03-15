# API en Vercel – Una sola función

Para evitar 404 en `/api/news`, `/api/events`, `/api/documents`, `/api/cifras` y que lo que guardas en el admin se persista:

1. **Una sola serverless function**  
   Toda la API pasa por `api/route/[...path].ts`. En `vercel.json` hay un rewrite:
   - `/api/:path*` → `/api/route/:path*`  
   Así, peticiones como `/api/settings`, `/api/news`, etc. llegan al mismo handler.

2. **Handlers en `server/api-handlers/`**  
   La lógica (settings, news, events, documents, cifras, admin, uploads, subscribe, document-access) está en `server/api-handlers/`. El router solo importa y despacha por el primer segmento del path.

3. **Comprobar en producción**  
   - Abre `https://tu-dominio.vercel.app/api/health`. Debe devolver `{ "ok": true, "api": true }`.  
   - Si ves 404 en `/api/news` o en otras rutas, revisa en Vercel: **Settings → General → Root Directory** que esté **vacío** (raíz del repo). Si está en un subdirectorio, la carpeta `api/` no se despliega.

4. **Variables de entorno en Vercel**  
   Asegúrate de tener en el proyecto: `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN` (y las que use el admin). Sin `DATABASE_URL`, la API responderá 503 y no se guardará nada en base de datos.
