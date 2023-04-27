const { Router } = require('express');
const router = Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swaggerDocs/swaggerApi.json');

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDocument));

module.exports = router;
