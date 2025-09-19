// controllers/assignments/insertAssignmentRecord104.js
const Student = require('../models/Student');

// Centralized answer keys (strings or arrays for synonyms)
const ANSWER_KEYS = {
  'Chapter-1': [
    'Tim Berner-Lee',
    'Hyperlink',
    'Shareware',
    'Internet Service Provider (ISP)',
    'Authentication',
  ],
  'Chapter-2': ['Web clients', 'User Network', 'AltaVista', 'Remote login', 'Two'],
  'Chapter-3': [
    'Space',
    'Spam',
    'Simple Mail Transfer Protocol',
    '64KB',
    'Post Office Protocol version 3',
  ],
  'Chapter-4': ['Java', 'E-commerce', 'Four', 'Firewall', 'Whiteboard Application'],
  'Chapter-5': ['Auditing', 'Cryptography', 'Cyber crime', 'unauthorized attack', 'Packet'],
  'Chapter-6': ['No one', 'Anatomy', 'four', 'Newsgroup', 'Broadband Connection'],
};

// Helpers
const normalize = v => (typeof v === 'string' ? v.trim().toLowerCase() : '');
const matches = (userValue, correctSpec) => {
  const u = normalize(userValue);
  const arr = Array.isArray(correctSpec) ? correctSpec : [correctSpec];
  return arr.some(c => normalize(c) === u);
};

function gradeChapter(chapterName, body) {
  const key = ANSWER_KEYS[chapterName];
  if (!key) return { correct: 0, wrongQs: [], total: 0 };

  const responses = [body.dcaMCQ1, body.dcaMCQ2, body.dcaMCQ3, body.dcaMCQ4, body.dcaMCQ5];

  let correct = 0;
  const wrongQs = [];
  for (let i = 0; i < key.length; i++) {
    const expected = key[i];
    const provided = responses[i] ?? '';
    if (matches(provided, expected)) correct++;
    else wrongQs.push(`Q${i + 1}`);
  }
  return { correct, wrongQs, total: key.length };
}

module.exports = async (req, res) => {
  try {
    const {
      _id: studentId,
      subjectName,
      chapterName,
      dcaMCQ1,
      dcaMCQ2,
      dcaMCQ3,
      dcaMCQ4,
      dcaMCQ5,
    } = req.body;

    if (!studentId || !chapterName) {
      return res.redirect(req.get('referer') || '/');
    }

    const { correct, wrongQs, total } = gradeChapter(chapterName, req.body);

    const assignmentTheoryArray = {
      subjectName,
      chapterName,
      mcq1: dcaMCQ1,
      mcq2: dcaMCQ2,
      mcq3: dcaMCQ3,
      mcq4: dcaMCQ4,
      mcq5: dcaMCQ5,
      Scored: correct,
      totalMark: total,                                  // derive from key
      wrongQuestions: wrongQs,
      percentage: total ? Math.round((correct / total) * 100) : 0,
      dateSubmitted: new Date(),
    };

    await Student.findByIdAndUpdate(
      studentId,
      { $push: { assignmentTheory104: assignmentTheoryArray } }, // keep your target array
      { new: false }
    );

    return res.redirect(req.get('referer') || '/');
  } catch (err) {
    console.error('Error during exam assignment record update : ', err);
    return res.redirect(req.get('referer') || '/');
  }
};
