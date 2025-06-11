import { server } from "../../common/config/server";
import type { CategoryCreateRequest, CategoryUpdateRequest, Category } from "./models";

export const createCategory = async (request: CategoryCreateRequest) => {
    return await server.collection('categories').create({
        ...request,
        user: request.userId
    })
}


export const getCategories = async (userId: string) => {
    return await server.collection('categories').getFullList<Category>({
        filter: `user.id="${userId}"`
    });
}


export const updateCategory = async (request: CategoryUpdateRequest) => {
    return await server.collection('categories').update(request.id, {
        ...request
    })
}


export const deleteCategory = async (id: string) => {
    const transactionsInCategory = await server.collection('transactions').getList(1, 1, {
        filter: `category.id="${id}"`,
        expand: 'category'
    })

    if (transactionsInCategory.items.length > 0) {
        throw new Error('Category has transactions')
    }

    return await server.collection('categories').delete(id);
}