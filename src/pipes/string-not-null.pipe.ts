import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class StringNotNullPipe implements PipeTransform {

    transform(value: string, metadata: ArgumentMetadata) {
        if(!value) {
            throw new BadRequestException(`You must provide the value for the field '${metadata.data}'`);
        }

        return value.trim();
    }
}