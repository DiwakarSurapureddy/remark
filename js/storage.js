/* ════════════════════════════════════
   STATE & LOCAL STORAGE HELPERS
════════════════════════════════════ */
let currentUser = null;
let projects = [];
let customSections = [];
let deleteTargetId = null;
let pickedColor = '#4f46e5';
let isLoginMode = true;
let detailProjId = null;
let sidebarCollapsed = false;
let searchQuery = '';
let lastCollectionPage = 'dashboard';
let editingProject = false;
let draggedProjectId = null;

const API_BASE_URL = 'http://localhost:5000/api';

/* ════════════════════════════════════
   BACKEND API & LOCAL STORAGE PERSISTENCE
════════════════════════════════════ */
const getUser = u => {
  if (!u) return null;
  try {
    const raw = localStorage.getItem('u_' + u);
    if (raw) return normalizeUser(JSON.parse(raw));
  } catch (e) {}
  return findLocalUser(u);
};

const findLocalUser = u => {
  if (!u) return null;
  try {
    const clean = String(u).trim().toLowerCase();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.toLowerCase().startsWith('u_')) {
        const uname = key.slice(2).trim();
        if (uname.toLowerCase() === clean) {
          const raw = localStorage.getItem(key);
          if (raw) return normalizeUser(JSON.parse(raw));
        }
      }
    }
  } catch (e) {}
  return null;
};

const getProj = u => {
  if (!u) return [];
  try {
    const raw = localStorage.getItem('p_' + u);
    if (raw) return JSON.parse(raw) || [];
  } catch (e) {}
  
  // Case-insensitive fallback
  try {
    const clean = String(u).trim().toLowerCase();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.toLowerCase().startsWith('p_')) {
        const uname = key.slice(2).trim();
        if (uname.toLowerCase() === clean) {
          const raw = localStorage.getItem(key);
          if (raw) return JSON.parse(raw) || [];
        }
      }
    }
  } catch (e) {}
  return [];
};

const saveProj = (u, p) => {
  localStorage.setItem('p_' + u, JSON.stringify(p));
  apiSaveProjects(u, p);
};

const getSections = u => {
  try { return JSON.parse(localStorage.getItem('s_' + u)) || []; }
  catch { return []; }
};

const saveSections = (u, s) => localStorage.setItem('s_' + u, JSON.stringify(s));

/* Backend Async Helpers */
async function apiLoginUser(username, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Backend API unreachable, using local fallback:', err);
    return null;
  }
}

async function apiRegisterUser(username, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Backend API unreachable, using local fallback:', err);
    return null;
  }
}

async function apiFetchUser(username) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${username}`);
    const data = await res.json();
    if (data.success && data.user) return normalizeUser(data.user);
  } catch (err) {
    console.warn('Backend API unreachable for user fetch:', err);
  }
  return getUser(username);
}

async function apiSaveUser(user) {
  try {
    await fetch(`${API_BASE_URL}/users/${user.username}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  } catch (err) {
    console.warn('Failed to sync user with backend server:', err);
  }
}

async function apiFetchProjects(username) {
  try {
    const res = await fetch(`${API_BASE_URL}/projects/${username}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.projects)) {
      return normalizeProjects(data.projects);
    }
  } catch (err) {
    console.warn('Backend API unreachable for projects fetch:', err);
  }
  return getProj(username);
}

async function apiSaveProjects(username, projectsList) {
  try {
    await fetch(`${API_BASE_URL}/projects/sync/${username}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projects: projectsList })
    });
  } catch (err) {
    console.warn('Failed to sync projects with backend server:', err);
  }
}


/* ════════════════════════════════════
   DATA NORMALIZATION HELPERS
════════════════════════════════════ */
function normalizeProfileLink(type, value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (type === 'github') {
    const clean = raw
      .replace(/^https?:\/\/(www\.)?github\.com\//i, '')
      .replace(/^github\.com\//i, '')
      .replace(/^@/, '')
      .replace(/\/$/, '');
    return clean ? `https://github.com/${clean}` : '';
  }
  const clean = raw
    .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, '')
    .replace(/^linkedin\.com\/in\//i, '')
    .replace(/^@/, '')
    .replace(/\/$/, '');
  return clean ? `https://www.linkedin.com/in/${clean}` : '';
}

function normalizeToolboxItems(items, fallback) {
  const list = Array.isArray(items) ? items : [];
  const normalized = list
    .map(entry => Array.isArray(entry) ? entry : [entry?.name, entry?.level])
    .map(([name, level]) => [String(name || '').trim(), Math.max(0, Math.min(100, Number(level) || 0))])
    .filter(([name]) => name);
  return normalized.length ? normalized : fallback;
}

function normalizeToolbox(toolbox) {
  return DEFAULT_TOOLBOX.map((group, index) => ({
    title: group.title,
    items: normalizeToolboxItems(toolbox?.[index]?.items, group.items),
  }));
}

function parseToolboxText(value, fallback) {
  const lines = String(value || '').split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const parsed = lines.map(line => {
    const [rawName, rawLevel] = line.split('|');
    return [String(rawName || '').trim(), Math.max(0, Math.min(100, Number(rawLevel) || 0))];
  }).filter(([name]) => name);
  return parsed.length ? parsed : fallback;
}

function toolboxToText(items) {
  return items.map(([name, level]) => `${name}|${level}`).join('\n');
}

function normalizeUser(user) {
  if (!user || !user.username) return null;
  return {
    ...user,
    color: user.color || '#4f46e5',
    bio: (user.bio || DEFAULT_BIO).trim(),
    githubProfile: normalizeProfileLink('github', user.githubProfile),
    linkedinProfile: normalizeProfileLink('linkedin', user.linkedinProfile),
    toolbox: normalizeToolbox(user.toolbox),
  };
}

function normalizeProject(raw) {
  const project = { ...raw };
  project.name = (project.name || 'Untitled Project').trim();
  project.desc = (project.desc || '').trim();
  project.sectionId = project.sectionId || null;
  project.githubUrl = String(project.githubUrl || '').trim()
    .replace(/^https?:\/\/github\.com\//, '')
    .replace(/^github\.com\//, '')
    .replace(/\/$/, '');
  project.deployUrl = String(project.deployUrl || '').trim()
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');
  project.createdAt = project.createdAt || new Date().toLocaleDateString('en-GB');
  
  const legacySteps = Array.isArray(project.steps) ? project.steps : [];
  const stepStates = new Map();
  legacySteps.forEach((step, index) => {
    const fallbackName = ROADMAP[index];
    const stepName = step && step.name ? step.name : fallbackName;
    if (stepName) stepStates.set(stepName, step.state || 'pending');
  });

  const normalizedSteps = ROADMAP.map((name, index) => {
    const legacyName = name === 'Pushed to GitHub' ? 'GitHub Repository Setup' : name;
    let state = stepStates.get(name) || stepStates.get(legacyName) || 'pending';
    if (project.status === 'Completed') state = 'done';
    if (!legacySteps.length && project.status !== 'Completed') state = index === 0 ? 'active' : 'pending';
    return { name, state };
  });

  const githubStep = normalizedSteps.find(step => step.name === 'Pushed to GitHub');
  const deployStep = normalizedSteps.find(step => step.name === 'Deployment & Launch');
  if (project.githubUrl && githubStep && githubStep.state === 'pending') githubStep.state = 'done';
  if ((project.deployed === 'Yes' || project.deployUrl) && deployStep && deployStep.state === 'pending') deployStep.state = 'done';

  let activeSeen = false;
  normalizedSteps.forEach(step => {
    if (step.state === 'active') {
      if (activeSeen) step.state = 'pending';
      activeSeen = true;
    }
  });

  if (project.status !== 'Completed' && !normalizedSteps.some(step => step.state === 'active')) {
    const nextStep = normalizedSteps.find(step => step.state !== 'done');
    if (nextStep) nextStep.state = 'active';
  }

  const doneCount = normalizedSteps.filter(step => step.state === 'done').length;
  project.status = doneCount === normalizedSteps.length ? 'Completed' : 'Processing';
  project.deployed = (project.deployed === 'Yes' || project.deployUrl) ? 'Yes' : 'No';
  project.progress = project.status === 'Completed'
    ? 100
    : Math.max(
        doneCount ? Math.round((doneCount / normalizedSteps.length) * 100) : 0,
        Math.min(95, Number(project.progress) || 0)
      );
  project.steps = normalizedSteps;
  return project;
}

function normalizeProjects(list) {
  return (Array.isArray(list) ? list : []).map(normalizeProject);
}
