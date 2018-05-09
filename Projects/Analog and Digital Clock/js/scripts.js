document.addEventListener("DOMContentLoaded", function(event) {
  const secondHand = document.querySelector('.second-hand');
  const minuteHand = document.querySelector('.min-hand');
  const hourHand = document.querySelector('.hour-hand');
  const sound = new Audio("sounds/tock.mp3");

  function secondSound() {
    sound.play();
    setTimeout(secondSound, 1000);
  } secondSound();

  function checkTime(e) {
    if (e < 10) {
      e = "0" + e;
    }
    return e;
  }

  function setTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('analog').innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function() {
      setTime()
    }, 1000);
  } setTime();

  function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    const hours = now.getHours();
    const hoursDegrees = ((hours / 12) * 360) + ((minutes/60)*30) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
  } setInterval(setDate, 1000);
});
