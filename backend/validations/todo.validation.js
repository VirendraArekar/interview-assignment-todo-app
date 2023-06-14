const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createTodo = {
  body: Joi.object().keys({
    task: Joi.string().required(),
    priority: Joi.number().required(),
    status: Joi.string(),
  }),
};

const getTodo = {
  query: Joi.object().keys({
    search: Joi.string(),
    page : Joi.number(),
    perPage : Joi.number()
  }),
};

const getTodoById = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const updateTodo = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      task: Joi.string(),
      priority: Joi.number(),
      status: Joi.string(),
    })
    .min(1),
};

const deleteTodo = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTodo,
  getTodoById,
  getTodo,
  updateTodo,
  deleteTodo,
};