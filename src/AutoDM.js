const T = require("./Twit.js");
const my_user_name = require("../config").userName;
const timeout = 1000 * 60 * 5;

const AutoDM = () => {
  const stream = T.stream("user");
  console.log("start sending auto DM");
  stream.on("follow", SendMessage);
};

const SendMessage = user => {
  console.log("new follower");
  const { screen_name, name } = user.source;

  const obj = {
    screen_name,
    text: GenerateMessage(name)
  };

  if (screen_name !== my_user_name) {
    setTimeout(() => {
      T.post("direct_messages/new", obj)
        .catch(err => {
          console.error("error", err.stack);
        })
        .then(result => {
          console.log(`message successfully sent to ${screen_name}`);
        });
    }, timeout);
  }
}

const GenerateMessage = name => {
  return `Hi ${name} thanks for getting in touch!`; // your message
};

module.exports = AutoDM;