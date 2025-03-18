import 'dotenv/config'
import express from 'express'
const app = express();
import connect from './database/conn.js';
const port = process.env.PORT || 8080;

(async () => {
	await connect().catch((err) => {
		console.log("Invalid database connection...!", err.message);
	});
})();

const router=express.Router();
router.post()
app.listen(port, () => {
    console.log("listening...")
})