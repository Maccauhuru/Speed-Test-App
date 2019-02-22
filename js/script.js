const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
let timer = [0,0,0,0];
let interval;
let runningTimer = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
const addLeadingZero=(time)=>{
   return (time <= 9) ? "0"+ time : time
}

// Run a standard minute/second/hundredths timer:
const runtimer=()=>{
let currentTimer   = addLeadingZero(timer[0]) +':'+addLeadingZero(timer[1])+':'+addLeadingZero(timer[2]);
theTimer.innerHTML = currentTimer;
timer[3]++;

//define minutes
timer[0] = Math.floor((timer[3] / 100) / 60);
timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
timer[2] = Math.floor((timer[3] - (timer[1] * 100)) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
const spellCheck =()=>{
let textEntered = testArea.value;
let originTextMatch = originText.substr(0,textEntered.length);
if(textEntered == originText){
clearInterval(interval);
testWrapper.style.borderColor = "#7FFF00";
} else {
    if(textEntered == originTextMatch){
        testWrapper.style.borderColor = "#2E8B57"; 
    }
    else{
        testWrapper.style.borderColor = "#DC143C";
    }
}
}

// Start the timer:
const startTimer =()=>{
let totalTextLength = testArea.value.length + 1;
if(totalTextLength===1 && !runningTimer){
    runningTimer = true;
    interval = setInterval(runtimer, 10);
}
}

// Reset everything:
const reset=()=>{
    //visual 
    testArea.value = '';
    runningTimer = false;
    testWrapper.style.borderColor = "grey";

    //background
    timer = [0,0,0,0];
    clearInterval(interval);
    interval = null;
    theTimer.innerHTML = '00:00:00';
}
// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",startTimer,false);
testArea.addEventListener("keyup",spellCheck,false);
resetButton.addEventListener("click",reset,false);