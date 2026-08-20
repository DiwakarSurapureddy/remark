/* ════════════════════════════════════
   APP INITIALIZATION & EVENT BINDINGS
════════════════════════════════════ */
function mountAppComponents() {
  // Mount Sidebar
  const sbContainer = document.getElementById('sidebar-container');
  if (sbContainer) sbContainer.innerHTML = renderSidebarComponent();

  // Mount Views (Dashboard, My Project, Detail, Settings)
  const contentContainer = document.getElementById('content-container');
  if (contentContainer) {
    contentContainer.innerHTML =
      renderDashboardView() +
      renderProjectsView() +
      renderDetailViewContainer() +
      renderSettingsView();
  }

  // Mount Modals & Drawers
  const profContainer = document.getElementById('profile-container');
  if (profContainer) profContainer.innerHTML = renderProfileComponent();

  const tasksContainer = document.getElementById('tasks-container');
  if (tasksContainer) tasksContainer.innerHTML = renderTasksComponent();
}

document.addEventListener('DOMContentLoaded', () => {
  // Mount Component Views into DOM Shell
  mountAppComponents();

  // Bind Delete Modal Overlay Click
  const delModal = document.getElementById('del-modal');
  if (delModal) {
    delModal.addEventListener('click', e => {
      if (e.target === e.currentTarget) closeDelModal();
    });
  }

  // Initialize Auth Form
  renderAuthForm();

  // Restore Saved Session if available
  const savedSession = localStorage.getItem('session');
  if (savedSession) {
    apiFetchUser(savedSession).then(u => {
      if (u) startSession(u);
    });
  }
});
