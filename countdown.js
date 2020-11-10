var countDownDate = new Date("2020-12-01T00:00:00+01:00");

var myfunc = setInterval(function() {
    var now = new Date().getTime();
    var timeleft = countDownDate - now;
        
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    document.querySelector("#countdown").innerHTML = `Het duurt nog: ${days}&nbsp;dagen, ${hours}&nbsp;uur, ${minutes}&nbsp;minuten en ${seconds}&nbsp;seconden tot 1&nbsp;december!`
}, 1000)