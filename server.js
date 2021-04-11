const Gpio = require("pigpio").Gpio;

const motor = new Gpio(10, { mode: Gpio.OUTPUT });

const mid = 1500;
const max = 2500;
const min = 500;

// start at zero
// motor.servoWrite(mid);

let pulseWidth = 1500;
let increment = 100;
let counter = 0;

const naughtyInterval = setInterval(() => {
  if (ctr > 40) {
    clearInterval(naughtyInterval);
  }
  motor.servoWrite(pulseWidth);
  ctr++;

  pulseWidth += increment;
  if (pulseWidth >= max) {
    increment = -100;
  } else if (pulseWidth <= min) {
    increment = 100;
  }
}, 100);

// go to 100 degrees
// setTimeout(() => {
//   motor.servoWrite(min);
// }, 1000);

// // go to 100 degrees
// setTimeout(() => {
//   motor.servoWrite(mid);
// }, 2000);

// // go back to mid
// setTimeout(() => {
//   motor.servoWrite(max);
// }, 3000);

// // go back to mid
// setTimeout(() => {
//   motor.servoWrite(mid);
// }, 4000);
