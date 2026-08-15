# Project Remark

Project Remark is a single-page project tracking dashboard built with plain HTML, CSS, and JavaScript. It helps you organize projects from planning through GitHub and deployment, with a focused interface for progress, milestones, and delivery status.

## Features

- Sign up, sign in, and sign out from the in-browser demo
- Dashboard metrics for total, processing, completed, and deployed projects
- Create projects with status, description, GitHub repository, and live deployment URL
- Search projects by name or description
- Project detail pages with a six-stage delivery roadmap:
  - Requirement Gathering
  - Design & Architecture
  - Core Development
  - Quality Assurance
  - Pushed to GitHub
  - Deployment & Launch
- Update roadmap steps as pending, active, or done
- Tasks and project reminders panel
- Editable profile, bio, GitHub/LinkedIn links, skills toolbox, password, and accent color
- Responsive layout with collapsible sidebar
- External Sora, Inter, and Font Awesome assets loaded from CDNs

## Project Structure

```text
.
|-- index.html   # Complete application: markup, styles, and JavaScript
|-- README.md
`-- .gitignore
```

## Getting Started

No build tools or dependencies are required.

1. Clone or download this repository.
2. Open `index.html` in a modern browser.
3. Create an account and add your first project.

For local development, serve the folder with any static web server. In VS Code, the Live Server extension works well.

## Data Storage

This is a client-side prototype. Account, session, profile, and project data are stored in the browser's `localStorage`; there is no backend or shared database. Data is therefore limited to the browser profile and origin where the app is opened.

Because passwords are also stored locally for the demo authentication flow, do not use real credentials or sensitive project information.

## Customization

The application is intentionally self-contained in `index.html`:

- Edit the HTML to change copy, layout, or form fields.
- Update the CSS variables near the top of the file to change the visual theme.
- Modify the `PALETTES`, `QUOTES`, `ROADMAP`, and `DEFAULT_TOOLBOX` constants to change defaults.
- Replace the CDN links with local assets if the project must work offline.

## Limitations

- Authentication is a browser-only demo and is not production secure.
- Data is not synchronized between browsers or devices.
- GitHub and deployment links are displayed and opened, but the app does not call GitHub or deployment APIs to verify them.
- CDN-hosted fonts and icons require an internet connection unless replaced with local files.

## License

No license has been specified yet. Add a license before distributing the project publicly.
