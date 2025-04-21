// Function to manage the go-back button depending on class state
function updateGoBackButton() {
  const target = document.querySelector('.cu-task-view__inner.layout-v3');
  const button = document.getElementById('go-back-button');

  const isFullScreen = target?.classList.contains('full-screen');
  const isSidebarMode = target?.classList.contains('sidebar-mode');

  if (!target || isFullScreen || isSidebarMode) {
    // Remove button if conditions aren't met
    if (button) {
      button.remove();
    }
    return;
  }

  // Create button if it doesn't exist
  if (!button) {
    const goBackDiv = document.createElement('div');
    goBackDiv.id = 'go-back-button';
    goBackDiv.textContent = '← Go Back';
    goBackDiv.style.cursor = 'pointer';
    goBackDiv.style.top = '0';
    goBackDiv.style.opacity = '0.6';
    goBackDiv.style.background = 'black';
    goBackDiv.style.position = 'fixed';
    goBackDiv.style.zIndex = '737';
    goBackDiv.style.width = '100%';
    goBackDiv.style.height = '100%';
    goBackDiv.onclick = () => history.back();

    target.parentNode.insertBefore(goBackDiv, target.nextSibling);
  }
}

// MutationObserver to track class changes or added nodes
const observer = new MutationObserver(() => {
  updateGoBackButton();
});

// Initial start
updateGoBackButton();

// Start observing changes to DOM
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class'],
});

// Inject style
const style = document.createElement('style');
style.textContent = `
.cu-task-view__inner.layout-v3:not(.full-screen):not(.sidebar-mode) {
    width: 85% !important;
    right: 10% !important;
    left: 7% !important;
    top: 5% !important;
    bottom: 20% !important;
    background: none !important;
}



  
`;
document.head.appendChild(style);




