# Tacoma Giving Machine kiosk widget

This is a small animated graphic of the Tacoma Light the World Giving Machine. It uses the real Tacoma cards. About every 4 seconds a card is “paid for” and drops. Visitors can tap a card to read it larger.

## Preview on this computer

Double-click `index.html`, or open it in Chrome or Edge.

Folder:

`C:\Users\KirkADMINDavis\Documents\Giving Machine 2026\tacoma-kiosk-widget`

## Put it on the Wix Tacoma page

Wix cannot run this as a gallery animation. Host this folder on the web, then embed the page.

### 1. Host the folder (one-time)

You need a public HTTPS link to `index.html`. GitHub Pages is free:

1. Create a GitHub repository (for example `tacoma-giving-machine-kiosk`).
2. Upload everything in this folder, including the `cards` folder.
3. In the repo **Settings → Pages**, set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**.
4. Copy the site URL. It will look like:
   `https://YOUR-USERNAME.github.io/tacoma-giving-machine-kiosk/`

If you already use another host (Netlify, Cloudflare Pages, your own site), upload this same folder there instead.

### 2. Embed it on Wix

1. Open [the Tacoma page](https://www.givingmachinewa.org/tacoma) in the Wix editor.
2. Scroll to **What is in the Tacoma Giving Machine?**
3. Add **Embed** → **Embed a site** (sometimes labeled HTML iframe).
4. Paste the hosted URL from step 1.
5. Stretch the box so the kiosk is tall enough (about 700–900 px on desktop).
6. Hide or delete the old card gallery in that section. Keep the heading.

### 3. Publish

Preview, then publish the Wix site.

## What this does not do

It does not take real payments. It does not change the rest of the Wix page. It is a display graphic that still lets people read each card.

## Updating a card later

Replace the matching file in `cards/`, keep the same file name, and re-upload that file to the host. The Wix embed does not need to be changed.
