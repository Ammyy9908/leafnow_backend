const express = require("express");
const cors = require("cors");
const app = express();
const connect_db = require("./utils/connect_db");
const auth_route = require("./routes/auth_routes");
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// database connection

app.get("/", (req, res) => {
  res.send("API Working");
});
app.use("/api/auth", auth_route);

app.listen(PORT, async () => {
  try {
    const connected = await connect_db();
    if (connected) {
      console.log("connected to db");
    }
  } catch (e) {
    console.log(e);
  }
  console.log(`Server is running on port ${PORT}`);
});
