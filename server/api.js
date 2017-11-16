var express = require('express')
var axios = require('axios')

// ROUTES FOR OUR API
// ===============================================================

var router = express.Router() // get an instance of the express Router

router.post('/recipe', (req,res) => {
  const recipe = req.body
  console.log('Received recipe request')
  axios.post('http://10.10.1.11/recipe', recipe).catch(err => {
    console.log('Whoops, that didnt work (recipe)')
    console.log(err);
  })
  res.sendStatus(200)
})

router.post('/settings', (req,res) => {
  const settings = req.body
  axios.post('http://10.10.1.11/settings', settings).catch(err => {
    console.log('Whoops, that didnt work (settings)')
    console.log(err);
  })
  res.sendStatus(200)
})

module.exports = router
