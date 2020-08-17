import loadCss from './main'

beforeEach(() => {
  document.head.innerHTML = ''
})

test('fails for missing file', async () => {
  const consoleError = console.error
  console.error = jest.fn()
  try {
    await expect(() => loadCss('./missing.css')).rejects.toThrow('Error loading ./missing.css')

    expect(document.head.innerHTML.trim()).toBe('')

    expect(console.error).toHaveBeenCalledTimes(1)
  } finally {
    console.error = consoleError
  }
})

test('loads same origin file', async () => {
  const consoleError = console.error
  console.error = jest.fn()
  try {
    await expect(loadCss('http://localhost/style.css')).resolves.toBe('http://localhost/style.css')

    expect(document.head.innerHTML.trim()).toBe(
      `<link type="text/css" rel="stylesheet" href="http://localhost/style.css">`,
    )

    expect(console.error).toHaveBeenCalledTimes(0)
  } finally {
    console.error = consoleError
  }
})

test('loads relative file', async () => {
  const consoleError = console.error
  console.error = jest.fn()
  try {
    await expect(loadCss('./style.css')).resolves.toBe('http://localhost/style.css')

    expect(document.head.innerHTML.trim()).toBe(
      `<link type="text/css" rel="stylesheet" href="./style.css">`,
    )

    expect(console.error).toHaveBeenCalledTimes(0)
  } finally {
    console.error = consoleError
  }
})

test('loads cross origin file', async () => {
  const consoleError = console.error
  console.error = jest.fn()
  try {
    await expect(loadCss('http://x.lan/style.css')).resolves.toBe('http://x.lan/style.css')

    expect(document.head.innerHTML.trim()).toBe(
      `<link crossorigin="anonymous" type="text/css" rel="stylesheet" href="http://x.lan/style.css">`,
    )

    expect(console.error).toHaveBeenCalledTimes(0)
  } finally {
    console.error = consoleError
  }
})
