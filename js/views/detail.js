/* ════════════════════════════════════
   PROJECT DETAIL PAGE VIEW
════════════════════════════════════ */
function renderDetailViewContainer() {
  return `
    <div class="page" id="page-detail">
      <button class="back-btn" onclick="showPage(lastCollectionPage)">
        <i class="fa-solid fa-arrow-left"></i> <span id="detail-back-label">Back to Dashboard</span>
      </button>
      <div id="detail-content"></div>
    </div>
  `;
}
