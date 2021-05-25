import express from 'express';
import passport from 'passport';
import lichsangolfController from './lichhen.controller';

export const lichhenRouter = express.Router();
lichhenRouter
  .route('/')
  .get(lichsangolfController.findAll)
  .post(passport.authenticate('jwt', { session: false }), lichsangolfController.create)

lichhenRouter
  .route('/:id')
  .get(lichsangolfController.findOne)
  .put(passport.authenticate('jwt', { session: false }), lichsangolfController.update)
  .delete(passport.authenticate('jwt', { session: false }), lichsangolfController.delete);