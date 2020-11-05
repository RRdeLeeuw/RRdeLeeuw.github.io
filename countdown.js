var countDownDate = new Date("2020-12-01T00:00:00+01:00");

var myfunc = setInterval(function() {
    var now = new Date().getTime();
    var timeleft = countDownDate - now;
        
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    document.querySelector("#countdown").innerHTML = `Het duurt nog ${days} dagen, ${hours} uur, ${minutes} minuten en ${seconds} seconden tot 1 december!`

  //  document.getElementById("days").innerHTML = days
  //  document.getElementById("hours").innerHTML = hours
  //  document.getElementById("mins").innerHTML = minutes
  //  document.getElementById("secs").innerHTML = seconds
}, 1000)