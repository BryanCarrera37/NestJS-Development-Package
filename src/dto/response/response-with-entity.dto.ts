import { MessageResponseDTO } from "./message-response.dto";

export class ResponseWithEntityDTO<T> extends MessageResponseDTO {
    entity: T;
}