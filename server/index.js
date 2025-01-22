const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/run-python", (req, res) => {
  const pythonProcess = spawn("python", ["main2.py"]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Output : ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error : ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
    res.send(`Script executed with code ${code}`);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
