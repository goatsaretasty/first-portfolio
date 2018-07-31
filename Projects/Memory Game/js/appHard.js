/* jshint esversion: 6 */
/* jshint -W031 */
/* jshint expr: true */
/*jshint loopfunc: true */
/*
Global TODO: I found a few sources covering complex ternary format rules, but nothing consistent.
I've stuck with either single lines and, for nested ternary expressions, broken the lines in at
least a logical order. Indentation may still be an issue, but I'll get to that.
*/
/* Global variables, mostly for DOM items, and starting values used in later functions. */
let card = document.getElementsByClassName('.card');
let cards = ['fa-eye', 'fa-eye',
             'fa-glasses', 'fa-glasses',
             'fa-user-ninja', 'fa-user-ninja',
             'fa-user-secret', 'fa-user-secret',
             'fa-frog', 'fa-frog',
             'fa-poo', 'fa-poo',
             'fa-dice', 'fa-dice',
             'fa-d-and-d', 'fa-d-and-d'];
function generateCard(card){
 return  `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}
function startGame() {
  generateCard();
}
