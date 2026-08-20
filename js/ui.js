/* ════════════════════════════════════
   UI HELPERS & UTILITIES
════════════════════════════════════ */
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getDisplayName() {
  if (!currentUser || !currentUser.username) return 'User';
  return currentUser.username.split(/[\s._-]+/)[0] || currentUser.username;
}

function getDashboardQuote() {
  const name = getDisplayName();
  const total = projects.length;
  const deployed = projects.filter(p => p.deployed === 'Yes').length;
  const linked = projects.filter(p => p.githubUrl).length;
  const active = projects.filter(p => p.status === 'Processing').length;
  if (!total) return `${name}, start with one focused project and build a portfolio that reads clearly from brief to release.`;
  if (deployed > 0) return `${name}, your live delivery shows momentum. Keep each repository, deployment link, and milestone easy to review.`;
  if (linked < total) return `${name}, connect every repository and live link so each project feels complete and professionally presented.`;
  if (active > 1) return `${name}, steady execution across active work will keep your delivery story clear and reliable.`;
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

function getSidebarFocus() {
  if (!projects.length) return 'Create your first project, connect its repository, and keep each milestone visible from day one.';
  const pending = projects.filter(p => p.status === 'Processing' && p.steps.some(s => s.state !== 'done')).length;
  if (pending) return `${pending} active project${pending !== 1 ? 's' : ''} still need attention. Keep the next review point, repository, and release status updated.`;
  return 'All current milestones look organized. Use this board to keep GitHub and deployment details easy for every reviewer to understand.';
}

function getGithubStatus(project) {
  return project.githubUrl ? 'Pushed to GitHub' : 'Repository not linked';
}

function getDeployStatus(project) {
  if (project.deployUrl) return 'Live URL available';
  return project.deployed === 'Yes' ? 'Marked as deployed' : 'Live URL pending';
}

function getStepStatus(project, step) {
  if (step.state === 'done') {
    if (step.name === 'Pushed to GitHub') return project.githubUrl ? 'Repository linked' : 'Completed';
    if (step.name === 'Deployment & Launch') return project.deployUrl ? 'Live URL available' : 'Completed';
    return 'Completed';
  }
  if (step.state === 'active') {
    if (step.name === 'Pushed to GitHub') return 'Preparing repository handoff';
    if (step.name === 'Deployment & Launch') return 'Release in progress';
    return 'In progress';
  }
  if (step.name === 'Pushed to GitHub') return project.githubUrl ? 'Ready for repository review' : 'Repository not linked';
  if (step.name === 'Deployment & Launch') return project.deployUrl ? 'Awaiting launch confirmation' : 'Live URL pending';
  return 'Pending';
}

function getStepNote(project, stepName) {
  if (stepName === 'Pushed to GitHub') {
    return project.githubUrl ? `github.com/${project.githubUrl}` : 'Add the GitHub repository URL to confirm this milestone.';
  }
  if (stepName === 'Deployment & Launch') {
    return project.deployUrl ? project.deployUrl : 'Add the deployed project URL when the release is live.';
  }
  return '';
}

function renderBrandAvatar(el) {
  if (!el) return;
  el.classList.add('brand-avatar');
  el.innerHTML = '<span class="brand-logo"><span class="brand-logo-stem"></span><span class="brand-logo-bar"></span><span class="brand-logo-bar bar-bottom"></span><span class="brand-logo-dot"></span></span>';
}

function renderIdentityAvatars() {
  ['sb-avatar', 'top-avatar', 'prof-avatar'].forEach(id => renderBrandAvatar(document.getElementById(id)));
}

function formatProfileLink(url) {
  return url.replace(/^https?:\/\/(www\.)?/, '');
}

function getSocialLinksHTML() {
  const links = [];
  if (currentUser.githubProfile) {
    links.push(`<a class="prof-icon-link github" href="${currentUser.githubProfile}" target="_blank" title="GitHub profile"><i class="fa-brands fa-github"></i></a>`);
  }
  if (currentUser.linkedinProfile) {
    links.push(`<a class="prof-icon-link linkedin" href="${currentUser.linkedinProfile}" target="_blank" title="LinkedIn profile"><i class="fa-brands fa-linkedin-in"></i></a>`);
  }
  return links.length ? links.join('') : '<span class="prof-link-empty">Add GitHub and LinkedIn links in Settings.</span>';
}

function getToolboxHTML() {
  return `
    <h4 class="sora">Toolbox</h4>
    <div class="prof-card-sub">Your current technical stack and comfort levels, fully controlled from the profile settings.</div>
    <div class="toolbox-grid">
      ${currentUser.toolbox.map(group => `
        <div class="toolbox-group">
          <div class="toolbox-title">${group.title}</div>
          ${group.items.map(([name, level]) => `
            <div class="skill-row">
              <div class="skill-meta"><span>${name}</span><span>${level}%</span></div>
              <div class="skill-bar"><div class="skill-fill" style="width:${level}%"></div></div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;
}

/* ════════════════════════════════════
   THEME & ACCENT COLOR
════════════════════════════════════ */
function applyAccent(hex) {
  const pal = PALETTES.find(p => p.hex === hex) || PALETTES[0];
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  const root = document.documentElement;
  root.style.setProperty('--accent', hex);
  root.style.setProperty('--accent-light', pal.light);
  root.style.setProperty('--accent-rgb', `${r},${g},${b}`);
  root.style.setProperty('--sidebar-glow', `radial-gradient(circle at top,rgba(${r},${g},${b},.22) 0%,rgba(${r},${g},${b},0) 56%)`);
  root.style.setProperty('--sidebar-soft', `rgba(${r},${g},${b},.12)`);
  root.style.setProperty('--sidebar-strong', `rgba(${r},${g},${b},.22)`);
  root.style.setProperty('--sidebar-border', `rgba(${r},${g},${b},.28)`);
  document.querySelectorAll('.avatar').forEach(a => a.style.background = hex);
  document.querySelectorAll('.f-submit,.save-btn,.org-add-btn').forEach(b => b.style.background = hex);
  document.querySelectorAll('.card-title i, .add-card h3 i, .org-toolbar-title i, .recent-card-header h3 i, .section-box-title i').forEach(i => i.style.color = hex);
  document.querySelectorAll('.ai-badge').forEach(b => b.style.background = hex);
  document.querySelectorAll('.nav-item.active').forEach(n => {
    n.style.background = `linear-gradient(90deg,rgba(${r},${g},${b},.18) 0%,rgba(${r},${g},${b},.06) 100%)`;
    n.style.borderLeftColor = hex;
    const ic = n.querySelector('i:first-child'); if (ic) ic.style.color = hex;
  });
  document.querySelectorAll('.proj-icon').forEach(ic => ic.style.background = hex);
  renderIdentityAvatars();
}

/* ════════════════════════════════════
   SIDEBAR & SEARCH CONTROLS
════════════════════════════════════ */
function toggleSidebar() {
  sidebarCollapsed = !sidebarCollapsed;
  document.getElementById('sidebar').classList.toggle('collapsed', sidebarCollapsed);
  const icon = document.getElementById('collapse-icon');
  icon.className = sidebarCollapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left';
}

function searchProjects(val) {
  searchQuery = val.toLowerCase();
  renderTable();
}

/* ════════════════════════════════════
   AUTH FORMS & SESSION MANAGEMENT
════════════════════════════════════ */
function renderAuthForm() {
  const authWrap = document.getElementById('auth-wrap');
  if (!authWrap) return;
  authWrap.innerHTML = isLoginMode ? `
    <h2 class="sora">Welcome back</h2>
    <p class="sub">Sign in to continue to your dashboard.</p>
    <form onsubmit="doLogin(event)">
      <div class="lfield"><label>Username</label><input name="u" placeholder="your_username" autocomplete="username" required/></div>
      <div class="lfield"><label>Password</label><input name="p" type="password" placeholder="••••••••" autocomplete="current-password" required/></div>
      <button type="submit" class="login-btn">Sign In →</button>
      <div class="login-err" id="auth-err"></div>
    </form>
    <div class="login-toggle">No account? <a onclick="switchAuth()">Sign Up</a></div>
  ` : `
    <h2 class="sora">Create account</h2>
    <p class="sub">Join and start tracking your projects today.</p>
    <form onsubmit="doRegister(event)">
      <div class="lfield"><label>Username</label><input name="u" placeholder="your_username" autocomplete="username" required/></div>
      <div class="lfield"><label>Password</label><input name="p" type="password" placeholder="min 4 characters" autocomplete="new-password" required/></div>
      <div class="lfield"><label>Confirm Password</label><input name="p2" type="password" placeholder="repeat password" required/></div>
      <button type="submit" class="login-btn">Create Account →</button>
      <div class="login-err" id="auth-err"></div>
    </form>
    <div class="login-toggle">Have an account? <a onclick="switchAuth()">Sign In</a></div>
  `;
}

function switchAuth() { isLoginMode = !isLoginMode; renderAuthForm(); }
function setErr(m) { const e = document.getElementById('auth-err'); if (e) e.textContent = m; }

function doLogin(e) {
  e.preventDefault();
  const u = e.target.u.value.trim(), p = e.target.p.value;
  const st = getUser(u);
  if (!st || st.password !== p) { setErr('Invalid username or password.'); return; }
  startSession(st);
}

function doRegister(e) {
  e.preventDefault();
  const u = e.target.u.value.trim(), p = e.target.p.value, p2 = e.target.p2.value;
  if (getUser(u)) { setErr('Username already taken.'); return; }
  if (p.length < 4) { setErr('Password must be at least 4 characters.'); return; }
  if (p !== p2) { setErr('Passwords do not match.'); return; }
  const nu = { username: u, password: p, color: '#4f46e5', bio: DEFAULT_BIO, githubProfile: '', linkedinProfile: '', toolbox: DEFAULT_TOOLBOX };
  saveUser(nu); startSession(nu);
}

function startSession(user) {
  currentUser = normalizeUser(user);
  projects = normalizeProjects(getProj(user.username));
  customSections = getSections(user.username);
  pickedColor = user.color || '#4f46e5';
  localStorage.setItem('session', user.username);
  saveUser(currentUser);
  saveProj(user.username, projects);
  saveSections(user.username, customSections);
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').classList.add('visible');
  applyAccent(pickedColor);
  updateSidebar();
  updateReminders();
  showPage('dashboard');
}

function doLogout() {
  currentUser = null; projects = []; customSections = [];
  localStorage.removeItem('session');
  document.getElementById('app').classList.remove('visible');
  document.getElementById('login-screen').classList.remove('hidden');
  isLoginMode = true; renderAuthForm();
}

/* ════════════════════════════════════
   SIDEBAR & REMINDERS UPDATE
════════════════════════════════════ */
function updateSidebar() {
  if (!currentUser) return;
  const $ = id => document.getElementById(id);
  const repoCount = projects.filter(p => p.githubUrl).length;
  const liveCount = projects.filter(p => p.deployUrl || p.deployed === 'Yes').length;
  $('sb-name').textContent = currentUser.username;
  $('sb-count').textContent = projects.length + ' project' + (projects.length !== 1 ? 's' : '');
  $('sb-focus-name').textContent = getDisplayName() + ' Dashboard';
  $('sb-focus-text').textContent = getSidebarFocus();
  $('sb-focus-repos').textContent = repoCount + ' repo' + (repoCount !== 1 ? 's' : '');
  $('sb-focus-live').textContent = liveCount + ' live';
  renderIdentityAvatars();
}

function updateReminders() {
  const tasks = projects.filter(p => p.status === 'Processing' && p.steps.some(s => s.state === 'pending'));
  const badge = document.getElementById('tasks-badge');
  if (badge) { badge.textContent = tasks.length; badge.style.display = tasks.length ? '' : 'none'; }
  
  const remList = document.getElementById('sb-rem-list');
  if (remList) {
    if (!tasks.length) {
      remList.innerHTML = '<div class="sb-rem-text" style="color:#334155">All caught up! 🎉</div>';
    } else {
      remList.innerHTML = tasks.slice(0, 3).map(p => `
        <div class="sb-rem-item">
          <div class="sb-rem-dot"></div>
          <div class="sb-rem-text">${esc(p.name)} has pending steps</div>
        </div>
      `).join('');
    }
  }
}

function openProjectPortfolio() {
  showPage('projects');
}

/* ════════════════════════════════════
   PAGE NAVIGATION
════════════════════════════════════ */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.remove('active');
    n.style.background = '';
    n.style.borderLeftColor = '';
    n.querySelector('i:first-child') && (n.querySelector('i:first-child').style.color = '');
  });
  document.getElementById('page-' + name).classList.add('active');
  const nav = document.getElementById('nav-' + name);
  if (nav) { nav.classList.add('active'); applyAccent(pickedColor); }
  
  const $ = id => document.getElementById(id);
  if (name === 'dashboard') {
    lastCollectionPage = 'dashboard';
    $('topbar-title').textContent = 'Hello, ' + currentUser.username;
    $('topbar-sub').textContent = getDashboardQuote();
    renderDashboard();
  } else if (name === 'projects') {
    lastCollectionPage = 'projects';
    $('topbar-title').textContent = 'My Project';
    $('topbar-sub').textContent = 'Review your saved projects, GitHub links, deployment URLs, and progress in one place.';
    updateSidebar(); updateReminders(); renderTable();
  } else if (name === 'settings') {
    $('topbar-title').textContent = 'Settings';
    $('topbar-sub').textContent = 'Manage your credentials and theme preferences.';
    renderSettings();
  } else if (name === 'detail') {
    $('topbar-title').textContent = 'Project Detail';
    $('topbar-sub').textContent = 'Full lifecycle view from planning, to GitHub, to live release.';
  }
}

/* ════════════════════════════════════
   DRAG & DROP & SECTION MANAGEMENT
════════════════════════════════════ */
function handleDragStart(e, id) {
  draggedProjectId = id;
  if (e.dataTransfer) {
    e.dataTransfer.setData('text/plain', String(id));
    e.dataTransfer.effectAllowed = 'move';
  }
  const target = e.currentTarget;
  target.classList.add('dragging');
}

function handleDragOver(e) {
  e.preventDefault();
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
  const box = e.currentTarget.closest('.custom-section-box');
  if (box) box.classList.add('drop-zone-active');
}

function handleDragLeave(e) {
  const box = e.currentTarget.closest('.custom-section-box');
  if (box) box.classList.remove('drop-zone-active');
}

function handleDrop(e, targetSectionId) {
  e.preventDefault();
  const box = e.currentTarget.closest('.custom-section-box');
  if (box) box.classList.remove('drop-zone-active');
  
  const idStr = e.dataTransfer ? e.dataTransfer.getData('text/plain') : String(draggedProjectId);
  const projId = Number(idStr || draggedProjectId);
  const p = projects.find(x => x.id === projId);
  if (p) {
    p.sectionId = targetSectionId;
    saveProj(currentUser.username, projects);
    renderTable();
  }
}

function handleDragEnd(e) {
  document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));
  document.querySelectorAll('.drop-zone-active').forEach(el => el.classList.remove('drop-zone-active'));
  draggedProjectId = null;
}

function createCustomSection(e) {
  e.preventDefault();
  const input = e.target.sectionName;
  const name = input.value.trim();
  if (!name) return;
  const sec = { id: 'sec_' + Date.now(), name };
  customSections.push(sec);
  saveSections(currentUser.username, customSections);
  input.value = '';
  renderTable();
}

function renameCustomSection(sectionId) {
  const sec = customSections.find(s => s.id === sectionId);
  if (!sec) return;
  const newName = prompt('Enter new section name:', sec.name);
  if (newName && newName.trim()) {
    sec.name = newName.trim();
    saveSections(currentUser.username, customSections);
    renderTable();
  }
}

function deleteCustomSection(sectionId) {
  if (!confirm('Are you sure you want to delete this section? Projects in this section will be unassigned.')) return;
  customSections = customSections.filter(s => s.id !== sectionId);
  projects.forEach(p => {
    if (p.sectionId === sectionId) p.sectionId = null;
  });
  saveSections(currentUser.username, customSections);
  saveProj(currentUser.username, projects);
  renderTable();
}

function removeProjectFromSection(projId) {
  const p = projects.find(x => x.id === projId);
  if (p) {
    p.sectionId = null;
    saveProj(currentUser.username, projects);
    renderTable();
  }
}

function renderOrganizationSections() {
  // 1. Recently Uploaded Grid
  const recentGrid = document.getElementById('recently-uploaded-grid');
  const recentWrapper = document.getElementById('recently-uploaded-wrapper');
  if (recentGrid) {
    const recentProjects = [...projects].reverse().slice(0, 4);
    if (!recentProjects.length) {
      if (recentWrapper) recentWrapper.style.display = 'none';
    } else {
      if (recentWrapper) recentWrapper.style.display = 'block';
      recentGrid.innerHTML = recentProjects.map(p => {
        const init = p.name.slice(0, 2).toUpperCase();
        const isComp = p.status === 'Completed';
        const cls = isComp ? 'green' : 'orange';
        const secName = p.sectionId ? (customSections.find(s => s.id === p.sectionId)?.name || 'Categorized') : 'Unassigned';
        return `
          <div class="recent-item" draggable="true" ondragstart="handleDragStart(event, ${p.id})" ondragend="handleDragEnd(event)" onclick="openDetail(${p.id}, event)">
            <div class="recent-item-top">
              <span class="recent-item-title">
                <i class="fa-solid fa-grip-vertical recent-grip" title="Drag to organize"></i>
                <div class="proj-icon" style="width:22px;height:22px;font-size:8px;background:${pickedColor};border-radius:5px">${init}</div>
                ${esc(p.name)}
              </span>
              <span class="pill ${cls}"><span class="pill-dot"></span>${p.status}</span>
            </div>
            ${p.desc ? `<div class="proj-desc-text" style="margin-bottom:8px">${esc(p.desc.slice(0, 40))}${p.desc.length > 40 ? '…' : ''}</div>` : ''}
            <div style="display:flex;align-items:center;justify-content:space-between;font-size:10px;color:var(--muted);margin-top:6px">
              <span><i class="fa-solid fa-folder-tree" style="margin-right:4px"></i>${esc(secName)}</span>
              <span class="prog-pct">${p.progress}%</span>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // 2. Custom Sections Grid Drop Zones
  const customGrid = document.getElementById('custom-sections-container');
  if (customGrid) {
    if (!customSections.length) {
      customGrid.innerHTML = '';
    } else {
      customGrid.innerHTML = customSections.map(sec => {
        const secProjects = projects.filter(p => p.sectionId === sec.id);
        const itemsHTML = secProjects.length ? secProjects.map(p => {
          const init = p.name.slice(0, 2).toUpperCase();
          const isComp = p.status === 'Completed';
          const cls = isComp ? 'green' : 'orange';
          return `
            <div class="recent-item" draggable="true" ondragstart="handleDragStart(event, ${p.id})" ondragend="handleDragEnd(event)" onclick="openDetail(${p.id}, event)" style="background:#fff">
              <div class="recent-item-top">
                <span class="recent-item-title">
                  <i class="fa-solid fa-grip-vertical recent-grip"></i>
                  <div class="proj-icon" style="width:20px;height:20px;font-size:8px;background:${pickedColor};border-radius:4px">${init}</div>
                  ${esc(p.name)}
                </span>
                <button class="sec-btn del" onclick="event.stopPropagation(); removeProjectFromSection(${p.id})" title="Remove from section"><i class="fa-solid fa-xmark"></i></button>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px">
                <span class="pill ${cls}" style="font-size:9px"><span class="pill-dot"></span>${p.status}</span>
                <span style="font-size:10px;font-weight:700;color:var(--muted)">${p.progress}%</span>
              </div>
            </div>
          `;
        }).join('') : `<div class="section-empty-hint"><i class="fa-solid fa-hand-pointer" style="margin-right:6px"></i>Drag projects here to add to "${esc(sec.name)}"</div>`;

        return `
          <div class="custom-section-box" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event, '${sec.id}')">
            <div class="section-box-header">
              <div class="section-box-title sora">
                <i class="fa-solid fa-folder-open"></i> ${esc(sec.name)}
                <span class="section-box-count">${secProjects.length} project${secProjects.length !== 1 ? 's' : ''}</span>
              </div>
              <div class="section-box-actions">
                <button class="sec-btn" onclick="renameCustomSection('${sec.id}')" title="Rename section"><i class="fa-solid fa-pen"></i></button>
                <button class="sec-btn del" onclick="deleteCustomSection('${sec.id}')" title="Delete section"><i class="fa-solid fa-trash-can"></i></button>
              </div>
            </div>
            <div class="section-items-grid">${itemsHTML}</div>
          </div>
        `;
      }).join('');
    }
  }
}

/* ════════════════════════════════════
   DASHBOARD & TABLE RENDERING
════════════════════════════════════ */
function renderDashboard() {
  const proc = projects.filter(p => p.status === 'Processing').length;
  const done = projects.filter(p => p.status === 'Completed').length;
  const dep = projects.filter(p => p.deployed === 'Yes').length;
  const $ = id => document.getElementById(id);
  $('s-total').textContent = projects.length;
  $('s-proc').textContent = proc;
  $('s-done').textContent = done;
  $('s-deployed').textContent = dep;
  $('t-count').textContent = projects.length + ' total';
  updateSidebar(); updateReminders();
  renderTable();
}

function renderTable() {
  renderOrganizationSections();

  const tbody = document.getElementById('proj-tbody');
  if (!tbody) return;
  const filtered = searchQuery
    ? projects.filter(p => p.name.toLowerCase().includes(searchQuery) ||
        (p.desc && p.desc.toLowerCase().includes(searchQuery)))
    : projects;

  if (!filtered.length) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="8"><i class="fa-solid fa-folder-open"></i><p>${searchQuery ? 'No projects match your search.' : 'No projects yet — create your first one above!'}</p></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const isComp = p.status === 'Completed';
    const cls = isComp ? 'green' : 'orange';
    const init = p.name.slice(0, 2).toUpperCase();
    const depPill = p.deployed === 'Yes'
      ? `<span class="pill purple"><span class="pill-dot"></span>Deployed</span>`
      : `<span class="pill gray"><span class="pill-dot"></span>Pending</span>`;
    const ghLink = p.githubUrl
      ? `<a href="https://github.com/${p.githubUrl}" target="_blank" onclick="event.stopPropagation()" class="table-link github" title="github.com/${esc(p.githubUrl)}">
          <span class="table-link-main">github.com/${esc(p.githubUrl)}</span>
          <span class="table-link-meta">${getGithubStatus(p)}</span>
        </a>`
      : `<div class="table-link empty">
          <span class="table-link-main">GitHub not linked</span>
          <span class="table-link-meta">Add username/repository</span>
        </div>`;
    const depLink = p.deployUrl
      ? `<a href="https://${p.deployUrl}" target="_blank" onclick="event.stopPropagation()" class="table-link live" title="${esc(p.deployUrl)}">
          <span class="table-link-main">${esc(p.deployUrl)}</span>
          <span class="table-link-meta">${getDeployStatus(p)}</span>
        </a>`
      : `<div class="table-link empty">
          <span class="table-link-main">Live URL not added</span>
          <span class="table-link-meta">${getDeployStatus(p)}</span>
        </div>`;

    return `<tr class="draggable-row" draggable="true" ondragstart="handleDragStart(event, ${p.id})" ondragend="handleDragEnd(event)" onclick="openDetail(${p.id},event)">
      <td><div class="td-name">
        <i class="fa-solid fa-grip-vertical recent-grip" style="margin-right:4px"></i>
        <div class="proj-icon" style="background:${pickedColor}">${init}</div>
        <div><div class="proj-name-text">${esc(p.name)}</div>${p.desc ? `<div class="proj-desc-text">${esc(p.desc.slice(0, 30))}${p.desc.length > 30 ? '…' : ''}</div>` : ''}</div>
      </div></td>
      <td><span class="pill ${cls}"><span class="pill-dot"></span>${p.status}</span></td>
      <td>${depPill}</td>
      <td>${ghLink}</td>
      <td>${depLink}</td>
      <td><div class="prog-wrap">
        <div class="prog-track"><div class="prog-fill ${cls}" style="width:${p.progress}%"></div></div>
        <span class="prog-pct">${p.progress}%</span>
      </div></td>
      <td class="date-cell">${p.createdAt || '—'}</td>
      <td onclick="event.stopPropagation()">
        <button class="del-btn" onclick="openDelModal(${p.id})" title="Delete project"><i class="fa-solid fa-trash-can"></i></button>
      </td>
    </tr>`;
  }).join('');
}

/* ════════════════════════════════════
   PROJECT ACTIONS (ADD, EDIT, DELETE)
════════════════════════════════════ */
function addProject(e) {
  e.preventDefault();
  const f = e.target;
  const name = f.pname.value.trim();
  if (!name) return;
  const status = f.status.value;
  const deployed = f.deployed.value;
  const desc = f.desc.value.trim();
  let githubUrl = f.githubUrl.value.trim();
  let deployUrl = f.deployUrl.value.trim();
  githubUrl = githubUrl.replace(/^https?:\/\/github\.com\//, '').replace(/^github\.com\//, '');
  deployUrl = deployUrl.replace(/^https?:\/\//, '');

  const p = normalizeProject({
    id: Date.now(), name, status, deployed, desc,
    githubUrl, deployUrl,
    progress: status === 'Completed' ? 100 : 40,
    steps: ROADMAP.map((s, i) => ({
      name: s,
      state: status === 'Completed' ? 'done' : i === 0 ? 'active' : 'pending'
    })),
    createdAt: new Date().toLocaleDateString('en-GB'),
  });

  projects.push(p);
  saveProj(currentUser.username, projects);
  f.reset(); renderDashboard();
}

function openDelModal(id) {
  deleteTargetId = id;
  const p = projects.find(x => x.id === id);
  document.getElementById('del-modal-text').textContent = `"${p ? p.name : 'this project'}" will be permanently removed and cannot be recovered.`;
  document.getElementById('del-modal').classList.add('open');
}

function closeDelModal() {
  document.getElementById('del-modal').classList.remove('open');
  deleteTargetId = null;
}

function confirmDelete() {
  if (!deleteTargetId) return;
  projects = projects.filter(p => p.id !== deleteTargetId);
  saveProj(currentUser.username, projects);
  closeDelModal();
  const active = document.querySelector('.page.active');
  if (active && active.id === 'page-detail') showPage(lastCollectionPage);
  else renderDashboard();
}

/* ════════════════════════════════════
   DETAIL PAGE & ROADMAP CONTROLS
════════════════════════════════════ */
function openDetail(id, e) {
  if (e && e.target.closest('.del-btn,.link-badge,.table-link,.sec-btn')) return;
  const active = document.querySelector('.page.active');
  lastCollectionPage = active && active.id === 'page-projects' ? 'projects' : 'dashboard';
  const backLabel = document.getElementById('detail-back-label');
  if (backLabel) backLabel.textContent = lastCollectionPage === 'projects' ? 'Back to My Project' : 'Back to Dashboard';
  detailProjId = id;
  editingProject = false;
  renderDetail();
  showPage('detail');
}

function setStepState(projId, idx, state) {
  const p = projects.find(x => x.id === projId);
  if (!p) return;
  p.steps[idx].state = state;
  if (state === 'done' && idx < p.steps.length - 1 && p.steps[idx + 1].state === 'pending') p.steps[idx + 1].state = 'active';
  if (state === 'active') {
    p.steps.forEach((step, stepIndex) => {
      if (stepIndex !== idx && step.state === 'active') step.state = 'pending';
    });
  }
  const doneCount = p.steps.filter(s => s.state === 'done').length;
  p.progress = Math.round((doneCount / p.steps.length) * 100);
  if (doneCount === p.steps.length) { p.status = 'Completed'; }
  else if (p.status === 'Completed') { p.status = 'Processing'; }
  saveProj(currentUser.username, projects);
  renderDetail();
}

function startProjectEdit() {
  if (!projects.find(p => p.id === detailProjId)) return;
  editingProject = true;
  renderDetail();
}

function cancelProjectEdit() {
  editingProject = false;
  renderDetail();
}

function saveProjectEdit(e) {
  e.preventDefault();
  const p = projects.find(x => x.id === detailProjId);
  if (!p) return;
  const form = e.target;
  p.desc = form.projectDesc.value.trim();
  p.githubUrl = form.githubUrl.value.trim()
    .replace(/^https?:\/\/github\.com\//i, '')
    .replace(/^github\.com\//i, '')
    .replace(/\/$/, '');
  p.deployUrl = form.deployUrl.value.trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/$/, '');
  p.deployed = p.deployUrl ? 'Yes' : 'No';
  saveProj(currentUser.username, projects);
  editingProject = false;
  renderDetail();
}

function renderDetail() {
  const p = projects.find(x => x.id === detailProjId);
  if (!p) return;
  const isComp = p.status === 'Completed';
  const cls = isComp ? 'green' : 'orange';
  const color = isComp ? '#22c55e' : '#f97316';
  const pal = PALETTES.find(x => x.hex === pickedColor) || PALETTES[0];
  const days = p.createdAt ? Math.max(0, Math.round((Date.now() - new Date(p.createdAt.split('/').reverse().join('-'))) / (864e5))) : 0;
  const doneCount = p.steps.filter(s => s.state === 'done').length;
  const depPill = p.deployed === 'Yes'
    ? `<span class="pill purple"><span class="pill-dot"></span>Deployed</span>`
    : `<span class="pill gray"><span class="pill-dot"></span>Not Deployed</span>`;

  const ghBox = p.githubUrl
    ? `<a href="https://github.com/${p.githubUrl}" target="_blank" class="detail-link-box github-box">
        <span class="detail-link-label"><i class="fa-brands fa-github"></i>GitHub Repository</span>
        <span class="detail-link-status">${getGithubStatus(p)}</span>
        <span class="link-url">User URL: github.com/${p.githubUrl}</span>
      </a>`
    : `<div class="detail-link-box" style="opacity:.5;cursor:default">
        <span class="detail-link-label"><i class="fa-brands fa-github"></i>GitHub Repository</span>
        <span class="detail-link-status">Repository not linked</span>
        <span class="link-url">User URL: not added yet</span>
      </div>`;

  const depBox = p.deployUrl
    ? `<a href="https://${p.deployUrl}" target="_blank" class="detail-link-box">
        <span class="detail-link-label"><i class="fa-solid fa-rocket"></i>Deployed Project URL</span>
        <span class="detail-link-status">${getDeployStatus(p)}</span>
        <span class="link-url">User URL: ${p.deployUrl}</span>
      </a>`
    : `<div class="detail-link-box" style="opacity:.5;cursor:default">
        <span class="detail-link-label"><i class="fa-solid fa-rocket"></i>Deployed Project URL</span>
        <span class="detail-link-status">Live URL pending</span>
        <span class="link-url">User URL: not added yet</span>
      </div>`;

  const tlHTML = p.steps.map((s, i) => `
    <div class="tl-item">
      <div class="tl-circle ${s.state}">${s.state === 'done' ? '<i class="fa-solid fa-check" style="font-size:10px"></i>' : i + 1}</div>
      <div class="tl-body">
        <span class="tl-step-name">${esc(s.name)}</span>
        <span class="tl-step-status">${getStepStatus(p, s)}</span>
        ${getStepNote(p, s.name) ? `<div class="tl-step-note">${esc(getStepNote(p, s.name))}</div>` : ''}
        <div class="tl-controls">
          <button class="tl-btn tl-btn-done" onclick="setStepState(${p.id},${i},'done')">Done</button>
          <button class="tl-btn tl-btn-active" onclick="setStepState(${p.id},${i},'active')">Active</button>
          <button class="tl-btn tl-btn-pending" onclick="setStepState(${p.id},${i},'pending')">Pending</button>
        </div>
      </div>
    </div>
  `).join('');

  const ai = isComp
    ? `<strong>${esc(p.name)}</strong> has been delivered successfully${p.deployed === 'Yes' ? ' and is now ready for production review' : ''}. Capture lessons learned, confirm release notes, and keep repository and deployment links available for future reference.`
    : `<strong>${esc(p.name)}</strong> is currently ${p.progress}% complete. Keep the next milestone visible, maintain the GitHub record, and publish the live URL as soon as release validation is complete.`;

  const editPanel = editingProject ? `
    <form class="project-edit-form" onsubmit="saveProjectEdit(event)">
      <div class="edit-field full"><label for="edit-project-desc">Description</label><textarea id="edit-project-desc" name="projectDesc" placeholder="Add a short project description...">${esc(p.desc)}</textarea></div>
      <div class="edit-field"><label for="edit-github-url">GitHub Repository URL</label><input id="edit-github-url" name="githubUrl" value="${esc(p.githubUrl)}" placeholder="username/repository"/></div>
      <div class="edit-field"><label for="edit-deploy-url">Live Project URL</label><input id="edit-deploy-url" name="deployUrl" value="${esc(p.deployUrl)}" placeholder="your-app.vercel.app"/></div>
      <div class="edit-actions"><button type="button" class="detail-cancel-btn" onclick="cancelProjectEdit()">Cancel</button><button type="submit" class="detail-save-btn"><i class="fa-solid fa-check"></i> Save changes</button></div>
    </form>` : '';

  document.getElementById('detail-content').innerHTML = `
    <div class="detail-hero">
      <div class="detail-top">
        <div>
          <div class="detail-title sora">${esc(p.name)}</div>
          <div class="detail-badges">
            <span class="pill ${cls}"><span class="pill-dot"></span>${p.status}</span>
            ${depPill}
            <span class="detail-date">Created ${p.createdAt || '—'}</span>
          </div>
        </div>
        <div class="detail-actions">
          ${editingProject ? '' : `<button class="detail-edit-btn" onclick="startProjectEdit()"><i class="fa-solid fa-pen"></i> Edit</button>`}
          <button class="detail-del-btn" onclick="openDelModal(${p.id})"><i class="fa-solid fa-trash-can"></i>Delete</button>
        </div>
      </div>
      <div class="prog-section">
        <div class="prog-section-header"><span>Overall Progress</span><span>${p.progress}%</span></div>
        <div class="prog-track-lg"><div class="prog-fill-lg ${cls}" style="width:${p.progress}%"></div></div>
      </div>
      ${editingProject ? editPanel : (p.desc ? `<div class="desc-bar" style="border-left-color:${pickedColor};background:${pal.light}"><p>${esc(p.desc)}</p></div>` : '')}
      ${editingProject ? '' : `<div class="detail-links">${ghBox}${depBox}</div>`}
    </div>

    <div class="ai-card">
      <div class="ai-card-title sora">
        <span class="ai-badge" style="background:${pickedColor}">AI</span> Project Guidance
      </div>
      <div class="ai-text">${ai}</div>
    </div>

    <div class="detail-grid">
      <div class="detail-section">
        <h4 class="sora">Project Roadmap <span class="h4-sub">— 6-step flow with GitHub and deployment checks</span></h4>
        <div class="timeline">${tlHTML}</div>
      </div>
      <div class="detail-section">
        <h4 class="sora">Metrics</h4>
        <div class="metric-grid">
          <div class="metric-box"><div class="ml">Completion</div><div class="mv" style="color:${color}">${p.progress}%</div></div>
          <div class="metric-box"><div class="ml">Days Active</div><div class="mv">${days}</div></div>
          <div class="metric-box"><div class="ml">Steps Done</div><div class="mv">${doneCount}/${p.steps.length}</div></div>
          <div class="metric-box"><div class="ml">GitHub</div><div class="mv" style="font-size:13px;color:${p.githubUrl ? '#24292e' : '#94a3b8'}">${p.githubUrl ? 'Pushed' : 'Missing'}</div></div>
          <div class="metric-box"><div class="ml">Deployed</div><div class="mv" style="font-size:13px;color:${p.deployed === 'Yes' ? '#8b5cf6' : '#94a3b8'}">${p.deployed === 'Yes' ? 'Yes' : 'No'}</div></div>
          <div class="metric-box"><div class="ml">Live URL</div><div class="mv" style="font-size:13px;color:${p.deployUrl ? 'var(--accent)' : '#94a3b8'}">${p.deployUrl ? 'Added' : 'Missing'}</div></div>
        </div>
        ${(p.githubUrl || p.deployUrl) ? `
        <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
          <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.7px;margin-bottom:9px">Project Links</div>
          ${p.githubUrl ? `<div style="display:flex;align-items:center;gap:7px;margin-bottom:7px;font-size:12px;color:var(--muted)"><i class="fa-brands fa-github" style="color:#24292e"></i><a href="https://github.com/${p.githubUrl}" target="_blank" style="color:var(--accent);font-weight:500">github.com/${p.githubUrl}</a></div>` : ''}
          ${p.deployUrl ? `<div style="display:flex;align-items:center;gap:7px;font-size:12px;color:var(--muted)"><i class="fa-solid fa-rocket" style="color:var(--accent)"></i><a href="https://${p.deployUrl}" target="_blank" style="color:var(--accent);font-weight:500">${p.deployUrl}</a></div>` : ''}
        </div>` : ''}
      </div>
    </div>
  `;
}

/* ════════════════════════════════════
   PROFILE DRAWER & CANVAS PIE CHART
════════════════════════════════════ */
function openProfile() {
  if (!currentUser) return;
  const proc = projects.filter(p => p.status === 'Processing').length;
  const done = projects.filter(p => p.status === 'Completed').length;
  const dep = projects.filter(p => p.deployed === 'Yes').length;
  const pal = PALETTES.find(p => p.hex === pickedColor) || PALETTES[0];
  const pa = document.getElementById('prof-avatar');
  renderBrandAvatar(pa);
  document.getElementById('prof-name').textContent = currentUser.username;
  document.getElementById('prof-meta').textContent = projects.length + ' project' + (projects.length !== 1 ? 's' : '') + ' · Locally stored';
  document.getElementById('prof-bio').textContent = currentUser.bio || DEFAULT_BIO;
  document.getElementById('prof-links').innerHTML = getSocialLinksHTML();
  document.getElementById('prof-rows').innerHTML = `
    <div class="prow"><span class="pk">Username</span><span class="pv">${esc(currentUser.username)}</span></div>
    <div class="prow">
      <span class="pk">Password</span>
      <span class="pv password-cell">
        <span id="profile-password-text">••••••••</span>
        <button type="button" class="prof-inline-btn" onclick="toggleProfilePassword(this)" aria-label="Show password"><i class="fa-regular fa-eye"></i></button>
      </span>
    </div>
    <div class="prow"><span class="pk">Accent</span><span class="pv">${pal.label}</span></div>
    <div class="prow"><span class="pk pk-icon"><i class="fa-brands fa-github" style="color:#24292e"></i></span><span class="pv">${currentUser.githubProfile ? `<a href="${currentUser.githubProfile}" target="_blank" style="color:#24292e">${esc(formatProfileLink(currentUser.githubProfile))}</a>` : 'Not added'}</span></div>
    <div class="prow"><span class="pk pk-icon"><i class="fa-brands fa-linkedin" style="color:#0a66c2"></i></span><span class="pv">${currentUser.linkedinProfile ? `<a href="${currentUser.linkedinProfile}" target="_blank" style="color:#0a66c2">${esc(formatProfileLink(currentUser.linkedinProfile))}</a>` : 'Not added'}</span></div>
    <div class="prow"><span class="pk">Total</span><span class="pv">${projects.length}</span></div>
    <div class="prow"><span class="pk">Processing</span><span class="pv">${proc}</span></div>
    <div class="prow"><span class="pk">Completed</span><span class="pv">${done}</span></div>
    <div class="prow"><span class="pk">Deployed</span><span class="pv">${dep}</span></div>
  `;
  document.getElementById('prof-toolbox').innerHTML = getToolboxHTML();
  drawPie(done, proc, projects.length - done - proc, projects.length);
  document.getElementById('profile-overlay').classList.add('open');
}

function closeProfile(e) {
  if (e && e.target !== document.getElementById('profile-overlay')) return;
  document.getElementById('profile-overlay').classList.remove('open');
}

function drawPie(done, proc, other, total) {
  const canvas = document.getElementById('pie-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, R = W / 2 - 4, cx = W / 2, cy = H / 2;
  ctx.clearRect(0, 0, W, H);
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById('pie-pct').textContent = pct + '%';
  const slices = [
    { v: done, color: '#22c55e', label: 'Completed' },
    { v: proc, color: '#f97316', label: 'Processing' },
    { v: other, color: '#e2e8f0', label: 'Planning' },
  ].filter(s => s.v > 0);

  if (!total || !slices.length) {
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 12; ctx.stroke();
    document.getElementById('pie-legend').innerHTML = `<div class="pie-legend-item"><span class="pie-legend-label" style="color:#94a3b8">No projects yet</span></div>`;
    return;
  }
  let start = -Math.PI / 2;
  slices.forEach(s => {
    const angle = (s.v / total) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, start, start + angle); ctx.closePath();
    ctx.fillStyle = s.color; ctx.fill(); start += angle;
  });
  ctx.beginPath(); ctx.arc(cx, cy, R * .58, 0, Math.PI * 2); ctx.fillStyle = '#f8fafc'; ctx.fill();
  document.getElementById('pie-legend').innerHTML = slices.map(s => `
    <div class="pie-legend-item">
      <span class="pie-legend-dot" style="background:${s.color}"></span>
      <span class="pie-legend-label">${s.label}</span>
      <span class="pie-legend-pct" style="color:${s.color}">${Math.round(s.v / total * 100)}%</span>
    </div>`).join('');
}

/* ════════════════════════════════════
   TASKS PANEL & OVERLAYS
════════════════════════════════════ */
function showTasksPanel() {
  const tasks = projects.filter(p => p.status === 'Processing');
  const body = document.getElementById('tasks-body');
  if (!tasks.length) {
    body.innerHTML = `<div style="text-align:center;padding:40px;color:var(--dim)"><i class="fa-solid fa-circle-check" style="font-size:32px;color:#22c55e;display:block;margin-bottom:12px"></i><p>All projects are on track!</p></div>`;
  } else {
    body.innerHTML = tasks.map(p => {
      const pendingSteps = p.steps.filter(s => s.state !== 'done');
      return `<div style="background:#f8fafc;border-radius:10px;padding:14px;margin-bottom:10px;border:1px solid var(--border)">
        <div style="font-weight:600;font-size:13px;color:var(--text);margin-bottom:4px;display:flex;align-items:center;gap:8px">
          <div class="proj-icon" style="width:24px;height:24px;font-size:8px;background:${pickedColor};border-radius:5px">${p.name.slice(0, 2).toUpperCase()}</div>
          ${esc(p.name)}
        </div>
        <div style="font-size:11px;color:var(--muted);margin-bottom:8px">${p.progress}% complete · ${pendingSteps.length} step${pendingSteps.length !== 1 ? 's' : ''} pending</div>
        ${pendingSteps.slice(0, 3).map(s => `<div style="font-size:11px;color:#f97316;display:flex;align-items:center;gap:5px;margin-top:3px"><i class="fa-solid fa-circle" style="font-size:5px"></i>${esc(s.name)}</div>`).join('')}
        <button onclick="openDetail(${p.id},null);closeTasksPanel()" style="margin-top:8px;font-size:11px;color:var(--accent);font-weight:600;padding:4px 0">View Project →</button>
      </div>`;
    }).join('');
  }
  document.getElementById('tasks-overlay').classList.add('open');
}

function closeTasksPanel(e) {
  if (e && e.target !== document.getElementById('tasks-overlay')) return;
  document.getElementById('tasks-overlay').classList.remove('open');
}

/* ════════════════════════════════════
   SETTINGS CONTROLS
════════════════════════════════════ */
function renderSettings() {
  const sw = document.getElementById('swatches');
  if (sw) sw.innerHTML = PALETTES.map(c => `
    <div class="swatch${c.hex === pickedColor ? ' sel' : ''}" style="background:${c.hex}" title="${c.label}" onclick="pickColor('${c.hex}')"></div>
  `).join('');
  const form = document.getElementById('settings-form');
  if (form && currentUser) {
    form.githubProfile.value = currentUser.githubProfile ? formatProfileLink(currentUser.githubProfile) : '';
    form.linkedinProfile.value = currentUser.linkedinProfile ? formatProfileLink(currentUser.linkedinProfile) : '';
    form.bio.value = currentUser.bio || DEFAULT_BIO;
    form.toolboxLanguages.value = toolboxToText(currentUser.toolbox[0].items);
    form.toolboxLibraries.value = toolboxToText(currentUser.toolbox[1].items);
    form.toolboxCloud.value = toolboxToText(currentUser.toolbox[2].items);
  }
  const sl = document.getElementById('swatch-label');
  if (sl) sl.textContent = 'Selected: ' + (PALETTES.find(p => p.hex === pickedColor)?.label || pickedColor) + ' — themes accents, sidebar, buttons, and avatar.';
}

function pickColor(hex) {
  pickedColor = hex;
  document.querySelectorAll('.swatch').forEach(s => s.classList.toggle('sel', s.style.background === hex || s.style.background === hexRgb(hex)));
  const sl = document.getElementById('swatch-label');
  if (sl) sl.textContent = 'Selected: ' + (PALETTES.find(p => p.hex === hex)?.label || hex) + ' — themes accents, sidebar, buttons, and avatar.';
}

function hexRgb(hex) { const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16); return `rgb(${r}, ${g}, ${b})`; }

function togglePasswordField(id, btn) {
  const input = document.getElementById(id);
  if (!input) return;
  const show = input.type === 'password';
  input.type = show ? 'text' : 'password';
  btn.innerHTML = `<i class="fa-regular ${show ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
}

function toggleProfilePassword(btn) {
  const node = document.getElementById('profile-password-text');
  if (!node || !currentUser) return;
  const hidden = node.textContent.includes('•');
  node.textContent = hidden ? currentUser.password : '••••••••';
  btn.innerHTML = `<i class="fa-regular ${hidden ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
}

function saveSettings(e) {
  e.preventDefault();
  const cur = e.target.curPass.value, nw = e.target.newPass.value, nw2 = e.target.newPass2.value;
  const githubProfile = e.target.githubProfile.value.trim();
  const linkedinProfile = e.target.linkedinProfile.value.trim();
  const bio = e.target.bio.value.trim();
  const toolboxLanguages = e.target.toolboxLanguages.value;
  const toolboxLibraries = e.target.toolboxLibraries.value;
  const toolboxCloud = e.target.toolboxCloud.value;
  const msg = document.getElementById('s-msg');
  const stored = getUser(currentUser.username);
  if (stored.password !== cur) { msg.className = 's-msg err'; msg.textContent = 'Current password incorrect.'; return; }
  if (nw && nw !== nw2) { msg.className = 's-msg err'; msg.textContent = 'New passwords do not match.'; return; }
  const updated = normalizeUser({
    ...stored,
    password: nw || cur,
    color: pickedColor,
    githubProfile,
    linkedinProfile,
    bio: bio || DEFAULT_BIO,
    toolbox: [
      { title: 'Languages', items: parseToolboxText(toolboxLanguages, DEFAULT_TOOLBOX[0].items) },
      { title: 'Libraries', items: parseToolboxText(toolboxLibraries, DEFAULT_TOOLBOX[1].items) },
      { title: 'Cloud / DevOps', items: parseToolboxText(toolboxCloud, DEFAULT_TOOLBOX[2].items) },
    ],
  });
  saveUser(updated); currentUser = updated;
  localStorage.setItem('session', updated.username);
  applyAccent(pickedColor); updateSidebar(); renderSettings();
  msg.className = 's-msg ok'; msg.textContent = 'Settings saved successfully!';
  e.target.curPass.value = ''; e.target.newPass.value = ''; e.target.newPass2.value = '';
  ['settings-cur-pass', 'settings-new-pass', 'settings-new-pass2'].forEach(id => { const input = document.getElementById(id); if (input) input.type = 'password'; });
  e.target.querySelectorAll('.pass-toggle').forEach(btn => btn.innerHTML = '<i class="fa-regular fa-eye"></i>');
  setTimeout(() => { if (msg) msg.textContent = ''; }, 3000);
}

function clearAllProjects() {
  if (!confirm('Delete ALL projects permanently? This cannot be undone.')) return;
  projects = []; customSections = [];
  saveProj(currentUser.username, []);
  saveSections(currentUser.username, []);
  updateSidebar(); updateReminders(); renderSettings();
  alert('All projects deleted.');
}
