import { server } from "../../common/config/server";
import type { NewTransactionRequest, Transaction } from "./models";

export const createNewTransaction = async (request: NewTransactionRequest) => {
    return await server.collection('transactions').create({
        ...request,
        user: request.userId,
        category: request.categoryId,
    })
}

export const getTransactions = async (userId: string, page: number) => {
    return await server.collection('transactions').getList<Transaction>(page, 10, {
        filter: `user.id="${userId}"`
    })
}
