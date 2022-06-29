const baseUrl = 'https://api.coinranking.com/v2/coins';
const proxyUrl ='https://cors-anywhere.herokuapp.com/';
const mainUrl = `${proxyUrl}${baseUrl}`
console.log(mainUrl)
let cryptoData = []

let resPerPage = 10;
let currPage


async function renderData(){
    await getData()

    //Create Table data in HTML
    const cryptoCurr = ''
    console.log(cryptoData)

    cryptoData.filter((row,idx)=> {
        let start = (currPage -1) * resPerPage
        let end = currPage * resPerPage

        if(idx >= start && idx < end) return true;
    }).forEach(coin =>{
        cryptoData += "<tr>"
        cryptoData += `<td>${parseFloat(coin.btcPrice.toFixed(5))}</td>`
        cryptoData += `<td>${(coin.rank)}</td>`
        cryptoData += `<td>${(coin.tier)}</td>`
        cryptoData += `<td>${(coin.name)}</td>`
        cryptoData += `<td>${(coin.symbol)}</td>`
        cryptoData += `<td>${Math.round(coin.price)}</td>`
        "<tr>"
    })

    document.querySelector('#data-tbody').innerHTML = cryptoData
}
renderData()

//Fetch Data 
async function getData() {
    const response = await fetch(mainUrl);
    const crypto = await response.json();
    cryptoData = crypto.data.coins 
    console.log(cryptoData)
}


