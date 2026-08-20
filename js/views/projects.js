/* ════════════════════════════════════
   MY PROJECT PAGE VIEW
════════════════════════════════════ */
function renderProjectsView() {
  return `
    <div class="page" id="page-projects">
      <div class="table-card" id="projects-section">
        <div class="table-header">
          <h3 class="sora">My Project</h3>
          <span class="t-badge" id="t-count">0 total</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Status</th>
              <th>Deployed</th>
              <th>GitHub</th>
              <th>Live Project URL</th>
              <th>Progress</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="proj-tbody"></tbody>
        </table>
      </div>
    </div>
  `;
}
