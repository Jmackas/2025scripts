document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    // Add your custom save logic here
    console.log('Ctrl+S pressed, custom save triggered');
  }
});
