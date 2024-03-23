import { Router } from 'express';
import { FileUploadController } from './controller.file-upload';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';



export class FileUploadRoutes {


    static get routes(): Router {

        const router = Router();

        const fileUploadService = new FileUploadService();

        const controller = new FileUploadController(fileUploadService);
        
        router.use(FileUploadMiddleware.containFile);
        
        //* All routes
        router.post('/single/:type',[TypeMiddleware.validtype(['users', 'products', 'categories'])] ,controller.uploadFile);
        router.post('/multiple/:type',[TypeMiddleware.validtype(['users', 'products', 'categories'])] , controller.uploadMultiFile);


        return router;
    }


}

