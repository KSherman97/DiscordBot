/**
 * Discord Bot
 * created by Ksherm337
 * project started on 09/25/2021
 */

/**
 * ======================================
 * START bot definitions & functions
 * ======================================
 */

// string array of the lyrics
// we will leave this empty for now
// we will fill it by parsing a text file with \n delimiter
var lyricLinesArray = [];

// file processing stuff
// file reading documentation:
//  https://nodejs.org/en/knowledge/file-system/how-to-read-files-in-nodejs/
const fs = require('fs');
const readline = require('readline');

// define the file we want to read here
// uses relative file path
const lyricsFile = "lyrics.txt";

// function structure
// this creates a filestream with read capabilities
function processLineByLine() {
    var array = fs.readFileSync(lyricsFile).toString().split('\n');

    for (i in array) {
        lyricLinesArray[i] = array[i];
    }
}

// use for testing
function printLyrics() {

    console.log(lyricsLinesCount);

    var i = 0;
    while (i < lyricsLinesCount){
        console.log("line " + i + " " + lyricLinesArray[i]);
        i++;
    }
}

// gets random number from zero to max-1
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function returnLyric() {
    var lyric = "";
    var index = getRandomNumber(lyricsLinesCount);

    lyric = lyricLinesArray[index];

    return lyric;
}

// read the file here
processLineByLine();

// get the number of items in the lyrics array
var lyricsLinesCount = lyricLinesArray.length;

// use for testing
// printLyrics();

/**
 * ======================================
 * START DISCORD CONNECTION CONFIGURATION
 * ======================================
 */

// require discord.js classes
const { Client, Intents } = require('discord.js');
const {token} = require('./auth.json');

// create a new instance of the client class
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

// when the client is ready, run this code once
client.once('ready', () => {
    console.log('ready');
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const { commandName } = interaction;

    if(commandName == 'lyric') {
        await interaction.reply(returnLyric());
    }
});

// log into discord with the client's token
// comment out for testing purposes
client.login(token);