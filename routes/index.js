var express = require('express');
var { body, validationResult } = require('express-validator');
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(messages);
  res.render('index', { title: 'Mini Message Board', messages: messages });
});

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'New Message' })
})

router.post('/new', [
  body('text', 'Text cannot be empty.').trim().isLength({ min: 1 }).escape(),
  body('user', 'Name cannot be empty.').trim().isLength({ min: 1 }).escape(),
  function(req, res, next) {
    const errors = validationResult(req);
    const message = {
      text: req.body.text,
      user: req.body.user,
      added: new Date()
    }
    console.log(errors);
    if (!errors.isEmpty()) {
      res.render('new', {
        title: 'New Message',
        message: message,
        errors: errors.array(),
      })
    }
    messages.push(message);
    res.redirect('/');
  }
])

module.exports = router;
