const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

const Course = mongoose.model('Course');

/**
 * Get All Courses - GET /api/courses
 */
router.get('/', async function (req, res, next) {
    const courses = await Course.find({});
    return res.json({ courses });
});
//   if (req.payload) {
//     User.findById(req.payload.id)
//       .populate({
//         path: "reminders",
//         match: {
//           archive: false,
//         },
//         options: { sort: { state: 1 } },
//       })
//       .exec(function (err, item) {
//         if (err) {
//           return next(err);
//         }
//         if (item.reminders.length === 0) {
//           return res.json({ reminders: null });
//         }
//         const remindersWithTypes = remindersService.getRemindersWithType(
//           item.reminders,
//           { currentDate: new Date() }
//         );
//         return res.json({ reminders: remindersWithTypes });
//       });
//   } else {
//     return res.sendStatus(401);
//   }
// });

module.exports = router;
