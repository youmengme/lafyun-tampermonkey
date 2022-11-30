export function getFunctions(appId) {
  return fetch(`/sys-api/apps/${appId}/function?status=1&page=1&limit=10000000`, {
    'headers': {
      "authorization": `Bearer ${window.localStorage.getItem('access_token')}`,
    },
    'body': null,
    'method': 'GET'
  }).then(res => res.json())
}

export function getCollections(appId) {
  return fetch(`/sys-api/apps/${appId}/dbm/collections`, {
    "headers": {
      "authorization": `Bearer ${window.localStorage.getItem('access_token')}`,
    },
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  }).then(response => response.json());
}
