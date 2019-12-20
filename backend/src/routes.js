import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import MembershipController from './app/controllers/MembershipController';
import CheckinController from './app/controllers/CheckinController';
import GymHelpOrderController from './app/controllers/GymHelpOrderController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';
import StudentSessionController from './app/controllers/StudentSessionController';

import authMiddleware from './app/middlewares/auth';
import studentMiddleware from './app/middlewares/student';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/students/:id', studentMiddleware, StudentSessionController.index);

routes.post(
  '/students/:id/checkins',
  studentMiddleware,
  CheckinController.store
);
routes.get(
  '/students/:id/checkins',
  studentMiddleware,
  CheckinController.index
);

routes.post(
  '/students/:id/help-orders',
  studentMiddleware,
  StudentHelpOrderController.create
);
routes.get(
  '/students/:id/help-orders',
  studentMiddleware,
  StudentHelpOrderController.index
);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/memberships', MembershipController.index);
routes.post('/memberships', MembershipController.store);
routes.put('/memberships/', MembershipController.update);
routes.delete('/memberships/:id', MembershipController.delete);

routes.get('/help-orders/unanswer', GymHelpOrderController.index);
routes.post('/help-orders/:id/answer', GymHelpOrderController.create);

export default routes;
