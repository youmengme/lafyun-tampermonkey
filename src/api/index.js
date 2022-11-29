import axios from 'axios'
const request = axios.create({

})

export function getFunctions() {
  return fetch('https://console.wendiaodiao.com/sys-api/apps/68mhpf/function?status=1&page=1&limit=10000000', {
    'headers': {
      "authorization": `Bearer ${window.localStorage.getItem('access_token')}`,
      'Referer': 'https://console.wendiaodiao.com/app-console/',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    'body': null,
    'method': 'GET'
  }).then(res => res.json())
}

export function getCollections() {
  return fetch("https://console.wendiaodiao.com/sys-api/apps/68mhpf/dbm/collections", {
    "headers": {
      "authorization": `Bearer ${window.localStorage.getItem('access_token')}`,
    },
    "referrer": "https://console.wendiaodiao.com/app-console/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  }).then(response => response.json());
}
