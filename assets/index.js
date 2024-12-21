const countInput = document.querySelector('#count');
const flipButton = document.querySelector('#flip');
const resetButton = document.querySelector('#reset');
const statArea = document.querySelector('#stat');
const orelCountElem = document.querySelector('#orel');
const reshkaCountElem = document.querySelector('#reshka');
const orelPercentElem = document.querySelector('#orel_percent');
const reshkaPercentElem = document.querySelector('#reshka_percent');
const coin = document.querySelector('.game_coin');

let orelCount = 0;
let reshkaCount = 0;
let totalFlips = 0;
let counter = 1;

//Выполняет бросок монеты столько раз, сколько было указано
async function performFlips() {
    const flipsCount = parseInt(countInput.value) || 1;

    for (let i = 0; i < flipsCount; i++) {
        await flipSingleCoin();
        await delay(3500);
    }
}

//Задержка перед следующим броском (если указано сразу несколько)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Логика переворота монеты (+ анимация вращения)
function flipSingleCoin() {
    let i = flipCoin();
    let results = '';
    coin.style.animation = "";
    if(i){
        setTimeout(function(){
            coin.style.animation = "spin-reshka 3s forwards";
        }, 100);
        results += `${counter++} бросок: решка\n`;
        reshkaCount++;
        totalFlips++;
    }
    else{
        setTimeout(function(){
            coin.style.animation = "spin-orel 3s forwards";
        }, 100);
        results += `${counter++} бросок: орел\n`;
        orelCount++;
        totalFlips++;
    }
    setTimeout(updateStatistics, 3000);
    setTimeout(() => {
        statArea.value += results;
        statArea.scrollTop = statArea.scrollHeight;
    }, 3000);
    toggleButton();
}

//Функция блокировки кнопки на 3 секунды
function toggleButton(){
    flipButton.disabled = true;
    setTimeout(function(){
        flipButton.disabled = false;
    },3000);
}

//Функция рандомного выбора орла или решки
function flipCoin() {
    return Math.random() < 0.5;
}

//Функция обновления статистики
function updateStatistics() {
    orelCountElem.textContent = orelCount;
    reshkaCountElem.textContent = reshkaCount;
    const orelPercent = totalFlips ? ((orelCount / totalFlips) * 100).toFixed(1) : 0;
    const reshkaPercent = totalFlips ? ((reshkaCount / totalFlips) * 100).toFixed(1) : 0;
    orelPercentElem.textContent = orelPercent;
    reshkaPercentElem.textContent = reshkaPercent;
}

//Функция сброса статистики
function resetStatistics() {
    let id = window.setTimeout(function() {}, 0);
    while (id--) {
        window.clearTimeout(id);
    }
    flipButton.disabled = false;
    coin.style.animation = "none";
    orelCount = 0;
    reshkaCount = 0;
    totalFlips = 0;
    statArea.value = '';
    counter = 1;
    updateStatistics();
}

//Слушатели на кнопки
flipButton.addEventListener('click', performFlips);
resetButton.addEventListener('click', resetStatistics);

//Дата
const currentDate = new Date();

const dateElement = document.getElementById('header_date');
const monthElement = document.getElementById('header_month');

const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

dateElement.textContent = currentDate.getDate();
monthElement.textContent = months[currentDate.getMonth()];