

import { Router } from 'express';
import { userRoutes } from './../v1/routes/user.route';

const API_VERSION = 'v1';

const apiRoutes = Router();

apiRoutes.use(`/${API_VERSION}/user`, userRoutes);

export { apiRoutes };