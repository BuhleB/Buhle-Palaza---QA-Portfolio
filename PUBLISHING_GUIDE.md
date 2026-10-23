# Publish the portfolio on GitHub Pages

The archive contains the latest CV. All five Resume links request a download named Buhle_Palaza_Software_Tester_CV.pdf.

## Prepare

Extract the ZIP. Work in the folder that contains index.html directly. Keep the HTML, CSS, JavaScript, PDF, images, reports and evidence folders together. Do not upload the ZIP itself as the website. The empty .nojekyll file disables Jekyll processing for this static site.

## Existing repository

If your local project is already connected to GitHub, copy these updated files into that project folder and run:

```bash
git status
git add .
git commit -m "Update portfolio evidence, dashboard and downloadable CV"
git push
```

If you do not have a local clone, clone your existing repository first, then copy the extracted files into the clone. Copy its GitHub HTTPS URL from Code. Example:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

Do not overwrite or delete the clone's .git folder. Review git status before committing. If git reports there are no changes, there is nothing new to commit.

## New repository

On GitHub, create a public repository. For this route, leave README, license and .gitignore initialization off. Copy its HTTPS URL. Open a terminal in the extracted folder that contains index.html:

```bash
git init
git add .
git commit -m "Publish QA portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace YOUR_USERNAME and YOUR_REPOSITORY with your actual values. Complete GitHub sign-in when prompted. This new-repository route requires an empty remote repository; use the existing-repository route if it already has commits. Do not force-push to resolve a rejection.

## Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to Settings > Pages.
3. Under Build and deployment, choose Deploy from a branch.
4. Choose main and /(root), then Save. If your existing repository uses a different default branch, select the branch containing index.html instead.
5. Check the Actions tab for deployment completion. Return to Settings > Pages and select Visit site.

A project repository normally publishes at https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/. A repository named YOUR_USERNAME.github.io publishes at the account root. Allow up to 10 minutes for updates.

## Verify

Open the homepage and each case study. Click Resume from each page and confirm the downloaded CV has the revised Loomee wording. Check all three dashboard projects, images and original report links. If you see old content, refresh without cache (Ctrl+F5) and check the latest deployment in Actions. If Pages shows 404, confirm index.html is directly in the selected branch/root folder.

For future updates, edit the same local clone, then git add ., git commit and git push. GitHub Pages will redeploy from the selected branch.

This portfolio is a static site; it does not need Python, Flask, Maven or npm to publish. The Makwande pipeline YAML in evidence is a downloadable example, not the portfolio deployment workflow.

Official references:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
