# Areej Handmade 2 — Project State

Repo: MHD241/AreejHandmade2 (static site). Last updated: 2026-10-23.
Everything below is local only. **Nothing is pushed to GitHub yet.** Push only after the user approves the preview.
Preview: https://claude.ai/artifact/5xeHSadRdFuzHrmQhjvQte (version 3 = full redesign)

## Done
- Phase 1, photos: all 17 local photos and 11 Unsplash links were swapped for placeholders.
  - Originals are in `areej-original-photos.zip` (sent in chat) and in git commit `f568720`.
  - The restore map is in `PHOTO_BACKUP.md`.
  - Placeholders were later recoloured to the new palette (pink mist with a gold ring).
- Phase 2, round 1 comments: hero fills the screen, images fill their frames, collection bar behaviour. This was superseded by phase 3.
- Phase 3, full redesign, "Mulberry & Gold Thread" palette. The user asked for a calm, premium, handmade feel that keeps the cool features.
  - `assets/areej-site.css` (new) replaces index.html's inline styles and `areej-archive.css`.
  - `assets/product-page.css` (new) replaces the identical inline styles in all 39 `products/*.html`.
  - `story.html` and `studio.html` have their inline styles rewritten and no longer link `areej-archive.css`.
  - Fonts: Cormorant Garamond for display, DM Sans for body, on all pages.
  - index.html markup:
    - Removed the collection chip bar, as the comment asked ("delete this fully").
    - Removed the hero photo cards, as the comment asked ("remove this").
    - Collection hero colours updated in the JS data.
    - The scroll script now only measures the nav height for the sticky subnav.
  - Studio canvas-mood swatches were recoloured to the palette. Customer thread-colour options were left unchanged.
  - Calmer motion: removed pulsing glows, floating cards, spinning stars and the colour-shifting banner. Kept dropdowns, gentle hover lifts, filters, a slowed marquee, the story scroll animation, the studio, the modal and the basket.

- Phase 4, round 2 (preview version 4). The user found phase 3 too plain and asked for it busier and darker.
  - A "Night Garden" layer was appended to the end of `assets/areej-site.css` and `assets/product-page.css`. Studio dark-chrome rules were added to `studio.html`.
  - Dark grounds: night `#1a0912`, night-2 `#24101b`, night-3 `#2f1424`, plum `#4a1230`, with a faint weave texture and gold-edged cards.
  - Busier details:
    - Gold running-stitch marquees: saffron after the hero and plum before the closing.
    - Hero: turning gold rings, twinkling sparkles, a stats strip and a gold sheen on "personal."
    - Sections rise in on scroll, products glow gold on hover, and the stories and gallery are staggered.
    - The studio panel has a shimmering border.
  - Placeholders were recoloured dark, with a gold ring on plum.
  - The stats strip now reads "2023 First stitch · Handmade in Scotland · UK delivery". "40+ Designs" was removed at the user's request.

- Phase 5: light and dark modes (preview version 5).
  - **Mode switching:** a head script in index, product pages and studio sets `<html data-theme>`. It follows the device setting until the visitor uses the sun/moon toggle (in `.nav-actions`, `.header-actions` and the studio nav). The choice is saved in localStorage as `areej-theme`.
  - **Dark mode** is the Night Garden version. Its rules are scoped with `:root[data-theme="dark"]`.
  - **Light mode** is balanced:
    - Linen backgrounds.
    - Dark blocks: hero, Hoops and Palestinian features, studio, personalised-orders promo, gallery band, closing, footer, product builder header and checkout, "related" band.
    - Rules are scoped with `:root:not([data-theme="dark"])`, so it is also the default when there is no script.
  - Shared busy features work in both modes: marquees, rings, sparkles, reveal, hover glows.
  - The story page stays dark in both modes (a cinematic scroll page).
  - Backups of the pre-modes CSS and studio are in the session scratchpad only.

- Phase 6: maroon lifted one notch (preview version 6). The user asked for "a tiny bit less / lighter".
  - Mulberry `#6e1f45` → `#7a2b52`
  - Damson `#3f0f29` → `#4a1a35`
  - Plum `#4a1230` → `#56223f`
  - Night `#1a0912` → `#1c1016`, night-2 `#24101b` → `#271a21`, night-3 `#2f1424` → `#33222c`
  - The matching gradient and rgba values were updated too, and the placeholders were regenerated.
  - The palette values listed below are the pre-phase-6 originals.

- Phase 7: real photos (preview version 8).
  - **Source:** only Drive folder "Areej handmade website images" (`1Z_j0XxIHwibGo5C4sEB0Fv_ISZZsTENF`), as the user asked. 27 files were in it. The duplicate "Copy of Floral Areej Handmade Logo" was skipped.
  - **Conversion:** 25 photos were converted to web JPEGs (max 1400px, quality 82) in `assets/photos/`. The originals stay in Drive. The 3 logos were downloaded but are not used yet.
  - **Product main photos (16):**
    - h1 zainab-floral-name, h2 mini-name-hoops, h3 rose-floral-name, h4 muhammad-calligraphy-wreath
    - h5 wedding-names-date, h6 ryan-pearl-baby, h7 muhammad-baby-keepsake, h9 dua-calligraphy
    - h10 quran-verse-calligraphy, h13 palestine-map, h15 wedding-calendar, h17 keep-growing
    - h20 hiba-floral-wreath, h23 talin-wildflower, k2 arabic-name-keychains, k3 fatimah-keychain
  - **Product pages:** on those 16 pages, the placeholder thumbnails and the "use arrow keys" note were removed, because each has one photo for now.
  - **Rest of the site:**
    - Hero background: areej-craft-studio.
    - Feature blocks: marwa-heart, palestine-map, arabic-name-keychains, wedding-calendar.
    - Story cards: zainab, strawberry, talin, ryan.
    - Gallery (10): alhamdulillah, bismillah, astaghfirullah, dhikr-trio, usama, anes, strawberry, marwa, quran-verse, hiba. Captions were rewritten to match.
    - The story page finale uses 5 of the photos.
  - The "Latest" rail now features products that have photos: h1, k2, h5, h13, h4, k3, h6, h10.
  - **Fits to check with the user:** h7 "Nursery Rainbow Hoop" uses the Muhammad balloon keepsake, and k3 "Mini Charm Pair" uses a single Fatimah keychain.
  - **Products still on placeholders (23):** h8, h11, h12, h14, h16, h18, h19, h21, h22, h24, k1, k4, k5, p1–p5, g1–g5.

- Phase 8: logo, hero and comment fixes (preview version 9).
  - **Real logo:** source is "Floral Areej Handmade Logo.png" from Drive. It replaces the "AH" circle in every header and footer (index, all 39 product pages, studio).
    - `assets/brand/logo-light-text*.png` keeps the original white lettering, for dark mode and footers.
    - `logo-dark-text*.png` has the lettering recoloured to ink, for light mode. The flower is unchanged.
    - CSS swaps `.logo-on-light` and `.logo-on-dark` by theme.
  - **Hero:** the user's name-hoop arrangement photo is `assets/photos/hero-name-hoops.jpg` (1916×821), positioned with the hoops on the right and the copy on the left.
  - **Hero text** (comment "put Areej handmade instead"): the h1 now reads "Areej Handmade." and the small label reads "Beauty, made personal".
  - **Studio preview** (comment "make this more beautiful"): replaced with a hand-built SVG.
    - Wooden hoop with brass screw, linen weave, a lush wreath of leaves, roses, daisies and buds, and "Areej" in italic serif.
    - Animated: a thread that sews itself, floating chips ("Add text", "Florals", a colour palette), and a cursor dragging a bloom.
  - **Palestinian block** (the user clarified the comment): the label now reads "Carry the story" and the big heading reads "Palestinian collection."
  - The earlier comments "delete this fully" (collection bar) and "remove this" (hero card) were already done. Their threads stay open because they were not sent to Claude.

- Phase 9: hero swap and round-4 comments (preview version 10).
  - **Hero:** `assets/photos/hero-name-hoops.jpg` replaced with the user's new image (هدية, الرحمن, رزق, ريما; 1672×941).
  - **"Make this pink gradient with yellow":** "Handmade." uses a pink → saffron gradient with a slow sheen.
  - **"Make the logo way bigger":** the header logo went from 64px to 124px (88px on mobile), with headers 128px tall. The footer logo is 160px and the studio logo 100px.
  - **"I can't see this icon" (WhatsApp, basket):**
    - The cause is the Font Awesome stylesheet, which the artifact viewer blocks.
    - On the real site, the WhatsApp, basket and menu header icons are now inline SVGs.
    - The preview copies only load Font Awesome's JS build from cdnjs instead of its CSS, so all icons show there.
    - The real site still uses the Font Awesome CSS for the other icons.

- Phase 10: placeholder products removed (2026-10-21; merged to `main` via PR #2 on 2026-10-21, merge commit `ffaf310`).
  - **Deleted 22 products** that only had placeholders: h8, h11, h12, h14, h16, h18, h19, h21, h22, h24, k1, k4, k5, p1, p3, p4, p5, g1–g5.
    - Removed from the data in index.html, their pages in `products/`, the nav dropdown links on every page, and the related cards.
  - **17 products remain:** 14 hoops, keyrings k2 and k3, and Palestinian p2. p2 now uses its restored real photo, `assets/products/palestinian-accessory-bundle.png`.
  - **Gifts collection:** the user chose to keep it as "coming soon". `renderProducts()` shows a coming-soon panel when a collection is empty, with "Ask for a custom gift" (WhatsApp) and "Shop hoops". The nav dropdown item reads "Gift sets coming soon".
  - **Counts and data:** the hoop count changed from 24 to 14. Product pages' PRODUCT data (img/images) now points at real photos.
  - `assets/placeholders/` was deleted because nothing uses it any more.
  - **Bug fixed:** the hoop filter buttons were showing on every collection. They now show on Hoops only.

  - Home Gifts block is now clearly "coming soon" (preview version 12):
    - A saffron "Coming soon" pill with a pulsing dot above the title.
    - The subtitle reads "Gift sets are on the way." with a note offering gift wrap or a custom gift.
    - The main button reads "Ask for a custom gift" and opens WhatsApp.
    - The photo is dimmed, with a large tilted "Coming soon" stitched ribbon across it.

  - The Gifts block on the home page now uses a drawn gift illustration, `assets/photos/gifts-coming-soon.svg`, instead of the wedding photo.
    - It is an SVG of a wrapped box with a gold bow, a "For you" tag, a small hoop and flowers.
    - A real stock photo couldn't be downloaded because the workspace blocks image sites. The user can attach one to swap in.
    - The "Coming soon" ribbon moved to the top-left corner so the gift stays visible.

- Phase 11: price ladder for every product (2026-10-23; merged to `main` via PR #3 on 2026-10-23, with phase 12).
  - **Research:** UK hand-stitched floral/name hoops at 5 to 8" cost £25 to £100 (average about £50). Details and sources are in `Areej-Handmade-Pricing.xlsx` (sent in chat).
  - **Per-size prices:** every product now has `prices:[...]` in the same order as `sizes` (index.html data and each product page's PRODUCT data). The size pills, size dropdown, add button, basket and related cards all use the chosen size's price.
  - **New prices (small to large):** h1 48/62/80, h2 24/30/38, h3 95/120, h4 65/85/110, h5 68/88/108, h6 64/82, h7 40/54/72, h9 88/112, h10 92/118, h13 95/120, h15 72/92/115, h17 38/52, h20 92/118, h23 28/38/52, k2 13/18, k3 24, p2 30/45.
  - **Design Studio:** base hoop is £44 / £60 / £78 (was £18 / £23 / £28); default Classic £60.
  - **Estimates to confirm with the owner:** hours and materials per size, and the contents of the Palestinian bundle.
  - **Side effects:** free UK delivery still starts at £60, so most hoops now qualify. Baskets saved in browsers before the change keep old prices.

- Phase 12: owner's comments on preview version 14 (2026-10-23; merged to `main` via PR #3).
  - **Events:** the nav "Events" link now goes to a new "Find Areej in person." section. It is data-driven: add dates to the `EVENTS` array in index.html (example in the comment above it). Past dates hide by themselves. With no dates it shows a "Dates coming soon" panel with a WhatsApp button.
  - **Products merged (14 products now, 11 hoops):** Wildflower Initial (h23) is now a photo on Family Name Wreath (h20). Dua for the Home (h9) is now a photo on Quran & Dua Hoop (h10, the old Quran Verse Keepsake). Statement Floral Name (h3) is now a photo on Mini Memory (h2), because the owner said it is one of the small hoops. Product pages h3, h9 and h23 were deleted.
  - **Teacher hoop (h17)** is now the Custom Quote Hoop (filter "Occasions" became "Quotes").
  - **Name tag (k2):** one size, £16.
  - **Spacing fix:** icons above "Hand-finished / Your colours / Personally confirmed" were squished in the preview (the viewer swaps icons for inline SVGs). CSS now covers both.
  - **Fixed:** stale "View all 24 hoops" link in the hoop menu now says 11.
  - **Not acted on:** a resolved thread said a hoop "is part of the newborn birth hoop". I did not merge anything for it (see open questions).
  - **Open question:** is the Nursery Rainbow Hoop (h7, Muhammad balloon keepsake photo) part of the New Baby Birth Hoop (h6)?

## Palette (approved)
- Linen neutrals: muslin `#f6f1ee`, ecru `#ece4dc`, oat `#d9cdc2`, taupe `#76655f`, ink `#2b1a22`.
- Mulberry family: mist `#f3e6ec`, rose silk `#e2bccb`, dusty rose `#c4879d`, mulberry `#6e1f45`, damson `#3f0f29`.
- Gold thread: champagne `#efe2c8`, gold `#c4a265`, antique gold `#86672f`. Use for lines and labels only.
- Heather: heather mist `#e6e1ec`, heather `#a99bb8`.
- Saffron accent: butter `#fbefc4`, saffron `#f2c14e`, mustard `#7a5600`.

## Open issues
- Unused now and kept for review: `areej-archive.css`, `assets/areej-archive.css`, `assets/product.css`. They can be deleted once the user approves.
- Icons (Font Awesome) don't show in the artifact preview because the viewer blocks that stylesheet. The real site is unaffected.
- Images are cropped to fill their frames ("cover"). When real photos return, check that no piece gets cut off.
- Some copy reads as internal ("Every piece you sent. Now part of the site.").

## Next step
- **Pushed 2026-10-21:** branch `redesign-mulberry-gold`, commit `4e7f7c3`, pull request https://github.com/MHD241/AreejHandmade2/pull/1. **Merged into `main` on 2026-10-21 (merge commit `fccaba7`).**
- Next steps: add photos for the 23 placeholder products; optionally delete the unused CSS files.
- Before committing, the original `assets/gallery` and `assets/products` photos were restored, so the repository keeps the real files. Only `palestinian-accessory-bundle.png` (product p2) is still used.
