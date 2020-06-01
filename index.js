const fetch = require('node-fetch');
const Discord = require('discord.js');

const client = new Discord.Client();

const myToken = 'NzE0NjYxMTA4Nzk1MDQ3OTk3.XtU0Wg.sDhkhtf7EFqnpwnvTkAD-kys-jE';

client.login(myToken);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content.startsWith('_loop')) {
    const args = msg.content.split(' ');
    if (args.length > 2) {
      return;
    }
    if (args.length < 2) {
      return;
    }

    if (args[1] === 'on') {
      console.log('starting spam');
      msg.channel.send(`> Initialized @ ${new Date().toLocaleString()}`);
      myLoop(true);
    }
    if (args[1] === 'off') {
      msg.channel.send(`> Stopping...`);
      myLoop(false);
    }
  }

  async function myLoop(isLooping) {
    const intervals = Math.floor(Math.random() * 5000) + 1000;
    const qResponse = await fetch('https://api.kanye.rest/');
    const qResult = await qResponse.json();
    const qQuote = qResult.quote;

    if (!isLooping) {
      clearTimeout(startLoop);
      msg.channel.send(`> Stopped @ ${new Date().toLocaleString()}`);
      console.log('stopped!');
    } else {
      startLoop = setTimeout(function () {
        msg.channel.send(`${qQuote} -- ${intervals}ms`);

        if (isLooping) {
          myLoop(true);
        } else {
          myLoop(false);
        }
      }, intervals);
    }
  }
});
