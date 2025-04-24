;(() => {
  // Get the current script tag
  const currentScript = document.currentScript

  // Parse query parameters from the script src
  const scriptSrc = currentScript.src
  const urlParams = new URL(scriptSrc).search
  const params = new URLSearchParams(urlParams)

  // Get configuration from script attributes
  const config = {
    maxDisplay: params.get("maxDisplay") || "1",
    autoRotate: params.get("autoRotate") !== "false",
    rotationInterval: params.get("rotationInterval") || "5000",
    randomize: params.get("randomize") !== "false",
    theme: params.get("theme") || "dark",
    showControls: params.get("showControls") !== "false",
  }

  // Create iframe element
  const iframe = document.createElement("iframe")

  // Set iframe attributes
  const widgetUrl = new URL("/widget", window.location.origin)
  Object.entries(config).forEach(([key, value]) => {
    widgetUrl.searchParams.append(key, value)
  })

  iframe.src = widgetUrl.toString()
  iframe.style.border = "none"
  iframe.style.width = "100%"
  iframe.style.height = "400px"
  iframe.style.maxWidth = "600px"
  iframe.style.borderRadius = "12px"
  iframe.style.overflow = "hidden"
  iframe.title = "Livepeer Contributors Spotlight"
  iframe.loading = "lazy" // Add lazy loading for better performance

  // Insert the iframe where the script is placed
  currentScript.parentNode.insertBefore(iframe, currentScript.nextSibling)
})()
