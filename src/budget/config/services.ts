import { server } from "../../common/config/server";
import { type Budget, type BudgetRequest } from "./models";

export const setBudget = async (req: BudgetRequest) => {
    const id = `${req.year}-${req.month < 10 ? '0' + req.month : req.month}`

    try {
        const exist = await server.collection('budget').getOne(id)
        await server.collection('budget').update(exist.id, {
            ...req
        })
    } catch (error) {
        await server.collection('budget').create({
            id,
            user: req.userId,
            ...req
        })
    }
}

export const deleteBudget = async (month: number, year: number) => {
    const id = `${year}-${month < 10 ? '0' + month : month}`
    await server.collection('budget').delete(id)
}


export const getBudgetList = async (userId: string, year?: number) => {
    const selectedYear = year || (new Date()).getFullYear()

    return await server.collection('budget').getFullList<Budget>({
        filter: `user.id="${userId}" && year=${selectedYear}`
    })
}