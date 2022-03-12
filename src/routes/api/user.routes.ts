import { Router } from 'express';
import * as controller from '../../controllers/user';
import authenticate_user from '../../middlewares/auth';
const routes = Router();

routes.post('/create', controller.create_user);
routes.get('/', authenticate_user, controller.get_users);
routes.get('/user/:id', authenticate_user, controller.get_a_user);
routes.put('/edit/:id', authenticate_user, controller.edit_user);
routes.delete('/delete/:id', authenticate_user, controller.delete_user);
routes.post('/login', controller.login);
export default routes;
