import { MessageResponseDTO } from "./message-response.dto";

export class ResponseWithCollectionDTO<T> extends MessageResponseDTO {
    collection: T[];
}