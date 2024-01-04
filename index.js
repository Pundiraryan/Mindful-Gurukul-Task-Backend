const express = require("express");
const connectToMongo = require("./db");
const cors=require('cors')
const dotenv=require('dotenv');
const app = express();
dotenv.config();
// Connect to MongoDB
connectToMongo()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App listening on port http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error starting the app:', error);
  });
  app.get("/",(req,res)=>{
    res.send("home page is this");
  })
  app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});


//Available Routes

app.use("/api/cruds", require('./routes/crudRoutes'));
app.use('/api/auth' , require('./routes/auth'))