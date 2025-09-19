// controllers/assignments/insertAssignmentRecord105.js
const Student = require('../models/Student')

// Centralized answer keys (strings or arrays for synonyms)
const ANSWER_KEYS = {
  'Chapter-1': ['Lasso', 'Brush tool', 'Blur Tool', 'Custom Shape tool', 'Hand tool'],
  'Chapter-2': ['72 to 96 ppi', 'Three dimensional', 'PNG', 'Cloning image', 'vector and raster'],
  'Chapter-3': ['Duplicating', 'Clipping group', 'Eye icon', 'Grouping', 'Layer > New > Layer...'],
  'Chapter-4': ['Alpha', 'Right', 'Black and white', 'Layer menu > Remove layer mask > apply', '8-bit'],
  'Chapter-5': ['Gradient', 'unmask', 'Layers', 'Image > adjustment'], // 4 questions
  'Chapter-6': ['linked', 'Window > Styles', 'Add a layer style'], // 3 questions
  'Chapter-7': ['path selection tool', 'Curve segment', 'pen tool', 'make work path', 'The Pen Tool'],
  'Chapter-8': ['Image > Adjustments > Levels...', 'Color balance', 'Color Levels'], // 3
  'Chapter-9': ['-100 to +100', '10% to 300%', 'Hue', 'Sponge', 'Brightness'],
  'Chapter-10': ['24', 'Identical pixels dimensions', 'Grayscale', 'Channel palette menu', 'History palette'],
  'Chapter-11': ['Masking', 'quick mask mode', '8 bit'], // 3
  'Chapter-12': ['Render', '50-300mm zoom, 55mm prime, 105mm prime', 'Liquify filter', 'Tile filter', 'a 3D effect'],
  'Chapter-13': ['Photoshop', 'ImageReady', '1 to 999', 'Rasterizing', 'Eyedropper'],
};

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
      dcaMCQ1, dcaMCQ2, dcaMCQ3, dcaMCQ4, dcaMCQ5,
    } = req.body;

    if (!studentId || !chapterName) {
      return res.redirect(req.get('referer') || '/');
    }

    const { correct, wrongQs, total } = gradeChapter(chapterName, req.body);

    const record = {
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
      { $push: { assignmentTheory105: record } },
      { new: false }
    );

    return res.redirect(req.get('referer') || '/');
  } catch (err) {
    console.error('Error during exam assignment record update:', err);
    return res.redirect(req.get('referer') || '/');
  }
};
