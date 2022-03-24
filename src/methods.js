export function apiCall(url, additionalParams, callback) {
  const options = {
    method: additionalParams.method,
    mode: 'cors',
    body:JSON.stringify(additionalParams.body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => {
      callback(json);
    });
}