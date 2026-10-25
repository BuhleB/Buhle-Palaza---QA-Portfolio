# Use the updated portfolio

The `portfolio` folder contains the complete static website. It includes the new `qa-lab.html` and `qa-lab.js`; copy these along with the existing files.

## Preview

Open the `portfolio` folder in VS Code and use Live Server to open `index.html`.

Alternatively, from inside that folder, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser. No npm build, backend server or database is needed for the portfolio itself.

## Update your existing GitHub Pages project

1. Keep a backup of your current project.
2. Copy the **contents** of `portfolio` into the local repository folder that already contains `index.html`. Keep your existing `.git` directory.
3. Include the new QA Lab page and script, plus the updated `images`, `reports` and `evidence` directories.
4. Review the changes in VS Code Source Control, commit and push using your existing GitHub workflow.
5. When the Pages deployment finishes, check the published homepage, case studies, QA Lab and report dashboard. Refresh without cache if the old version appears.

Do not upload the ZIP itself as the website. The handover notes outside `portfolio` are for your review and do not need to be copied into the site.

## Useful checks

- Navigation works on desktop and with the mobile Menu control.
- QA Lab status buttons change the request, HTTP status, response and explanation together.
- Test-case filters and expandable details work.
- Images open in a keyboard-accessible viewer and Escape closes it.
- The dashboard switches between all three projects and the individual SauceDemo runs.
- Download CV retrieves the PDF.

The original historical report files and CV PDF are retained. New results should be added as dated runs rather than overwriting historical outcomes without explanation.
