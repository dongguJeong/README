const express = require("express");
const app = express();
app.use(express.json());
app.listen(3000, function () {
  console.log("3000");
});

const userRouter = require("./routes/users");
const channelRouter = require("./routes/channels");
app.use("/", userRouter);
app.use("/channels", channelRouter);
