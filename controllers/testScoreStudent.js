const testScore = require('../models/studentScore.model');

// Allowed fields (whitelist to avoid mass assignment)
const ALLOWED_FIELDS = [
  'nameOfSubject',
  'chapterNo',
  'assignmentNo1',
  'assignmentNo2',
  'assignmentNo3',
  'assignmentNo4',
  'assignmentNo5',
  'markObtained',
  'totalMark'
];

module.exports = async (req, res) => {
  try {
    // Decide insert vs update by presence of _id
    if (!req.body._id) {
      await insertRecord(req, res);
    } else {
      await updateRecord(req, res);
    }
  } catch (err) {
    console.error('Unexpected error in testScore controller:', err);
    req.flash?.('error', 'Something went wrong. Please try again.');
    return res.redirect(req.get('referer') || '/');
  }
};

function pick(obj, keys) {
  const out = {};
  for (const k of keys) if (Object.prototype.hasOwnProperty.call(obj, k)) out[k] = obj[k];
  return out;
}

function normalizeScorePayload(body) {
  // Coerce numbers safely; leave strings trimmed
  const payload = pick(body, ALLOWED_FIELDS);

  // Trim strings
  if (payload.nameOfSubject != null) payload.nameOfSubject = String(payload.nameOfSubject).trim();

  // Numeric coercion (allow blank -> NaN -> handled below)
  const num = (v) => (v === '' || v == null ? NaN : Number(v));
  ['chapterNo', 'assignmentNo1', 'assignmentNo2', 'assignmentNo3', 'assignmentNo4', 'assignmentNo5', 'markObtained', 'totalMark']
    .forEach((k) => {
      if (payload[k] !== undefined) payload[k] = num(payload[k]);
    });

  // Basic validations
  const errors = [];
  if (!payload.nameOfSubject) errors.push('Subject is required.');
  if (!Number.isFinite(payload.chapterNo) || payload.chapterNo <= 0) errors.push('Chapter number must be a positive number.');

  // Optional: assignments can be empty/NaN; if provided, validate non-negative
  ['assignmentNo1','assignmentNo2','assignmentNo3','assignmentNo4','assignmentNo5'].forEach((k) => {
    if (payload[k] !== undefined && payload[k] !== null && payload[k] !== '' && !Number.isFinite(payload[k])) {
      errors.push(`${k} must be a number.`);
    }
    if (Number.isFinite(payload[k]) && payload[k] < 0) errors.push(`${k} cannot be negative.`);
  });

  if (!Number.isFinite(payload.totalMark) || payload.totalMark <= 0) errors.push('Total mark must be a positive number.');
  if (!Number.isFinite(payload.markObtained) || payload.markObtained < 0) errors.push('Mark obtained must be 0 or more.');
  if (Number.isFinite(payload.markObtained) && Number.isFinite(payload.totalMark) && payload.markObtained > payload.totalMark) {
    errors.push('Mark obtained cannot exceed total mark.');
  }

  return { payload, errors };
}

async function insertRecord(req, res) {
  const { payload, errors } = normalizeScorePayload(req.body);

  if (errors.length) {
    req.flash?.('validationErrors', errors);
    req.flash?.('data', req.body);
    return res.redirect('/student/testPage');
  }

  try {
    const scoreDetail = new testScore(payload);
    await scoreDetail.save();
    return res.redirect('/');
  } catch (err) {
    if (err?.errors) {
      const validationErrors = Object.keys(err.errors).map((k) => err.errors[k].message);
      req.flash?.('validationErrors', validationErrors);
      req.flash?.('data', req.body);
      return res.redirect('/student/testPage');
    }
    console.error('Insert testScore error:', err);
    req.flash?.('error', 'Could not save score.');
    return res.redirect('/student/testPage');
  }
}

async function updateRecord(req, res) {
  const id = req.body._id;
  if (!id) {
    req.flash?.('error', 'Missing record id.');
    return res.redirect(req.get('referer') || '/');
  }

  const { payload, errors } = normalizeScorePayload(req.body);
  if (errors.length) {
    req.flash?.('validationErrors', errors);
    req.flash?.('data', req.body);
    return res.redirect('/student/testPage');
  }

  try {
    // whitelist fields on update; prevent arbitrary field overwrite
    const updated = await testScore.findOneAndUpdate(
      { _id: id },
      { $set: payload },
      { new: true, runValidators: true }
    );
    if (!updated) {
      req.flash?.('error', 'Score record not found.');
      return res.redirect(req.get('referer') || '/');
    }
    console.log('miau miau score updated');
    return res.redirect('/');
  } catch (err) {
    console.error('Error during score record update:', err);
    req.flash?.('error', 'Could not update score.');
    return res.redirect(req.get('referer') || '/');
  }
}
