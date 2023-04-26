const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../jsonwebtoken/jwt');
const {
  getAllNotes,
  createNewNote,
  deleteNote,
  updateNote,
  getTitle,
} = require('../controller/note');
const {
  validateNewNoteRequest,
  validateTextAndTitle,
  validateParams,
  validateUpdateTitleOrText,
  validateTitle,
} = require('../middleware/note');

router.get('/', verifyToken, getAllNotes);
router.get('/search', verifyToken, validateTitle, getTitle);
router.delete('/:id', verifyToken, validateParams, deleteNote);

router.post(
  '/',
  validateNewNoteRequest,
  validateTextAndTitle,
  verifyToken,
  createNewNote
);

router.put(
  '/:id',
  verifyToken,
  validateParams,
  validateTextAndTitle,
  validateUpdateTitleOrText,
  updateNote
);

module.exports = router;
