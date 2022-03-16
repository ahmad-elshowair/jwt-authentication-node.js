import { Router } from 'express';
import * as controller from '../../controllers/user';
import authenticate_user from '../../middlewares/auth';
const routes = Router();

routes.route('/create').post(controller.create_user);
routes.route('/').get(authenticate_user, controller.get_users);
routes.route('/user/:id').get(authenticate_user, controller.get_a_user);
routes.route('/edit/:id').patch(authenticate_user, controller.edit_user);
routes.route('/delete/:id').delete(authenticate_user, controller.delete_user);
routes.route('/login').post(controller.login);
export default routes;
