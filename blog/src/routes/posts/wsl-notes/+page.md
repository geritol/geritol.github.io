---
title: WSL notes
date: "2021-10-23 10:23:02"
description: Basic notes around some edge cases I encounter sometimes with Windows Subsystem for Linux
---

I switched from a MacBook Pro to a Windows based development setup around a year ago. I was really happy with my MacBook but the newer ones that I had used during my work did not convince me too much. I switched because I started bumping into performance limitations during my workflow (mostly using the node ecosystem) while using my older hardware. At the time I was thinking that Windows machines could not suite my development workflow well mostly because of software limitations, but the vast palette of hardware offerings where enticing.

While discussing the topic with a coworker, he told me about WSL (Windows Subsystem for Linux) and its capabilities. After some research I choose to buy a windows laptop and use it for development with WSL.

WSL has some limitations and sometimes weird behaviour, but overall I am happy with the decision (the new MacBook line looks really convincing though). The following are some notes for myself about how to handle some edge cases one can encounter while using WSL.

# Docker cannot start container on any port

This is a pretty annoying issue, I have tried to restart both Docker and WSL but these did not solve it:

```bash
# Powershell Admin
## Restart WSL
Restart-Service LxssManager

## Restart Docker
Restart-Service *docker*
```

The catch for me was to restart Windows Container Networking -- Host Network Service (HNS):

```bash
# Powershell Admin
net stop hns
net start hns
```

# Launching GUI apps from within WSL

To be able to run GUIs within Windows Subsystem for Linux I have followed [this](https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress) guide by Nicky Muelmann, but could not get things working.

The following worked for me (after having everything in place suggested by the above tutorial)

```bash
# WSL 2 Terminal
sudo apt-get -y install xnest
Xnest :0 #leave the process running, start your command that wants to start a GUI separately
```
