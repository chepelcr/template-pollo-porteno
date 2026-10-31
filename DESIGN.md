# Pollo Porteño — design plan

**Concept: Rótulo.** The store is the hand-painted sign of a Puntarenas grill
house. The hero is a yellow board with two navy pinstripes, the restaurant's
name painted in red with a navy offset shadow and a small flame that flickers
a few times when the page opens. The menu is a painted navy board: categories
on red tabs, dishes with dotted leaders and big yellow prices, a round yellow
"+" to add. Photos sit in a ship's porthole (navy ring, yellow edge, rivets) —
the port in "Porteño". The opening hours are on a plate in the hero.

Made for Pollo Porteño (Puntarenas); also serves restaurants, sodas, grills
and takeaway counters. Everything shown is the store's own data: menu, hours
and contact come from the catalog and its settings; no invented figures.

## Palette

| Token | Hex | Role |
|---|---|---|
| sign yellow | `#F6C21C` | the sign, board prices, "+" buttons, cart count |
| sign red | `#D7261E` | the painted name, category tabs — large text only |
| red as text | `#B81E17` | offers and low stock on light surfaces |
| port navy | `#12385A` | the store's accent (org primary): buttons, pinstripes, text |
| navy soft | `#4A6178` | secondary text |
| whitewash | `#FFFDF7` | page |
| cream | `#F7EFD9` | quiet surfaces (highlights, values) |

Contrast (computed): navy on whitewash 11.9:1 · navy on yellow 7.3:1 ·
yellow on navy 7.3:1 · white on navy 12.1:1 · red on whitewash 4.9:1 · red on
yellow 3.0:1 (display sizes only, always with the navy shadow) · white on red
5.0:1 · navy soft on whitewash 6.3:1 · offer red on whitewash 6.4:1 · offer
red on the board `#FF9D94` ≈ 6:1. Dark mode ("de noche en el puerto"): text
`#F4EFE3` on `#0D1B2A` 15.2:1; the sign stays lit and keeps its navy ink.

## Type

**Lilita One** (one chunky, rounded weight — sign-painter lettering) for
display and prices; **Rubik** 400–800 for text and dish names. No all-caps.

## Layout

```
HEADER  [flame] Pollo Porteño   Inicio Menú Nosotros Contacto Trueque  (acct)(theme)[Pedido 0]
        ───────── painted yellow edge ─────────
HOME
┌ yellow sign, navy pinstripes ─────────────────────────────┐
│ [Asado al carbón]                         ◯ porthole photo │
│ Pollo                                                      │
│ Porteño 🔥 (red, navy shadow)                              │
│ subtitle · [Ver el menú] [Cómo llegar] · Horario plate     │
└────────────────────────────────────────────────────────────┘
 De la parrilla: photo cards (category badge, name, price, Agregar)
 El menú: navy board, two columns — red tab, dish ........ ₡7 500 (+)
 highlights (yellow icon plates) · story · CTA as a small sign
MENU PAGE: title, search, filters (sheet on phones), category chips, the
board (grouped; one list when filtered)
DISH: porthole photo, name, big price, facts, quantity + add, related cards
```

## Signature

The sign and the board (`.sign`, `.sign-name`, `.board`, `.leader`,
`MenuBoard`, `Porthole`). Motion: the hero flame flickers 7 times (CSS,
`flame`), the bag hops when a dish is added, sheets slide. Reduced motion and
`?motion=reduce` jump to the final state. No WebGL.

## Changed from the old template

The old one-page menu read an unsigned API and had no cart. It is rebuilt on
the shared core: real catalog and categories, dish pages, cart, checkout with
the Costa Rica address form and WhatsApp handoff (live stores), Tsuru Account
and trueque in the menus, dark mode, Spanish and English.
