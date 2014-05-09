ninja-phone
===========

A Ninja Blocks driver that notifies you when your home phone is ringing .Requires a USB modem

Status
======

This driver is non-functioning. The latest version has most of the code in there ready to go, but a few blocking bugs are stopping it from working with the Ninja Blocks.

Installation
============

To install, cd into your drivers directory and run:

`git clone https://github.com/Grayda/ninja-phone && cd ninja-phone && npm install`

This will clone the repository, CD into the directory and install. 

Notes
=====

This driver is still a work in progress and may or may not work. It was developed on a Raspberry Pi and requires a USB 56k modem plugged in to your Ninja Block, so your mileage may vary

TODO
====

* Create a test.js
* Implement Caller ID so you can create rules based on who is calling
