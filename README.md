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
