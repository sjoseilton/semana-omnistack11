const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); // usada para fazer validacoes
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionControler = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
  [Segments.BODY] : Joi.object().keys({
    // descrever cada uma das informacoes
    name: Joi.string().required(),
	  email: Joi.string().required().email(),
	  whatsapp: Joi.string().required().min(10).max(11),
	  city: Joi.string().required().min(3),
	  uf: Joi.string().required().length(2),
  }),
}), OngController.create);

routes.get('/profile', celebrate({
  [Segments.HEADERS] : Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);

routes.post('/incidents', celebrate({
  [Segments.HEADERS] : Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    // descrever cada uma das informacoes
    occurrence: Joi.string().required(),
	  description: Joi.string().required(),
	  value: Joi.number().required().positive(),
  }),
}), IncidentController.create);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  }),
}),IncidentController.index);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
}), IncidentController.delete);

routes.post('/session', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), SessionControler.create);


// serve para expor uma rota
module.exports = routes;