import Storage from 'web-storage-cache'
const localStorage = new Storage();

export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}
export function getLocalStorage(key) {
  return localStorage.get(key)
}
export function removeLocalStorage(key) {
  return localStorage.delete(key)
}
export function clearLocalStorage() {
  return localStorage.clear()
}
