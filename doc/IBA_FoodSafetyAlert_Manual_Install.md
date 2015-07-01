#install NODE modules
sudo apt-get install nodejs
sudo apt-get install npm

#install NODE test mdoules
sudo npm install -g mocha

#get source from github
Clone the repository ( https://github.com/ibagit/ADS1/)

#move to DEV folder
Move into the root folder ('cd ADS1')

#install node modules
npm install (Installs dependencies for the server - You will probably need to do this in sudo)

#install client dependencies modules
bower install (Installs dependencies for the client's browser - Don't do this in sudo, unless it doesn't work otherwise)

#Start service
npm start (Starts the server, to change the hosted port, look at the bottom of this file )

#Start test
npm test ( test the service site)

#Testing with Selenium:
Selenium IDE 2.8.0<br/>
(1) Go to Options<br/> 
(2) Select General tab<br/>
(3) Select Remember Base URL<br/>
(4) Select Record absolute URL<br/>
(5) Select Enable Experimental Features<br/>
(6) Select Disable format Change Warning messages<br/>
(7) Select Formats tab <br/>
(8) Select "ADD"<br/>
(9) Add the "Ruby IDE Source Code" ruby_ide_src.txt located in selenium_test_scripts/ruby/<br/>
(10)Name of the format:  Ruby
(11)Click OK <br/>
(12)Go to Options<br/> 
(13)Select Format and select Ruby<br/>
(14)Add FoodRecallSafety.rb located in selenium_test_scripts/ 

