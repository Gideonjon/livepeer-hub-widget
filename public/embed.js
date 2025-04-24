(function() {
  const script = document.createElement('iframe');
  const params = new URLSearchParams(document.currentScript.src.split('?')[1] || '');
  
  // Get configuration from script attributes
  const config = {
    maxDisplay: params.get('maxDisplay') || '1',
    autoRotate: params.get('autoRotate') !== 'false',
    rotationInterval: params.get('rotationInterval') || '5000',
    randomize: params.get('randomize') !== 'false'
  };

  // Set iframe attributes
  script.src = `https://your-widget-domain.com?${new URLSearchParams(config)}`;
  script.style.border = 'none';
  script.style.width = '100%';
  script.style.height = '400px';
  script.style.maxWidth = '500px';
  script.style.borderRadius = '12px';
  script.style.overflow = 'hidden';
  
  // Insert the widget where the script is placed
  document.currentScript.parentElement.appendChild(script);
})(); 