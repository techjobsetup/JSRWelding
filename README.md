# JSRWelding

Static website for **Jai SriRam Welding Works**.

## Publish to GitHub using GitHub Actions (GitHub Pages)

This repository contains a static site in the `JaiSriRamWeldingWorks` folder.

### 1) Enable GitHub Pages
1. Open repository **Settings**.
2. Go to **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.

### 2) Create workflow file
Create `.github/workflows/deploy-pages.yml` with:

```yaml
name: Deploy static site to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Prepare artifact
        run: |
          mkdir -p _site
          cp -R JaiSriRamWeldingWorks/* _site/

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: _site

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 3) Commit and push
```bash
git add .github/workflows/deploy-pages.yml README.md
git commit -m "Add GitHub Pages deployment workflow and documentation"
git push origin main
```

### 4) Verify deployment
1. Open the **Actions** tab and wait for the workflow to pass.
2. Go back to **Settings > Pages** to see the live URL.

Expected URL format:

`https://techjobsetup.github.io/JSRWelding/`name: Deploy static site to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Prepare artifact
        run: |
          mkdir -p _site
          cp -R JaiSriRamWeldingWorks/* _site/

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: _site

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4