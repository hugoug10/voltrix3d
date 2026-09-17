# Handoff — Voltrix3D

Documento de traspaso para continuar este proyecto en otro ordenador con todo
el contexto de lo que se ha hecho. Última actualización: **2026-09-17**.

---

## 1. Arranque rápido en el ordenador nuevo

```bash
git clone https://github.com/hugoug10/voltrix3d.git
cd voltrix3d
corepack pnpm install
```

Luego crea `.env.local` en la raíz (este archivo **no está en git**, hay que
recrearlo a mano — ver sección 3 para los valores):

```
SHOPIFY_STORE_DOMAIN=voltrix3d-gwo0wtya.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=<ver seccion 3>
SHOPIFY_STOREFRONT_API_VERSION=2025-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```bash
corepack pnpm dev
```

Abre `http://localhost:3000`.

**Nota Windows/Turbopack**: si tras editar algo el sitio no refleja el
cambio (parece que sigue la versión vieja), no es tu imaginación — el caché
persistente de Turbopack en `.next/dev` a veces se queda obsoleto. Solución:
parar el servidor, `rm -rf .next`, y volver a arrancar `pnpm dev`.

---

## 2. Qué es esto

Tienda **headless**: la web (Next.js 16, App Router, TypeScript, Tailwind v4)
es el frontend; **Shopify** es el backend de comercio (catálogo, inventario,
carrito, checkout) via **Storefront API**. El tema por defecto de Shopify
(`voltrix3d-gwo0wtya.myshopify.com`) no se usa ni se ve nunca — es solo el
backend de datos.

- **Producción**: https://voltrix3d.vercel.app (dominio propio aún no
  comprado — ver pendientes)
- **Repo**: https://github.com/hugoug10/voltrix3d (cuenta GitHub `hugoug10`)
- **Hosting**: Vercel, conectado al repo de GitHub — cada `git push` a
  `main` despliega solo, no hay que hacer nada manualmente en Vercel.
- **Shopify admin**: `voltrix3d-gwo0wtya.myshopify.com/admin` (cuenta
  personal `hugoug10@gmail.com`)

---

## 3. Credenciales y accesos (valores sensibles NO están en este archivo)

Por seguridad, los tokens reales no se guardan en el repo (ni en este
handoff). El camino más rápido en el ordenador nuevo es **copiar el
`.env.local` del ordenador actual directamente** (por AirDrop, USB, un
mensaje privado, etc. — nunca por git). Si no lo tienes a mano o hay que
regenerarlo, sigue esto exactamente (ya lo hicimos una vez, así que esto
evita repetir los callejones sin salida que nos encontramos):

### 3.1 Ya existe una app creada — no crear otra

La app **"Voltrix3D Web"** ya está creada en la tienda
`voltrix3d-gwo0wtya.myshopify.com` (organización de Partners
"CyberSkyWeb"). No hace falta crear una app nueva, solo entrar en esa y
mirar/copiar sus credenciales.

### 3.2 Cómo llegar a las credenciales (la ruta que de verdad funciona)

1. Entra en el admin de la tienda:
   `https://admin.shopify.com/store/voltrix3d-gwo0wtya`
2. Ve a **Configuración → Aplicaciones y canales de venta → Desarrollo de
   apps** (`/settings/apps/development`).
3. Verás dos bloques: **"Crea y gestiona apps en tu Dev Dashboard"** y
   **"Crea apps personalizadas heredadas"**.
   - ⚠️ El bloque de apps heredadas **ya no deja crear apps nuevas** desde
     el 1 de enero de 2026 (si el sistema te lo permite igualmente,
     adelante, pero probablemente esté bloqueado). No pierdas tiempo ahí
     para una app nueva — no hace falta, ya tenemos una.
4. Pulsa **"Desarrollar apps en Dev Dashboard"**. Esto te lleva a un panel
   nuevo (`dev.shopify.com` o similar) donde aparece **"Voltrix3D Web"**
   en la lista — entra en ella.
5. Dentro de la app verás pestañas: **Resumen, Configuración, Credenciales
   de API, Configuración de la app**.
6. Ve a **Configuración de la app** (o "Resumen", ahí también aparece un
   acceso directo) → busca el bloque **"Storefront API"** → botón
   **"Gestionar"**.
   - ⚠️ **Ojo con un bucle confuso**: si en vez de esto llegas a una
     pantalla titulada **"Solicitudes de acceso a la API"**
     (`partners.shopify.com/.../api_access`), **esa no es la pantalla
     correcta** para los scopes básicos del Storefront API — es para pedir
     acceso a datos protegidos (requiere revisión de Shopify) y no hace
     falta para esto. Si te manda ahí, vuelve atrás y entra por el enlace
     azul que dice algo como *"visita tu panel de control de
     desarrollador"* dentro del aviso de la pantalla de Resumen — eso es
     lo que te lleva al Dev Dashboard real (paso 4-5).
7. En el Dev Dashboard, dentro de **Configuración de la app**, el bloque
   Storefront API ya debería dejarte ver/editar los scopes directamente
   (no debería pedir "Distribución" para una app ya instalada en tu propia
   tienda). Los scopes que ya están activados:
   `unauthenticated_read_product_listings`,
   `unauthenticated_read_product_inventory`,
   `unauthenticated_write_checkouts` (o `_carts`),
   `unauthenticated_read_checkouts` (o `_carts`).
8. Ve a la pestaña **Credenciales de API** → ahí está el **Storefront API
   access token** (un string de 32 caracteres hexadecimales, sin prefijo).
   Cópialo tal cual a `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.

### 3.3 Admin API token (solo si necesitas crear/editar productos por API)

Mismo sitio (Dev Dashboard → Voltrix3D Web → Configuración de la app),
bloque **Admin API** en vez de Storefront API. Scopes que ya están
activados (actívalos si no aparecen): `write_products`, `read_products`,
`write_inventory`, `read_inventory`, `read_locations`,
`read_publications`, `write_publications`. El token (`shpat_...`) sale en
la misma pestaña **Credenciales de API**. Este token permite crear
productos directamente por `curl`/GraphQL sin pasar por el formulario de
Shopify — así es como se crearon los 4 productos del catálogo actual (ver
sección 4.3). Ejemplo mínimo de verificación:

```bash
curl -s -X POST "https://voltrix3d-gwo0wtya.myshopify.com/admin/api/2025-01/graphql.json" \
  -H "X-Shopify-Access-Token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ shop { name } }"}'
```

### 3.4 Dominio de la tienda y ubicación de inventario

- Dominio Storefront: `voltrix3d-gwo0wtya.myshopify.com`
- Location ID de inventario (única): `gid://shopify/Location/91387625717`
- Publication ID del canal "Online Store" (a la que hay que publicar
  cualquier producto nuevo para que la Storefront API lo vea):
  `gid://shopify/Publication/200153006325`

### 3.5 Vercel y GitHub

- **Vercel**: proyecto ya importado desde GitHub, variables de entorno ya
  configuradas en el dashboard de Vercel (Settings → Environment
  Variables) — no hace falta tocarlas salvo que cambies algo.
- **GitHub**: repo bajo la cuenta personal `hugoug10`. Si `git push` te
  pide credenciales en el ordenador nuevo, usa un **Personal Access Token**
  (fine-grained, permiso Contents: Read and write) como contraseña — ver
  GitHub → Settings → Developer settings → Personal access tokens. En la
  pantalla de creación, los permisos están bajo un botón **"Add
  permissions"** que abre un buscador — busca "Contents" y ponlo en
  "Read and write".

---

## 4. Todo lo hecho esta sesión (orden cronológico)

### 4.1 Conexión inicial con Shopify
- Creada app personalizada "Voltrix3D Web" en Shopify (Storefront API +
  Admin API).
- `.env.local` configurado y probado localmente.

### 4.2 Repo y despliegue
- Proyecto subido a GitHub (`hugoug10/voltrix3d`, rama `main`).
- Importado en Vercel con las variables de entorno de Shopify → despliegue
  automático en cada push.
- **Nota importante**: en este entorno (VS Code / Claude Code en Windows),
  `git push` casi nunca puede completarse desde las herramientas del agente
  por un problema de credenciales no interactivas — el commit se hace
  aquí, pero **el push lo tienes que ejecutar tú** en tu propia terminal.

### 4.3 Catálogo (4 productos creados vía Admin API)
| Producto | Precio | Stock | Categoría |
|---|---|---|---|
| Busto de Camarón de la Isla | 35,00 € | 4 | Bustos |
| Jarrón Acanalado Terracota | 12,00 € | 6 | Decoración |
| Figura Chibi Gaara | 16,00 € | 2 | Figuras |
| Estantería Organizadora 3 Niveles | 13,00 € | 3 | Organización |

Nota: al crear el primer producto, la **moneda de la tienda estaba en
USD** en vez de EUR — quedó pendiente que el usuario la cambie en Shopify
(Configuración → General → Moneda de la tienda). Los importes numéricos ya
guardados (35.00, etc.) se reinterpretan solos al cambiar la moneda, no
hace falta reeditar los productos.

### 4.4 Stock real + aviso de contacto
- `totalInventory` añadido a las queries/tipos de Shopify.
- Tarjetas de producto y ficha de producto muestran stock real ("Quedan X
  uds.").
- Mensaje en la ficha de producto: si alguien quiere más unidades de las
  disponibles, enlaza a `/contacto`.

### 4.5 Rebrand completo
- Logo (`images/logo/logo limpio sin fondo.png`) recortado con `sharp`
  (tenía mucho margen transparente) y usado como favicon
  (`src/app/icon.png`) y en header/footer/hero (`public/logo.png`).
- Paleta de colores cambiada de verde-salvia a **azul eléctrico / cian**
  (`src/app/globals.css`, variables `--color-accent`, `--gradient-brand`,
  etc.), tanto en modo claro como oscuro.
- Home rediseñada: Hero con specs, nueva sección "Elige material y color"
  (`materials-showcase.tsx`, usa los datos reales de `constants.ts`).

### 4.6 "Imprime tu diseño" reestructurado
- Ahora tiene **dos flujos**, ninguno pasa por el carrito de Shopify:
  - **Sin modelo 3D**: sube foto/PDF de referencia →
    `FeasibilityForm` → `POST /api/feasibility` (petición de viabilidad,
    tú confirmas por email).
  - **Con archivo STL/OBJ**: `CustomPrintForm` → `POST
    /api/custom-print-request` (pedido, tú confirmas precio final por
    email — **ya no hay presupuesto instantáneo ni se añade nada al
    carrito automáticamente**, ese cálculo por tamaño de archivo se quitó
    por decisión del usuario).
- Archivos eliminados en este cambio: `src/lib/estimate.ts`,
  `src/components/upload/estimate-panel.tsx`, `src/lib/cart/custom-print.ts`.
- **Los 3 endpoints de formularios son stubs** (`/api/contact`,
  `/api/feasibility`, `/api/custom-print-request`): solo hacen
  `console.log`, no envían email de verdad todavía. Falta conectar un
  proveedor (ver Pendientes).

### 4.7 Tildes y eñes corregidas en toda la web
- Todo el texto en español que estaba sin acentos (disemo→diseño,
  impresion→impresión, etc.) se corrigió sistemáticamente en ~24 archivos.

### 4.8 Componente "Glyph Portal" (efecto de scroll)
- Vendor component (MIT, Christian Katzmann / ktzm.dk) copiado **tal
  cual** en `src/components/ui/glyph-portal.tsx` — no se modifica nunca
  ese archivo, solo se configura vía props/CSS variables.
- Wrapper propio: `src/components/home/print-portal.tsx`
  (`<PrintPortal />`), usado en `src/app/page.tsx` como la **primera
  sección de la home** (antes del Hero).
- Efecto: la palabra "VOLTRIX" se fija en pantalla, la "O" hace zoom
  revelando una foto real de una impresora 3D (Unsplash, verificada que
  existe de verdad antes de usarla — no inventada), y al final se
  revelan 3 pasos + botón a "Imprime tu diseño".
- **Bugs encontrados y arreglados durante la integración** (documentados
  por si el componente da problemas parecidos en el futuro):
  1. Le pasé la fuente de marca (Space Grotesk vía CSS variable) y, como
     tarda en cargar, el componente **desactiva el scroll-jacking para
     siempre en esa carga de página** si la fuente no está lista en el
     primer frame (protección anti-tirones del propio componente). Fix:
     usar fuente de sistema (`fontWeight: 900`, sin `fontFamily` custom).
  2. Contraste roto (texto blanco sobre fondo claro). Fix: forzar todo el
     tramo a oscuro.
  3. Hueco visible (fondo sólido sin foto) en el tramo entre el final del
     efecto y el resto de la home, porque usaba una imagen distinta
     (`next/image`, recortada por caja) en cada sitio. Fix definitivo:
     técnica CSS `background-attachment: fixed` — la misma imagen,
     anclada al viewport, usada con la misma URL/posición en `--gp-paper`,
     `--gp-field` (dentro del componente) y en el fondo del resto de la
     home (`page.tsx`), solo cambia la opacidad del velo oscuro. Al ser
     literalmente la misma técnica en todos los sitios, es imposible que
     haya costura.
  4. Rareza de React: `background={<></>}` (fragmento vacío) **no**
     suprime el `div` por defecto del componente (verde), pero
     `background={false}` sí. No investigado a fondo el porqué, pero
     confirmado empíricamente — si tocas esto, usa `false`.
  5. Regla de lint del compilador de React (`react-hooks/immutability`)
     falla contra un patrón interno del vendor. Se excluyó ese archivo
     concreto de esa regla en `eslint.config.mjs` (no se tocó el vendor).

### 4.9 Verificación visual con Playwright (método de trabajo)
- Este proyecto no tenía forma de ver capturas reales del sitio. Para los
  cambios de `print-portal.tsx` se instaló **Playwright temporalmente**
  (`pnpm add -D playwright` + `npx playwright install chromium`), se
  hicieron capturas reales en distintos puntos de scroll, y **se
  desinstaló otra vez** (`pnpm remove playwright`) antes de cada commit —
  no debe quedar como dependencia permanente del proyecto a menos que se
  decida explícitamente lo contrario.
- Lección aprendida (importante): no dar por bueno un cambio visual solo
  porque compila — verificar con captura real antes de decir que algo
  está listo.

---

## 5. Pendientes / próximos pasos conocidos

- [ ] **Cambiar moneda de la tienda a EUR** (Shopify → Configuración →
      General).
- [ ] **Conectar proveedor de email** (p. ej. Resend) en
      `src/app/api/contact/route.ts`, `src/app/api/feasibility/route.ts` y
      `src/app/api/custom-print-request/route.ts` — ahora mismo esos
      formularios no avisan a nadie de verdad, solo hacen `console.log`.
- [ ] **Poner contraseña a `voltrix3d-gwo0wtya.myshopify.com`** (tema por
      defecto de Shopify) para que nadie llegue ahí por error — Shopify →
      Configuración → Restricciones de acceso a la tienda online.
- [ ] **Dominio propio**: de momento la web vive en
      `voltrix3d.vercel.app`. Cuando se compre un dominio, añadirlo en
      Vercel y actualizar `NEXT_PUBLIC_SITE_URL`.
- [ ] Texto "Scroll to enter." dentro de `glyph-portal.tsx` está en
      inglés (hardcodeado en el vendor). No se tocó porque el usuario
      pidió copiar ese archivo tal cual — si se quiere en español, es la
      única modificación pendiente a ese archivo concreto.
- [ ] Direcciones de ejemplo (`hola@voltrix3d.com`, Instagram, "Valencia,
      España") en el footer/contacto son placeholders del scaffold
      original — pendiente sustituir por los datos reales del negocio.
- [ ] Producto "Impresión personalizada" con tramos de precio (mencionado
      en el README original) ya **no aplica** — ese flujo se sustituyó
      por peticiones por email, no por variantes de Shopify.

---

## 6. Mapa de archivos clave (lo tocado/creado esta sesión)

```
src/
  app/
    page.tsx                          Home: orden de secciones + fondo fijo
    globals.css                       Paleta azul/cian, --gradient-brand
    icon.png                          Favicon (logo recortado)
    imprime-tu-diseno/page.tsx        Dos flujos (viabilidad / STL)
    api/
      feasibility/route.ts            Stub — petición de viabilidad
      custom-print-request/route.ts   Stub — pedido STL/OBJ
      contact/route.ts                Stub — contacto (ya existia)
      upload/route.ts                 Sube a Vercel Blob (model o reference)
  components/
    ui/
      glyph-portal.tsx                Vendor, MIT — NO TOCAR el contenido
    home/
      print-portal.tsx                Wrapper de GlyphPortal + fondo fijo
      hero.tsx, how-it-works.tsx, materials-showcase.tsx, value-props.tsx
    upload/
      custom-print-form.tsx           Ya no calcula presupuesto, envia pedido
      feasibility-form.tsx            Formulario foto/PDF
      upload-dropzone.tsx             Generico (acepta extensiones/tamano por prop)
    product/
      product-card.tsx, product-purchase-panel.tsx   Muestran stock real
  lib/
    constants.ts                      MATERIALS, PRINT_COLORS, NAV_LINKS...
public/
  logo.png                            Logo recortado (header/footer/hero)
images/                                Fotos de producto + logo originales (en git)
eslint.config.mjs                     Excepcion de lint para glyph-portal.tsx
next.config.ts                        remotePatterns incluye images.unsplash.com
```

---

## 7. Convenciones aprendidas / cómo trabajar en este repo

- **`git push` lo ejecuta siempre el usuario**, no el agente (bloqueo de
  credenciales no interactivas en este entorno). El flujo normal es:
  agente hace `git commit`, usuario hace `git push` desde su terminal.
- Antes de dar un cambio visual por bueno, **verificarlo con Playwright**
  (instalar temporalmente, capturar, desinstalar) — no fiarse solo de que
  compile.
- Las imágenes de Unsplash usadas se **verifican que existen de verdad**
  (descargando y mirando el contenido) antes de usarlas, nunca se inventan
  URLs.
- `rm -rf .next` + reiniciar `pnpm dev` si algo no refleja un cambio
  reciente (caché de Turbopack).
- El proyecto sigue TypeScript estricto + ESLint (React Compiler rules
  incluidas) — `pnpm exec tsc --noEmit` y `pnpm exec eslint src
  --max-warnings=0` deben pasar limpios antes de cada commit.
