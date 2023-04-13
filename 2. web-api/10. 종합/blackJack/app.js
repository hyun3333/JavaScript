// 시작을 눌렀을 때 메인화면 제거 이벤트
const $start = document.getElementById('start');

const $startBtn = document.getElementById('start-btn');

const $gameOn = document.getElementById('gameOn');

$gameOn.style.display = 'none';

$startBtn.addEventListener('click', e => {
    $start.classList.toggle('hide');
    $gameOn.style.display = 'flex';
    console.log($startBtn);
    console.log($hitStand);
})

// 포카드
const gameData = {
    card: Math.floor(Math.random() * 40) + 1,
    dealCard: 0, // 딜러 카드의 총합
    myCard: 0, // 내 카드의 총합
    myMoney: 500, // 내 현재 금액
    myBetting: 0, // 내 배팅 합계
    myScore: 0 // 나의 점수
}

let cardNum = 0;

function randomCard() {
    let rCard = [];

    let random = Math.floor(Math.random() * 40) + 1;

    while (rCard.includes(random)) {
        random = Math.floor(Math.random() * 40) + 1;
        if (random == 0) continue;
    }

    rCard.push(random);

    if (random >= 1 && random <= 10) {
        poCard = '♠' + random;
        cardNum = random;
    } else if (random >= 11 && random <= 20) {
        poCard = '♣' + (random - 10);
        cardNum = (random - 10);
    } else if (random >= 21 && random <= 30) {
        poCard = '♥' + (random - 20);
        cardNum = (random - 20);
    } else if (random >= 31 && random <= 40) {
        poCard = '⧫' + (random - 30);
        cardNum = (random - 30);
    };

    return cardNum;

}

// console.log(gameData.card)
let poCard = 0; // 카드 모양 나타내기 위해 만든 변수
let total = 0; // 카드의 총 합을 나타내기 위한 변수
let cardValue = 0; // 카드 숫자 값 체크용


let $betting = document.querySelector('#betting')
let $betMoney = document.getElementById('betting-text-money');
let $poMoney = document.getElementById('pocket-text-money');

// 배팅 실시간 설정
$betting.addEventListener('click', e => {
    if (!e.target.matches('input')) return;



    if (gameData.myMoney > 0) {
        gameData.myBetting += (+e.target.value);
        gameData.myMoney -= (+e.target.value);
        console.log(gameData.myBetting);
        console.log(gameData.myMoney);

    } else if (gameData.myMoney < 0) {
        alert('당신의 금액이 없습니다.')
        gameData.myMoney = 0;
        return;
        
    } else if (gameData.myMoney < (e.target.value = 500)) {
        alert('당신의 금액이 없습니다.')
        return;
    }
    $betMoney.textContent = gameData.myBetting;
    $poMoney.textContent = gameData.myMoney;

})


let $shuffleBtn = document.getElementById('shuffleBtn');
const $shuffle = document.querySelector('.blackJack');
let $myPoint = document.querySelector('#myCard-sum > h3');
let $youPoint = document.querySelector('#youCard-sum > h3');
const $hitStand = document.querySelector('#card-sum')

let flag = false;
// 셔플 진행!!
$shuffleBtn.addEventListener('click', e => {
    console.log('셔플진행버튼');
    if (gameData.myBetting === 0) {
        alert('너의 배팅금이 잘못된거같애')
        return;
    } else if (flag) {
        return;
    }
    $betting.style.display = 'none';

    gameData.myCard += (+randomCard());
    console.log(cardNum);
    gameData.myCard += (+randomCard());
    console.log(cardNum);

    $myPoint.textContent = gameData.myCard;

    $shuffle.style.display = 'none';
    $hitStand.classList.add('on');
    flag = true;

})


const $hitBtn = document.getElementById('hitBtn');

// hit를 눌러서 게임 진행하는 함수
function gameReset() { //게임 리셋. 패, 배팅 초기화하는 함수
    gameData.myCard = 0;
    gameData.dealCard = 0;
    gameData.myBetting = 0;
}


$hitBtn.addEventListener('click', e => {
    if (gameData.myCard === 0) {
        alert('셔플부터 진행해주세요.')
        return;
    } else if (gameData.myCard > 21) {
        return;
    }
    let hitCard = randomCard();
    console.log(hitCard);
    gameData.myCard += (+hitCard); //내 카드의 총합 더하기
    $myPoint.textContent = gameData.myCard;

    console.log('내 카드 합계:' + gameData.myCard);

    if (gameData.myCard > 21) {
        alert('딜러 승리!')
        $betMoney.textContent = 0;
        gameData.myBetting = 0;
        gameData.dealCard = 0;
        gameData.myCard = 0;
        $myPoint.textContent = 0;
        $youPoint.textContent = 0;
        $betting.style.display = 'block';
        $shuffle.style.display = 'block';

        $hitStand.classList.remove('on');

        console.log($hitStand);
        flag = false;
        if (gameData.myMoney <= 0) {
            $gameOn.style.transition = '1.5s'
            $gameOn.style.opacity = '0.2';
            $gameOn.style.backgroundColor = '#000000';
            $endgame.classList.toggle('hide');
        }
        return;
    }
})


// stand를 눌러서 딜러의 차례가 시작되는 함수

const $standBtn = document.getElementById('standBtn');
let $youCard = document.g
const $endgame = document.querySelector('#end')

$standBtn.addEventListener('click', e => {
    if (gameData.myCard === 0) {
        alert('셔플부터 진행해주세요.')
        return;
    } else if (gameData.myCard === 0) {
        alert('셔플부터 진행해주세요')
    }
    let func = setInterval(() => {

        let standCard = randomCard();
        gameData.dealCard += (+standCard);
        console.log(standCard);

        $youPoint.textContent = gameData.dealCard
        if (gameData.dealCard >= 17) {
            if (gameData.dealCard > 21 || gameData.dealCard < gameData.myCard) {
                alert('플레이어 승리!')
                $poMoney.textContent = gameData.myMoney + gameData.myBetting * 2;
                gameData.myMoney += gameData.myBetting * 2;
            } else if (gameData.dealCard > gameData.myCard) {
                alert('딜러 승리!')
            } else if (gameData.dealCard === gameData.myCard) {
                alert('비겼음')
                gameData.myMoney += gameData.myBetting;
                $poMoney.textContent = gameData.myMoney;
            }
            $hitStand.classList.remove('on');
            $betMoney.textContent = 0;
            gameData.myBetting = 0;
            gameData.dealCard = 0;
            gameData.myCard = 0;
            $myPoint.textContent = 0;
            $youPoint.textContent = 0;
            clearInterval(func);
            $betting.style.display = 'block';
            $shuffle.style.display = 'block';
            $hitStand.classList.toggle = ('on');
            flag = false;
            console.log(gameData.myMoney);
            if (gameData.myMoney <= 0) {
                $gameOn.style.transition = '1.5s'
                $gameOn.style.opacity = '0.2';
                $gameOn.style.backgroundColor = '#000000';
                $endgame.classList.toggle('hide');
            }
            return;
        }
    }, 1000);

})

const $reStart = document.getElementById('end-btn');

$reStart.addEventListener('click', e => {
    location.reload();
})