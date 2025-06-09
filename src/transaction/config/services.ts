import { server } from "../../common/config/server";
import type { NewTransactionRequest, Transaction } from "./models";

export const createNewTransaction = async (request: NewTransactionRequest) => {
    return await server.collection('transactions').create({
        ...request
    })
}

export const getTransactions = async (page: number) => {
    return await server.collection('transactions').getList<Transaction>(page)
}
