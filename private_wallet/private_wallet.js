const _ = require('lodash')
var rq = require('request')
var cyptojsHamcSHA512 = require('crypto-js/hmac-sha512')


var coin_num;
var coin_price;

const api_base = 'https://api.bithumb.com'
const api_private_info = {
    apiKey:"6a2a821adbf0fe1c4f914c7e09d9ec20",
    secretKey:"943ee0fc67a18c94f68467594fc5e716"
}

var req_query_ticker = {
    endpoint:'/info/ticker',
    order_currency:'TRX',
    payment_currency:'KRW'
}
var req_query_balance = {
    endpoint:'/info/balance',
    currency:'TRX',
}

const make_header = (obj) => {
    let output_string =[]
    Object.keys(obj).forEach((val)=>{
        let key = val
        key = encodeURIComponent(key.replace(/[!'()*]/g,escape));
        let value = encodeURIComponent(obj[val].replace(/[!'()*]/g, escape));
        output_string.push(key + '=' + value)
    })

    return API_Sign(output_string.join('&'), obj.endpoint)
}
const API_Sign = (str_q,endPoint) => {
    let nNonce = new Date().getTime()
    let spliter = String.fromCharCode(0)

    return {
        'Api-Key' : api_private_info.apiKey,
        'Api-Sign' : (base64_encode(cyptojsHamcSHA512(endPoint + spliter + str_q + spliter + nNonce, api_private_info.secretKey).toString())),
        'Api-Nonce' : nNonce
    };
}

function base64_encode(data) {

   var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
   var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
   ac = 0,
   enc = '',
   tmp_arr = [];

   if (!data) {
      return data;
   }

   do { // pack three octets into four hexets
      o1 = data.charCodeAt(i++);
      o2 = data.charCodeAt(i++);
      o3 = data.charCodeAt(i++);

      bits = o1 << 16 | o2 << 8 | o3;

      h1 = bits >> 18 & 0x3f;
      h2 = bits >> 12 & 0x3f;
      h3 = bits >> 6 & 0x3f;
      h4 = bits & 0x3f;

      // use hexets to index into b64, and append result to encoded string
      tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
   } while (i < data.length);

   enc = tmp_arr.join('');

   var r = data.length % 3;

   return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

class Request {
  constructor(req) {
    this.action = req.body.action
    this.context = req.body.context
    console.log(`HTTP Request: ${JSON.stringify(this.action)}, ${JSON.stringify(this.context)}`)
  }

  Coin(response) { //action: answer_coin
    const coin = this.action.parameters.SPECIFIC_COIN2.value
    req_query_ticker.order_currency = "TRX"
    req_query_balance.currency ="trx"
      var cointype

      switch(coin){
        case '비트코인':
          req_query_ticker.order_currency = "BTC"
          req_query_balance.currency ="btc"
          break
        case '리플':
          req_query_ticker.order_currency = "XRP"
          req_query_balance.currency ="xrp"
          break
        case '이더리움':
          req_query_ticker.order_currency = "ETH"
          req_query_balance.currency ="eth"
          break
        case '비트코인캐시':
          req_query_ticker.order_currency = "BCH"
          req_query_balance.currency ="bch"
          break
        case '스텔라루멘':
          req_query_ticker.order_currency = "XLM"
          req_query_balance.currency ="xlm"
          break
        case '이오스':
          req_query_ticker.order_currency = "EOS"
          req_query_balance.currency ="eos"
          break
        case '라이트코인':
          req_query_ticker.order_currency = "LTC"
          req_query_balance.currency ="ltc"
          break
        case '에이다':
          req_query_ticker.order_currency = "ADA"
          req_query_balance.currency ="ada"
          break
        case '모네로':
          req_query_ticker.order_currency = "XMR"
          req_query_balance.currency ="xmr"
          break
        case '트론':
          req_query_ticker.order_currency = "TRX"
          req_query_balance.currency ="trx"
          break
        case '대시':
          req_query_ticker.order_currency = "DASH"
          req_query_balance.currency ="dash"
          break
        case '넴':
          req_query_ticker.order_currency = "XEM"
          req_query_balance.currency ="xem"
          break
        case '이더리움클래식':
          req_query_ticker.order_currency = "ETC"
          req_query_balance.currency ="etc"
          break
        case '제트캐시':
          req_query_ticker.order_currency = "ZEC"
          req_query_balance.currency ="zec"
          break
        case '비트코인골드':
          req_query_ticker.order_currency = "BTG"
          req_query_balance.currency ="btg"
          break
        case '비체인':
          req_query_ticker.order_currency = "VET"
          req_query_balance.currency ="vet"
          break
        case '오미세고':
          req_query_ticker.order_currency = "OMG"
          req_query_balance.currency ="omg"
          break
        case '제로엑스':
          req_query_ticker.order_currency = "ZRX"
          req_query_balance.currency ="zrx"
          break
        case '퀀텀':
          req_query_ticker.order_currency = "QTUM"
          req_query_balance.currency ="qtum"
          break
        case '애터니티':
          req_query_ticker.order_currency = "AE"
          req_query_balance.currency ="ae"
          break
        case '비트코인다이아몬드':
          req_query_ticker.order_currency = "BCD"
          req_query_balance.currency ="bcd"
          break
        case '질리카':
          req_query_ticker.order_currency = "ZIL"
          req_query_balance.currency ="zil"
          break
        case '아이콘':
          req_query_ticker.order_currency = "ICX"
          req_query_balance.currency ="icx"
          break
        case '스팀':
          req_query_ticker.order_currency = "STEEM"
          req_query_balance.currency ="steem"
          break
        case '체인링크':
          req_query_ticker.order_currency = "LINK"
          req_query_balance.currency ="link"
          break
        case '웨이브':
          req_query_ticker.order_currency = "WAVES"
          req_query_balance.currency ="waves"
          break
        case '에이치쉐어':
          req_query_ticker.order_currency = "HSR"
          req_query_balance.currency ="hsr"
          break
        case '파퓰러스':
          req_query_ticker.order_currency = "PPT"
          req_query_balance.currency ="ppt"
          break
        case '어거':
          req_query_ticker.order_currency = "REP"
          req_query_balance.currency ="rep"
          break
        case '골렘':
          req_query_ticker.order_currency = "GNT"
          req_query_balance.currency ="gnt"
          break
        case '스트라디스':
          req_query_ticker.order_currency = "STRAT"
          req_query_balance.currency ="strat"
          break
        case '스테이터스네트워크토큰':
          req_query_ticker.order_currency = "SNT"
          req_query_balance.currency ="snt"
          break
        case '왁스':
          req_query_ticker.order_currency = "WAX"
          req_query_balance.currency ="wax"
          break
        case '미스릴':
          req_query_ticker.order_currency = "MITH"
          req_query_balance.currency ="mith"
          break
        case '월튼체인':
          req_query_ticker.order_currency = "WTC"
          req_query_balance.currency ="wtc"
          break
        case '피벡스':
          req_query_ticker.order_currency = "PIVX"
          req_query_balance.currency ="pivx"
          break
        case '크립토닷컴':
          req_query_ticker.order_currency = "MCO"
          req_query_balance.currency ="mco"
          break
        case '엘프':
          req_query_ticker.order_currency = "ELF"
          req_query_balance.currency ="elf"
          break
        case '플레이코인':
          req_query_ticker.order_currency = "PLY"
          req_query_balance.currency ="ply"
          break
        case '텐엑스':
          req_query_ticker.order_currency = "PAY"
          req_query_balance.currency ="pay"
          break
        case '루프링':
          req_query_ticker.order_currency = "LRC"
          req_query_balance.currency ="lrc"
          break
        case '쎄타토큰':
          req_query_ticker.order_currency = "THETA"
          req_query_balance.currency ="theta"
          break
        case '사이버마일즈':
          req_query_ticker.order_currency = "CMT"
          req_query_balance.currency ="cmt"
          break
        case '룸네트워크':
          req_query_ticker.order_currency = "LOOM"
          req_query_balance.currency ="loom"
          break
        case '파워렛저':
          req_query_ticker.order_currency = "POWR"
          req_query_balance.currency ="powr"
          break
        case '비에이치피캐시':
          req_query_ticker.order_currency = "BHPC"
          req_query_balance.currency ="BHPC"
          break
        case '카이버네트워크':
          req_query_ticker.order_currency = "KNC"
          req_query_balance.currency ="KNC"
          break
        case '오디세이':
          req_query_ticker.order_currency = "OCN"
          req_query_balance.currency ="ocn"
          break
        case '솔트':
          req_query_ticker.order_currency = "SALT"
          req_query_balance.currency ="salt"
          break
        case '엔진코인':
          req_query_ticker.order_currency = "ENJ"
          req_query_balance.currency ="enj"
          break
        case '코르텍스':
          req_query_ticker.order_currency = "CTXC"
          req_query_balance.currency ="ctxc"
          break
        case '기프토':
          req_query_ticker.order_currency = "GTO"
          req_query_balance.currency ="gto"
          break
        case '레이든네트워크토큰':
          req_query_ticker.order_currency = "RDN"
          req_query_balance.currency ="rdn"
          break
        case '에토스':
          req_query_ticker.order_currency = "ETHOS"
          req_query_balance.currency ="ethos"
          break
        case '원루트네트워크':
          req_query_ticker.order_currency = "RNT"
          req_query_balance.currency ="rnt"
          break
        case '트루체인':
          req_query_ticker.order_currency = "TRUE"
          req_query_balance.currency ="true"
          break
        case '베잔트':
          req_query_ticker.order_currency = "BZNT"
          req_query_balance.currency ="bznt"
          break
        case '아크블록':
          req_query_ticker.order_currency = "ABT"
          req_query_balance.currency ="abt"
          break
        case '아이오티체인':
          req_query_ticker.order_currency = "ITC"
          req_query_balance.currency ="itc"
          break
        case '프리마스':
          req_query_ticker.order_currency = "PST"
          req_query_balance.currency ="pst"
          break
        case '아이앤에스':
          req_query_ticker.order_currency = "INS"
          req_query_balance.currency ="ins"
          break
        case '비트코인에스브이':
          req_query_ticker.order_currency = "BSV"
          req_query_balance.currency ="bsv"
          break
      }

      rq({
        method:'POST',
        uri: api_base + req_query_ticker['endpoint'],
        headers: make_header(req_query_ticker),
        formData: req_query_ticker
      },(err, res, result)=>{
        if(err){
            console.log(err)
            return
        }
        var coin_price = JSON.parse(result).data.sell_price
    
        rq({
            method:'POST',
            uri: api_base + req_query_balance['endpoint'],
            headers: make_header(req_query_balance),
            formData: req_query_balance
        },(err, res, result)=>{
            if(err){
                console.log(err)
                return
            }
            var coin_name = "total_"+req_query_balance.currency
            var coin_num = JSON.parse(result).data[coin_name]

            var coin_assets = Math.round(coin_num*coin_price)

            if(coin_num==0){
              response.setParameters({
                WALLET_PRICE: "현재 보유하신 " + coin + "이 없어요. 가지고 계신 코인만 말씀해주세요."  
              })
            }
            else{
              response.setParameters({
                WALLET_PRICE: "현재 보유하신 " + coin + "의 자산은 " + coin_assets + "원 이에요."
              })
            }

        })
    })

      response.setParameters({
        SPECIFIC_COIN2: coin
      })
    
  }

}

class Response {
  constructor() {
    console.log('Response constructor')
    this.version = '2.0'
    this.resultCode = 'OK'
    this.output = {}
  }

  setParameters(outputKeyAndValues) { //overwrites an object if already exists. Otherwise, it appends the given object.
    this.output = _.assign(this.output, outputKeyAndValues)
  }

}

function myAction(params) {
  const httpRequest = { "body": params }
  response = new Response()
  request = new Request(httpRequest)
  request.Coin(response)


  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log(`HTTP Response: ${JSON.stringify(response)}`)
      resolve(response)
    }, 800)
  })
}

exports.main = myAction;