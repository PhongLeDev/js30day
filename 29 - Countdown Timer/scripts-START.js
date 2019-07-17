let countdown;
const timerDisplay = document.querySelector('.display__time-left');
 const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[date-time]');
function timer(seconds){
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() =>{
        const secondsleft = Math.round( then - Date.now())/1000;
        if(secondsleft <=0){
            clearInterval(countdown);
            return ;
        }
        displayTimeLeft(secondsleft);
        
    },1000);
}
function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds/60);
    const remainderSeconds = Math.floor(seconds % 60) ;
    const display= `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}  `;  
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour =  hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ' ' }${minutes}`;
}

function startTime(){
    const seconds =parseInt(this.dataset.time);
    timer(seconds);
}


buttons.forEach(button => button.addEventListener('click',startTimer));
document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    const min = this.minutes.value;
    timer(min*60); 
    this.reset();
});