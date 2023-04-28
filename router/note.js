const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../jsonwebtoken/jwt');
const {
  validateNewNoteRequest,
  validateTextAndTitle,
  validateParams,
  validateUpdateTitleOrText,
  validateTitle,
} = require('../middleware/note');
const {
  getAllNotes,
  createNewNote,
  deleteNote,
  updateNote,
  getTitle,
} = require('../controller/note');

router.get('/', verifyToken, getAllNotes);
router.get('/search', verifyToken, validateTitle, getTitle);
router.delete('/:id', verifyToken, validateParams, deleteNote);

router.post(
  '/',
  verifyToken,
  validateNewNoteRequest,
  validateTextAndTitle,
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
