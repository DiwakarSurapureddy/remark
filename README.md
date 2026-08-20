# DevOrbit

DevOrbit is a single-page project tracking dashboard built with clean, component-based HTML, CSS, and JavaScript. It helps you organize projects from planning through GitHub and deployment, with a focused interface for progress, milestones, and delivery status.

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
REMARK/
├── index.html                  # Minimal HTML shell (~70 lines)
├── css/
│   └── styles.css              # Extracted CSS design tokens, resets, & component styles
├── js/
│   ├── config.js               # Constants, palettes, default bio/toolbox data, and quotes
│   ├── storage.js              # LocalStorage persistence & user/project normalization helpers
│   ├── components/
│   │   ├── sidebar.js          # Sidebar component (brand, nav, search, attention reminders, user footer)
│   │   ├── profile.js          # Profile drawer component & canvas completion pie chart
│   │   └── tasks.js            # Tasks & Reminders overlay drawer component
│   ├── views/
│   │   ├── dashboard.js        # Dashboard page view (4 metric cards, creation form)
│   │   ├── projects.js         # My Project portfolio table container view
│   │   ├── detail.js           # Project Detail view & 6-step roadmap timeline container
│   │   └── settings.js         # Settings & credentials view
│   ├── ui.js                   # Navigation, rendering functions, modals, theme & profile handlers
│   └── app.js                  # Main application bootloader
└── README.md                   # Project documentation
```

## Getting Started

No build tools or dependencies are required.

1. Clone or download this repository.
2. Open `index.html` directly in a modern browser (works via `file://` or HTTP server).
3. Create an account and add your first project.

For local development, serve the folder with any static web server. In VS Code, the Live Server extension works well.

## Data Storage

This is a client-side prototype. Account, session, profile, and project data are stored in the browser's `localStorage`; there is no backend or shared database. Data is therefore limited to the browser profile and origin where the app is opened.

Because passwords are also stored locally for the demo authentication flow, do not use real credentials or sensitive project information.

## Customization

The project is cleanly separated into component and view modules:

- **Components (`js/components/`)**: Modify `sidebar.js`, `profile.js`, or `tasks.js` to customize reusable UI modules.
- **Page Views (`js/views/`)**: Modify `dashboard.js`, `projects.js`, `detail.js`, or `settings.js` to change view layouts.
- **Styling (`css/styles.css`)**: Modify design tokens (`:root`), theme colors, responsive breakpoints, or component styles.
- **Configuration (`js/config.js`)**: Modify `PALETTES`, `QUOTES`, `ROADMAP`, and `DEFAULT_TOOLBOX` constants.

## License

No license has been specified yet. Add a license before distributing the project publicly.
