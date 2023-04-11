
// 포카드
const gameData = {
    card: Math.floor(Math.random() * 40) + 1,
    dealCard : 0, // 딜러 카드의 총합
    myCard : 0, // 내 카드의 총합
    myBetting : 0, // 내 배팅 합계
    myScore : 0 // 나의 점수
}


let cardNum = 0;
function randomCard(){
    let random = Math.floor(Math.random() * 40) + 1;

    if (random >= 1 && random <= 10) {
        poCard = '♠' + random;
        cardNum = random;
    } else if (random >= 11 && random <= 20) {
        poCard = '♣' + (random - 10);
        cardNum = (random - 10);
    } else if (random >= 21 && random <= 30) {
        poCard = '♥' + (random - 20);
        cardNum = (random - 20);
    } else if (random >31 && random <= 40){
        poCard = '⧫' + (random - 30);
        cardNum = (random - 30);
    };

    return poCard;
}

// console.log(gameData.card)
let poCard = 0; // 카드 모양 나타내기 위해 만든 변수
let total = 0; // 카드의 총 합을 나타내기 위한 변수
let cardValue = 0; // 카드 숫자 값 체크용


let $betting = document.querySelector('#betting')

// 배팅 실시간 설정
$betting.addEventListener('click', e => {

    if (!e.target.matches('input'))return;
    
    gameData.myBetting += +e.target.value;
    console.log(gameData.myBetting);
    $betMoney.textContent = gameData.myBetting;

})


let $shuffleBtn = document.getElementById('shuffleBtn');
let $betMoney = document.getElementById('betting-text-money')

let flag = false;
// 셔플 진행!!
$shuffleBtn.addEventListener('click', e => {
    if (gameData.myBetting === 0) {
        alert('너의 배팅금이 잘못된거같애')
        return;
    } else if (flag) {
        return;
    }
    // const $numbers = document.getElementById('numbers');
    // const $frag = document.createDocumentFragment();
    console.log('gameData.card : ' + randomCard());
    gameData.myCard += (+cardNum);
    console.log('gameData.card : ' + randomCard());
    gameData.myCard += (+cardNum);
    console.log(gameData.myCard);
    flag = true;
    // 나 먼저 점수 받기 hit
    // 21점이 넘거나 
})

