import express from "express";
import Discord from "discord.js"; //import discord.js
import * as dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

const PORT = process.env.PORT || 80;
const app = express();
app.use(express.json());
app.use(cors());

const discord = () => {
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.login(process.env.BOT_TOKEN);
};
discord();

app.get("/", (req, res) => {
  var __dirname = path.resolve();
  console.log(__dirname)
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const { email, name, message, channelId } = req.body;

  if (!(email && name && message && channelId)) {
    res.status(400).json({
      sucess: false,
      msg: "name, email, message and channelId is require!",
    });
  }

  const channel = await client.channels.fetch(channelId);

  // if empty string is passed to email & name, only send the message. else send the default text
  if (!email && !name){
    channel.send(
      `🎉🎉🎉🎉🎉\n${message}`
    );
  } else { 
    channel.send(
      `📨📨📨📨📨📨📨 \n**${name}** sent a new message through your contact form. \nemail: **${email}** \nmessage: ${message}`
    );
  }
  
  res.json({
    sucess: true,
    msg: "message sent to discord!!",
  });
});

app.listen(PORT, () => {
  console.log(`the app is running on port ${PORT}`);
});
