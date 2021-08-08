const Gpio = require("pigpio").Gpio;

const motor = new Gpio(13, { mode: Gpio.OUTPUT });

const mid = 1500;
const max = 2500;
const min = 500;

const sleep = (t) => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, t);
  });
};

const main = async () => {
  // start at mid
  // move to max
  for (let i = mid; i < max; i += 10) {
    motor.servoWrite(i);
    await sleep(10);
  }

  // move to min
  for (let i = max; i > min; i -= 10) {
    motor.servoWrite(i);
    await sleep(10);
  }

  // move back to mid
  for (let i = min; i < mid; i += 10) {
    motor.servoWrite(i);
    await sleep(10);
  }
};

main();

// let pulseWidth = 1500;
// let increment = 100;
// let counter = 0;

// const naughtyInterval = setInterval(() => {
//   if (ctr > 40) {
//     clearInterval(naughtyInterval);
//   }
//   motor.servoWrite(pulseWidth);
//   ctr++;

//   pulseWidth += increment;
//   if (pulseWidth >= max) {
//     increment = -100;
//   } else if (pulseWidth <= min) {
//     increment = 100;
//   }
// }, 100);

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
