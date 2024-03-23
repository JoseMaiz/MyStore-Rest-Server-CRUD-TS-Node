import { NextFunction, Request, Response } from "express";


export class FileUploadMiddleware {

    static containFile(req:Request,res:Response, next:NextFunction){

        const files = req.files;

        if(!files || Object.keys(files).length === 0 ){
            return res.status(400).json({error: 'No files were selected'});
        }

        const file = req.files?.file

        if(!Array.isArray(file)){

            req.body.files = [file]
        }else{

            req.body.files = file;
        }

        next();

    }
}

