import type { RecordModel } from "pocketbase";
import type { Category } from "../../category/config/models";
import { server } from "../../common/config/server";
import type { NewTransactionRequest, Transaction, UpdateTransactionRequest } from "./models";
import type { PageResult } from "../../common/config/models";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import type { TransactionFilters } from "./stores";

export const createNewTransaction = async (request: NewTransactionRequest) => {
    return await server.collection('transactions').create({
        ...request,
        user: request.userId,
        category: request.categoryId,
    })
}

export const getTransactions = async (userId: string, filters: TransactionFilters) => {
    let filter = `user.id="${userId}"`;

    if (filters.search) {
        filter += ` && (title ~ "${filters.search}" || notes ~ "${filters.search}")`;
    }

    if (filters.type !== 'ALL') {
        filter += ` && type="${filters.type}"`;
    }

    let result = await server.collection('transactions').getList(filters.page, 10, {
        filter,
        sort: filters.sortDirection === 'ascending' ? `${filters.sortColumn}` : `-${filters.sortColumn}`,
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

export async function exportToExcel<T>(data: T[], fileName: string) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(blob, `${fileName}.xlsx`);
}