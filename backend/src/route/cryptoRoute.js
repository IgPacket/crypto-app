const Router = require('koa-router');
const cryptoController = require('../controller/cryptoController');

const router = new Router();

router.post('/add-private-key', cryptoController.addPrivateKey);

router.post('/add-seed-phrase', cryptoController.addSeedPhrase);

router.get('/balance/:currency/:address', cryptoController.getBalance);

router.get('/addresses/:currency', cryptoController.getAddressesByCurrency);

router.get('/addresses', cryptoController.getAllAddresses);

router.delete('/addresses/:address', cryptoController.deleteAddress);

module.exports = router;