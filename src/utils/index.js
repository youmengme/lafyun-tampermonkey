import { setLocalStorage } from '@/utils/storage'

export const loadStyle = (url) => {
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  link.media = 'all';
  head.appendChild(link);
}

export function initLafAppInfo () {
  const [, appid] = window.location.hash.match(/\/app\/(.*?)\/cloudfunction/) || []
    console.log('appid', appid)
  if (appid) setLocalStorage('appid', appid)
  return appid
}

export function interceptXHR() {
  const originOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (_, url) {
    console.log('before xhr', url);
    originOpen.apply(this, arguments);
  };
}

export function interceptFetch() {
  window.unsafeWindow.fetch = (url, options) => {
    console.log('before fetch', url, options);
    const originFetch = fetch;
    return originFetch(url, options)
  };
}
