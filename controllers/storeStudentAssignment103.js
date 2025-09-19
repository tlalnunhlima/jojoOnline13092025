// controllers/assignments/insertAssignmentRecord103.js
const Student = require('../models/Student');

// 1) CENTRALIZED ANSWER KEYS (strings or arrays for synonyms)
const ANSWER_KEYS = {
  'Chapter-1': ['2007', '10,500', 'Option buttons', 'Save as', 'Ctrl + P'],

  'Chapter-2': [
    'Formatting',
    'All of the above',
    'Alignment',
    'Header',
    '4 paragraphs and 2 sentences of text',
  ],

  'Chapter-3': ['AutoCorrect', 'AutoCorrect'], // 2 questions

  'Chapter-4': ['red', 'F7', 'Ctrl + W', 'All of the above', 'Ctrl + K'],

  'Chapter-5': ['Replace All', 'Find'], // 2 questions

  'Chapter-6': [
    'Portrait',
    'format painter',
    'subscript and superscript',
    '2',
    'Ruler',
  ],

  'Chapter-7': ['All of these', 'WordArt', 'Clipart'], // 3 questions

  'Chapter-8': ['rows and columns', 'Tab', 'Blank'], // 3 questions

  'Chapter-9': ['Mail Merge', 'data source', '.accdb', 'paragraph'], // 4

  'Chapter-10': ['16384, 1048576', 'AutoFill', 'left, right'], // 3

  'Chapter-11': ['=', 'worksheets', 'tab', 'Insert function'], // 4

  'Chapter-12': ['Cell referencing', 'mixed', 'E$4', 'relative'], // 4

  'Chapter-13': ['F2', 'Range', 'Print Preview', 'All of the above', '5,436.80'],

  'Chapter-14': [
    'MAX()',
    'Sorting',
    'Conditional',
    'AutoSum',
    '=IF(LogicalTest, TrueResult, FalseResult)',
  ],

  'Chapter-15': [
    'Data table',
    '=power(2,3)',
    'What-if analysis',
    'Sort and Filter',
  ], // 4

  'Chapter-16': ['Data series', 'Pie', 'True', 'Both of the above'], // 4

  'Chapter-17': ['Presentation', 'Ctrl + M', '.pptx', 'arrange'], // 4

  'Chapter-18': ['Slide sorter', 'F5', 'Esc', 'From beginning'], // 4

  'Chapter-19': [
    'New Slide',
    'Office button',
    'Slide Shorter',
    'From New Slide button, choose duplicate selected slide',
    'Slide Orientation',
  ],

  'Chapter-20': [
    'Slide Master',
    'Rehearse Timings',
    'Grouping',
    '=Now()',
    'Transition',
  ],
};

// 2) Helpers: normalization + synonym match
const normalize = v => (typeof v === 'string' ? v.trim().toLowerCase() : '');
const matches = (userValue, correctSpec) => {
  const u = normalize(userValue);
  const arr = Array.isArray(correctSpec) ? correctSpec : [correctSpec];
  return arr.some(c => normalize(c) === u);
};

// 3) Grade any chapter using the key
function gradeChapter(chapterName, body) {
  const key = ANSWER_KEYS[chapterName];
  if (!key) return { correct: 0, wrongQs: [], total: 0 };

  const responses = [body.dcaMCQ1, body.dcaMCQ2, body.dcaMCQ3, body.dcaMCQ4, body.dcaMCQ5];

  let correct = 0;
  const wrongQs = [];
  for (let i = 0; i < key.length; i++) {
    const expected = key[i];             // string or array
    const provided = responses[i] ?? ''; // allow fewer than 5 answers
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
      { $push: { assignmentTheory103: assignmentTheoryArray } }, // keeps your target array
      { new: false }
    );

    return res.redirect(req.get('referer') || '/');
  } catch (err) {
    console.error('Error during exam assignment record update : ', err);
    return res.redirect(req.get('referer') || '/');
  }
};
