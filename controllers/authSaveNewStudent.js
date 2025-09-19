const Student = require('../models/Student');

// student save-to-database gate (prevent duplicates)
module.exports = async (req, res, next) => {
  try {
    // If we're updating an existing doc, skip duplicate check
    if (req.body?._id) return next();

    // Extract & normalize inputs
    const username = req.body?.username?.trim();
    const fname    = req.body?.fname?.trim();
    const dob      = req.body?.dob; // keep as-is if Date or ISO string

    // Basic guard
    if (!username || !fname || !dob) {
      return res.status(400).render('register', {
        viewTitle: 'Register Student',
        errors: 'Please fill in username, father name, and date of birth.',
        students: req.body
      });
    }

    // Single query that matches the same document
    const existing = await Student.findOne({ username, fname, dob });

    if (existing) {
      console.log('Duplicate student: username+fname+dob already exist');
      return res.render('register', {
        viewTitle: 'Register Student',
        errors: 'Name, Father Name, and DOB already exist!',
        students: req.body
      });
    }

    // No duplicate found — proceed to actual save handler
    return next();
  } catch (err) {
    console.error('Error during duplicate check:', err);
    return res.status(500).render('register', {
      viewTitle: 'Register Student',
      errors: 'Something went wrong. Please try again.',
      students: req.body
    });
  }
};
