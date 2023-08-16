const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const PORT = 8005;

const homePage = path.join(__dirname, "./public/pages/index.html");
 app.get("/forecasts", (req, res) => {
    res.sendFile(homePage,href="style.css");
  });
app.use(bodyParser.json());


const getForecastRouter = require('./routes/get-forecast');
app.use('/api/forecast', getForecastRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});