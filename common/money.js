// (function(){$.ajax({
//     url: MONEY_URL,
//     dataType: "json",
//     success: function(json){
        
        console.debug("[Request] Money request ended");
        var base = "USD";
        var rates = {"AUD":1.2957,"BGN":1.65,"BRL":3.3198,"CAD":1.2703,"CHF":0.99004,"CNY":6.576,"CZK":21.724,"DKK":6.2805,"GBP":0.74722,"HKD":7.8164,"HRK":6.3629,"HUF":263.07,"IDR":13558.0,"ILS":3.4848,"INR":64.039,"JPY":113.36,"KRW":1076.8,"MXN":19.511,"MYR":4.0795,"NOK":8.3492,"NZD":1.4261,"PHP":50.099,"PLN":3.5413,"RON":3.9163,"RUB":58.293,"SEK":8.3799,"SGD":1.3439,"THB":32.76,"TRY":3.8176,"ZAR":12.705,"EUR":0.84367}
        rates["USD"] = 1;

        function getRate(from, to){
            if(from===base){
                return rates[to];
            }

            if(to===base){
                return 1 / rates[from];
            }

            return rates[to] * (1 / rates[from]);
        }

        function convert(amount, from, to){
            var result = amount * getRate(from, to);
            console.debug("[Money-Translator] Translating", amount, "from", from, "to", to, result, arguments.callee.caller.name);
            return result;
        }

        function getExchangesInOptions(){
            var options = "";
            for(var ex in rates){
                options += `<option value="${ex}" ${ex==="USD" ? "selected" : ""}>${ex}</option>`
            }
            return options;
        }

        setTimeout(function(){
            onReady(convert, getExchangesInOptions(), function(selector){
                return document.querySelector(selector);
            }, $.ajax)
        }, 10);

        document.onreadystatechange = function(){
            console.log("LOADED!")
        }
    // },
    // error: function(err){
    //     console.log(err)
    // }
// })})();