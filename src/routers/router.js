const express = require('express')
var cron = require('node-cron');
const { userData, get_price, get_user_ballance } = require('../controller/root.controller')
const router = express.Router()

router.all('/', (req, res) => {
  return res.send({ status: true, data: '' })
})

router.get('/user/txn/by_address', userData)
router.get('/user/ballance', get_user_ballance)


// this is for conjob purpose - run every 10 min
cron.schedule('*/10 * * * *', () => {
  get_price('ethereum')
});


module.exports = router