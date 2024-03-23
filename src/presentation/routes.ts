import { Router } from 'express';
import { AuthRoutes } from './auth/routes.auth';
import { CategoryRoutes } from './category/routes.category';
import { ProductRoutes } from './products/routes.products';
import { FileUploadRoutes } from './file-upload/routes.file-upload';
import { ImageRoutes } from './image/routes.image';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth',AuthRoutes.routes );
    router.use('/api/categories',CategoryRoutes.routes );
    router.use('/api/products',ProductRoutes.routes );
    router.use('/api/upload',FileUploadRoutes.routes );
    router.use('/api/images',ImageRoutes.routes );



    return router;
  }


}

