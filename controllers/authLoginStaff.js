const bcrypt = require('bcrypt');
const Staff = require('../models/staff');

module.exports = async (req, res) => {
  const { username, password } = req.body || {};

  // 1) Basic input guard
  if (!username || !password) {
    return res.render('loginStaff', { errors: 'Please enter username and password.' });
  }

  try {
    const staffData = await Staff.findOne({ username });

    if (staffData) {
      console.log('staff found');

      const same = await bcrypt.compare(password, staffData.password);

      if (same) {
        console.log('staff password matched');

        req.session.userId = staffData._id;
        req.session.username = staffData.username;
        req.session.adminIdentity = staffData.adminIdentity;
        req.session.myDashboard1 = staffData.myDashboard[0];
        req.session.myDashboard2 = staffData.myDashboard[1];
        req.session.myDashboard3 = staffData.myDashboard[2];
        req.session.hrefLink1 = staffData.hrefLink[0];
        req.session.hrefLink2 = staffData.hrefLink[1];

        return res.redirect('/stdList');
      } else {
        return res.render('loginStaff', {
          errors: 'Username or password incorrect!'
        });
      }
    } else {
      return res.render('loginStaff', {
        errors: 'Username or password incorrect!'
      });
    }
  } catch (err) {
    console.error(err);
    return res.render('loginStaff', {
      errors: 'Something went wrong. Please try again!'
    });
  }
};

