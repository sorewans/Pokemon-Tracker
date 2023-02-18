const API_URL = 'http://localhost:3010';

export async function cardSearch(name) {
  const response = await fetch(`${API_URL}/cards/search?name=${name}`);
  return response.json();
}

export async function addCard(name) {
  const response = await fetch(`${API_URL}/cards`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(name),
  });
  return response.json();
}

export async function allCards() {
  const response = await fetch(`${API_URL}/owned`);
  return response.json();
}

export async function countCards() {
  const response = await fetch(`${API_URL}/owned/count`);
  return response.json();
}