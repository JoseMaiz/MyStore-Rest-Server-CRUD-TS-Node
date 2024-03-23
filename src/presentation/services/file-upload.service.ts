import { UploadedFile } from "express-fileupload";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { Uuuid } from '../../config/uuid';
import { CustomError } from "../../domain";


export class FileUploadService {

    constructor(
        private readonly uuid = Uuuid.v4,
    ){}

    private chechFolder( folderPath: string){
        if(!existsSync(folderPath)){

            mkdirSync(folderPath)
        }
    }

    public async uploadSingle(
        file: UploadedFile,
        folder: string = "uploads",
        validExtensions: string[] = ['png','jpg',"jpeg","gif"]
    ){

        try {

            const fileExtension = file.mimetype.split('/')[1];

            if(!validExtensions.includes(fileExtension)){
                throw CustomError.badRequest(`Invalid extension: ${fileExtension}, valid one ${validExtensions}`);
            }

            const destination = path.resolve(__dirname + '/../../../',folder)
            this.chechFolder(destination);

            const fileName = `${this.uuid()}.${fileExtension}`

            file.mv(`${destination}/${fileName}`);

            return {fileName};
            
        } catch (error) {
            throw error;
        }

    }
    public async uploadMultuple(
        files:UploadedFile[],
        folder: string = "uploads",
        validExtensions: string[] = ['png','jpg',"jpeg","gif"]
    ){

        const filesName = await Promise.all(
            files.map(file => this.uploadSingle(file,folder,validExtensions))
        )

        return filesName;
    }
}

