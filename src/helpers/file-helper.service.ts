import { Injectable, NotFoundException } from "@nestjs/common";
import * as fs from 'fs';

@Injectable()
export class FileHelperService {

    constructor() { }

    read(path: string): string {
        if(!fs.existsSync(path)) {
            throw new NotFoundException(`Unable to find file to be read: ${path}`);
        }

        const buffer = fs.readFileSync(path);
        if(buffer == null) {
            throw new NotFoundException(`Buffer without content: ${path}`);
        }

        return buffer.toString();
    }

    remove(path: string): void {
        if(!fs.existsSync(path)) {
            throw new NotFoundException(`Unable to find file to be removed: ${path}`);
        }

        fs.unlinkSync(path);
    }
}