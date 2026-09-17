# Voltrix3D

Tienda online de impresion 3D construida con Next.js (App Router) + TypeScript +
Tailwind CSS, conectada a Shopify como backend de comercio a traves de la
Storefront API. El checkout final redirige al checkout nativo de Shopify.

## Empezar

```bash
pnpm install
cp .env.example .env.local   # rellena las variables, ver mas abajo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

Sin credenciales de Shopify configuradas, la tienda funciona igualmente: todas
las secciones de catalogo muestran un aviso de "Conecta tu tienda Shopify" en
lugar de fallar, para poder revisar el diseno antes de conectar datos reales.

## Conectar Shopify (Storefront API)

1. En tu panel de Shopify ve a **Settings > Apps and sales channels > Develop apps**.
2. Pulsa **Create an app**, dale un nombre (p. ej. "Voltrix3D Storefront").
3. En la pestana **Configuration**, dentro de **Storefront API integration**, activa como minimo estos scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_write_checkouts` (o `unauthenticated_write_carts` segun version de API)
   - `unauthenticated_read_checkouts` (o `unauthenticated_read_carts`)
4. Pulsa **Install app**.
5. Ve a la pestana **API credentials** y copia el **Storefront API access token**.
6. Copia el dominio de tu tienda (`tu-tienda.myshopify.com`).
7. Rellena `.env.local`:

```
SHOPIFY_STORE_DOMAIN=tu-tienda.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=el-token-que-copiaste
SHOPIFY_STOREFRONT_API_VERSION=2025-01
```

Los productos de tu catalogo de Shopify (con estado "Active" y canal de venta
"Online Store" u otro que incluya la Storefront API) apareceran automaticamente
en `/tienda` y en la home. No hay productos hardcodeados en el codigo.

## Producto "Impresion personalizada"

La pagina `/imprime-tu-diseno` deja subir un archivo STL/OBJ, calcula un
presupuesto **estimado** (segun tamano de archivo, material y relleno) y anade
un articulo al carrito con ese archivo adjunto como nota del pedido.

La Storefront API no permite fijar un precio arbitrario por linea de carrito
sin una Shopify Function personalizada, asi que el enfoque usado aqui es de
**tramos de precio**: creas un producto con una variante por cada tramo, y la
app selecciona automaticamente la variante mas cercana al presupuesto
estimado. Si el precio final difiere tras revisar el modelo, se ajusta
manualmente con el cliente antes de imprimir.

Para configurarlo:

1. Crea un producto en Shopify con el handle `impresion-personalizada`
   (o el que pongas en `SHOPIFY_CUSTOM_PRINT_PRODUCT_HANDLE`).
2. Anade una opcion llamada exactamente **"Tramo de precio"** con estos 4 valores:
   - `Hasta 40 EUR`
   - `40-100 EUR`
   - `100-220 EUR`
   - `Mas de 220 EUR (a revisar)`
3. Pon un precio a cada variante generada (p. ej. 25€, 65€, 150€, 0€ o el minimo que prefieras para el ultimo tramo, que requiere revision manual).
4. El archivo subido, material, color, relleno y notas del cliente llegan como
   propiedades de la linea de carrito (visibles en el pedido de Shopify).

## Subida de archivos (Vercel Blob)

Los archivos STL/OBJ se suben desde `/api/upload` usando
[Vercel Blob](https://vercel.com/docs/storage/vercel-blob):

1. En tu proyecto de Vercel, ve a **Storage > Create Database > Blob**.
2. Copia el `BLOB_READ_WRITE_TOKEN` generado a `.env.local` (en local) o a las
   variables de entorno del proyecto en Vercel (en produccion).

## Estructura

```
src/
  app/                  rutas (App Router)
  components/
    ui/                 primitivos (Button, Input, Select...)
    layout/              Header, Footer
    cart/                carrito (drawer, lineas, boton)
    product/             tarjetas, galeria, selector de variantes
    home/                secciones de la home
    upload/              formulario "Imprime tu diseno"
  lib/
    shopify/             cliente GraphQL, queries, mutations, tipos
    cart/                server actions del carrito + contexto de React
    constants.ts          navegacion, materiales, colores, tramos de precio
    estimate.ts            calculo del presupuesto estimado
```

El carrito usa el objeto **Cart** de la Storefront API: el id del carrito se
guarda en una cookie, y todas las mutaciones (anadir, actualizar, eliminar)
son Server Actions de Next.js que llaman a Shopify desde el servidor. El boton
"Finalizar compra" redirige a `cart.checkoutUrl`, el checkout nativo de
Shopify.

## Pendiente antes de produccion

- Conectar un proveedor de email (p. ej. [Resend](https://resend.com)) en
  `src/app/api/contact/route.ts` para que el formulario de contacto envie
  correos de verdad.
- Sustituir las direcciones de ejemplo (`hola@voltrix3d.com`, Instagram,
  ubicacion del taller) por los datos reales del negocio.
- Configurar `NEXT_PUBLIC_SITE_URL` con el dominio final para que el sitemap y
  los metadatos Open Graph sean correctos.

## Despliegue

Pensado para [Vercel](https://vercel.com/new). Anade las variables de
`.env.example` en el proyecto de Vercel (Settings > Environment Variables).
