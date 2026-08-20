/* ════════════════════════════════════
   MY PROJECT PAGE VIEW
════════════════════════════════════ */
function renderProjectsView() {
  return `
    <div class="page" id="page-projects">

      <!-- Organization & Custom Section Creator Bar -->
      <div class="org-toolbar">
        <div class="org-toolbar-title sora">
          <i class="fa-solid fa-layer-group"></i> Project Organization & Sections
        </div>
        <form class="org-add-form" onsubmit="createCustomSection(event)">
          <input type="text" name="sectionName" class="org-add-input" placeholder="New Section (e.g. Academic Projects)" required/>
          <button type="submit" class="org-add-btn"><i class="fa-solid fa-plus"></i> Add Section</button>
        </form>
      </div>

      <!-- Recently Uploaded Section -->
      <div class="recently-uploaded-card" id="recently-uploaded-wrapper">
        <div class="recent-card-header">
          <h3 class="sora"><i class="fa-solid fa-clock-rotate-left"></i> Recently Uploaded Projects</h3>
          <span class="t-badge" style="background:var(--accent-light);color:var(--accent);font-weight:700">Drag items to organize</span>
        </div>
        <div class="recent-grid" id="recently-uploaded-grid"></div>
      </div>

      <!-- User Created Sections Drop Zones -->
      <div class="custom-sections-grid" id="custom-sections-container"></div>

      <!-- Existing Full Projects Table -->
      <div class="table-card" id="projects-section">
        <div class="table-header">
          <h3 class="sora">All Projects</h3>
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
