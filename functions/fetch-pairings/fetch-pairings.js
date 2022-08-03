const fetch = require('node-fetch');

const BASE_URL = 'https://api.spoonacular.com/food/wine/';
const API_KEY = process.env.REACT_APP_API_KEY;

const handler = async function(event) {
  const query = event.queryStringParameters;
  const switchResult = type => {
    switch (type) {
      case 'food-pairing':
        return `${BASE_URL}pairing/?apiKey=${API_KEY}&food=${query.food}`;
      case 'wine-pairing':
        return `${BASE_URL}dishes/?apiKey=${API_KEY}&wine=${query.wine}`;
      case 'wine-recommendation':
        return `${BASE_URL}recommendation/?apiKey=${API_KEY}&wine=${query.wine}&number=4`;
      case 'food-recommendation':
        return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query.food}&number=4`;

      default:
        return `${BASE_URL}pairing/?apiKey=${API_KEY}&food=${query.food}`;
    }
  };
  const url = switchResult(query.type);

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' }
    });
    if (response.status === 400) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ body: await response.json() })
      };
    }
    if (response.status === 402) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ body: await response.json() })
      };
    }
    if (!response.ok) throw new Error(response.message);
    const data = await response.json();

    return { statusCode: response.status, body: JSON.stringify({ data }) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

module.exports = { handler };
