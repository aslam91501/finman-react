import type { RecordModel } from "pocketbase";
import type { Category } from "../../category/config/models";
import { server } from "../../common/config/server";
import type { NewTransactionRequest, Transaction, UpdateTransactionRequest } from "./models";
import type { PageResult } from "../../common/config/models";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import type { TransactionFilters } from "./stores";
import { format } from "date-fns";

export const createNewTransaction = async (request: NewTransactionRequest) => {
    return await server.collection('transactions').create({
        ...request,
        user: request.userId,
        category: request.categoryId,
        date: format(request.date, 'yyyy-MM-dd')
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

    if (filters.categoryId) {
        filter += ` && category.id="${filters.categoryId}"`;
    }

    if (filters.date) {
        filter += ` && date="${format(filters.date, 'yyyy-MM-dd')}"`;
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
        date: format(request.date, 'yyyy-MM-dd')
    })
}

export async function exportToExcel(data: Transaction[], fileName: string) {
    const transformedData = data.map(item => {
        return {
            title: item.title,
            amount: item.amount,
            type: item.type,
            date: item.date,
            category: item.category?.name,
            notes: item.notes
        }
    })

    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(blob, `${fileName}.xlsx`);
}