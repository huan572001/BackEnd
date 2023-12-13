const express = require("express");
const requestIp = require("request-ip");
const app = express();
const port = 3001;

app.use(requestIp.mw());
app.get("/api/ip", (req, res) => {
  res.json({ ip: req.ip });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
