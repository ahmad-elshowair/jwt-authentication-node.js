import { Router } from 'express';
import * as controller from '../../controllers/user';
const routes = Router();

routes.post('/create', controller.create);

export default routes;
