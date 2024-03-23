import { Response, Request } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from '../services/file-upload.service';
import { UploadedFile } from "express-fileupload";


export class FileUploadController {

    constructor(
        private readonly fileUploadService: FileUploadService
    ){}

    private handleErrror (error:unknown, res:Response) {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});
        }

        console.error(`${error}`);
        return res.status(500).json({error:'Internal Server error'})
    }

    uploadFile = (req:Request, res:Response)=>{

        const type = req.params.type;

        const file = req.body.files[0] as UploadedFile;

        this.fileUploadService.uploadSingle(file,`uploads/${type}`)
            .then(upload => res.json(upload))
            .catch(error => this.handleErrror(error, res))
    }

    uploadMultiFile = (req:Request, res:Response)=>{
        
        const type = req.params.type;        

        const files = req.body.files as UploadedFile[];

        this.fileUploadService.uploadMultuple(files,`uploads/${type}`)
            .then(upload => res.json(upload))
            .catch(error => this.handleErrror(error, res))
    }

}

