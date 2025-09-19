const Student = require('../models/Student');
const moment = require('moment');

module.exports = async (req, res) => {
  try {
    await insertFeeRecord(req, res);
  } catch (err) {
    console.error('Unexpected error in insertFeeRecord:', err);
    req.flash?.('error', 'Could not save fee payment. Please try again.');
    return res.redirect(req.get('referer') || '/');
  }
};

async function insertFeeRecord(req, res) {
  const { _id: studentId, narrationInput, feeAmount, dateofpayment } = req.body;

  // Basic guards
  if (!studentId) {
    req.flash?.('error', 'Missing student id.');
    return res.redirect(req.get('referer') || '/');
  }
  if (!req.session?.userId) {
    // ensure you have auth middleware; this is just a second line of defense
    req.flash?.('error', 'Not authorized.');
    return res.redirect(req.get('referer') || '/');
  }

  // Validate and coerce amount
  const amount = Number(feeAmount);
  if (!Number.isFinite(amount) || amount <= 0 || amount > 1_000_000) {
    req.flash?.('error', 'Invalid fee amount.');
    return res.redirect(req.get('referer') || '/');
  }

  // Strict date parsing: expects DD/MM/YYYY, falls back to today if invalid
  const m = moment(dateofpayment, 'DD/MM/YYYY', true);
  const paymentDate = m.isValid() ? m.toDate() : new Date();

  // Sanitize narration (keep it short to protect the DB/UI)
  const narration = String(narrationInput || '').trim().slice(0, 200);

  const examFeePayment = {
    narrationInput: narration,
    feeAmount: amount,
    dateofpayment: paymentDate,   // store as Date (ISO in Mongo)
    verifierId: req.session.userId,
    createdAt: new Date()
  };

  await Student.findByIdAndUpdate(
    studentId,
    { $push: { studentExamFee: examFeePayment } },
    { new: false, runValidators: true }
  );

  req.flash?.('success', 'Exam fee recorded.');
  return res.redirect(`/computer/${studentId}`);
}
