import { Router } from 'express';
import * as controller from '../../controllers/user';
const routes = Router();

routes.post('/create', controller.create_user);
routes.get('/', controller.get_users);
routes.get('/user/:id', controller.get_a_user);
routes.put('/edit/:id', controller.edit_user);
routes.delete('/delete/:id', controller.delete_user);

export default routes;
