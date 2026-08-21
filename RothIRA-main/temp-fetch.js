const https = require("https");
const symbols = ['VOO','VXUS','AVUV','AVDV','SPMO','SCHD','AMZN'];
let idx=0;
function fetchSymbol(){
  if(idx>=symbols.length){return;}
  const sym = symbols[idx++];
  https.get(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?range=1y&interval=1d&events=div%2Csplits`, (res) => {
    console.log(sym, res.statusCode);
    res.resume();
    res.on('end', fetchSymbol);
  }).on('error', err => {
    console.error('error', sym, err);
    fetchSymbol();
  });
}
fetchSymbol();
