const Koa = require('koa');
const { koaBody } = require('koa-body');
const cryptoRoutes = require('./route/cryptoRoute');
const config = require('./util/config');
const cors = require('@koa/cors');

const app = new Koa();

app.use(koaBody());

app.use(cors({
    origin: 'http://localhost:3000', // Разрешить запросы с этого адреса
}));

app.use(cryptoRoutes.routes()).use(cryptoRoutes.allowedMethods());

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});
