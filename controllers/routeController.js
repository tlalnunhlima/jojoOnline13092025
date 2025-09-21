const Student = require('../models/Student')

const staff = require('../models/staff')

const express = require('express')

const moment = require('moment')

const router = express.Router();

const expressSession = require('express-session');

const flash = require('connect-flash');

const mongoose = require('mongoose');


//global variable
global.loggedIn = null;

router.use('*', (req, res, next) => {
    
   loggedIn = req.session.userId;
    
    next()
});



//flash errors message
router.use(flash());


router.use(expressSession({
    
    resave: false,
    
    saveUninitialized: true,
    
    secret: 'keyboard cat'
}));

const app = express();

app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1h
}));

app.use(flash());

// Make flash messages available in all EJS views
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error   = req.flash('error');
  res.locals.info    = req.flash('info');
  res.locals.warning = req.flash('warning');
  next();
});




//ask authorisation to login
router.post('/auth/login', require('../controllers/authLoginStudent'))


//save new student to database
router.post('/users/register', require('../controllers/storeStudent'))

//update student fee payment
router.post('/users/feeRegister', require('../controllers/storeStudentFee'))

//update student exam fee 
router.post('/users/examFeeRegister', require('../controllers/storeStudentExamFee'))


//update student any other fee 
router.post('/users/otherFeeRegister', require('../controllers/storeStudentOtherFee'))


//save new student to database
router.post('/staff/register', require('../controllers/storeStaff'))

//auth login staff
router.post('/authUser/loginStaff', require('../controllers/authLoginStaff'))

//computer student assignment
router.post('/computerStudents/theoryAssignment', require('../controllers/storeStudentAssignment'));
router.post('/computerStudents/theoryAssignment102', require('../controllers/storeStudentAssignment102'));
router.post('/computerStudents/theoryAssignment103', require('../controllers/storeStudentAssignment103'));
router.post('/computerStudents/theoryAssignment104', require('../controllers/storeStudentAssignment104'));
router.post('/computerStudents/theoryAssignment105', require('../controllers/storeStudentAssignment105'));
router.post('/computerStudents/theoryAssignment106', require('../controllers/storeStudentAssignment106'));





//home page
router.get('/', (req, res) => {
    
            res.render('home', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            href3: req.session.hrefLink3
            
        });
        
});

//faq page
router.get('/faq', (req, res) => {
    
            res.render('faq', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            href3: req.session.hrefLink3
            
        });
        
        
});

//message page
router.get('/message', (req, res) => {
    
            res.render('message', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            href3: req.session.hrefLink3
            
        });
        
        
});

//contact us page
router.get('/contactus', (req, res) => {
    
            res.render('contactus', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            href3: req.session.hrefLink3
            
        });
        
        
});

//privacy policy page
router.get('/privacy', (req, res) => {
    
            res.render('privacy', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            href3: req.session.hrefLink3
            
        });
        
});


//term of use page
router.get('/terms', (req, res) => {
    
            res.render('terms', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            href3: req.session.hrefLink3
            
        });
        
});

//photo gallery page
router.get('/photoGallery', (req, res) => {
    
            res.render('photoGallery', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            href3: req.session.hrefLink3
            
        });
        
});


//paid and unpaid account page
router.get('/paid_unpaid_account', (req, res) => {
    
            res.render('paid_unpaid_account', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            href3: req.session.hrefLink3
            
        });
        
});



//student list for admin only view

router.get('/stdList', async (req, res) => {
    
   if(req.session.adminIdentity) {
    
          return res.render('stdList', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            
            
        })
        
        }
    
   return res.redirect('/');
});


//december 2025 student list for admin only view

router.get('/december2025Batch', async (req, res) => {
    
    const students = await Student.find({},{_id:1, regn:1, username:1,  fname: 1, batchSession: 1, admissionYear: 1,  address: 1, phone:1} ).sort({regn : -1}).populate('staffid');
    
   if(req.session.adminIdentity) {
    
          return res.render('december2025Batch', {
            
            viewTitle: 'December 2025 student list',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            students
        })
        
        }
    
   return res.redirect('/');
});

//june 2025 student list for admin only view

router.get('/june2025Batch', async (req, res) => {
    
    const students = await Student.find({},{_id:1, regn:1, username:1,  fname: 1, batchSession: 1, admissionYear: 1, address: 1, phone:1} ).sort({regn : -1}).populate('staffid');
    
   if(req.session.adminIdentity) {
    
          return res.render('june2025Batch', {
            
            viewTitle: 'June 2025 student list',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            students
        })
        
        }
    
   return res.redirect('/');
});

//december 2022 student list for admin only view

router.get('/december2022Batch', async (req, res) => {
    
    const students = await Student.find({},{_id:1, regn:1, username:1,  fname: 1, batchSession: 1, admissionYear: 1,  address: 1, phone:1} ).sort({regn : -1}).populate('staffid');
    
   if(req.session.adminIdentity) {
    
          return res.render('december2022Batch', {
            
            viewTitle: 'December 2022 student list',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            students
        })
        
        }
    
   return res.redirect('/');
});

//staff and outside student list for admin only view

router.get('/staffOutsideBatch', async (req, res) => {
    
    const students = await Student.find({},{_id:1, regn:1, username:1,  fname: 1, batchSession: 1, admissionYear: 1,  address: 1, phone:1} ).sort({regn : -1}).populate('staffid');
    
   if(req.session.adminIdentity) {
    
          return res.render('staffOutsideBatch', {
            
            viewTitle: 'Jojo Staff and outside student list',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            students
        })
        
        }
    
   return res.redirect('/');
});




//june 2023 student list for admin only view

router.get('/june2023Batch', async (req, res) => {
    
    const students = await Student.find({},{_id:1, regn:1, username:1,  fname: 1, batchSession: 1, admissionYear: 1,  address: 1, phone:1} ).sort({regn : -1}).populate('staffid');
    
   if(req.session.adminIdentity) {
    
          return res.render('june2023Batch', {
            
            viewTitle: 'June 2023 student list',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            students
        })
        
        }
    
   return res.redirect('/');
});


//december 2023 student list for admin only view

router.get('/december2023Batch', async (req, res) => {
    
    const students = await Student.find({},{_id:1, regn:1, username:1,  fname: 1, batchSession: 1, admissionYear: 1,  address: 1, phone:1} ).sort({regn : -1}).populate('staffid');
    
   if(req.session.adminIdentity) {
    
          return res.render('december2023Batch', {
            
            viewTitle: 'December 2023 student list',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            students
        })
        
        }
    
   return res.redirect('/');
});

//december 2024 student list for admin only view

router.get('/december2024Batch', async (req, res) => {
    
    const students = await Student.find({},{_id:1, regn:1, username:1,  fname: 1, batchSession: 1, admissionYear: 1,  address: 1, phone:1} ).sort({regn : -1}).populate('staffid');
    
   if(req.session.adminIdentity) {
    
          return res.render('december2024Batch', {
            
            viewTitle: 'December 2024 student list',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            students
        })
        
        }
    
   return res.redirect('/');
});


//june 2024 student list for admin only view

router.get('/june2024Batch', async (req, res) => {
    
    const students = await Student.find({},{_id:1, regn:1, username:1,  fname: 1, batchSession: 1, admissionYear: 1,  address: 1, phone:1} ).sort({regn : -1}).populate('staffid');
    
   if(req.session.adminIdentity) {
    
          return res.render('june2024Batch', {
            
            viewTitle: 'June 2024 student list',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            students
        })
        
        }
    
   return res.redirect('/');
});


router.get('/allStdList', async (req, res) => {
  try {
    if (!req.session.adminIdentity) {
      return res.redirect('/stdList');
    }

    const students = await Student.find(
      {},
      { _id:1, regn:1, username:1, fname:1, address:1, batchSession:1, phone:1 }
    )
    .sort({ regn : -1 })
    .populate('staffid');

    res.render('allStdList', {
      viewTitle: 'All Student List',
      username: req.session.username,
      link1: req.session.myDashboard1,
      link2: req.session.myDashboard2,
      link3: req.session.myDashboard3,
      href1: req.session.hrefLink1,
      href2: req.session.hrefLink2,
      students
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


//june 2021 student list for admin only view

router.get('/june2021Batch', async (req, res) => {
    
    const students = await Student.find({},{_id:1, regn:1, username:1,  fname: 1, batchSession: 1, phone:1} ).sort({regn : -1}).populate('staffid');
    
   if(req.session.adminIdentity) {
    
          return res.render('june2021Batch', {
            
            viewTitle: 'June 2021 Batch',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            students
        })
        
        }
    
   return res.redirect('/');
});


//december 2021 student list for admin only view

router.get('/december2021Batch', async (req, res) => {
    
    const students = await Student.find({},{_id:1, regn:1, username:1,  fname: 1, batchSession: 1, phone:1} ).sort({regn : -1}).populate('staffid');
    
   if(req.session.adminIdentity) {
    
          return res.render('december2021Batch', {
            
            viewTitle: 'December 2021 Batch',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            students
        })
        
        }
    
    res.redirect('/');
});

router.get('/june2022Batch', async (req, res) => {
    
    const students = await Student.find({},{_id:1, admissionYear:1, regn:1, username:1,  fname: 1, batchSession: 1, phone:1} ).sort({regn : -1}).populate('staffid');
    
   if(req.session.adminIdentity) {
    
          return res.render('june2022Batch', {
            
            viewTitle: 'June 2022 Batch',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            students
        })
        
        }
    
    res.redirect('/');
});

// new student register form ======================================
router.get('/register', async (req, res) => {
  if (!req.session.adminIdentity) {
    return res.redirect('/auth/loginStaff');
  }

  try {
    const allStudents = await Student.find({}, { _id: 1, regn: 1 });

    // Read flashes explicitly; don't use && which calls both unpredictably
    const validationErrors = req.flash('validationErrors'); // []
    const errors = req.flash('errors');   
    // []


    return res.render('register', {
      viewTitle: 'Register Student',
      // Merge both arrays so the view can iterate once
      errors: [...errors, ...validationErrors],
      // On GET there is no body—pass an empty object or prefill from session if you need to
      students: {},
      allStudents
    });
    
    
  } catch (err) {
    console.error('GET /register failed:', err);
    return res.status(500).send('Server error');
  }
});


//end of new student register form ======================================

// edit student details
router.get('/editStudent/:id', async (req, res) => {
  if (!req.session.adminIdentity) {
    return res.redirect('/auth/loginStaff');
  }

  try {
    const [student, allStudents] = await Promise.all([
      Student.findById(req.params.id).lean(),
      Student.find({}, { _id: 1, regn: 1 }).lean()
    ]);
    
   

    if (!student) {
      req.flash('errors', ['Student not found']);
      return res.redirect('/stdList');
    }

    const errors = req.flash('errors');                 // []
    const validationErrors = req.flash('validationErrors'); // []
    const formData = req.flash('formData')[0] || null;  // optional prefill

      
    return res.render('register', {
      viewTitle: 'Update student detail:',
      errors: [...errors, ...validationErrors],
      students: formData || student,    // use flashed form data if present
      allStudents
    });
    

  } catch (err) {
    console.error('GET /editStudent/:id failed:', err);
    return res.status(500).send('Server error');
  }
});



// staff section ================================

router.get('/auth/loginStaff', (req, res) => {
    
    res.render('loginStaff', {
        
        errors: req.flash('errors')
        
        
    });
    
});

// register staff
router.get('/auth/registerStaff', (req, res) => {
  if (req.session.adminIdentity && req.session.username === 'tmapuia') {
    return res.render('registerStaff', { viewTitle: 'Register new staff here' });
  }
  return res.redirect('/');
});




router.get('/view/staffList', async (req, res) => {
    
    if(req.session.adminIdentity && req.session.username == 'tmapuia') {
    
    const staffs = await staff.find({});
    
        return res.render('staffList', {
            
            viewTitle: 'Staff List',
            
            staffs
        });
        
    }
    
   return res.redirect('/');
});


// staff delete
router.get('/staffList/delete/:id', async (req, res) => {
  if (!(req.session.adminIdentity && req.session.username === 'tmapuia')) {
    return res.redirect('/');
  }

  try {
    await staff.findByIdAndRemove(req.params.id);
    return res.redirect('/view/staffList');
  } catch (err) {
    console.error('Error in staff delete:', err);
    return res.status(500).send('Error deleting staff');
  }
});



// student delete
router.get('/stdList/delete/:id', async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);

    if (deleted) {
      req.flash('success', 'Student deleted successfully.');
    } else {
      req.flash('warning', 'Student not found. Nothing was deleted.');
    }

  
    res.redirect(req.get('referer') || '/allStdList'); // fallback if no referer
  
  } catch (err) {
    console.error('Error in student delete:', err);
    req.flash('error', 'Error deleting student. Please try again.');
    res.redirect('/stdList');
  }
});


// A tiny helper you already liked, now with flash: student fee deletion a ni e
async function deleteFeeSubdoc(req, res, arrayField, label) {
  try {
    const result = await Student.updateOne(
      { _id: req.params.id },
      { $pull: { [arrayField]: { _id: req.params.feeId } } }
    );

    if (result.modifiedCount > 0) {
      req.flash('success', `${label} deleted successfully.`);
    } else {
      req.flash('warning', `No matching ${label.toLowerCase()} found.`);
    }
  } catch (err) {
    console.error(`Error deleting from ${arrayField}:`, err);
    req.flash('error', `Could not delete ${label}. Please try again.`);
  } finally {
    res.redirect(req.get('referer') || '/stdList'); // fallback if no referer
  }
}

// Routes
router.get('/studentFee/delete/:id/:feeId',      (req, res) => deleteFeeSubdoc(req, res, 'studentFee',      'Student fee'));
router.get('/studentExamFee/delete/:id/:feeId',  (req, res) => deleteFeeSubdoc(req, res, 'studentExamFee',  'Student exam fee'));
router.get('/studentOtherFee/delete/:id/:feeId', (req, res) => deleteFeeSubdoc(req, res, 'studentOtherFee', 'Student other fee'));

    


//student login panel
    
router.get('/std/loginStudent', (req, res) => {
    
    res.render('studentLogin', {
        
        errors: req.flash('errors'),
        
        students: req.body
        
        });
     
});

//student dashboard

router.get('/all/stdDashboard', async (req, res) => {
  
  const thisStudent = await Student.findOne({_id: req.session.userId});
  
    if(req.session.studentIdentity) {
        
        return res.render('stdDashboard', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            
            studentExamFee: req.session.studentExamFee,
            
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent,
            
           // Students,
            
            moment
     
        });
        
    }
        
       return res.redirect('/');
    
});


// route.js
router.get('/all/whotesttoday', async (req, res) => {
  const start = new Date();
  start.setHours(0,0,0,0);
  const end = new Date();
  end.setHours(23,59,59,999);

  const projection = { username: 1 }; // we only need names
  const q = {
    $or: [
      { 'assignmentTheory.dateSubmitted':   { $gte: start, $lte: end } },
      { 'assignmentTheory102.dateSubmitted':{ $gte: start, $lte: end } },
      { 'assignmentTheory103.dateSubmitted':{ $gte: start, $lte: end } },
      { 'assignmentTheory104.dateSubmitted':{ $gte: start, $lte: end } },
      { 'assignmentTheory105.dateSubmitted':{ $gte: start, $lte: end } },
      { 'assignmentTheory106.dateSubmitted':{ $gte: start, $lte: end } },
    ]
  };

  const students = await Student.find(q, projection).lean();

  // unique usernames (preserve order)
  const seen = new Set();
  const names = [];
  for (const s of students) {
    if (!seen.has(s.username)) {
      seen.add(s.username);
      names.push(s.username);
    }
  }

  res.render('whotesttoday', { names });
});


//student scoreboard

router.get('/all/stdScoreboard', async (req, res) => {
    
  const thisStudent = await Student.findOne({_id: req.session.userId});
  
    if(req.session.studentIdentity) {
        
        return res.render('stdScoreboard', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent
     
        });
        
    }
        
        res.redirect('/');
    
});

//============================



//student who finished assignment 

router.get('/all/stdAssignmentFinished', async (req, res) => {
    
const Students = await Student.find(
  { 
    "assignmentTheory.0": { $exists: true },
    "assignmentTheory102.0": { $exists: true },
    "assignmentTheory103.0": { $exists: true },
    "assignmentTheory104.0": { $exists: true },
    "assignmentTheory105.0": { $exists: true },
    "assignmentTheory106.0": { $exists: true }
  },
  { _id:1, regn: 1, username:1, address:1, assignmentTheory:1, 
    assignmentTheory102:1, assignmentTheory103:1, assignmentTheory104:1, assignmentTheory105:1, assignmentTheory106:1 }).sort({regn : -1});

    
    if(req.session.adminIdentity || req.session.studentIdentity) {
        
        return res.render('stdAssignmentFinished', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            Students
     
        });
        
    }
        
        return res.redirect('/');
    
});

//student who finished assignment from student view

router.get('/all/stdAssignmentFinished1', async (req, res) => {
    
const Students = await Student.find(
  { 
    "assignmentTheory.0": { $exists: true },
    "assignmentTheory102.0": { $exists: true },
    "assignmentTheory103.0": { $exists: true },
    "assignmentTheory104.0": { $exists: true },
    "assignmentTheory105.0": { $exists: true },
    "assignmentTheory106.0": { $exists: true }
  },
  { _id:1, regn: 1, username:1, address:1, assignmentTheory:1, 
    assignmentTheory102:1, assignmentTheory103:1, assignmentTheory104:1, assignmentTheory105:1, assignmentTheory106:1 }).sort({regn : -1});

    
    if(req.session.studentIdentity) {
        
        return res.render('stdAssignmentFinished1', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            Students
     
        });
        
    }
        
        return res.redirect('/');
    
});



//============================


// student check score (student or admin)
router.get('/assignment/checkScore/:id', async (req, res) => {
  try {
    // 1) Validate id early
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).render('404', { message: 'Invalid student id' });
    }

    // 2) Auth gate
    const isAdmin = !!req.session.adminIdentity;
    const isStudent = !!req.session.studentIdentity;

    if (!isAdmin && !isStudent) {
      return res.redirect('/');
    }

    // 3) Authorization (prevent IDOR)
    // - Admin can view any student id
    // - Student can view ONLY their own record
    if (isStudent && !isAdmin) {
      if (String(req.session.userId) !== String(id)) {
        // choose one: 403 or redirect
        return res.status(403).render('403', { message: 'Not allowed' });
      }
    }

    // 4) Fetch only after access is allowed
    const thisStudent = await Student.findById(id)
      // .populate('assignmentTheory.verifierId') // <- add if you need it
      .lean(); // faster for render if you don't need mongoose instance methods

    if (!thisStudent) {
      return res.status(404).render('404', { message: 'Student not found' });
    }

    // 5) Single render path
    return res.render('assignmentCheckScore', {
      username: req.session.username,
      link1: req.session.myDashboard1,
      link2: req.session.myDashboard2,
      link3: req.session.myDashboard3,
      href1: req.session.hrefLink1,
      href2: req.session.hrefLink2,

      // who is logged in (show student name if student; or admin identity)
      loginIdName: isStudent ? req.session.studentIdentity : req.session.adminIdentity,

      // current logged-in user's id (useful for conditionals in EJS)
      studentId: req.session.userId,

      thisStudent
    });
  } catch (err) {
    console.error('GET /assignment/checkScore/:id error:', err);
    if (!res.headersSent) {
      return res.status(500).send('Server Error');
    }
  }
});



// student view profile and fee
router.get('/all/computer/:id', async (req, res) => {
  try {
    // must be a logged-in student (or you can allow admins too)
    if (!req.session.studentIdentity) {
      return res.redirect('/all/stdDashboard');
    }

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).render('studentPage', {
        errors: 'Invalid student id.'
      });
    }

    // Optional: enforce that a student can only view their own page (admins can view all)
    if (String(req.session.userId) !== id && !req.session.adminIdentity) {
      return res.status(403).redirect('/all/stdDashboard');
    }

    const student = await Student.findById(id)
      .populate('studentFee.verifierId', 'username name')        // select only what you need
      .populate('studentExamFee.verifierId', 'username name')
      .populate('studentOtherFee.verifierId', 'username name');
      // .lean(); // enable if your EJS doesn’t need Mongoose document methods

    if (!student) {
      return res.status(404).render('studentPage', { errors: 'Student not found.' });
    }

    return res.render('studentPage', {
      username: req.session.username,
      link1: req.session.myDashboard1,
      link2: req.session.myDashboard2,
      link3: req.session.myDashboard3,
      href1: req.session.hrefLink1,
      href2: req.session.hrefLink2,
      href3: req.session.hrefLink3, // guard in the view if this may be undefined
      loginIdName: req.session.studentIdentity,
      studentId: req.session.userId,
      students: student
    });
  } catch (err) {
    console.error('GET /all/computer/:id failed:', err);
    return res.status(500).render('studentPage', {
      errors: 'Something went wrong. Please try again later.'
    });
  }
});





//theory intro page

router.get('/all/dcatheorywelcomepage', async (req, res) => {
    
   //const Students = await Student.find({});
   
   if(req.session.studentIdentity) {
        
       return res.render('dcatheorywelcomepage', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee
            
           // Students
            
        });
        
    }
        
       return res.redirect('/');
    
});


/*==================================*/


//practical intro page

router.get('/all/dcapracticalwelcomepage', async (req, res) => {
    
    if(req.session.studentIdentity) {
        
       return res.render('dcapracticalwelcomepage', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee
            
        });
        
    }
        
        res.redirect('/');
    
});


/*==================================*/



//dca-101 intro page

router.get('/all/dca101welcomepage', async (req, res) => {
  
  const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca101welcomepage', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            
            studentExamFee: req.session.studentExamFee,
            
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent
            
        });
        
    }
        
        return res.redirect('/');
    
}); 



//dca-102 intro page

router.get('/all/dca102welcomepage', (req, res) => {
    
    if(req.session.studentIdentity) {
        
       return res.render('dca102welcomepage', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee
            
        });
        
    }
        
        res.redirect('/');
    
}); 



//dca-103 intro page

router.get('/all/dca103welcomepage', (req, res) => {
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103welcomepage', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee
            
        });
        
    }
        
        res.redirect('/');
    
}); 


//dca-103 practical intro page

router.get('/all/dca103practicalwelcomepage', (req, res) => {
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalwelcomepage', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee
            
        });
        
    }
        
        res.redirect('/');
    
}); 


//dca-104 intro page

router.get('/all/dca104welcomepage', (req, res) => {
    
    if(req.session.studentIdentity) {
        
       return res.render('dca104welcomepage', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee
            
        });
        
    }
        
        res.redirect('/');
    
}); 


//dca-105 intro page

router.get('/all/dca105welcomepage', (req, res) => {
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105welcomepage', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee
            
        });
        
    }
        
        res.redirect('/');
    
}); 

//dca-105 practical intro page

router.get('/all/dca105practicalwelcomepage', (req, res) => {
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105practicalwelcomepage', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            
            studentExamFee: req.session.studentExamFee,
            
            studentOtherFee: req.session.studentOtherFee
            
        });
        
    }
        
        res.redirect('/');
    
}); 



//dca-106 intro page

router.get('/all/dca106welcomepage', (req, res) => {
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106welcomepage', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee
            
        });
        
    }
        
        res.redirect('/');
    
}); 

//dca-106 practical intro page

router.get('/all/dca106practicalwelcomepage', (req, res) => {
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalwelcomepage', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            
            studentExamFee: req.session.studentExamFee,
            
            studentOtherFee: req.session.studentOtherFee
            
        });
        
    }
        
        res.redirect('/');
    
}); 

//dca101 chapter  1

router.get('/all/dca1semOnlineLessonChapter1', async (req, res) => {
    
const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca1semOnlineLessonChapter1', {
           
           chapterTitle: 'Fundamental of Computer',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        return res.redirect('/all/stdDashboard');
    
});


//dca101 chapter  2

router.get('/all/dca1semOnlineLessonChapter2', async (req, res) => {
    
   const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca1semOnlineLessonChapter2', {
           
           chapterTitle: 'Fundamental of Computer',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent
            
        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca101 chapter  3

router.get('/all/dca1semOnlineLessonChapter3', async (req, res) => {
    
    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca1semOnlineLessonChapter3', {
           
           chapterTitle: 'Fundamental of Computer',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent
            
        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca101 chapter  4

router.get('/all/dca1semOnlineLessonChapter4', async (req, res) => {
    
    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca1semOnlineLessonChapter4', {
           
           chapterTitle: 'Fundamental of Computer',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent
            
        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca101 chapter  5

router.get('/all/dca1semOnlineLessonChapter5', async (req, res) => {
    
    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca1semOnlineLessonChapter5', {
           
           chapterTitle: 'Fundamental of Computer',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
        
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent
            
        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca101 chapter  6

router.get('/all/dca1semOnlineLessonChapter6', async (req, res) => {
    
    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca1semOnlineLessonChapter6', {
           
           chapterTitle: 'Fundamental of Computer',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent
            
        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca101 chapter  7

router.get('/all/dca1semOnlineLessonChapter7', async (req, res) => {
    
    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca1semOnlineLessonChapter7', {
           
           chapterTitle: 'Fundamental of Computer',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent
            
        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca101 chapter  8

router.get('/all/dca1semOnlineLessonChapter8', async (req, res) => {
    
    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca1semOnlineLessonChapter8', {
           
           chapterTitle: 'Fundamental of Computer',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent
            
        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca101 chapter  9

router.get('/all/dca1semOnlineLessonChapter9', async (req, res) => {
    
    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca1semOnlineLessonChapter9', {
           
           chapterTitle: 'Fundamental of Computer',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent
            
        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca101 chapter  10

router.get('/all/dca1semOnlineLessonChapter10', async (req, res) => {
    
    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca1semOnlineLessonChapter10', {
           
           chapterTitle: 'Fundamental of Computer',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent
            
        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


// ================================


//dca102 chapter  1

router.get('/all/dca102onlineclasschapter1', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca102onlineclasschapter1', {
           
           chapterTitle: 'Operating System',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca102 chapter  2

router.get('/all/dca102onlineclasschapter2', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca102onlineclasschapter2', {
           
           chapterTitle: 'Operating System',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca102 chapter  3

router.get('/all/dca102onlineclasschapter3', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca102onlineclasschapter3', {
           
           chapterTitle: 'Operating System',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca102 chapter  4

router.get('/all/dca102onlineclasschapter4', async (req, res) => {

   const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca102onlineclasschapter4', {
           
           chapterTitle: 'Operating System',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca102 chapter  5

router.get('/all/dca102onlineclasschapter5', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca102onlineclasschapter5', {
           
           chapterTitle: 'Operating System',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca102 chapter  6

router.get('/all/dca102onlineclasschapter6', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca102onlineclasschapter6', {
           
           chapterTitle: 'Operating System',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca102 chapter  7

router.get('/all/dca102onlineclasschapter7', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca102onlineclasschapter7', {
           
           chapterTitle: 'Operating System',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca102 chapter  8

router.get('/all/dca102onlineclasschapter8', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca102onlineclasschapter8', {
           
           chapterTitle: 'Operating System',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});




//dca102 chapter  9

router.get('/all/dca102onlineclasschapter9', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca102onlineclasschapter9', {
           
           chapterTitle: 'Operating System',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca102 chapter  10

router.get('/all/dca102onlineclasschapter10', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca102onlineclasschapter10', {
           
           chapterTitle: 'Operating System',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



/*=====================dca103 theory started========================*/



//dca103 chapter  1

router.get('/all/dca103onlineclasschapter1', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter1', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 chapter  2

router.get('/all/dca103onlineclasschapter2', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter2', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 chapter  3

router.get('/all/dca103onlineclasschapter3', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter3', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca103 chapter  4

router.get('/all/dca103onlineclasschapter4', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter4', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 chapter  5

router.get('/all/dca103onlineclasschapter5', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter5', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca103 chapter  6

router.get('/all/dca103onlineclasschapter6', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter6', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca103 chapter  7

router.get('/all/dca103onlineclasschapter7', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter7', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca103 chapter  8

router.get('/all/dca103onlineclasschapter8', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter8', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 chapter  9

router.get('/all/dca103onlineclasschapter9', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter9', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 chapter  10

router.get('/all/dca103onlineclasschapter10', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter10', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 chapter  11

router.get('/all/dca103onlineclasschapter11', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter11', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 chapter  12

router.get('/all/dca103onlineclasschapter12', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter12', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 chapter  13

router.get('/all/dca103onlineclasschapter13', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter13', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 chapter  14

router.get('/all/dca103onlineclasschapter14', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter14', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 chapter  15

router.get('/all/dca103onlineclasschapter15', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter15', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 chapter  16

router.get('/all/dca103onlineclasschapter16', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter16', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 chapter  17

router.get('/all/dca103onlineclasschapter17', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter17', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 chapter  18

router.get('/all/dca103onlineclasschapter18', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter18', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 chapter  19

router.get('/all/dca103onlineclasschapter19', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter19', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 chapter  20

router.get('/all/dca103onlineclasschapter20', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103onlineclasschapter20', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

/*=====================dca103 theory end========================*/



/*=====================dca104 theory started========================*/



//dca104 chapter  1

router.get('/all/dca104onlineclasschapter1', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca104onlineclasschapter1', {
           
           chapterTitle: 'Internet Technology',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca104 chapter  2

router.get('/all/dca104onlineclasschapter2', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca104onlineclasschapter2', {
           
           chapterTitle: 'Internet Technology',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca104 chapter  3

router.get('/all/dca104onlineclasschapter3', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca104onlineclasschapter3', {
           
           chapterTitle: 'Internet Technology',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca104 chapter  4

router.get('/all/dca104onlineclasschapter4', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca104onlineclasschapter4', {
           
           chapterTitle: 'Internet Technology',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca104 chapter  5

router.get('/all/dca104onlineclasschapter5', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca104onlineclasschapter5', {
           
           chapterTitle: 'Internet Technology',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca104 chapter  6

router.get('/all/dca104onlineclasschapter6', async (req, res) => {

   const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca104onlineclasschapter6', {
           
           chapterTitle: 'Internet Technology',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



// ==================104 theory end=========================



// ==================105 theory started=========================

//dca105 chapter  1

router.get('/all/dca105onlineclasschapter1', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105onlineclasschapter1', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca105 chapter  2

router.get('/all/dca105onlineclasschapter2', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105onlineclasschapter2', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca105 chapter  3

router.get('/all/dca105onlineclasschapter3', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105onlineclasschapter3', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca105 chapter  4

router.get('/all/dca105onlineclasschapter4', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105onlineclasschapter4', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca105 chapter  5

router.get('/all/dca105onlineclasschapter5', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105onlineclasschapter5', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca105 chapter  6

router.get('/all/dca105onlineclasschapter6', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105onlineclasschapter6', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca105 chapter  7

router.get('/all/dca105onlineclasschapter7', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105onlineclasschapter7', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca105 chapter  8

router.get('/all/dca105onlineclasschapter8', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105onlineclasschapter8', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca105 chapter  9

router.get('/all/dca105onlineclasschapter9', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105onlineclasschapter9', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca105 chapter  10

router.get('/all/dca105onlineclasschapter10', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105onlineclasschapter10', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca105 chapter  11

router.get('/all/dca105onlineclasschapter11', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105onlineclasschapter11', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca105 chapter  12

router.get('/all/dca105onlineclasschapter12', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105onlineclasschapter12', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca105 chapter  13

router.get('/all/dca105onlineclasschapter13', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105onlineclasschapter13', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


// ==================105 theory end=========================


// ==================106 theory started=========================


//dca106 chapter  1

router.get('/all/dca106onlineclasschapter1', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106onlineclasschapter1', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca106 chapter  2

router.get('/all/dca106onlineclasschapter2', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106onlineclasschapter2', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca106 chapter  3

router.get('/all/dca106onlineclasschapter3', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106onlineclasschapter3', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca106 chapter  4

router.get('/all/dca106onlineclasschapter4', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106onlineclasschapter4', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca106 chapter  5

router.get('/all/dca106onlineclasschapter5', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106onlineclasschapter5', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca106 chapter  6

router.get('/all/dca106onlineclasschapter6', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106onlineclasschapter6', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca106 chapter  7

router.get('/all/dca106onlineclasschapter7', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106onlineclasschapter7', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});




//dca106 chapter  8

router.get('/all/dca106onlineclasschapter8', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106onlineclasschapter8', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca106 chapter  9

router.get('/all/dca106onlineclasschapter9', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106onlineclasschapter9', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca106 chapter  10

router.get('/all/dca106onlineclasschapter10', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106onlineclasschapter10', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca106 chapter  11

router.get('/all/dca106onlineclasschapter11', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106onlineclasschapter11', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca106 chapter  12

router.get('/all/dca106onlineclasschapter12', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106onlineclasschapter12', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca106 chapter  13

router.get('/all/dca106onlineclasschapter13', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106onlineclasschapter13', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});



//dca106 chapter  14

router.get('/all/dca106onlineclasschapter14', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106onlineclasschapter14', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


// ==================106 theory end=========================


//dca103 practical chapter  1

router.get('/all/dca103practicalclasschapter1', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter1', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 practical chapter  2

router.get('/all/dca103practicalclasschapter2', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter2', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  3

router.get('/all/dca103practicalclasschapter3', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter3', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  4

router.get('/all/dca103practicalclasschapter4', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter4', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  5

router.get('/all/dca103practicalclasschapter5', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter5', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  6

router.get('/all/dca103practicalclasschapter6', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter6', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  7

router.get('/all/dca103practicalclasschapter7', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter7', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  8

router.get('/all/dca103practicalclasschapter8', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter8', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});


//dca103 practical chapter  9

router.get('/all/dca103practicalclasschapter9', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter9', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  10

router.get('/all/dca103practicalclasschapter10', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter10', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  11

router.get('/all/dca103practicalclasschapter11', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter11', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  12

router.get('/all/dca103practicalclasschapter12', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter12', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  13

router.get('/all/dca103practicalclasschapter13', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter13', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  14

router.get('/all/dca103practicalclasschapter14', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter14', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  15

router.get('/all/dca103practicalclasschapter15', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter15', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  16

router.get('/all/dca103practicalclasschapter16', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter16', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  17

router.get('/all/dca103practicalclasschapter17', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter17', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  18

router.get('/all/dca103practicalclasschapter18', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter18', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  19

router.get('/all/dca103practicalclasschapter19', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter19', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca103 practical chapter  20

router.get('/all/dca103practicalclasschapter20', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca103practicalclasschapter20', {
           
           chapterTitle: 'Office Automation Software',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

// end 103 of practical video route

//dca105 practical chapter  1

router.get('/all/dca105practicalclasschapter1', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105practicalclasschapter1', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca105 practical chapter  2

router.get('/all/dca105practicalclasschapter2', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105practicalclasschapter2', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca105 practical chapter  3

router.get('/all/dca105practicalclasschapter3', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105practicalclasschapter3', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca105 practical chapter  4

router.get('/all/dca105practicalclasschapter4', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105practicalclasschapter4', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca105 practical chapter  5

router.get('/all/dca105practicalclasschapter5', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105practicalclasschapter5', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca105 practical chapter  6

router.get('/all/dca105practicalclasschapter6', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105practicalclasschapter6', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca105 practical chapter  7

router.get('/all/dca105practicalclasschapter7', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105practicalclasschapter7', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca105 practical chapter  8

router.get('/all/dca105practicalclasschapter8', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105practicalclasschapter8', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca105 practical chapter  9

router.get('/all/dca105practicalclasschapter9', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105practicalclasschapter9', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca105 practical chapter  10

router.get('/all/dca105practicalclasschapter10', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105practicalclasschapter10', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca105 practical chapter  11

router.get('/all/dca105practicalclasschapter11', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105practicalclasschapter11', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca105 practical chapter  12

router.get('/all/dca105practicalclasschapter12', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105practicalclasschapter12', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca105 practical chapter  13

router.get('/all/dca105practicalclasschapter13', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca105practicalclasschapter13', {
           
           chapterTitle: 'Computer Graphics',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca106 practical chapter  1

router.get('/all/dca106practicalclasschapter1', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalclasschapter1', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca106 practical chapter  2

router.get('/all/dca106practicalclasschapter2', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalclasschapter2', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca106 practical chapter  3

router.get('/all/dca106practicalclasschapter3', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalclasschapter3', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca106 practical chapter  4

router.get('/all/dca106practicalclasschapter4', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalclasschapter4', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca106 practical chapter  5

router.get('/all/dca106practicalclasschapter5', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalclasschapter5', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca106 practical chapter  6

router.get('/all/dca106practicalclasschapter6', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalclasschapter6', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca106 practical chapter  7

router.get('/all/dca106practicalclasschapter7', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalclasschapter7', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca106 practical chapter  8

router.get('/all/dca106practicalclasschapter8', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalclasschapter8', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca106 practical chapter  9

router.get('/all/dca106practicalclasschapter9', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalclasschapter9', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca106 practical chapter  10

router.get('/all/dca106practicalclasschapter10', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalclasschapter10', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca106 practical chapter  11

router.get('/all/dca106practicalclasschapter11', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalclasschapter11', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca106 practical chapter  12

router.get('/all/dca106practicalclasschapter12', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalclasschapter12', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});
//dca106 practical chapter  13

router.get('/all/dca106practicalclasschapter13', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalclasschapter13', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

//dca106 practical chapter  14

router.get('/all/dca106practicalclasschapter14', async (req, res) => {

    const thisStudent = await Student.findOne({_id: req.session.userId});
    
    if(req.session.studentIdentity) {
        
       return res.render('dca106practicalclasschapter14', {
           
           chapterTitle: 'Desktop Publishing',
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId,
            
            thisStudent

        });
        
    }
        
        res.redirect('/all/stdDashboard');
    
});

router.get('/viewFee',(req, res) => {

if(req.session.adminIdentity) {
    
    return res.render('viewFee', {
                
            viewTitle: 'Fee luh dan endikna',
       
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            moment: moment
                
                });
                
            } 
               

        return res.redirect('/stdList');
    
});


// Search results page
router.get('/search', async (req, res) => {
  const q = (req.query.q || '').trim();

  try {
    const students = await Student.find({
      $or: [
        { username: { $regex: q, $options: 'i' } },
        { fname:    { $regex: q, $options: 'i' } },
        { address:  { $regex: q, $options: 'i' } },
        { phone:    { $regex: q, $options: 'i' } }
      ]
    }).sort({ regn: -1 });

    res.render('searchResults', {
      username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            query: q,
            
            students
    });
  } catch (err) {
    console.error(err);
    res.render('searchResults', { query: q, students: [], error: 'Search failed' });
  }
});



//today fee review list for admin only view

router.get('/viewFee/todayFeeReview', async (req, res) => {
    
    
    //hei hi vawiin date entirnan 2021-06-26 a ni;  moment().format('YYYY-MM-DD')
            
if(req.session.adminIdentity) {
    
  await Student.find( { $or: [ {studentFee : { $elemMatch: {  dateSubmitted : { $gte : moment().format('YYYY-MM-DD') }  } } }, 
  
  { studentExamFee : { $elemMatch: {  dateSubmitted : { $gte : moment().format('YYYY-MM-DD') } } } },
  
  { studentOtherFee : { $elemMatch: {  dateSubmitted : { $gte : moment().format('YYYY-MM-DD') } } } }
  
  ] },
  
  (err, doc) => {
      
      if(!err) {
          
            res.render('todayFeeReview', {
                
            viewTitle: 'Who paid Fee today',
       
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            students: doc,
            
            moment: moment
                
                });
                
                return;
                
                

            } else {
                
                res.redirect('/stdList');
                
            }
            
        })
        .populate('studentFee.verifierId')
        
        .populate('studentExamFee.verifierId')
        
        .populate('studentOtherFee.verifierId');
        
        return;
        
            
    }
        
        
        res.redirect('/stdList');
    
});


//i want to see all fee received from the student irrespective of timestamp

router.get('/viewFee/viewAllFeeReceived', async (req, res) => {

     const startingDateWithoutTime = moment().format('2021-01-01'); //kumtir hriatna
            
     const currentDateWithoutTime = moment().format('YYYY-MM-DD'); //vawiin hriatna

if(req.session.adminIdentity) {
    
  await Student.find({studentFee : { $elemMatch: {  dateofpayment : { $gte: startingDateWithoutTime, $lte: currentDateWithoutTime } } } }, (err, doc) => {
      
      if(!err) {
          
            res.render('viewAllFeeReceived', {
                
            viewTitle: 'All account: ',
       
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
           
            students: doc,
            
            moment: moment
                
                });
                
                return;

            } else {
                
                
                res.redirect('/stdList');
                
            }
            
        })
        .populate('studentFee.verifierId')
        
        .populate('studentExamFee.verifierId')
        
        .populate('studentOtherFee.verifierId');
        
        return;
        
    }

        res.redirect('/stdList');
    
});







//exam fee review list for admin only view

router.get('/viewFee/viewExamFeeReceived', async (req, res) => {
    
    const startingDateWithoutTime = moment().format('2020-01-01'); //kumtir hriatna
            
    const currentDateWithoutTime = moment().format('YYYY-MM-DD'); //vawiin hriatna

if(req.session.adminIdentity) {
    
  await Student.find({studentExamFee : { $elemMatch: {  dateofpayment : { $gte: startingDateWithoutTime, $lte: currentDateWithoutTime } } } }, (err, doc) => {
      
      if(!err) {
          
            res.render('viewExamFeeReceived', {
                
            viewTitle: 'Who paid Exam Fee this Session',
       
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
           
            students: doc,
            
            moment: moment
            
                
                });
                
                return;
                
                

            } else {
                
                res.redirect('/viewFee');
                
            }
            
        })
        .populate('studentFee.verifierId')
        
        .populate('studentExamFee.verifierId')
        
        .populate('studentOtherFee.verifierId');
        
        return;
        
            
    }
        
        
        res.redirect('/viewFee');
    
});






//other fee review list for admin only view

router.get('/viewFee/viewOtherFeeReceived', async (req, res) => {
    
    
const startingDateWithoutTime = moment().format('2020-01-01'); //kumtir hriatna
            
const currentDateWithoutTime = moment().format('YYYY-MM-DD'); //vawiin hriatna
            

if(req.session.adminIdentity) {
    
  await Student.find({studentOtherFee : { $elemMatch: {  dateofpayment : { $gte: startingDateWithoutTime, $lte: currentDateWithoutTime } } } }, (err, doc) => {

      if(!err) {
          
            res.render('viewOtherFeeReceived', {
                
            viewTitle: 'Who paid any other fee this Session',
       
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
           
            students: doc,
            
            moment: moment
            
                
                });
                
                return;
                
                

            } else {
                
                res.redirect('/viewFee');
                
            }
            
        })
        .populate('studentFee.verifierId')
        
        .populate('studentExamFee.verifierId')
        
        .populate('studentOtherFee.verifierId');
        
        return;
        
            
    }
        
        
        res.redirect('/viewFee');
    
});

router.get('/viewFee/viewFeeByDate/:dateSubmitted', async (req, res) => {
  if (!req.session.adminIdentity) return res.redirect('/stdList');

  const startStr = req.params.dateSubmitted; // "YYYY-MM-DD"
  const mStart = moment(startStr, 'YYYY-MM-DD', true);
  if (!mStart.isValid()) return res.status(400).send('Invalid date. Use YYYY-MM-DD');

  const start = mStart.startOf('day').toDate();
  const end   = moment().endOf('day').toDate();

  try {
    const filter = {
      $or: [
        { studentFee:      { $elemMatch: { dateSubmitted: { $gte: start, $lte: end } } } },
        { studentExamFee:  { $elemMatch: { dateSubmitted: { $gte: start, $lte: end } } } },
        { studentOtherFee: { $elemMatch: { dateSubmitted: { $gte: start, $lte: end } } } }
      ]
    };

    const students = await Student.find(filter)
      .populate('studentFee.verifierId')
      .populate('studentExamFee.verifierId')
      .populate('studentOtherFee.verifierId')
      .lean();

    return res.render('viewFeeByDate', {
      viewTitle: 'Search From:',
      username: req.session.username,
      link1: req.session.myDashboard1,
      link2: req.session.myDashboard2,
      link3: req.session.myDashboard3,
      href1: req.session.hrefLink1,
      href2: req.session.hrefLink2,
      students,
      moment,
      searchFromDate: startStr
    });
  } catch (err) {
    console.error('viewFeeByDate error:', err);
    return res.status(500).send('Error fetching fees');
  }
});


//fee due

router.get('/view/feeDue', async (req, res) => {
    
    //hei hi vawiin date entirnan 2022-02-11;  moment().format('YYYY-MM-DD')
            
if(req.session.adminIdentity) {
    
  await Student.find( { $or: [ {studentFee : { $elemMatch: {  dateSubmitted : { $gte : moment().format('YYYY-MM-DD') } } } }, 
  
  { studentExamFee : { $elemMatch: {  dateSubmitted : { $gte : moment().format('YYYY-MM-DD') } } } },
  
  { studentOtherFee : { $elemMatch: {  dateSubmitted : { $gte : moment().format('YYYY-MM-DD') } } } }
  
  ] },
  
  (err, doc) => {
      
     if(!err) {
          
            res.render('feeDue', {
                
            viewTitle: 'Today Received',
       
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            students: doc,
            
            moment: moment
                
                });
                
                return;
                
                

            } else {
                
                res.redirect('/stdList');
                
            }
            
        })
        .populate('studentFee.verifierId')
        
        .populate('studentExamFee.verifierId')
        
        .populate('studentOtherFee.verifierId');
        
        return;
        
            
    }
        
        
        res.redirect('/stdList');
    
});




// student page admin-only view
router.get('/computer/:id', async (req, res) => {
  try {
    // 1) Gate: non-admins are redirected immediately
    if (!req.session.adminIdentity) {
      return res.redirect('/stdList');
    }

    // 2) Pure await (no callback) + populate chain
    const student = await Student.findById(req.params.id)
      .populate('studentFee.verifierId')
      .populate('studentExamFee.verifierId')
      .populate('studentOtherFee.verifierId')
      .lean(); // optional: faster render if you don't need Mongoose docs

    // 3) Not found path
    if (!student) {
      return res.status(404).render('404', { message: 'Student not found' });
    }

    // 4) Single render path
    return res.render('studentPage', {
      username: req.session.username,
      link1: req.session.myDashboard1,
      link2: req.session.myDashboard2,
      link3: req.session.myDashboard3,
      href1: req.session.hrefLink1,
      href2: req.session.hrefLink2,
      loginIdName: req.session.adminIdentity,
      students: student
    });
  } catch (err) {
    console.error('GET /computer/:id error:', err);
    if (!res.headersSent) {
      return res.status(500).send('Server Error');
    }
  }
});



// monthly fee payment form
router.get('/computer/:id/feeRegister', async (req, res) => {
  // auth gate first
  if (!req.session.adminIdentity) {
    // use the real id, not the literal ":id"
    return res.redirect(`/computer/${encodeURIComponent(req.params.id)}`);
  }

  try {
    const student = await Student.findById(req.params.id); // no callback with await

    if (!student) {
      req.flash('errors', ['Student not found']);
      return res.redirect('/stdList');
    }

    return res.render('feeRegister', {
      viewTitle: 'Monthly fee statement',
      students: student
    });
  } catch (err) {
    console.error('GET /computer/:id/feeRegister error:', err);
    return res.status(500).send('Server error');
  }
});


// exam fee payment form =========
router.get('/computer/:id/examFeeRegister', async (req, res) => {
  if (!req.session.adminIdentity) {
    return res.redirect(`/computer/${encodeURIComponent(req.params.id)}`);
  }

  try {
    const student = await Student.findById(req.params.id); // no callback with await
    if (!student) {
      req.flash('errors', ['Student not found']);
      return res.redirect('/stdList');
    }

    return res.render('examFeeRegister', {
      viewTitle: 'Exam fee statement',
      students: student
    });
  } catch (err) {
    console.error('GET /computer/:id/examFeeRegister error:', err);
    return res.status(500).send('Server error');
  }
});



// other fee like backlog / any other payment form =====================
router.get('/computer/:id/otherFeeRegister', async (req, res) => {
  if (!req.session.adminIdentity) {
    // use actual id, not "/computer/:id"
    return res.redirect(`/computer/${encodeURIComponent(req.params.id)}`);
  }

  try {
    const student = await Student.findById(req.params.id); // no callback with await
    if (!student) {
      req.flash('errors', ['Student not found']);
      return res.redirect('/stdList');
    }

    return res.render('otherFeeRegister', {
      viewTitle: 'Other fee statement',
      students: student
    });
  } catch (err) {
    console.error('GET /computer/:id/otherFeeRegister error:', err);
    return res.status(500).send('Server error');
  }
});




// =========================================

router.get('/auth/logout', (req, res) => {
    
    req.session.destroy(() => {
        
        res.redirect('/')
        
    })
    
})



//===================================

// delete assignment record
router.get('/assignment/delete101/:id/:theoryId', async (req, res) => {
  try {
    const { id, theoryId } = req.params;

    // ✅ validate IDs
    if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(theoryId)) {
      console.warn('Invalid ObjectId for assignment delete:', id, theoryId);
      return res.redirect(req.get('referer') || '/dcatheorywelcomepage');
    }

    // ✅ no callbacks, just await
    const result = await Student.updateOne(
      { _id: id },
      { $pull: { assignmentTheory: { _id: theoryId } } }
    );

    if (result.modifiedCount > 0) {
      console.log('Assignment data deleted successfully');
    } else {
      console.log('No assignment found for deletion');
    }

    // ✅ safe redirect
    return res.redirect(req.get('referer'));
  } catch (err) {
    console.error('Error in assignment delete:', err);
    return res.redirect(req.get('referer') || '/dcatheorywelcomepage');
  }
});





router.get('/assignment/delete102/:id/:theoryId', async (req, res) => {
  try {
    const { id, theoryId } = req.params;

    // ✅ validate IDs
    if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(theoryId)) {
      console.warn('Invalid ObjectId for assignment delete:', id, theoryId);
      return res.redirect(req.get('referer') || '/dcatheorywelcomepage');
    }

    // ✅ no callbacks, just await
    const result = await Student.updateOne(
      { _id: id },
      { $pull: { assignmentTheory102: { _id: theoryId } } }
    );

    if (result.modifiedCount > 0) {
      console.log('Assignment data deleted successfully');
    } else {
      console.log('No assignment found for deletion');
    }

    // ✅ safe redirect
    return res.redirect(req.get('referer'));
  } catch (err) {
    console.error('Error in assignment delete:', err);
    return res.redirect(req.get('referer') || '/dcatheorywelcomepage');
  }
});


router.get('/assignment/delete103/:id/:theoryId', async (req, res) => {
  try {
    const { id, theoryId } = req.params;

    // ✅ validate IDs
    if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(theoryId)) {
      console.warn('Invalid ObjectId for assignment delete:', id, theoryId);
      return res.redirect(req.get('referer') || '/dcatheorywelcomepage');
    }

    // ✅ no callbacks, just await
    const result = await Student.updateOne(
      { _id: id },
      { $pull: { assignmentTheory103: { _id: theoryId } } }
    );

    if (result.modifiedCount > 0) {
      console.log('Assignment data deleted successfully');
    } else {
      console.log('No assignment found for deletion');
    }

    // ✅ safe redirect
    return res.redirect(req.get('referer'));
  } catch (err) {
    console.error('Error in assignment delete:', err);
    return res.redirect(req.get('referer') || '/dcatheorywelcomepage');
  }
});



router.get('/assignment/delete104/:id/:theoryId', async (req, res) => {
  try {
    const { id, theoryId } = req.params;

    // ✅ validate IDs
    if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(theoryId)) {
      console.warn('Invalid ObjectId for assignment delete:', id, theoryId);
      return res.redirect(req.get('referer') || '/dcatheorywelcomepage');
    }

    // ✅ no callbacks, just await
    const result = await Student.updateOne(
      { _id: id },
      { $pull: { assignmentTheory104: { _id: theoryId } } }
    );

    if (result.modifiedCount > 0) {
      console.log('Assignment data deleted successfully');
    } else {
      console.log('No assignment found for deletion');
    }

    // ✅ safe redirect
    return res.redirect(req.get('referer'));
  } catch (err) {
    console.error('Error in assignment delete:', err);
    return res.redirect(req.get('referer') || '/dcatheorywelcomepage');
  }
});



router.get('/assignment/delete105/:id/:theoryId', async (req, res) => {
  try {
    const { id, theoryId } = req.params;

    // ✅ validate IDs
    if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(theoryId)) {
      console.warn('Invalid ObjectId for assignment delete:', id, theoryId);
      return res.redirect(req.get('referer') || '/dcatheorywelcomepage');
    }

    // ✅ no callbacks, just await
    const result = await Student.updateOne(
      { _id: id },
      { $pull: { assignmentTheory105: { _id: theoryId } } }
    );

    if (result.modifiedCount > 0) {
      console.log('Assignment data deleted successfully');
    } else {
      console.log('No assignment found for deletion');
    }

    // ✅ safe redirect
    return res.redirect(req.get('referer'));
  } catch (err) {
    console.error('Error in assignment delete:', err);
    return res.redirect(req.get('referer') || '/dcatheorywelcomepage');
  }
});



router.get('/assignment/delete106/:id/:theoryId', async (req, res) => {
  try {
    const { id, theoryId } = req.params;

    // ✅ validate IDs
    if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(theoryId)) {
      console.warn('Invalid ObjectId for assignment delete:', id, theoryId);
      return res.redirect(req.get('referer') || '/dcatheorywelcomepage');
    }

    // ✅ no callbacks, just await
    const result = await Student.updateOne(
      { _id: id },
      { $pull: { assignmentTheory106: { _id: theoryId } } }
    );

    if (result.modifiedCount > 0) {
      console.log('Assignment data deleted successfully');
    } else {
      console.log('No assignment found for deletion');
    }

    // ✅ safe redirect
    return res.redirect(req.get('referer'));
  } catch (err) {
    console.error('Error in assignment delete:', err);
    return res.redirect(req.get('referer') || '/dcatheorywelcomepage');
  }
});




//=================================================

//download syllabus


router.get('/all/dcaDownloadMaterialPage', (req, res) => {
    
    if(req.session.studentIdentity) {
        
       return res.render('dcaDownloadMaterialPage', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            studentFee: req.session.studentFee,
            studentExamFee: req.session.studentExamFee,
            studentOtherFee: req.session.studentOtherFee,
            
            studentId: req.session.userId
            
        });
        
    }
        
        res.redirect('/');
    
}); 

//================================

//download syllabus


router.get('/all/dca1stSemSyllabus', (req, res) => {
    
    if(req.session.studentIdentity) {
        
       return res.render('dca1stSemSyllabus', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId
            
        });
        
    }
        
        res.redirect('/');
    
}); 


//download guidebook


router.get('/all/dca1stSemGuidebook', (req, res) => {
    
    if(req.session.studentIdentity) {
        
       return res.render('dca1stSemGuidebook', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId
            
        });
        
    }
        
        res.redirect('/');
    
}); 

//download old question


router.get('/all/dca1stSemOldQuestion', (req, res) => {
    
    if(req.session.studentIdentity) {
        
       return res.render('dca1stSemOldQuestion', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId
            
        });
        
    }
        
        res.redirect('/');
    
}); 

//old question download end


//suggestion note download start


router.get('/all/dca1stSemSuggestionNote', (req, res) => {
    
    if(req.session.studentIdentity) {
        
       return res.render('dca1stSemSuggestionNote', {
            
            username: req.session.username,
            
            link1: req.session.myDashboard1,
            
            link2: req.session.myDashboard2,
            
            link3: req.session.myDashboard3,
            
            href1: req.session.hrefLink1,
            
            href2: req.session.hrefLink2,
            
            loginIdName: req.session.studentIdentity,
            
            studentId: req.session.userId
            
        });
        
    }
        
        res.redirect('/');
    
}); 

//suggestion note download end

router.use((req, res) => res.render('notFoundPage'));

module.exports = router;

