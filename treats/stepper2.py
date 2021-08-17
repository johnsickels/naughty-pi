import RPi.GPIO as GPIO

# import the library
from rpimotorlib import BYJMotor

GpioPins = [17, 18, 27, 22]

# Declare an named instance of class pass a name and motor type
mymotortest = BYJMotor("MyMotorOne", "28BYJ")

# call the function pass the parameters
# mymotortest.motor_run(GpioPins , .01, 100, False, False, "half", .05)

# good practise to cleanup GPIO at some point before exit
GPIO.cleanup()
