const Gpio = require("pigpio").Gpio;

const motor = new Gpio(10, { mode: Gpio.OUTPUT });

const mid = 1500;
const max = 2500;
const min = 500;

// start at zero
motor.servoWrite(mid);

// go to 100 degrees
setTimeout(() => {
  motor.servoWrite(min);
}, 1000);

// go to 100 degrees
setTimeout(() => {
  motor.servoWrite(mid);
}, 2000);

// go back to mid
setTimeout(() => {
  motor.servoWrite(max);
}, 3000);

// go back to mid
setTimeout(() => {
  motor.servoWrite(mid);
}, 4000);
