


// 目標時間(要倒數幾秒)。
let targetSeconds = 0;
const hour = document.getElementById('hour');
hour.value = '00';
const minute = document.getElementById('minute');
minute.value = '00';
const second = document.getElementById('second');
second.value = '00';


const resetTimeData = function(){
  const reset= confirm('確定將目前時間重置為0嗎？');
  if(reset){
    // 重置後顯示時間設定按鈕
    const setTime_text = document.querySelector('.setTime_text');
    const setTime_input = document.querySelector('.setTime_input');
    const resetTime_btn = document.querySelector('.resetTime_btn');
    const setTime_btn = document.querySelector('.setTime_btn');
    const start_btn = document.querySelector('.start_btn');
    setTime_text.style.setProperty('--showSetting', "inline");
    setTime_input.style.setProperty('--showSetting', "inline");
    resetTime_btn.style.setProperty('--showSetting', "inline");
    setTime_btn.style.setProperty('--showSetting', "inline");
    start_btn.style.setProperty('--showSetting', "inline");
    // 重置後隱藏結束計時按鈕
    const stop_btn = document.querySelector('.stop_btn');
    stop_btn.style.setProperty('--show', "none");
    targetSeconds = 0;
    init(targetSeconds);
    hour.value = '00';
    minute.value = '00';
    second.value = '00';
    const time = document.querySelector('.time')
    time.innerHTML = hour.value + ":" + minute.value + ":" + second.value ;
  }
}
const getTimeData = function(){
  let hour_num = hour.value;
  let minute_num = minute.value;
  let second_num = second.value;
  // 如果設定的時間在有效範圍，計算出要倒數計時幾秒
  if((parseInt(hour_num) >= 0 && parseInt(hour_num) < 99) 
    && 
    (parseInt(minute_num) >= 0 && parseInt(minute_num) < 60) 
    && 
    (parseInt(second_num) >= 0 && parseInt(second_num) < 60)
    &&
    (parseInt(hour_num) > 0
      || 
      parseInt(minute_num) > 0 
      || 
      parseInt(second_num) > 0)){
    targetSeconds = (parseInt(hour_num) * 3600) + (parseInt(minute_num) *60) + parseInt(second_num);
    console.log(targetSeconds);
    init(targetSeconds);
    console.log(parseInt(hour_num), parseInt(minute_num), parseInt(second_num));
    const setTime_text = document.querySelector('.setTime_text');
    setTime_text.style.setProperty('--showSetting', "none");
  }else{
    // 如果設定時間非有效範圍，提醒並重置為0
    alert('設定時間必須大於0且符合格式！');
    hour.value = '00';
    minute.value = '00';
    second.value = '00';
    const setTime_text = document.querySelector('.setTime_text');
    setTime_text.style.setProperty('--showSetting', "inline");
  }
  const time = document.querySelector('.time');
  hour.value = hour.value.toString().padStart(2, '0');
  minute.value = minute.value.toString().padStart(2, '0');
  second.value = second.value.toString().padStart(2, '0');
  time.innerHTML = hour.value + ":" + minute.value + ":" + second.value ;
}
const startCountTime = function(targetSeconds){
  if(hour.value === '00'&&
  minute.value === '00'&&
  second.value === '00'){
    alert('設定時間必須大於0且符合格式！');
    return;
  }
  // 起始時間(取得計時器啟動當下的時間)。
  const startTime = new Date().getTime();
  // init(targetSeconds);
  // timeRenderer(targetSeconds);
  

  // start the timer.
  timer(startTime);
  // 開始計時後隱藏時間設定按鈕
  const setTime_text = document.querySelector('.setTime_text');
  const setTime_input = document.querySelector('.setTime_input');
  const resetTime_btn = document.querySelector('.resetTime_btn');
  const setTime_btn = document.querySelector('.setTime_btn');
  const start_btn = document.querySelector('.start_btn');
  setTime_text.style.setProperty('--showSetting', "none");
  setTime_input.style.setProperty('--showSetting', "none");
  resetTime_btn.style.setProperty('--showSetting', "none");
  setTime_btn.style.setProperty('--showSetting', "none");
  start_btn.style.setProperty('--showSetting', "none");
  // 開始計時後只顯示結束計時按鈕
  const stop_btn = document.querySelector('.stop_btn');
  stop_btn.style.setProperty('--show', "block");
}


let timer = function(startTime){
  // 當下時間
  let currentTime = new Date().getTime();
  // 當前時間 - 起始時間 = 經過時間。(因為不需要毫秒，所以將結果除以1000。)
  let elapsedTime = Math.round((currentTime - startTime) / 1000);
  let remainingTime = targetSeconds - elapsedTime;
  console.log(remainingTime);
  update(remainingTime);
  
  if(remainingTime <= 0){
  // clearInterval(timerId);
  update(0);
  // 時間到後顯示時間設定按鈕
  const setTime_text = document.querySelector('.setTime_text');
  const setTime_input = document.querySelector('.setTime_input');
  const resetTime_btn = document.querySelector('.resetTime_btn');
  const setTime_btn = document.querySelector('.setTime_btn');
  const start_btn = document.querySelector('.start_btn');
  setTime_text.style.setProperty('--showSetting', "inline");
  setTime_input.style.setProperty('--showSetting', "inline");
  resetTime_btn.style.setProperty('--showSetting', "inline");
  setTime_btn.style.setProperty('--showSetting', "inline");
  start_btn.style.setProperty('--showSetting', "inline");
  // 時間到後隱藏結束計時按鈕
  const stop_btn = document.querySelector('.stop_btn');
  stop_btn.style.setProperty('--show', "none");
  }else{
    setTimeout(function(){
      timer(startTime);
    }, 1000)
  }
}

// let timerId = setInterval(
//   function(){
//     timer(startTime);
    
//   }, 1000);
// const resetTime_btn = document.querySelector('.resetTime_btn');
// resetTime_btn.addEventListener('click', resetTimeData(), false)
// 初始化。




// 初始化。此處借用update函式來初次設定進度條。
function init(seconds) {
  update(seconds);
}

// update progess with the timer.
function update (seconds) {
  barRenderer(seconds);
  timeRenderer(seconds);
}

function timeRenderer(targetSeconds){
  const time = document.querySelector('.time');
  let displayHour = '00'
  let displayMinute = '00'
  let displaySecond = '00'
  
  
  if(targetSeconds > 0){
    // hour = Math.floor(targetSeconds/3600);
    // minute = Math.floor(targetSeconds/60);
    // second = targetSeconds % 60;
    displayHour = Math.floor(targetSeconds/3600).toString().padStart(2, '0');    
    targetSeconds = displayHour > 0 ? targetSeconds - (displayHour * 3600):targetSeconds;
    displayMinute = Math.floor(targetSeconds/60).toString().padStart(2, '0');
    targetSeconds = displayMinute > 0 ? targetSeconds - (displayMinute * 60):targetSeconds;
    displaySecond = (targetSeconds % 60).toString().padStart(2, '0');
  }else{
    // time.innerHTML = "00:00:00";
    // hour.value = '00';
    // minute.value = '00';
    // second.value = '00';
    // hour.value =  Math.floor(targetSeconds / 3600);
    // const time = document.querySelector('.time')
    // time.innerHTML = hour.value + ":" + minute.value + ":" + second.value ;
  }

  time.innerHTML = displayHour + ":" + displayMinute + ":" + displaySecond;
  
}
// refresh the bar.
function barRenderer (seconds) {
  let percent = (seconds / targetSeconds) * 100;
  const bar = document.querySelector('.bar');
  bar.style.setProperty('--width',percent + "%");
}
// refresh the text of the bar.
// function textRenderer (seconds) {
//   // second.value = seconds % 60;  
//   // minute.value = seconds % 3600;
//   // hour.value =  Math.floor(seconds / 3600);
//   if(second.value === 0){
//     second.value = "00";
//   }
//   //min = min > 9 ? min : "0" + min;
//   //sec = sec > 9 ? sec : "0" + sec;  
//   // 
//   const time = document.querySelector('.time')
//   time.innerHTML = hour.value + ":" + minute.value + ":" + second.value ;		
// }


