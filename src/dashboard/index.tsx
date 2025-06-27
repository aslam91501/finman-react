import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useLast30DaysTransactions, useRecentIncomeAndExpense } from "./config/hooks"
import { Button, Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";


export const DashboardPage = () => {
    const lastMonthTransactionsQuery = useLast30DaysTransactions();
    const incomeExpenseQuery = useRecentIncomeAndExpense();

    if (lastMonthTransactionsQuery.isLoading || incomeExpenseQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (lastMonthTransactionsQuery.error || incomeExpenseQuery.error) {
        return <div>Error: Could not fetch data</div>;
    }

    return (
        <div className="flex flex-col gap-10 pt-5">
            {/* <h1 className="text-2xl font-medium">Dashboard</h1> */}


            <div className="flex flex-row gap-5 ">
                <Card className="p-5 w-1/2 border bg-white/80" shadow="none">
                    <h3 className=" font-medium ml-4 mb-4">
                        Income (Last 30 days)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lastMonthTransactionsQuery.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="income"
                                stroke="#0185c2"
                                strokeWidth={2}
                                dot={{ fill: '#0185c2', strokeWidth: 2, r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                <Card className="p-5 w-1/2 border bg-white/80" shadow="none">
                    <h3 className="font-medium ml-4 mb-4">
                        Expense (Last 30 days)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lastMonthTransactionsQuery.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="expenses"
                                stroke="#ca5200"
                                strokeWidth={2}
                                dot={{ fill: '#ca5200', strokeWidth: 2, r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            <div className="flex flex-row gap-5 ">
                <Card className="p-5 w-1/2 border bg-white/80" shadow="none">
                    <h3 className="font-medium ml-1 mb-4">
                        Recent Expenses
                    </h3>
                    {incomeExpenseQuery.data &&
                        <Table
                            shadow="sm"
                            radius="sm"
                            removeWrapper
                            classNames={{
                                tr: ['border-b', 'hover:bg-gray-50', 'transition-all'],
                                th: ['first:rounded-none', 'last:rounded-none', 'p-4'],
                            }}
                        >
                            <TableHeader>
                                <TableColumn key="title" allowsSorting>Title</TableColumn>
                                <TableColumn key="amount" allowsSorting>Amount</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {incomeExpenseQuery.data.expenseItems.map(i => (
                                    <TableRow key={i.id}>
                                        <TableCell>{i.title}</TableCell>
                                        <TableCell>{i.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }

                    <Button className="mt-5 w-full" color="primary" variant="light">View All Transactions</Button>
                </Card>


                <Card className="p-5 w-1/2 border bg-white/80" shadow="none">
                    <h3 className="font-medium ml-1 mb-4">
                        Recent Income
                    </h3>
                    {incomeExpenseQuery.data &&
                        <Table
                            shadow="sm"
                            radius="sm"
                            removeWrapper
                            classNames={{
                                tr: ['border-b', 'hover:bg-gray-50', 'transition-all'],
                                th: ['first:rounded-none', 'last:rounded-none', 'p-4'],
                            }}
                        >
                            <TableHeader>
                                <TableColumn key="title" allowsSorting>Title</TableColumn>
                                <TableColumn key="amount" allowsSorting>Amount</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {incomeExpenseQuery.data.incomeItems.map(i => (
                                    <TableRow key={i.id}>
                                        <TableCell>{i.title}</TableCell>
                                        <TableCell>{i.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }

                    <Button className="mt-5 w-full" color="primary" variant="light">View All Transactions</Button>
                </Card>
            </div>
        </div>
    )
}