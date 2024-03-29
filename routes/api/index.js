const express = require('express');
const router = express.Router();

router.use('/courses', require('./courses'));
router.use('/players', require('./players'));
router.use('/tournaments', require('./tournaments'));
router.use('/registration', require('./registration'));

/**
 *
 * Error handler - otherwise server will return all errors as 500 internal server errors
 *
 */
router.use(function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {}),
    });
  }

  return next(err);
});

module.exports = router;
