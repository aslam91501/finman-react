import { server } from "../../common/config/server";
import type { CategoryCreateRequest, Category } from "./models";

export const createCategory = async (request: CategoryCreateRequest) => {
    return await server.collection('categories').create({
        ...request
    })
}


export const getCategories = async (userId: string) => {
    return await server.collection('categories').getFullList<Category>({
        filter: `user.id="${userId}"`
    });
}
