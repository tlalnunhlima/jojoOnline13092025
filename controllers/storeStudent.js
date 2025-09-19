// controllers/studentSave.js
const Student = require('../models/Student');
const { Types } = require('mongoose');

// Only accept these fields from the form
function pickStudentFields(body) {
  return {
    admissionYear : body.admissionYear,
    regn          : body.regn,
    username      : body.username,
    fname         : body.fname,
    mName         : body.mName,
    address       : body.address,
    phone         : body.phone,
    dob           : body.dob,
    emailId       : body.emailId,
    aadharNo      : body.aadharNo,
    batchSession  : body.batchSession,
    gender        : body.gender,
  };
}

module.exports = async (req, res) => {
  const id = (req.body._id || '').trim();

  if (id) {
    return updateRecord(req, res, id);
  }
  return insertRecord(req, res);
};

async function insertRecord(req, res) {
  try {
    const data = pickStudentFields(req.body);

    const newStudent = new Student({
      ...data,
      studentIdentity: 'computerStudent',
      staffid: req.session.userId,
      myDashboard: ['My Dashboard', 'My Scoreboard', 'Logout'],
      hrefLink: ['/all/stdDashboard', '/all/stdScoreboard'],
      studentFee: [],
      studentExamFee: [],
      assignmentTheory: [],
      totalCourseFee: 9000,
      feeDiscount: 2000,
      feeAfterDiscount: 7000
    });

    await newStudent.save();
    req.flash('success', 'Student created successfully.');
    return res.redirect('/stdList');

  } catch (error) {
    const validationErrors = error?.errors
      ? Object.keys(error.errors).map(k => error.errors[k].message)
      : [];

    if (error?.code === 11000) {
      // Duplicate key (likely regn)
      req.flash('error', 'Registration Number hi a awm tawh!');
      if (validationErrors.length) req.flash('validationErrors', validationErrors);
      return res.render('register', {
        viewTitle: 'Register Student',
        errors: 'Registration Number hi a awm tawh!',
        students: req.body
      });
    }

    console.error('Insert student error:', error);
    if (validationErrors.length) req.flash('validationErrors', validationErrors);

    return res.render('register', {
      viewTitle: 'Register Student',
      errors: validationErrors.length ? validationErrors : ['Could not save student. Please try again.'],
      students: req.body
    });
  }
}

async function updateRecord(req, res, id) {
  try {
    if (!Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid student ID.');
      return res.redirect('/stdList');
    }

    const updateData = pickStudentFields(req.body);
    // If you never want studentIdentity changed on update, keep it out of updateData.

    const updated = await Student.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      req.flash('warning', 'Student not found.');
      return res.redirect('/stdList');
    }

    req.flash('success', 'Student details updated successfully.');
    return res.redirect('/stdList');

  } catch (error) {
    const validationErrors = error?.errors
      ? Object.keys(error.errors).map(k => error.errors[k].message)
      : [];

    if (error?.code === 11000) {
      req.flash('error', 'Registration Number hi a awm tawh!');
      if (validationErrors.length) req.flash('validationErrors', validationErrors);
      // Send user back to edit page with their inputs
      return res.render('register', {
        viewTitle: 'Update student detail:',
        errors: 'Registration Number hi a awm tawh!',
        students: req.body
      });
    }

    console.error('Update student error:', error);
    if (validationErrors.length) req.flash('validationErrors', validationErrors);

    return res.render('register', {
      viewTitle: 'Update student detail:',
      errors: validationErrors.length ? validationErrors : ['Could not update student. Please try again.'],
      students: req.body
    });
  }
}
