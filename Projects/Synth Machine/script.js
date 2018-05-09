function removeTransition(e) {
  if (e.propertyName !== "transform") return; // skip if not a transform
  // console.log(e.propertyName);
  // console.log(this);
  this.classList.remove('playing');
};
function playSound(e) {
  //note the ES6 backticks around the selector query, as well as the [data-key=${e.keycode}]
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return; //stop the function from running altogether
  //since audio.play();, when called, won't be invokable again until the audio finishes its run,
  //use audio.currentTime = 0; to reset the audio to time location zero whenever the key is pressed again, which
  //allows for quick keypresses.
  audio.currentTime = 0;
  audio.play();
  // console.log(key);
  key.classList.add('playing');
}
const keys = document.querySelectorAll('.key');
const clicked = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);

//jQuery implementation allowing for clicking and touch to play associated audio
//directory of sounds
const soundLocation = "sounds/";
//array of individual filenames used later when parsing/choosing what sound to associate to events
const audio = ["bd.wav", "bd2.wav", "bdstrings.wav", "clap.wav", "hihat.wav", "kick.wav", "snare.wav", "snare2.wav", "synth.wav", "hihat3.wav"];
//used click and touch here because the key-based one above was a specifically weird setup
//TO-DO: merge these two to create a more succinct file with fewer load resource requirements on device
$("button.key").on("click touch", function(e) {
  //since form element was used, preventDefault keeps the page from refreshing after a button click
  e.preventDefault();
  //gets the id of the button clicked or touched and stores it in i
  let i = $(this).attr("id");
  //for each i, creates a new Audio event that plays sound from URL, where URL is soundLocation + audio array location i
  new Audio(soundLocation + audio[i]).play();
  //used to add the same class "playing" as the keypad version above
  $(this).addClass("playing");
});
