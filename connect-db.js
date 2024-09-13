const mongoose = require("mongoose");
const DB_CLIENT_URL = process.env.MONGO_CIENT_URL;
const PORT = process.env.PORT;

const ConnectDBAndStartServer = async (app) => {
  try {
    await mongoose.connect(DB_CLIENT_URL);
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = ConnectDBAndStartServer;
