---
layout: post
comments:	true
title:  "Config: Run shell script on login"
date:   2018-02-20 00:00:00
summary:    "Sometimes, I got frustrated with the fact that my SSH keys were cleared from agents after rebooting. As a result, I had to manually add those keys to agents every time my computer restarted (although it's not occasional)... It's best to automate such tasks - I thought. So, I asked \"how to run a shell script on login?\". And here are some solutions"
tags:   config command-line
categories:	[Tech]
---

Sometimes, I got frustrated with the fact that my SSH keys were cleared from agents after rebooting. As a result, I had to manually add those keys to agents every time my computer restarted (although it's not occasional)... It's best to automate such tasks - I thought. So, I asked *"how to run a shell script on login?"*. And here are some solutions.

### Option 1: Automator

- Open ***Automator***. Choose ***Application*** from the templates.
- Choose ***Run Shell Script*** from the action list.
- Paste your code there (see the figure below). For convenience, I launch another script which I could easily open and edit.
![png](/assets/misc/shell_script_on_login_1.png){:width="600"}
- ***Save*** the application.
- Open ***System Preferences*** -> ***Users & Groups*** -> ***Login Items***. Then, add the application you have just created.

### Option 2: Daemons

- Create a plist file in `~/Library/LaunchAgents` (ex. `com.thuyen.loginscript.plist`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
		<key>Label</key>
		<string>com.thuyen.loginscript</string>
		<key>ProgramArguments</key>
		<array><string>/Users/thuyentrinh/scripts/on_login.sh</string></array>
		<key>RunAtLoad</key>
		<true/>
	</dict>
</plist>
```
🔖 *<u>Note</u>*: For some reasons, the plist does not work with the executable path like `~/scripts/on_login.sh` (`~` for HOME directory). Explicit path `/Users/thuyentrinh/scripts/on_login.sh` solves the problems... My MacOS is 10.13; maybe that matters 🙄. I did not test it in earlier MacOS versions.

- Load the daemon: 

```
launchctl load ~/Library/LaunchAgents/com.thuyen.loginscript.plist
```

- You could verify if the daemon is loaded by listing out services

```
launchctl list | grep loginscript
```

### Reference

[1] [Launch shell script silently at login](http://developernotes.com/archive/2011/04/06/169.aspx)<br>
[2] [Daemons and Services Programming Guide](https://developer.apple.com/library/content/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html#//apple_ref/doc/uid/10000172i-SW7-BCIEDDBJ)<br>
[3] [Stackoverflow thread: Running script upon login mac](https://stackoverflow.com/questions/6442364/running-script-upon-login-mac)
