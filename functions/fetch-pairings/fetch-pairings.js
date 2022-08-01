const fetch = require('node-fetch');

const BASE_URL = 'https://api.spoonacular.com/food/wine/';
const API_KEY = process.env.REACT_APP_API_KEY;

const handler = async function(event) {
  const query = event.queryStringParameters;
  const url = query.food
    ? `${BASE_URL}pairing/?apiKey=${API_KEY}&food=${query.food}`
    : `${BASE_URL}dishes/?apiKey=${API_KEY}&wine=${query.wine}`;
  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' }
    });
    console.log(response);
    if (response.status === 400) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ body: await response.json() })
      };
    }
    if (!response.ok) throw new Error('Something went wrong!');
    const data = await response.json();

    return { statusCode: response.status, body: JSON.stringify({ data }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

module.exports = { handler };
