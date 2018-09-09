const TelegramBot = require('node-telegram-bot-api')
const request = require('request')
const cheerio = require('cheerio')
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

const TOKEN = process.env.TELEGRAM_TOKEN
const PORT = process.env.PORT

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const bot = new TelegramBot(TOKEN, {
  webHook: {
    port: PORT
  }
});

(async function(){
if (!process.env.hasOwnProperty('APP_URL')) {
  const ngrok = require('ngrok')
  const u = await ngrok.connect(PORT)
  console.log(`Open at ${u}`)
  bot.setWebHook(`${u}/bot${TOKEN}`)
}else{
  bot.setWebHook(`${process.env.APP_URL}/bot${TOKEN}`);
}})()

const Voucher = mongoose.model('Voucher', {
    voucher: String,
    created_at: { type: Date, default: Date.now }
})

function extractVoucher(){
    return new Promise((resolve, reject) => {
        console.log("Fetching new token")
        request('http://lafuenteunlp.com.ar/web/', function(error, response, html){
            if(error) reject(error)
            var $ = cheerio.load(html);
            //*[@id="sidebar-a"]/div[1]/div/h2
            var voucher = $('#sidebar-a > div > div > h2').text().trim()
            console.log("Token fetched: ", voucher)
            resolve(voucher)
        })
    })
}

function getCurrentVoucher(){
    return new Promise((resolve, reject) => {
        Voucher.findOne({created_at: { $gte: new Date(new Date().setDate(new Date().getDate()-1))}}, {}, { sort: { 'created_at' : -1 } }, function(err, voucher) {
          if(err) throw err
          if(voucher){
              console.log('Voucher valid')
              resolve(voucher)
          }else{
              extractVoucher().then((voucher) => {
                  Voucher.find({voucher}, (err, vouchers) => {
                      if(err) throw err
                      if(vouchers.length){
                          //Notify everyone subscribed about changed voucher and save it
                          new Voucher({voucher}).save()
                      }
                  })
                  console.log('New voucher was fetched')
                  resolve({voucher})
              })
          }
        })
    })
}

bot.on('message', (msg) => {
    console.log('New message: ', msg)
    getCurrentVoucher().then( (voucher) => {
        bot.sendMessage(msg.chat.id, voucher.voucher)
    })
});
