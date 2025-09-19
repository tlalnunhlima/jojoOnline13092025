const Student = require('../models/Student');

module.exports = async (req, res) => {
  try {
    const { phone, dob } = req.body;

    // Use findOne for a single student
    const student = await Student.findOne({ phone, dob });

    if (!student) {
      return res.render('studentLogin', {
        errors: 'Phone number or date of birth is incorrect!',
        students: req.body
      });
    }

    console.log('✅ Student found:', student.username);

    // Save to session
    req.session.userId = student._id;
    req.session.username = student.username;
    req.session.studentIdentity = student.studentIdentity;

    req.session.myDashboard1 = student.myDashboard?.[0];
    req.session.myDashboard2 = student.myDashboard?.[1];
    req.session.myDashboard3 = student.myDashboard?.[2];

    req.session.hrefLink1 = student.hrefLink?.[0];
    req.session.hrefLink2 = student.hrefLink?.[1];

    req.session.assignmentArray = student.assignmentTheory;
    req.session.studentFee = student.studentFee;
    req.session.studentExamFee = student.studentExamFee;
    req.session.studentOtherFee = student.studentOtherFee;

    return res.redirect('/all/stdDashboard');
  } catch (err) {
    console.error('❌ Error in student login:', err);
    return res.render('studentLogin', {
      errors: 'Something went wrong. Please try again.',
      students: req.body
    });
  }
};
