/* ════════════════════════════════════
   DASHBOARD PAGE VIEW
════════════════════════════════════ */
function renderDashboardView() {
  return `
    <div class="page active" id="page-dashboard">
      <!-- 4 stat cards -->
      <div class="stats-grid">
        <div class="stat-card blue">
          <div class="stat-top">
            <div><div class="stat-label">Total Projects</div><div class="stat-value" id="s-total">0</div></div>
            <div class="stat-icon blue"><i class="fa-solid fa-folder-open"></i></div>
          </div>
        </div>
        <div class="stat-card orange">
          <div class="stat-top">
            <div><div class="stat-label">Processing</div><div class="stat-value" id="s-proc" style="color:var(--orange)">0</div></div>
            <div class="stat-icon orange"><i class="fa-solid fa-spinner"></i></div>
          </div>
        </div>
        <div class="stat-card green">
          <div class="stat-top">
            <div><div class="stat-label">Completed</div><div class="stat-value" id="s-done" style="color:var(--green)">0</div></div>
            <div class="stat-icon green"><i class="fa-solid fa-circle-check"></i></div>
          </div>
        </div>
        <div class="stat-card purple">
          <div class="stat-top">
            <div><div class="stat-label">Deployed</div><div class="stat-value" id="s-deployed" style="color:var(--purple)">0</div></div>
            <div class="stat-icon purple"><i class="fa-solid fa-rocket"></i></div>
          </div>
        </div>
      </div>

      <!-- add project -->
      <div class="add-card">
        <div class="card-title sora"><i class="fa-solid fa-circle-plus"></i> Create New Project</div>
        <form id="add-form" onsubmit="addProject(event)">
          <div class="add-form">
            <div class="form-group">
              <label>Project Name *</label>
              <input class="form-control" name="pname" placeholder="e.g. E-Commerce App" required/>
            </div>
            <div class="form-group">
              <label>Status</label>
              <select class="form-control" name="status">
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div class="form-group">
              <label>Deployment</label>
              <select class="form-control" name="deployed">
                <option value="No">Not Deployed</option>
                <option value="Yes">Deployed</option>
              </select>
            </div>
            <div class="form-group">
              <label>Description</label>
              <input class="form-control" name="desc" placeholder="Short description…"/>
            </div>
            <button type="submit" class="f-submit">+ Create</button>
          </div>
          <!-- URL row -->
          <div class="add-form-row2">
            <div class="form-group">
              <label><i class="fa-brands fa-github"></i> GitHub Repository URL</label>
              <div class="url-input-wrap">
                <i class="fa-brands fa-github url-github-icon"></i>
                <span class="url-prefix github">github.com/</span>
                <input class="form-control has-github-prefix" name="githubUrl" placeholder="username/repo-name"/>
              </div>
            </div>
            <div class="form-group">
              <label><i class="fa-solid fa-rocket"></i> Deployment / Live URL</label>
              <div class="url-input-wrap">
                <span class="url-prefix">https://</span>
                <input class="form-control has-prefix" name="deployUrl" placeholder="your-app.vercel.app"/>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;
}
