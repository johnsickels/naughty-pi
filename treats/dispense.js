const dispenseTreats = () => {

    console.log('Dispensing treats');

    const spawn = require('child_process').spawn;

    const dispense = spawn('python', ['./treats/stepper.py']);

    dispense.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    dispense.stderr.on('error', (error) => {
        console.log(`stderr: ${error}`);
    });

    dispense
        .on('uncaughtException', error => {
            throw new Error(`Child Process Uncaught Exception: ${error}`)
        })
        .on('error', error => {
            throw new Error(`Child Process Error: ${error}`)
        }).on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
        }).on('exit', (code) => {
            console.log(`child process exited with code ${code}`);
        });
}

module.exports = dispenseTreats;