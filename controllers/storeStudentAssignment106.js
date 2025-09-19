const Student = require('../models/Student');

// One source of truth: Q1..Qn in order for each chapter
const ANSWERS = {
  'Chapter-1':  ['Ruler', '1985', 'Revert', 'Ctrl + Shift + \\', 'Bullet and Numbering'],
  'Chapter-2':  ['Save as', 'Aldus Manucius', 'Dimensions', 'Document Setup', 'Bleed'],
  'Chapter-3':  ['Pointer tool', 'Object', 'Rounded Corners', 'Autoflow', '100'],
  'Chapter-4':  ['Top', 'Text block', 'Layout', 'Application software', 'Document'],
  'Chapter-5':  ['Place', 'Cropping', 'Morphing', 'Element', 'Text wrap'],
  'Chapter-6':  ['Shift + tab', 'Control palette', 'Sorting pages', 'Grouping', 'Control palette'],
  'Chapter-7':  ['Not editable', 'Character specification', 'fully justified', 'Gutter', 'Keyline'],
  'Chapter-8':  ['Master Page', '1 to 999', 'Kerning', 'Ctrl+Shift+P', 'Master page'],
  'Chapter-9':  ['Apply button', 'Leading', 'One point line', 'Alt+G', '5'],
  'Chapter-10': ['Story Editor', 'Story Editor', 'Spelling', 'Utilities', 'Layout Editor'],
  'Chapter-11': ['Desktop publishing', 'Define style', 'Automatically'],
  'Chapter-12': ['Table of Content', 'TINT', 'Primary'],
  'Chapter-13': ['Ctrl+Alt+]', 'Frame option', 'Inset'],
  'Chapter-14': ['Layers palette', 'Layers', 'Cutting'],
};

const norm = s => (s ?? '').toString().trim().toLowerCase();

module.exports = async (req, res) => {
  try {
    await insertAssignmentRecord(req, res);
  } catch (err) {
    console.error('Error during exam assignment record update:', err);
    if (!res.headersSent) res.redirect(req.get('referer'));
  }
};

async function insertAssignmentRecord(req, res) {
  const { _id, subjectName, chapterName } = req.body;

  const key = ANSWERS[chapterName];
  if (!key) {
    console.warn('Unknown chapterName:', chapterName);
    if (!res.headersSent) res.redirect(req.get('referer'));
    return;
  }

  // Collect the student’s answers in order (Q1..Qn) based on the key length
  const userAnswers = key.map((_, i) => req.body[`dcaMCQ${i + 1}`]);

  // Grade
  let score = 0;
  const wrongQuestions = [];
  userAnswers.forEach((ans, i) => {
    if (norm(ans) === norm(key[i])) score++;
    else wrongQuestions.push(`Q${i + 1}`);
  });

  // Build the subdocument (keep your existing field names)
  const assignmentTheoryArray = {
    subjectName,
    chapterName,
    mcq1: userAnswers[0],
    mcq2: userAnswers[1],
    mcq3: userAnswers[2],
    mcq4: userAnswers[3],
    mcq5: userAnswers[4],
    Scored: score,
    totalMark: key.length,
    wrongQuestions,          // optional but useful
    submittedAt: new Date()
  };

  // Prevent duplicate submission for the same chapter (remove the guard to allow multiple attempts)
  const result = await Student.updateOne(
  { _id },
  { $push: { assignmentTheory106: assignmentTheoryArray } }
);


  if (result.modifiedCount === 0) {
    console.log(`Submission for ${chapterName} already exists for student ${_id}. Skipping push.`);
    // If you want multiple attempts instead:
    // await Student.updateOne({ _id }, { $push: { assignmentTheory106: assignmentTheoryArray } });
  } else {
    console.log('assignment updated - miau miau');
  }

  if (!res.headersSent) res.redirect(req.get('referer'));
}
