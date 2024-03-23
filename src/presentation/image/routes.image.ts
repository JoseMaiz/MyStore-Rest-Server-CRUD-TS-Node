import { Router } from "express";
import { ImageController } from "./controller.image";


export class ImageRoutes {

    static get routes(): Router {

        const router = Router();

        // const fileUploadService = new FileUploadService();

        const controller = new ImageController();
        
        // router.use(FileUploadMiddleware.containFile);
        
        //* All routes
        router.get('/:type/:img',controller.getImage);

        return router;
    }

}

