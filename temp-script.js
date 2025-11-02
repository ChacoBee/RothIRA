const https = require("https");
https.get('https://query1.finance.yahoo.com/v8/finance/chart/VOO?range=1y&interval=1d&events=div%2Csplits', (res) => {
  console.log('status', res.statusCode);
  let data='';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('length', data.length);
  });
}).on('error', err => {
  console.error('error', err);
});
