ninja-phone
===========

A Ninja Blocks driver that notifies you when your home phone is ringing. Requires a USB 56k modem

Installation
============

To install, SSH into your block, `cd` into your Ninja Block drivers directory (on Raspbian, this is /opt/ninjablocks/block-client/drivers/) and run:

`git clone https://github.com/Grayda/ninja-phone && cd ninja-phone && npm install`

This will clone the repository, `cd` into the directory and install. It may take a while, as it needs to download and compile the serialport library, so please be patient. If you're updating this driver, simply `cd` into your driver directory and do a `git pull && restartninja`

Using the driver
================

To use this, simply plug your modem in via USB, plug your phone line into the modem, then go to http://a.ninja.is/ruling and create a rule with the "Home Phone" element. 

If you wish to use Caller ID, go to http://a.ninja.is/you, click on Preferences, then enable Developer Mode. Go to http://a.ninja.is/ruling and create a new "Equality" rule. Pick "Home Phone" as the device, "Equals" as the condition, then enter in the phone number you wish to check for. Now when that person calls, your rule will fire!

Requirements
============

To use this driver, you must have a 56k modem. It shouldn't matter if it's USB or otherwise, as long as you can access it in Linux (via serial) then you should be fine, but USB is preffered. If you want to use Caller ID, then you need to have a modem that supports it, and you must have Caller ID turned on by your phone company. There may be a fee for getting it turned on (with Telstra in Australia, it's about $6 a month) and usually is disabled by default.

Notes
=====

This driver was developed on a Raspberry Pi, so Mac / BBB / BBW users, your mileage may vary. Please leave feedback and questions on the forum topic (http://forums.ninjablocks.com/index.php?p=/discussion/2796/beta-driver-ninja-phone-do-stuff-when-your-telephone-rings). Forks and pull requests welcomed

If you create a rule with the "Home Phone" element, your rule will fire each time the phone makes an audible ring (e.g. if it takes you 3 rings to pick up, the rule will run 3 times). The modem doesn't distinguish between 1 person waiting 8 rings and 8 people waiting 1 ring. If you're using the Equality rule (i.e. the Caller ID option) then your rule will only fire once, as Caller ID is only displayed once. You may be able to create an Equality rule that checks for a number greater than 0 (i.e. all numbers) and act accordingly, but this is untested. 

TODO
====

* ~~Implement Caller ID so you can create rules based on who is calling~~
* Get rid of the "Hello World" configuration settings and add options to pick the device file (e.g. /dev/ttyACM0) to use, and the 
* Detect when the phone has been answered and when the call has been ended?
* Give the rule element drop down boxes to allow Caller ID detection without using the Equality rule element.
* ~~Add more comments to the code to help other Ninja driver beginners like me work out what does what.~~
