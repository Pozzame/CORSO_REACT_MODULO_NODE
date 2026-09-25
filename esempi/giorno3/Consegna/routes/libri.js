const express = require('express');
const router = express.Router();
const libriController = require('../controllers/libriController');
const verificaRuolo = require('../middleware/verificaRuolo')

router.get('/', libriController.getAll);
router.get('/:id', libriController.getById);
router.post('/', libriController.create);
router.put('/:id', libriController.update);
router.delete('/:id', verificaRuolo('admin', "ceo"), libriController.remove);

module.exports = router;