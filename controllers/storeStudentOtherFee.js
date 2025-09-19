const Student = require('../models/Student');
const moment = require('moment');

module.exports = async (req, res) => {
  try {
    await insertFeeRecord(req, res);
  } catch (err) {
    console.error('Unexpected error in insertFeeRecord:', err);
    req.flash?.('error', 'Could not save other fee. Please try again.');
    return res.redirect(req.get('referer') || '/');
  }
};

async function insertFeeRecord(req, res) {
  const { _id: studentId, narrationInput, feeAmount, dateofpayment, remarks } = req.body;

  // Basic guards
  if (!studentId) {
    req.flash?.('error', 'Missing student id.');
    return res.redirect(req.get('referer') || '/');
  }
  if (!req.session?.userId) {
    req.flash?.('error', 'Not authorized.');
    return res.redirect(req.get('referer') || '/');
  }

  // Amount: cast & sanity-check
  const amount = Number(feeAmount);
  if (!Number.isFinite(amount) || amount <= 0 || amount > 1_000_000) {
    req.flash?.('error', 'Invalid fee amount.');
    return res.redirect(req.get('referer') || '/');
  }

  // Date: strict DD/MM/YYYY; store as a real Date (ISO in Mongo)
  const m = moment(dateofpayment, 'DD/MM/YYYY', true);
  const paymentDate = m.isValid() ? m.toDate() : new Date();

  // Text inputs: trim & cap length to protect DB/UI
  const narration = String(narrationInput || '').trim().slice(0, 200);
  const safeRemarks = String(remarks || '').trim().slice(0, 200);

  const otherFeePayment = {
    narrationInput: narration,
    feeAmount: amount,
    dateofpayment: paymentDate,
    remarks: safeRemarks,
    verifierId: req.session.userId,
    createdAt: new Date(),
  };

  await Student.findByIdAndUpdate(
    studentId,
    { $push: { studentOtherFee: otherFeePayment } },
    { new: false, runValidators: true }
  );

  req.flash?.('success', 'Other fee recorded.');
  return res.redirect(`/computer/${studentId}`);
}
