import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT;
const DB = process.env.DATABASE;

// mongoose connection
mongoose.Promise = global.Promise; //wait for result
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection is successful");
}).catch((e) => {
    console.log("No Connection");
})

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.get('/', (req, res) => {
    res.send(`Node and express server running on port ${PORT}`)
});

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
});