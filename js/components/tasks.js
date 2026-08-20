/* ════════════════════════════════════
   TASKS & REMINDERS COMPONENT
════════════════════════════════════ */
function renderTasksComponent() {
  return `
    <div class="profile-overlay" id="tasks-overlay" onclick="closeTasksPanel(event)">
      <div class="profile-panel" id="tasks-panel">
        <div class="prof-header">
          <div class="prof-header-top">
            <h3 class="sora">Tasks & Reminders</h3>
            <button class="panel-close" onclick="closeTasksPanel()"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <p style="font-size:12px;color:var(--muted)">Processing projects with incomplete steps.</p>
        </div>
        <div class="prof-body" id="tasks-body"></div>
      </div>
    </div>
  `;
}
