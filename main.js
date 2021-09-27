 // Websocket connection below

    let dydxCon = new WebSocket('wss://api.dydx.exchange/v3/ws');

    //html price elements below **DYDX
    let btcUsdtPriceElementDyDX = document.getElementById('btcusdtPriceDyDX');
    let ethusdPriceElementDyDX = document.getElementById('ethusdPriceDyDX');

        
    //html symbol elements below **DYDX
    let btcUsdtPriceChangelElementDyDX = document.getElementById('btcusdtPriceChangeDyDX');
    // let ethDaiSymbolElementDyDX = document.getElementById('ethdaiSymbolDyDX');
    let lastPriceBtcDyDX = null;
    let lastPriceEthDyDX = null;
  


    dydxCon.onopen = function(env){
        console.log("connection avaialable");
        dydxCon.send('{"type":"subscribe","channel":"v3_markets"}')
    }
    dydxCon.onmessage = (env)=>{
        let stockObject = JSON.parse(env.data);
        console.log(stockObject.contents["ETH-USD"]);

        
        let price = parseFloat(stockObject.contents["BTC-USD"].indexPrice); //setting the price here
        let price1 = parseFloat(stockObject.contents["ETH-USD"].indexPrice); //setting the price here
        
        let notUndefinedPrice = 0.00;

        let notUndefinedPrice1 = 0.00;

        if (price1  != 0){
        notUndefinedPrice  = price1;
        }

        if (price != 0){
            notUndefinedPrice1  = price;
            }
       
        btcUsdtPriceElementDyDX.innerText = lastPriceBtcDyDX ;

        ethusdPriceElementDyDX.innerText = price1;
    
        btcUsdtPriceElementDyDX.style.color = !lastPriceBtcDyDX || lastPriceBtcDyDX === price ? 'black' : price > lastPriceBtcDyDX ?  'green' : 'red';
        lastPriceBtcDyDX  = notUndefinedPrice1;

        ethusdPriceElementDyDX.style.color = !lastPriceEthDyDX || lastPriceEthDyDX === priceChange ? 'black' : priceChange > lastPriceEthDyDX ?  'green' : 'red';
        lastPriceEthDyDX =  notUndefinedPrice;
        ;
    }
