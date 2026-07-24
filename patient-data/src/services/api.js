const API_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';

export const getPatients = async () => {
  const credentials = btoa('coalition:skills-test');
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  const data = await response.json();
  return data.find((p) => p.name === 'Jessica Taylor');
};
