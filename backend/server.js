import dotenv from "dotenv";
import createApp from "./utils/createApp.js";
import connectDB from "./utils/connectDB.js";
import routes from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = createApp();

connectDB(MONGO_URI);

app.use(routes);

app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT: ${PORT}`);
});
