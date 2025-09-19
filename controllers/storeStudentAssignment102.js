// controllers/assignments/insertAssignmentRecord102.js
const Student = require('../models/Student');

// CENTRALIZED ANSWER KEYS
// Use strings for exact answers, or arrays for synonyms
const ANSWER_KEYS = {
  'Chapter-1': [
    'Virus Removal',
    'Hardware',
    'All of these',
    'Operating System',
    'Operating System',
  ],
  'Chapter-2': [
    'Multi user OS',
    "1980's",
    'Start Button',
    '8,3',
    'Dynamic Linked Library',
  ],
  'Chapter-3': [
    'Windows',
    'November 20, 1985',
    '1990',
    'Microsoft Windows',
    'Microsoft Disk Operating System',
  ],
  'Chapter-4': ['Desktop', 'Icons', 'Taskbar', 'Search', 'Scrollbar'],
  'Chapter-5': ['file', 'Ctrl + A', 'two', 'Ctrl + Shift + N', 'F2'],
  'Chapter-6': [
    'Original Equipment Manufacturer',
    'All Programs',
    'Windows key + R',
    'calc',
    'All of the above',
  ],
  'Chapter-7': [
    'Shortcut',
    'Small arrow in the lower left corner',
    'All of the above',
    // Only 3 questions for this chapter
  ],
  'Chapter-8': [
    'Editing textual data',
    'Wordpad',
    'Control Panel',
    'System restore',
    'Notepad',
  ],
  'Chapter-9': ['MS-DOS', 'Date only', 'MD', 'CD', 'Internal'],
  'Chapter-10': [
    'All primary file name',
    'Virtual Memory',
    'First In First Out',
    'Main Memory',
    'internal and external',
  ],
};

// helpers
const normalize = v => (typeof v === 'string' ? v.trim().toLowerCase() : '');
const matches = (userValue, correctSpec) => {
  const u = normalize(userValue);
  const arr = Array.isArray(correctSpec) ? correctSpec : [correctSpec];
  return arr.some(c => normalize(c) === u);
};

function gradeChapter(chapterName, body) {
  const key = ANSWER_KEYS[chapterName];
  if (!key) return { correct: 0, wrongQs: [], total: 0 };

  // Gather responses in order; allow chapters with <5 questions
  const responses = [
    body.dcaMCQ1, body.dcaMCQ2, body.dcaMCQ3, body.dcaMCQ4, body.dcaMCQ5,
  ];

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
      totalMark: total,
      wrongQuestions: wrongQs,
      percentage: total ? Math.round((correct / total) * 100) : 0,
      dateSubmitted: new Date(),
    };

    await Student.findByIdAndUpdate(
      studentId,
      { $push: { assignmentTheory102: assignmentTheoryArray } },
      { new: false }
    );

    return res.redirect(req.get('referer') || '/');
  } catch (err) {
    console.error('Error during exam assignment record update : ', err);
    return res.redirect(req.get('referer') || '/');
  }
};
