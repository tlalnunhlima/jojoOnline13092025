// controllers/assignments/insertAssignmentRecord.js
const Student = require('../models/Student');

// 1) Centralized answer keys (edit here only)
const ANSWER_KEYS = {
  'Chapter-1': {
    dcaMCQ1: 'Charles Babbage',
    dcaMCQ2: 'High IQ',
    dcaMCQ3: '0 or 1',
    dcaMCQ4: 'Computer',
    dcaMCQ5: '5th Generation',
  },
  'Chapter-2': {
    dcaMCQ1: '4',
    dcaMCQ2: '8',
    dcaMCQ3: '3',
    dcaMCQ4: '7',
    dcaMCQ5: '6',
  },
  'Chapter-3': {
    dcaMCQ1: 'Random Access Memory',
    dcaMCQ2: 'Arithmetic Logic Unit',
    dcaMCQ3: 'Location or cells',
    dcaMCQ4: 'RAM',
    dcaMCQ5: 'many',
  },
  'Chapter-4': {
    dcaMCQ1: 'Magnetic Tape',
    dcaMCQ2: 'Magnetic Disk',
    dcaMCQ3: 'Secondary',
    dcaMCQ4: 'Universal Serial Bus',
    dcaMCQ5: 'Hierarchical Storage System',
  },
  'Chapter-5': {
    dcaMCQ1: 'Keyboard',
    dcaMCQ2: 'Inkjet',
    dcaMCQ3: 'Optical Mark Reader',
    dcaMCQ4: 'Plotters',
    dcaMCQ5: 'Input/Output',
  },
  'Chapter-6': {
    dcaMCQ1: 'Microsoft Word',
    dcaMCQ2: 'Microsoft Windows',
    dcaMCQ3: 'Application Software',
    dcaMCQ4: 'System Programmer',
    dcaMCQ5: 'Hardware',
  },
  'Chapter-7': {
    dcaMCQ1: '2',
    dcaMCQ2: 'All of the above',
    dcaMCQ3: 'Compiler',
    dcaMCQ4: 'Java',
    dcaMCQ5: 'High Level Language',
  },
  'Chapter-8': {
    dcaMCQ1: 'Micro Computer',
    dcaMCQ2: 'Supercomputer',
    dcaMCQ3: 'Server computer',
    dcaMCQ4: 'Laptop Computer',
    dcaMCQ5: 'Mainframe Computer',
  },
  'Chapter-9': {
    dcaMCQ1: '94',
    dcaMCQ2: '17 October 2000',
    dcaMCQ3: 'All of the above',
    dcaMCQ4: '4',
    dcaMCQ5: 'Internet',
  },
  'Chapter-10': {
    dcaMCQ1: 'Wireless Fidelity',
    dcaMCQ2: 'Virtual Private Network',
    dcaMCQ3: 'Electronically Erasable Programmable Read-Only Memory',
    dcaMCQ4: 'Portable Document Format',
    dcaMCQ5: 'Basic Input Output System',
  },
};

// helpers
const norm = v => (typeof v === 'string' ? v.trim().toLowerCase() : v);
const matches = (user, corrects) => {
  const u = norm(user);
  const arr = Array.isArray(corrects) ? corrects : [corrects];
  return arr.some(c => norm(c) === u);
};

function gradeChapter(chapterName, body) {
  const key = ANSWER_KEYS[chapterName];
  let correctCount = 0;
  let incorrect = 0;
  const questionNumber = [];

  if (!key) return { correctCount, incorrect, questionNumber, totalMark: 0 };

  let idx = 0; // builds Q1..Q5
  for (const [field, correct] of Object.entries(key)) {
    idx += 1;
    if (matches(body[field], correct)) {
      correctCount++;
    } else {
      incorrect++;
      questionNumber.push(`Q${idx}`);
    }
  }
  return { correctCount, incorrect, questionNumber, totalMark: Object.keys(key).length };
}

module.exports = async (req, res) => {
  try {
    const { _id, subjectName, chapterName } = req.body;
    if (!_id || !subjectName || !chapterName) {
      return res.redirect(req.get('referer'));
    }

    // 2) Grade once (covers all chapters)
    const { correctCount, questionNumber, totalMark } = gradeChapter(chapterName, req.body);

    // 3) Build subdocument to push
    const assignmentTheory = {
      subjectName,
      chapterName,
      mcq1: req.body.dcaMCQ1,
      mcq2: req.body.dcaMCQ2,
      mcq3: req.body.dcaMCQ3,
      mcq4: req.body.dcaMCQ4,
      mcq5: req.body.dcaMCQ5,
      Scored: correctCount,
      totalMark,
      incorrectQuestions: questionNumber,
      percentage: totalMark ? Math.round((correctCount / totalMark) * 100) : 0,
      submittedAt: new Date(),
    };

    await Student.findOneAndUpdate(
      { _id },
      { $push: { assignmentTheory } },
      { new: true }
    );

    return res.redirect(req.get('referer'));
  } catch (err) {
    console.error('Error during exam assignment record update:', err);
    return res.redirect(req.get('referer'));
  }
};
