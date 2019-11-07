const request = require('request-promise');

async function getExchangeRates(target) {

  const options = {
    method: 'GET',
    uri: 'https://www.cbr-xml-daily.ru/daily_json.js',
    json: true
  };

  try {

    const response = await request(options);

    return target.reduce((acc, currency) => {

      acc[currency] = response['Valute'][currency]['Value'];

      return acc;

    }, {});

  } catch (e) {
    throw e;
  }
}

function computeTotalPrice(basketItems) {

  return basketItems.reduce((acc, item) => {

    const fullPrice = item.price * item.quantity;
    acc[item.currency] = acc[item.currency] ? acc[item.currency] + fullPrice : fullPrice;

    return acc;

  }, {});
}


function sumTotalPriceInTargetCurrency(totalPrice, exchangeRates, targetCurrency) {

  exchangeRates = {...exchangeRates, RUB: 1};


  return Object.keys(totalPrice).reduce((sum, currency) => {

    const priceInTargetCurrency = totalPrice[currency] * exchangeRates[currency] / exchangeRates[targetCurrency];
    return sum + priceInTargetCurrency;

  }, 0);
}

async function compute(basketItems) {

  const result = { RUB: 0, USD: 0, EUR: 0 };

  const exchangeRates = await getExchangeRates(['EUR', 'USD']);
  const totalPrice = computeTotalPrice(basketItems);

  for (let currency in result) {
    if(result.hasOwnProperty(currency)) {

      result[currency] = sumTotalPriceInTargetCurrency(totalPrice, exchangeRates, currency);

    }
  }

  return result;
}


module.exports = {
  compute
};
