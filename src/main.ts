export default function loadCss(href: string): Promise<HTMLLinkElement> {
  return new Promise((resolve, reject) => {
    const element = document.createElement('link')

    // eslint-disable-next-line unicorn/prefer-add-event-listener
    element.onload = () => {
      resolve(element)
    }

    // eslint-disable-next-line unicorn/prefer-add-event-listener
    element.onerror = (event) => {
      reject((event as { error?: Error }).error || new Error(`Error loading ${href}`))

      // eslint-disable-next-line unicorn/prefer-node-remove
      document.head.removeChild(element)
    }

    // Only add cross origin for actual cross origin
    // this is because Safari triggers for all
    // - https://bugs.webkit.org/show_bug.cgi?id=171566
    // eslint-disable-next-line no-restricted-globals
    if (!(href[0] === '.' || href[0] === '/' || href.startsWith(location.origin + '/'))) {
      element.crossOrigin = 'anonymous'
    }

    element.type = 'text/css'
    element.rel = 'stylesheet'
    element.href = href

    // eslint-disable-next-line unicorn/prefer-node-append
    document.head.appendChild(element)
  })
}
