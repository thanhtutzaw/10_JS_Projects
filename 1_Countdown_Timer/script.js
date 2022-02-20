function startTime(){
        var daysEle = document.querySelector('#days');
        var hoursEle = document.querySelector('#hours');
        var minutesEle = document.querySelector('#minutes');
        var secondsEle = document.querySelector('#seconds');
        const newYear = "1 Jan 2023";
        var newYearDate = new Date(newYear);
        var currentDate = new Date();

        const totalSeconds = (newYearDate - currentDate) / 1000;

        
        const days = Math.floor( totalSeconds / 3600 / 24) ;
        let hours = Math.floor( totalSeconds / 3600 ) % 24 ;
        let minutes = Math.floor( totalSeconds / 60) % 60;
        let seconds = Math.floor( totalSeconds ) % 60;
        
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        
        daysEle.innerText =  days;
        hoursEle.innerText =  hours;
        minutesEle.innerText =  minutes;
        secondsEle.innerText = seconds;


    }
    setInterval(startTime,1000); 
// startTime();

