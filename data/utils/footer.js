const Discord = require('discord.js');
const fs = require('fs');

const footersFile = './footers.txt'

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}  

module.exports = {
    get: function () {
        let footers = fs.readFileSync(footersFile, 'utf8')
        let footersList = footers.split('\n');

        return footersList[getRandomInt(footersList.length)]
    }
}