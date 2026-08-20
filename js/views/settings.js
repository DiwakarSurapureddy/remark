/* ════════════════════════════════════
   SETTINGS PAGE VIEW
════════════════════════════════════ */
function renderSettingsView() {
  return `
    <div class="page" id="page-settings">
      <div class="settings-wrap">
        <div class="settings-card">
          <h3 class="sora">Update Credentials</h3>
          <div class="ssub">Current password is required to save any change.</div>
          <form id="settings-form" onsubmit="saveSettings(event)">
            <div class="sfield">
              <label>Current Password *</label>
              <div class="pass-field">
                <input id="settings-cur-pass" type="password" name="curPass" placeholder="••••••••" required/>
                <button type="button" class="pass-toggle" onclick="togglePasswordField('settings-cur-pass',this)" aria-label="Show password"><i class="fa-regular fa-eye"></i></button>
              </div>
            </div>
            <div class="sfield">
              <label>New Password</label>
              <div class="pass-field">
                <input id="settings-new-pass" type="password" name="newPass" placeholder="Leave blank to keep current"/>
                <button type="button" class="pass-toggle" onclick="togglePasswordField('settings-new-pass',this)" aria-label="Show password"><i class="fa-regular fa-eye"></i></button>
              </div>
            </div>
            <div class="sfield">
              <label>Confirm New Password</label>
              <div class="pass-field">
                <input id="settings-new-pass2" type="password" name="newPass2" placeholder="Repeat new password"/>
                <button type="button" class="pass-toggle" onclick="togglePasswordField('settings-new-pass2',this)" aria-label="Show password"><i class="fa-regular fa-eye"></i></button>
              </div>
            </div>
            <div class="sfield">
              <label><i class="fa-brands fa-github"></i> GitHub Profile</label>
              <input type="text" name="githubProfile" placeholder="github.com/your-username"/>
              <div class="field-hint">Add your public GitHub profile or username.</div>
            </div>
            <div class="sfield">
              <label><i class="fa-brands fa-linkedin"></i> LinkedIn Profile</label>
              <input type="text" name="linkedinProfile" placeholder="linkedin.com/in/your-profile"/>
              <div class="field-hint">Add your LinkedIn professional profile link.</div>
            </div>
            <div class="sfield">
              <label>Professional Bio</label>
              <textarea name="bio" placeholder="Write a short value proposition for your profile."></textarea>
            </div>
            <div class="sfield">
              <label>Toolbox: Languages</label>
              <textarea name="toolboxLanguages" placeholder="Python|92&#10;JavaScript|78"></textarea>
              <div class="field-hint">One skill per line using \`Skill|Percent\` format.</div>
            </div>
            <div class="sfield">
              <label>Toolbox: Libraries</label>
              <textarea name="toolboxLibraries" placeholder="Pandas|88&#10;TensorFlow|74"></textarea>
            </div>
            <div class="sfield">
              <label>Toolbox: Cloud / DevOps</label>
              <textarea name="toolboxCloud" placeholder="Vercel Deployment|84&#10;GitHub Workflow|81"></textarea>
            </div>
            <div class="sfield">
              <label>Accent Colour</label>
              <div class="swatches" id="swatches"></div>
              <div style="font-size:11px;color:#94a3b8" id="swatch-label"></div>
            </div>
            <button type="submit" class="save-btn">Save Changes</button>
            <div class="s-msg" id="s-msg"></div>
          </form>
        </div>
        <div class="danger-card">
          <h3 class="sora">Danger Zone</h3>
          <p>Permanently delete all your projects. This cannot be undone.</p>
          <button class="danger-btn" onclick="clearAllProjects()"><i class="fa-solid fa-trash-can"></i> Delete All Projects</button>
        </div>
      </div>
    </div>
  `;
}
