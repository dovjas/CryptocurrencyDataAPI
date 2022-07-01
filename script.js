const baseUrl = 'https://api.coinranking.com/v2/coins';
const proxyUrl ='https://cors-anywhere.herokuapp.com/';
const mainUrl = `${proxyUrl}${baseUrl}`
console.log(mainUrl)
const dataBody =  document.querySelector('#data-tbody');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
let cryptoData = []
let resPerPage = 10;
let currPage = 1;


async function renderData(page = 1) {
    await getData()

    if(page == 1){
        prevBtn.getElementsByClassName.visibility = 'hidden'
    } else {
        prevBtn.style.visibility = 'visible'
    }

    //Create HTML

    let coinData = ''

    cryptoData.filter((row,idx)=> {
        let start = (currPage -1) * resPerPage;
        let end = currPage * resPerPage;
        if(idx >= start && idx < end) return true;
    }).forEach(coin => {
        coinData += "<tr>";
        coinData += `<td>${(coin.rank)}</td>`;
        coinData += `<td>${(coin.name)}</td>`;
        coinData += `<td>${Math.round(coin.price)}</td>`;
        coinData += `<td>${parseFloat(coin.btcPrice).toFixed(5)}</td>`;
        coinData += `<td>${(coin.symbol)}</td>`;
        "<tr>"
        console.log(coinData)

    });

    dataBody.innerHTML = coinData;
}
renderData(currPage)

// Next  page button function

function nextPage(){
    if((currPage * resPerPage) < cryptoData.length){
        currPage++;
        renderData()
    }

}
// Previous  page button function

function prevPage(){
    if (currPage > 1){
        currPage --;
        renderData()
    }
}

prevBtn.addEventListener('click', prevPage,false)
nextBtn.addEventListener('click', nextPage,false)


//Fetch Data 
async function getData() {
    const response = await fetch(mainUrl);
    const crypto = await response.json();
    cryptoData = crypto.data.coins
    console.log(cryptoData)
}


