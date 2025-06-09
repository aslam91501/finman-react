import { server } from "../../common/config/server";
import type { NewTransactionRequest } from "./models";

export const createNewTransaction = async (request: NewTransactionRequest) => {
    return await server.collection('transactions').create({
        ...request
    })
}