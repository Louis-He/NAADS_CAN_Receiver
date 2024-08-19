# NAADS_CAN_Receiver

This is a simple CAN receiver for the NAADS project. The weather alerts and emergency alerts have a public-facing communication protocol.
This project intends to unlock the potential to receive the messages on any devices that can connect to the internet.

This project is written in C++ and uses the TCP/IP protocol to check messages sent from NAAD System.
The implementation is based on [NAAD System - LMD User Guide - Release 10.0](https://alerts.pelmorex.com/wp-content/uploads/2021/06/NAADS-LMD-User-Guide-R10.0.pdf)
. The receiver listens for incoming messages, parse them and prints them to the console.

## Getting Started

Use the CMakeLists.txt file to build the project. The project uses the pugixml library to parse the incoming messages. The library is included in the project.

## Disclaimer

This project is not fully tested against all types of messages that can be sent by the NAAD System.
The project is a simple implementation to demonstrate how to receive and parse messages from the NAAD System.

## Example Output

```
Sender: NAADS-Heartbeat
Sent: 2024-08-19T02:43:52-00:00
Status: System
Headline: 
Description: 
Urgency: 
Severity: 
Certainty: 
Broadcast Immediately: No
Wireless Immediately: No
Area Description: 
End of alert
============

Sender: cap-pac@canada.ca
Sent: 2024-08-19T02:44:28-00:00
Status: Actual
Headline: severe thunderstorm warning in effect
Description: 
At 8:44 p.m. MDT, Environment Canada meteorologists are tracking a severe thunderstorm capable of producing strong wind gusts, nickel to ping pong ball size hail and heavy rain.

###

Large hail can damage property and cause injury. Strong wind gusts can toss loose objects, damage weak buildings, break branches off trees and overturn large vehicles. Remember, severe thunderstorms can produce tornadoes.

Severe thunderstorm warnings are issued when imminent or occurring thunderstorms are likely to produce or are producing one or more of the following: large hail, damaging winds, torrential rainfall.

Urgency: Immediate
Severity: Moderate
Certainty: Likely
Broadcast Immediately: No
Wireless Immediately: No
Area Description: 
  Clearwater Co. near Rocky Mtn House and Crimson Lake
  Lacombe Co. near Eckville
  Ponoka Co. near Rimbey Bluffton and Hoadley
End of alert
============
```