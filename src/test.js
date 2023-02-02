const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://privatix-temp-mail-v1.p.rapidapi.com/request/domains/',
  headers: {
    'X-RapidAPI-Key': '9ad1df3743mshdce1f17a9b7bf83p186cb7jsna05e2578088a',
    'X-RapidAPI-Host': 'privatix-temp-mail-v1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});