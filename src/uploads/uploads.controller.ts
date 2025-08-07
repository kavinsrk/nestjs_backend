import {
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
    BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('files')
export class UploadsController {
    @Post('upload')
    @UseInterceptors(
        FilesInterceptor('files', 10, {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
                    cb(null, uniqueName);
                },
            }),
            fileFilter: (req, file, cb) => {
                const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|docx|txt|xlsx|csv|mp4|mp3|zip/;
                const ext = extname(file.originalname).toLowerCase().substring(1);
                if (allowedTypes.test(ext)) {
                    cb(null, true);
                } else {
                    cb(new BadRequestException('Unsupported file type'), false);
                }
                console.log('Uploading:', file.originalname);
                console.log('Extension:', ext);

            },
        }),
    )
    uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
        if (!files || files.length === 0) {
            throw new BadRequestException('No files uploaded');
        }

        return files.map((file) => ({
            originalName: file.originalname,
            storedAs: file.filename,
            filePath: `/uploads/${file.filename}`,
        }));
    }
}
