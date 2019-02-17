
import {Router} from 'express';

const generalRouter = Router();
generalRouter.get('/', (req, res, next) => {
    res.send('hello from ts-structure-server.ß');
});
generalRouter.all('/test', (req, res, next) => {
    res.send();
}); 

export { generalRouter };