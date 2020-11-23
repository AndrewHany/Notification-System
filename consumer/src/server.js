require("dotenv").config({ path: `./config/.${process.env.NODE_ENV}.env` });

const consumer = require("./consumer");

consumer.consume();
