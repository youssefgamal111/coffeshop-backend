
import express from 'express';
import productsRoutes from './controllers/product';
import userroutes from './controllers/user';
import orderroute from './controllers/order';

const app: express.Application = express();
const address: string = "0.0.0.0:3000";
userroutes(app);
productsRoutes(app);
orderroute(app);

app.get('/', function (req:express.Request, res:express.Response) {
    res.send(`Hello World!`);
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
export default app;