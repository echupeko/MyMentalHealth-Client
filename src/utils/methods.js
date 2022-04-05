export const apiCall = (url, additionalParams) => {
  const options = {
    method: additionalParams.method,
    mode: 'cors',
    body:JSON.stringify(additionalParams.body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return fetch(url, options);
}

export const getDateRange = (startDateSend, endDateSend) => {
  let startDay = new Date(startDateSend);
  let endDay = new Date(endDateSend);

  startDay.setHours(0);
  startDay.setMinutes(0);
  startDay.setSeconds(0);

  endDay.setHours(23);
  endDay.setMinutes(59);
  endDay.setSeconds(59);

  return { startDay, endDay };
}
