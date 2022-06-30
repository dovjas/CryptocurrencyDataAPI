const baseUrl = 'https://api.coinranking.com/v2/coins';
const proxyUrl ='https://cors-anywhere.herokuapp.com/';
const mainUrl = `${proxyUrl}${baseUrl}`
console.log(mainUrl)
let cryptoData = []
let resPerPage = 10;
let currPage = 1;

const dataBody =  document.querySelector('#data-tbody');


async function renderData() {
    await getData()

    //Create HTML

    let coinData = ''

    cryptoData.filter((row,idx)=> {
        let start = (currPage -1) * resPerPage;
        let end = currPage * resPerPage;
        if(idx >= start && idx < end) return true;
    }).forEach(coin => {
        coinData += "<tr>";
        coinData += `<td>${parseFloat(coin.btcPrice).toFixed(5)}</td>`;
        coinData += `<td>${(coin.rank)}</td>`;
        coinData += `<td>${(coin.tier)}</td>`;
        coinData += `<td>${(coin.name)}</td>`;
        coinData += `<td>${(coin.symbol)}</td>`;
        coinData += `<td>${Math.round(coin.price)}</td>`;
        "<tr>"
        console.log(coinData)

    });

    dataBody.innerHTML = coinData;
}
renderData()

//Fetch Data 
async function getData() {
    const response = await fetch(mainUrl);
    const crypto = await response.json();
    cryptoData = crypto.data.coins 
    console.log(cryptoData)
}


