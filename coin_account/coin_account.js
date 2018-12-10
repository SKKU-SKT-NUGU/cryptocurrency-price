const _ = require('lodash')
var rp = require('request-promise')

class Request {
  constructor(req) {
    this.action = req.body.action
    this.context = req.body.context
    console.log(`HTTP Request: ${JSON.stringify(this.action)}, ${JSON.stringify(this.context)}`)
  }

  Coin(response) { //action: answer_coin
    const coin = this.action.parameters.SPECIFIC_COIN.value
    var cointype
    switch(coin){
      case '비트코인':
        cointype = "BTC"
        break
      case '리플':
        cointype = "XRP"
        break
      case '이더리움':
        cointype = "ETH"
        break
      case '비트코인캐시':
        cointype = "BCH"
        break
      case '스텔라루멘':
        cointype = "XLM"
        break
      case '이오스':
        cointype = "EOS"
        break
      case '라이트코인':
        cointype = "LTC"
        break
      case '에이다':
        cointype = "ADA"
        break
      case '모네로':
        cointype = "XMR"
        break
      case '트론':
        cointype = "TRX"
        break
      case '대시':
        cointype = "DASH"
        break
      case '넴':
        cointype = "XEM"
        break
      case '이더리움클래식':
        cointype = "ETC"
        break
      case '제트캐시':
        cointype = "ZEC"
        break
      case '비트코인골드':
        cointype = "BTG"
        break
      case '비체인':
        cointype = "VET"
        break
      case '오미세고':
        cointype = "OMG"
        break
      case '제로엑스':
        cointype = "ZRX"
        break
      case '퀀텀':
        cointype = "QTUM"
        break
      case '애터니티':
        cointype = "AE"
        break
      case '비트코인다이아몬드':
        cointype = "BCD"
        break
      case '질리카':
        cointype = "ZIL"
        break
      case '아이콘':
        cointype = "ICX"
        break
      case '스팀':
        cointype = "STEEM"
        break
      case '체인링크':
        cointype = "LINK"
        break
      case '웨이브':
        cointype = "WAVES"
        break
      case '에이치쉐어':
        cointype = "HSR"
        break
      case '파퓰러스':
        cointype = "PPT"
        break
      case '어거':
        cointype = "REP"
        break
      case '골렘':
        cointype = "GNT"
        break
      case '스트라디스':
        cointype = "STRAT"
        break
      case '스테이터스네트워크토큰':
        cointype = "SNT"
        break
      case '왁스':
        cointype = "WAX"
        break
      case '미스릴':
        cointype = "MITH"
        break
      case '월튼체인':
        cointype = "WTC"
        break
      case '피벡스':
        cointype = "PIVX"
        break
      case '크립토닷컴':
        cointype = "MCO"
        break
      case '엘프':
        cointype = "ELF"
        break
      case '플레이코인':
        cointype = "PLY"
        break
      case '텐엑스':
        cointype = "PAY"
        break
      case '루프링':
        cointype = "LRC"
        break
      case '쎄타토큰':
        cointype = "THETA"
        break
      case '사이버마일즈':
        cointype = "CMT"
        break
      case '룸네트워크':
        cointype = "LOOM"
        break
      case '파워렛저':
        cointype = "POWR"
        break
      case '비에이치피캐시':
        cointype = "BHPC"
        break
      case '카이버네트워크':
        cointype = "KNC"
        break
      case '오디세이':
        cointype = "OCN"
        break
      case '솔트':
        cointype = "SALT"
        break
      case '엔진코인':
        cointype = "ENJ"
        break
      case '코르텍스':
        cointype = "CTXC"
        break
      case '기프토':
        cointype = "GTO"
        break
      case '레이든네트워크토큰':
        cointype = "RDN"
        break
      case '에토스':
        cointype = "ETHOS"
        break
      case '원루트네트워크':
        cointype = "RNT"
        break
      case '트루체인':
        cointype = "TRUE"
        break
      case '베잔트':
        cointype = "BZNT"
        break
      case '아크블록':
        cointype = "ABT"
        break
      case '아이오티체인':
        cointype = "ITC"
        break
      case '프리마스':
        cointype = "PST"
        break
      case '아이앤에스':
        cointype = "INS"
        break
      case '비트코인에스브이':
        cointype = "BSV"
        break
    }

    var options = {
      uri: 'https://api.bithumb.com/public/ticker/' + cointype,
      json: true // Automatically parses the JSON string in the response
    }

    rp(options)
      .then(function (repos) {
        console.log(repos)
        var change
        var fluc = parseInt(repos.data["24H_fluctate"])

        if(fluc > 0){
          change = `하루 동안 ${fluc}원 올랐어요.`
        }
        else if(fluc ==0){
          change = `하루 전과 비교하여 값이 변동되지 않았어요. `
        }
        else if (fluc<0){
          fluc = - fluc
          change = `하루 동안 ${fluc}원 내렸어요.`
        }
        response.setParameters({
          COIN_FLUC: change,
          COIN_PRICE: repos.data.sell_price
          
        })
      })
      .catch(function (err) {
        console.error(err)
      })
      
    response.setParameters({
      SPECIFIC_COIN: coin
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

function main(params) {
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