const Gpio = require('pigpio').Gpio;

const motor = new Gpio(10, {mode: Gpio.OUTPUT});

//console.log('500')
//motor.servoWrite(500)

//console.log('moving to 2000')
//motor.servoWrite(2000)

//setTimeout(() => {
//  console.log('1000')
//  motor.servoWrite(1000);
//}, 1000);

//setTimeout(() => {
//  console.log('500')
//  motor.servoWrite(500)
//}, 2000);

let pulseWidth = 1000;
let increment = 100;
let ctr = 0;

//const naughtyInterval = setInterval(() => {
//  motor.servoWrite(pulseWidth);
//  if (flag) {
//    motor.servoWrite(2000);
//  } else {
//    motor.servoWrite(1000)
//  }
//  flag = !!flag
//  pulseWidth += increment;
//  ctr++
//  if (pulseWidth >= 2500) {
//    increment = -100;
//  } else if (pulseWidth <= 1000) {
//    increment = 100;
//  }
//  if (ctr >= 30) {
//    clearInterval(naughtyInterval);
//  }
//}, 100);
motor.servoWrite(1500)
setTimeout(() => {
  motor.servoWrite(2500)
}, 500);
setTimeout(() => {
  motor.servoWrite(500)
}, 1000);
