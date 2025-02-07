const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postsRouter = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/posts", postsRouter);

// Connect to MongoDB
mongoose.connect("mongodb+srv://sankari_crud:jayasankarir@cluster0.rnsvf.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
