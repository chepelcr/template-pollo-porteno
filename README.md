# Pollo Porteño — storefront template

The hand-painted sign and menu board of Pollo Porteño, a grill house in
Puntarenas; also a template for restaurants, sodas and takeaway: a yellow sign
hero with the hours always visible, favourites from the grill, and the whole
menu on a painted board with big prices. Design plan: [`DESIGN.md`](DESIGN.md).

## How it works

React 18 + Vite + Tailwind. Everything the store shows is data — branding,
CMS copy (`home`, `about`, `products`, `contact`), dishes, categories, contact
and hours — read through `src/core/`, vendored from the monorepo's
`templates/_core` (do not edit it here). Template code is the design:
`src/components`, `src/pages`, `src/theme`, `src/i18n`.

`/config.json`: `{ "mode": "demo", "templateId": … }` shows the template's demo
rows; a provisioned store gets `{ "mode": "live", "orgId": … }`.

## Pages

`/` · `/products` (the menu: `?category=`, `?sale=1`, `?q=`, `?sort=`) ·
`/products/:id` · `/about` · `/contact` · `/trueque` · `/account` · 404. Old
URLs (`/deals`, `/services`, `/category/:slug`…) redirect into the menu.

## Effects

CSS only: the hero flame flickers a few times, the bag hops when a dish is
added. `prefers-reduced-motion` and `?motion=reduce` stop it; nothing depends
on it.

## Development

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # tsc + vite build → dist/
```

Against a local management-be: `TSURU_DEV_API=http://localhost:5000
VITE_PUBLIC_API_URL=http://localhost:5173 pnpm dev`.

## Deployment

`.github/workflows/deploy.yml`: `develop` → GitHub Pages
(`pollo-porteno.examples.tsuru.jcampos.dev`, staging); `main` → production
example hosting (`pollo-porteno.examples.tsuru.lat`); each deploy notifies the
provisioner to refresh stores using this template.
