const fetchData = async (query, searchByFood) => {
  try {
    if (query === '')
      throw new Error(
        searchByFood
          ? `Please enter your food of choice...`
          : `Please enter a type of wine...`
      );
    const data = await fetch(
      searchByFood
        ? `/.netlify/functions/fetch-pairings?type=food-pairing&food=${query}`
        : `/.netlify/functions/fetch-pairings?type=wine-pairing&wine=${query}`
    );

    if (data.status === 400) {
      const response = await data.json();
      throw new Error(response.body.message);
    }

    if (data.status === 402) {
      throw new Error(
        'Sorry, no more food and wine matching today. API limit reached.'
      );
    }

    if (!data.ok) {
      throw new Error(
        `Failed to get ${searchByFood ? 'wine' : 'food'} pairing, sorry.`
      );
    }
    const { data: response } = await data.json();
    if (response.status === 'failure') {
      throw new Error(response.message);
    }
    let pairingsArray;
    let textString;
    if (searchByFood) {
      const { pairedWines, pairingText } = response;
      pairingsArray = pairedWines;
      textString = pairingText;
    }
    if (!searchByFood) {
      const { pairings, text } = response;
      pairingsArray = pairings;
      textString = text;
    }
    if (pairingsArray.length === 0 && textString === '') {
      throw new Error(
        `Cannot not find any match for ${query}. Try something else!`
      );
    }

    return {
      error: false,
      loading: false,
      pairings: pairingsArray,
      pairingText: textString,
      wineRecommendation: searchByFood ? true : false,
      items: []
    };
  } catch (err) {
    return {
      error: true,
      message: err.message,
      loading: false
    };
  }
};

export default fetchData;
