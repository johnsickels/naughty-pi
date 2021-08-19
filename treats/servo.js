const Gpio = require("pigpio").Gpio;

const motor = new Gpio(10, { mode: Gpio.OUTPUT });

const mid = 1500;
const max = 2500;
const min = 500;

const pos1 = 1600;
const pos2 = 2100

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
  for (let i = pos1; i < pos2; i++) {
    motor.servoWrite(i);
    await sleep(1);
  }

  // move back to mid
  for (let i = pos2; i > pos1; i--) {
    motor.servoWrite(i);
    await sleep(1);
  }

};

main();
