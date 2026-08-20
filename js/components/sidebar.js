/* ════════════════════════════════════
   SIDEBAR COMPONENT
════════════════════════════════════ */
function renderSidebarComponent() {
  return `
    <aside class="sidebar" id="sidebar">
      <!-- top: brand + collapse -->
      <div class="sb-top">
        <div class="sb-brand-row">
          <div class="sb-brand">
            <div class="sb-icon"><svg class="remark-logo" viewBox="0 0 18 20" aria-hidden="true"><defs><linearGradient id="logoGlossGradSide" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#c7d2fe"/></linearGradient></defs><path d="M16 4.2C14.3 2.8 12.3 2.1 10 2.1 7.6 2.1 6.3 2.8 6.3 4c0 1.1 1.1 1.6 4.1 2.4l1.5.4c3.9 1 5.9 2.9 5.9 6 0 3.9-3.4 6.2-8.8 6.2-3.8 0-6.9-1.1-9-3.3l2.6-3c1.7 1.7 3.9 2.6 6.6 2.6 2.5 0 3.9-.8 3.9-2.1 0-1.1-1.1-1.7-4-2.4l-1.6-.4c-3.9-1-6-3-6-6C1.5.7 4.8-1.5 9.9-1.5c3.3 0 6.1.9 8.2 2.6z" fill="url(#logoGlossGradSide)" transform="translate(-1.5 1.5)"/></svg></div>
            <span class="sb-title sora">Project Remark</span>
          </div>
          <button class="collapse-btn" id="collapse-btn" onclick="toggleSidebar()" title="Collapse sidebar">
            <i class="fa-solid fa-chevron-left" id="collapse-icon"></i>
          </button>
        </div>
        <!-- search -->
        <div class="sb-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="sb-search-input" placeholder="Search projects…" oninput="searchProjects(this.value)"/>
        </div>
      </div>

      <!-- nav -->
      <div class="sb-nav">
        <div class="sb-section-label">Main Menu</div>
        <div class="sb-focus-card">
          <div class="sb-focus-kicker">Personal Overview</div>
          <div class="sb-focus-name" id="sb-focus-name"></div>
          <div class="sb-focus-text" id="sb-focus-text"></div>
          <div class="sb-focus-meta">
            <span class="sb-focus-chip"><i class="fa-brands fa-github"></i><span id="sb-focus-repos"></span></span>
            <span class="sb-focus-chip"><i class="fa-solid fa-rocket"></i><span id="sb-focus-live"></span></span>
          </div>
        </div>
        <button class="nav-item active" id="nav-dashboard" onclick="showPage('dashboard')">
          <i class="fa-solid fa-chart-line"></i>
          <span class="nav-label">Dashboard</span>
          <span class="sb-tooltip">Dashboard</span>
        </button>
        <button class="nav-item" id="nav-projects" onclick="openProjectPortfolio()">
          <i class="fa-solid fa-folder-open"></i>
          <span class="nav-label">My Project</span>
          <span class="sb-tooltip">My Project</span>
        </button>
        <button class="nav-item" id="nav-tasks" onclick="showTasksPanel()">
          <i class="fa-solid fa-list-check"></i>
          <span class="nav-label">Tasks</span>
          <span class="nav-badge" id="tasks-badge">0</span>
          <span class="sb-tooltip">Tasks</span>
        </button>
        <button class="nav-item" id="nav-settings" onclick="showPage('settings')">
          <i class="fa-solid fa-gear"></i>
          <span class="nav-label">Settings</span>
          <span class="sb-tooltip">Settings</span>
        </button>

        <!-- reminders -->
        <div class="sb-section-label">Project Attention</div>
        <div class="sb-reminders" id="sb-reminders">
          <div class="sb-rem-title"><i class="fa-solid fa-list-check" style="font-size:9px"></i> Reminders</div>
          <div id="sb-rem-list"></div>
        </div>
      </div>

      <!-- footer: user -->
      <div class="sb-footer">
        <div class="sb-user-row">
          <div class="avatar av-xs" id="sb-avatar"></div>
          <div style="min-width:0;flex:1">
            <div class="sb-uname" id="sb-name"></div>
            <div class="sb-ucount" id="sb-count"></div>
          </div>
        </div>
        <button class="logout-btn" onclick="doLogout()">
          <i class="fa-solid fa-right-from-bracket" style="font-size:12px;flex-shrink:0"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  `;
}
