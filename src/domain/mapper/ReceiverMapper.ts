import { GetAllReceiverOutput } from "../dto/GetAllReceiverOutput";
import { ReceiverInput } from "../dto/ReceiverInput";
import { ReceiverOutput } from "../dto/ReceiverOutput";
import { PixKeyType } from "../PixKeyType";
import Receiver from "../Receiver";
import { ReceiverStatus } from "../ReceiverStatus";

export function inputToDomain(input: ReceiverInput): Receiver {
    return new Receiver(
        input.id ?? undefined,
        input.name,
        input.email,
        input.status as ReceiverStatus,
        input.pixKeyType as PixKeyType,
        input.pixKey,
    )
}

export function dbToDomain(row: any): Receiver {
    if(!row) return undefined;
    return new Receiver(
        row.id,
        row.name,
        row.email,
        row.status as ReceiverStatus,
        row.pix_key_type as PixKeyType,
        row.pix_key
    )
}

export function dbToOutputWithPaginate(rows: any, currentPage: number, totalPages): GetAllReceiverOutput {
    const output = {
        totalPages: parseInt(totalPages), 
        currentPage,
        data: rows.map(dbToDomain)
    }

    return output;
}

export function domainToOutput(domain: Receiver): ReceiverOutput {
    const { id, name, email, status, pixKeyType, pixKey} = domain;

    const output: ReceiverOutput = {
        id, name, email, status, pixKeyType, pixKey
    }

    return output;
}