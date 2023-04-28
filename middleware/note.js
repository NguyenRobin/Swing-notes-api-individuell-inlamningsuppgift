const { findNote, findNoteTitle } = require('../model/note');

async function validateNewNoteRequest(request, response, next) {
  const { title, text } = request.body;
  if (!title || !text) {
    response.status(400).json({
      status: false,
      message: " 'title' & 'text' is required. please try again",
    });
  } else {
    next();
  }
}

async function validateTextAndTitle(request, response, next) {
  const { title, text } = request.body;
  const titleMaxLength = 50;
  const textMaxLength = 300;

  if (
    title &&
    text &&
    title.length > titleMaxLength &&
    text.length > textMaxLength
  ) {
    return response.status(403).json({
      status: true,
      message: `Invalid title and text size. Title must be lower than ${titleMaxLength} characters and text lower than ${textMaxLength} characters`,
    });
  }
  if (title && title.length > titleMaxLength) {
    return response.status(403).json({
      status: true,
      message: `Invalid title size. Title must be lower than ${titleMaxLength} characters`,
    });
  }
  if (text && text.length > textMaxLength) {
    return response.status(403).json({
      status: true,
      message: `Invalid text size. Text must be lower than ${textMaxLength} characters`,
    });
  } else {
    next();
  }
}

async function validateParams(request, response, next) {
  const { id } = request.params;
  const noteExists = await findNote(id);
  if (noteExists) {
    next();
  } else {
    response
      .status(404)
      .json({ status: false, message: 'No matching ID found!' });
  }
}

async function validateUpdateTitleOrText(request, response, next) {
  const { title, text } = request.body;
  if (title || text) {
    next();
  } else {
    response.status(400).json({
      status: false,
      message: " 'title' or 'text' is required. Please try again",
    });
  }
}

async function validateTitle(request, response, next) {
  const { title } = request.query;
  const titleExist = await findNoteTitle(title);
  if (titleExist && titleExist.length > 0) {
    next();
  } else {
    response
      .status(404)
      .json({ status: false, message: `Title: '${title}', not found` });
  }
}

module.exports = {
  validateNewNoteRequest,
  validateTextAndTitle,
  validateParams,
  validateUpdateTitleOrText,
  validateTitle,
};
