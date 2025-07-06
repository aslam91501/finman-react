import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useCategoryData, useCurrentMonthBudget, useLast30DaysTransactions, useRecentIncomeAndExpense } from "./config/hooks"
import { Button, Card, Progress, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useEffect } from "react";


export const DashboardPage = () => {
    const lastMonthTransactionsQuery = useLast30DaysTransactions();
    const incomeExpenseQuery = useRecentIncomeAndExpense();
    const categoryDataQuery = useCategoryData();
    const budgetQuery = useCurrentMonthBudget();

    const categoryData = categoryDataQuery.data || { income: [], expenses: [] };
    const { income, expenses } = categoryData;

    // Combine both income and expenses for a single pie chart
    const combinedData = [
        ...income.map(item => ({ ...item, type: 'INCOME' })),
        ...expenses.map(item => ({ ...item, type: 'EXPENSE' }))
    ];

    useEffect(() => {
        console.log('Combined Data:', combinedData);
    }, [combinedData]);


    if (lastMonthTransactionsQuery.isLoading || incomeExpenseQuery.isLoading || categoryDataQuery.isLoading || budgetQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (lastMonthTransactionsQuery.error || incomeExpenseQuery.error || categoryDataQuery.error || budgetQuery.error) {
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

            <div className="flex flex-row gap-5 ">
                <Card className="p-5 w-1/2 border bg-white/80" shadow="none">
                    <h3 className="font-medium ml-1 mb-4">
                        Budget
                    </h3>
                    <div className="p-5">
                        {(budgetQuery.data && budgetQuery.data.budget) && <div className="mt-5 flex flex-col gap-3">
                            <Progress
                                color={
                                    budgetQuery.data.isOverBudget ? 'danger' : 'success'
                                }
                                value={(budgetQuery.data?.totalExpenses / budgetQuery.data?.budget.amount!) * 100} />

                            <p className="mt-5 flex flex-row gap-2"><span className="font-medium">Expenses:</span>{budgetQuery.data?.totalExpenses}</p>
                            <p className="flex flex-row gap-2"><span className="font-medium">Remaining:</span>{budgetQuery.data?.budget.amount - budgetQuery.data?.totalExpenses}</p>
                            <p className="flex flex-row gap-2"><span className="font-medium">Is Over Budget:</span>{budgetQuery.data?.isOverBudget ? 'Yes' : 'No'}</p>
                            <p className="flex flex-row gap-2"><span className="font-medium">Current Month:</span>{budgetQuery.data?.currentMonth}</p>
                            <p className="flex flex-row gap-2"><span className="font-medium">Current Year:</span>{budgetQuery.data?.currentYear}</p>
                        </div>}

                        {!budgetQuery.data || !budgetQuery.data.budget &&
                            <span>No Budget Set</span>
                        }
                    </div>
                </Card>


                <Card className="p-5 w-1/2 border bg-white/80" shadow="none">
                    <h3 className="font-medium ml-1 mb-4">
                        By Categories
                    </h3>

                    {combinedData.length > 0 ? (
                        <div style={{ width: '100%', height: '350px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    {/* Outer ring for expenses */}
                                    <Pie
                                        data={expenses}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={90}
                                        outerRadius={130}
                                        dataKey="value"
                                        nameKey="name"
                                        startAngle={90}
                                        endAngle={450}
                                        paddingAngle={2}
                                    >
                                        {expenses.map((entry, index) => (
                                            <Cell key={`expense-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>

                                    {/* Inner ring for income */}
                                    <Pie
                                        data={income}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={80}
                                        dataKey="value"
                                        nameKey="name"
                                        startAngle={90}
                                        endAngle={450}
                                        paddingAngle={2}
                                    >
                                        {income.map((entry, index) => (
                                            <Cell key={`income-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>


                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-gray-500">No category data available</p>
                        </div>
                    )}

                    {/* Legend */}
                    {combinedData.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <h4 className="font-medium text-green-700 mb-2">Income (Inner)</h4>
                                    {income.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 mb-1">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: item.fill }}
                                            />
                                            <span className="text-gray-700 text-xs truncate">
                                                {item.name}: ${item.value.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h4 className="font-medium text-red-700 mb-2">Expenses (Outer)</h4>
                                    {expenses.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 mb-1">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: item.fill }}
                                            />
                                            <span className="text-gray-700 text-xs truncate">
                                                {item.name}: ${item.value.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}