/* ════════════════════════════════════
   PROFILE PANEL COMPONENT
════════════════════════════════════ */
function renderProfileComponent() {
  return `
    <div class="profile-overlay" id="profile-overlay" onclick="closeProfile(event)">
      <div class="profile-panel">
        <div class="prof-header">
          <div class="prof-header-top">
            <h3 class="sora">My Profile</h3>
            <button class="panel-close" onclick="closeProfile()"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="prof-user">
            <div class="avatar av-lg" id="prof-avatar"></div>
            <div>
              <div class="prof-name" id="prof-name"></div>
              <div class="prof-meta" id="prof-meta"></div>
              <div class="prof-bio" id="prof-bio"></div>
              <div class="prof-links" id="prof-links"></div>
            </div>
          </div>
        </div>
        <div class="prof-body">
          <div id="prof-rows"></div>
          <div class="prof-card-section" id="prof-toolbox"></div>
          <div class="pie-section">
            <h4 class="sora">Project Completion Rate</h4>
            <div class="pie-wrap">
              <div class="pie-canvas-wrap">
                <canvas id="pie-canvas" width="100" height="100"></canvas>
                <div class="pie-center"><span class="pcn" id="pie-pct">0%</span><span class="pcs">completed</span></div>
              </div>
              <div class="pie-legend" id="pie-legend"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
