import type { RecordModel } from "pocketbase";
import type { Category } from "../../category/config/models";
import { server } from "../../common/config/server";
import type { NewTransactionRequest, Transaction, UpdateTransactionRequest } from "./models";
import type { PageResult } from "../../common/config/models";

export const createNewTransaction = async (request: NewTransactionRequest) => {
    return await server.collection('transactions').create({
        ...request,
        user: request.userId,
        category: request.categoryId,
    })
}

export const getTransactions = async (userId: string, page: number) => {
    let result = await server.collection('transactions').getList(page, 10, {
        filter: `user.id="${userId}"`,
        expand: 'category'
    })

    const newItems: Transaction[] = [];

    result.items.forEach(item => {
        newItems.push({
            ...item as unknown as Transaction,
            category: item.expand?.category as Category
        })
    })

    result.items = newItems as unknown as RecordModel[];

    return result as unknown as PageResult<Transaction>;
}



export const deleteTransaction = async (id: string) => {
    return await server.collection('transactions').delete(id)
}

export const updateTransaction = async (request: UpdateTransactionRequest) => {
    return await server.collection('transactions').update(request.id, {
        ...request,
        category: request.categoryId,
    })
}
