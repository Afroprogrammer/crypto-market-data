 // Websocket connection below
    let btcUsdtBinanceCon = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
    let ethDaiBinanceCon = new WebSocket('wss://stream.binance.com:9443/ws/ethdai@trade');
    let coinbase = new WebSocket('wss://ws-feed.pro.coinbase.com');
    let bybitcon = new WebSocket('wss://stream-testnet.bybit.com/realtime');
    let dydxCon = new WebSocket('wss://api.dydx.exchange/v3/ws');
    let phemexCon = new WebSocket('wss://phemex.com/ws');
    
    //html price elements below **BINANCE
    let btcUsdtPriceElement = document.getElementById('btcusdtPrice');
    let ethdaiPriceElement = document.getElementById('ethdaiPrice');

    //html symbol elements below **BINANCE
    let btcUsdtSymbolElement = document.getElementById('btcusdtSymbol');
    let ethDaiSymbolElement = document.getElementById('ethdaiSymbol');
    let lastPriceBtc = null;
    let lastPriceEth = null;

    //html price elements below **COINBASE
    let btcUsdtPriceElementCoinbase = document.getElementById('btcusdtPriceCoinbase');
    let ethDaiPriceElementCoinbase = document.getElementById('ethdaiPriceCoinbase');

    //html symbol elements below **COINBASE
    let btcUsdtSymbolElementCoinbase = document.getElementById('btcusdtSymbolCoinbase');
    let ethDaiSymbolElementCoinbase = document.getElementById('ethdaiSymbolCoinbase');
    let lastPriceBtcCoinbase = null;
    let lastPriceEthCoinbase = null;


    //html price elements below **BYBIT
    let btcUsdtPriceElementBybit = document.getElementById('btcusdtPriceBybit');
    // let ethDaiPriceElementBybit = document.getElementById('ethdaiPriceBybit');
    
    //html symbol elements below **BYBIT
    let btcUsdtSymbolElementBybit = document.getElementById('btcusdtSymbolBybit');
    // let ethDaiSymbolElementBybit = document.getElementById('ethdaiSymbolBybit');
    let lastPriceBtcBybit = null;
    // let lastPriceEthBybit = null;

    //html price elements below **DYDX
    let btcUsdtPriceElementDyDX = document.getElementById('btcusdtPriceDyDX');
    // let ethDaiPriceElementDyDX = document.getElementById('ethdaiPriceDyDX');
        
    //html symbol elements below **DYDX
    let btcUsdtPriceChangelElementDyDX = document.getElementById('btcusdtPriceChangeDyDX');
    // let ethDaiSymbolElementDyDX = document.getElementById('ethdaiSymbolDyDX');
    let lastPriceBtcDyDX = null;
    let lastPrice24BtcDyDX = null;
    let undefinedPriceEthDyDX = null;


   //html price elements below **Phemex
    let btcUsdtPriceElementPhemex = document.getElementById('btcusdtPricePhemex');

    
    //html symbol elements below **Phemex
    let btcUsdtSymbolElementPhemex = document.getElementById('btcusdtSymbolPhemex');
    let lastPriceBtcPhemex = null;
   


    //Connection to Binance to get Eth/Dai prices 
    ethDaiBinanceCon.onmessage = (event)=>{
        let stockObject = JSON.parse(event.data);
        // console.log(stockObject);
        let price = parseFloat(stockObject.p);
        let symbol = (stockObject.s);
        ethdaiPriceElement.innerText = price;
        ethdaiPriceElement.style.color = !lastPriceEth|| lastPriceEth === price ? 'black' : price > lastPriceEth ?  'green' : 'red';
        ethDaiSymbolElement.innerText = symbol;

        lastPriceEth = price;
    };

        //Connection to Binance to get BTC/USDT prices 
        btcUsdtBinanceCon.onmessage = (event)=>{
            let stockObject = JSON.parse(event.data);
            let price = parseFloat(stockObject.p);
            let symbol = (stockObject.s);
            btcUsdtSymbolElement.innerText = symbol;
            btcUsdtPriceElement.innerText = price;
            btcUsdtPriceElement.style.color = !lastPriceBtc || lastPriceBtc === price ? 'black' : price > lastPriceBtc ?  'green' : 'red';
            lastPriceBtc = price;
        };

//connecting to coinbase for market data 
        var msg ={
            "type": "subscribe",
            "product_ids": [
                "ETH-USD",
                "ETH-EUR"
            ],
            "channels": [
                // "level2",
                // "heartbeat",
                "ticker",
                {
                    "name": "ticker",
                    "product_ids": [
                        "BTC-USDT",
                        "ETH-DAI"
                    ]
                }
            ]
        }
        
        coinbase.onopen = function (env){
            coinbase.send(JSON.stringify((msg))
            )}
        
        coinbase.onmessage = (env)=>{
            // console.log(JSON.parse(env.data));
            let stockObject = JSON.parse(env.data);
            // console.log(stockObject);
        
                let Symbol = stockObject.product_id;
                let Price = parseFloat(stockObject.price);
                
 
                if (Symbol === 'ETH-DAI' )
                {
                    ethDaiSymbolElementCoinbase.innerText = Symbol;
                    ethDaiPriceElementCoinbase.innerText = Price;
                    ethDaiPriceElementCoinbase.style.color = !lastPriceEthCoinbase|| lastPriceEthCoinbase ===  Price ? 'black' :  Price > lastPriceEthCoinbase ?  'green' : 'red';
                    lastPriceEthCoinbase = Price;
                }
                
                if (Symbol === 'BTC-USDT')
                {
                    btcUsdtSymbolElementCoinbase.innerText = Symbol;
                    btcUsdtPriceElementCoinbase.innerText = Price;
                    btcUsdtPriceElementCoinbase.style.color = !lastPriceBtcCoinbase|| lastPriceBtcCoinbase ===  Price ? 'black' :  Price > lastPriceBtcCoinbase ?  'green' : 'red';
                    lastPriceBtcCoinbase = Price;
                    
        }  

}
bybitcon.onopen = function (env){
    bybitcon.send('{"op":"subscribe","args":["trade.BTCUSD"]}')
    }
    bybitcon.onmessage = (env)=>{
        let stockObject = JSON.parse(env.data);
        // console.log(stockObject);
        let symbol = stockObject.data[0].symbol;
        let price =  parseFloat(stockObject.data[0].price);
        btcUsdtSymbolElementBybit.innerText = symbol;
        btcUsdtPriceElementBybit.innerText = price;
        btcUsdtPriceElementBybit.style.color = !lastPriceBtcBybit || lastPriceBtcBybit === price ? 'black' : price > lastPriceBtcBybit ?  'green' : 'red';
        lastPriceBtcBybit = price;
        
    }

    dydxCon.onopen = function(env){
        console.log("connection avaialable");
        dydxCon.send('{"type":"subscribe","channel":"v3_markets"}')
    }
    dydxCon.onmessage = (env)=>{
        let stockObject = JSON.parse(env.data);
        // console.log(stockObject);
        // console.log(stockObject.contents["BTC-USD"]);

        let price = parseFloat(stockObject.contents["BTC-USD"].indexPrice); //setting the price here
        // let priceChange = stockObject.contents["BTC-USD"].priceChange24H;  //setting the price change here
        let notUndefinedPrice = 0.00;
         if (price != undefined ){
            notUndefinedPrice = price;
         } 
        //  console.log(notUndefinedPrice);
        btcUsdtPriceElementDyDX.innerText = notUndefinedPrice;
        // // btcUsdtPriceChangelElementDyDX.innerText = priceChange;
        btcUsdtPriceElementDyDX.style.color = !lastPriceBtcDyDX || lastPriceBtcDyDX === price ? 'black' : price > lastPriceBtcDyDX ?  'green' : 'red';
        // // btcUsdtPriceChangelElementDyDX.style.color = !lastPrice24BtcDyDX || lastPrice24BtcDyDX === priceChange ? 'black' : priceChange > lastPrice24BtcDyDX ?  'green' : 'red';
        // // lastPrice24BtcDyDX = priceChange;
        lastPriceBtcDyDX  = notUndefinedPrice;
    }

    phemexCon.onopen = function (env){
        phemexCon.send('{"method":"market24h.subscribe","params":[],"id":1234}')
        }
        phemexCon.onmessage = (env)=>{
            console.log(JSON.parse(env.data));
            let stockObject = JSON.parse(env.data);
            let symbol = stockObject.market24h.symbol;
            let price = parseFloat(stockObject.market24h.indexPrice);


        //     // console.log(stockObject.market24h.indexPrice);
            if( symbol == 'BTCUSD' ){
                btcUsdtSymbolElementPhemex.innerText = symbol;
                btcUsdtPriceElementPhemex.innerText = price;
            }
            btcUsdtPriceElementPhemex.style.color = !lastPriceBtcPhemex || lastPriceBtcPhemex === price ? 'black' : price > lastPriceBtcPhemex ?  'green' : 'red';
            lastPriceBtcPhemex = price;   
        }