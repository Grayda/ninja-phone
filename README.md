ninja-phone
===========

A Ninja Blocks driver that notifies you when your home phone is ringing. Requires a USB 56k modem

Installation
============

To install, SSH into your block, cd into your Ninja Block drivers directory (on Raspbian, this is /opt/ninjablocks/block-client/drivers/) and run:

`git clone https://github.com/Grayda/ninja-phone && cd ninja-phone && npm install`

This will clone the repository, CD into the directory and install. It may take a while, as it needs to download and compile the serialport library, so please be patient.

Notes
=====

This driver was developed on a Raspberry Pi, so BBB / BBW users, your mileage may vary. Please leave feedback and questions on the forum topic (http://forums.ninjablocks.com/index.php?p=/discussion/2796/beta-driver-ninja-phone-do-stuff-when-your-telephone-rings). Forks and pull requests welcomed

Bugs
====

When someone rings, the driver will emit data multiple times, meaning if 1 person calls, your rules might run 8-10 times. This is due to the modem receiving a "RING" every time the phone audibly rings. As there is no start / stop sent (e.g. START RING" / "STOP RING"), it's tricky to work out what is 1 person calling and waiting 8-10 rings and what is 8 people calling and waiting 1 ring

TODO
====

* Implement Caller ID so you can create rules based on who is calling
* Get rid of the "Hello World" configuration settings and maybe add a Caller ID option?
* Stop the driver from firing every time the phone rings (and only fire once when a person is calling)
* Add more comments to the code to help other Ninja driver beginners like me work out what does what.
