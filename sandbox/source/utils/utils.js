export const getElements = selector => Array.from(document.querySelectorAll(selector))

export const createUid = () => `${Math.round(Math.random() * 10000000000000)}${Math.round(Math.random() * 10000000000000)}`

