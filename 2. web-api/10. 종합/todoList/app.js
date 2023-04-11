// 새로운 일정 추가하기
const $todoInput = document.getElementById('todo-input');
const $plusbtn = document.querySelector('.plusbtn');
const $list = document.querySelector('#list');


$plusbtn.onclick = function(e) {
    //입력값이 없는 경우
    if($todoInput.value =='') { 
        $todoInput.setAttribute('placeholder', '필수 입력사항입니다!');
        $todoInput.classList.toggle('orange');
        return;
    }
    //입력값 있는 경우
    const $todo = document.createElement('div.todo');
    $list.appendChild($todo, $list.lastElementChild);
    








}

//할 일 입력하고 엔터 치면 직접 클릭한 것 같은 효과를 줌
$todoInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        $plusbtn.click();
        $todoInput.focus(); //커서가 계속 input에 머무르도록 포커싱.
        // .cloneNode 사용?? 후 인풋 벨류값 옮겨넣기? 
    }
});