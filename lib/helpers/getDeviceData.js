function isMobile() {
  if ('userAgentData' in navigator) {
    return navigator.userAgentData.mobile
  }

  if ('maxTouchPoints' in navigator) {
    return navigator.maxTouchPoints > 0;
  }

  return false
}

function platform() {
  if ('userAgentData' in navigator) {
    return navigator.userAgentData.platform
  }

  return navigator.platform
}

export function getDeviceData() {
  return {
    mobile: isMobile(),
    platform: platform(),
    appVersion: navigator.appVersion,
    userAgent: navigator.userAgent,
    width: window.innerWidth,
    height: window.innerHeight
  }
}