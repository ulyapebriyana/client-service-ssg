import prisma from "@/lib/db";
import moment from "moment";

const startOfMonth = moment().startOf("month").toISOString();
const endOfMonth = moment().endOf("month").toISOString();
const startOfLastMonth = moment().subtract(1, 'month').startOf('month').toISOString();
const endOfLastMonth = moment().subtract(1, 'month').endOf('month').toISOString();

export function formatToRupiah(number: any) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);
}

export const getRevenue = async () => {
    const currentMonthRevenue = await prisma.transaction.aggregate({
        _sum: {
            price: true,
        },
        where: {
            status: "SUCCESS",
            updatedAt: {
                gte: startOfMonth,
                lte: endOfMonth,
            },
        },
    });

    const lastMonthRevenue = await prisma.transaction.aggregate({
        _sum: {
            price: true,
        },
        where: {
            status: "SUCCESS",
            updatedAt: {
                gte: startOfLastMonth,
                lte: endOfLastMonth,
            },
        },
    });

    const currentMonthPrice = Number(currentMonthRevenue?._sum?.price ?? 0);
    const lastMonthPrice = Number(lastMonthRevenue?._sum?.price ?? 0);

    const revenueDifference = currentMonthPrice - lastMonthPrice;

    const revenuePercentChange = lastMonthPrice !== 0
        ? ((revenueDifference / lastMonthPrice) * 100)
        : 0;

    const symbol = revenueDifference >= 0 ? '+' : '-';

    return {
        totalRevenue: currentMonthPrice,
        percentChange: `${symbol}${Math.abs(revenuePercentChange).toFixed(2)}%`
    };
}

export const getUsers = async () => {
    const users = await prisma.user.count()

    const currentMonthUsers = await prisma.user.count({
        where: {
            createdAt: {
                gte: startOfMonth,
                lte: endOfMonth
            }
        }
    })

    const lastMonthUsers = await prisma.user.count({
        where: {
            createdAt: {
                gte: startOfLastMonth,
                lte: endOfLastMonth
            }
        }
    })

    return {
        countUsers: users,
        differenceUsers: currentMonthUsers - lastMonthUsers
    }
}

export const getMember = async () => {
    const members = await prisma.memberDetail.count({
        where: {
            isActive: true,
        }
    })

    const lastMonthMembers = await prisma.memberDetail.count({
        where: {
            isActive: true,
            updatedAt: {
                gte: startOfLastMonth,
                lte: endOfLastMonth
            }
        }
    })

    const differenceMember = members - lastMonthMembers;
    const symbol = differenceMember >= 0 ? '+' : '-'; 

    return {
        totalMembers: members,
        differenceMember: `${symbol}${Math.abs(differenceMember)}` 
    };
}

export const getTotalTransaction = async () => {
    const totalTransactions = await prisma.transaction.count({
        where: {
            status: "SUCCESS",
            updatedAt: {
                gte: startOfMonth,
                lte: endOfMonth,
            },
        }
    });

    const lastMonthTotalTransactions = await prisma.transaction.count({
        where: {
            status: "SUCCESS",
            updatedAt: {
                gte: startOfLastMonth,
                lte: endOfLastMonth,
            },
        },
    });
    const transactionDifference = totalTransactions - lastMonthTotalTransactions;

    const percentChange = lastMonthTotalTransactions !== 0
        ? ((transactionDifference / lastMonthTotalTransactions) * 100)
        : 0;

    const symbol = transactionDifference >= 0 ? '+' : '-';

    return { 
        totalTransactions: totalTransactions, 
        percentChange: `${symbol}${Math.abs(percentChange).toFixed(2)}%` 
    };
}

export const getRevenueEveryMonth = async () => {
    const months: { name: string; total: number }[] = [];

    for (let i = 0; i < 12; i++) {
        const startDate = moment().subtract(i, 'months').startOf('month').toISOString();
        const endDate = moment().subtract(i, 'months').endOf('month').toISOString();

        const revenue = await prisma.transaction.aggregate({
            _sum: {
                price: true,
            },
            where: {
                status: "SUCCESS",
                updatedAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        const revenueNumber = Number(revenue._sum.price) || 0;

        months.push({
            name: moment().subtract(i, 'months').format('MMM'),
            total: revenueNumber,
        });
    }

    return months;
}

export const getRecentTransactions = async () => {
    const recentTransactions = await prisma.transaction.findMany({
        select: {
            price: true,
            user: {
                select: {
                    name: true,
                    telegramId: true
                }
            }
        },
        where: {
            status: "SUCCESS"
        },
        orderBy: {
            updatedAt: 'desc'
        },
        take: 5
    })
    const mappedTransactions = recentTransactions.map(transaction => ({
        name: transaction.user.name,
        telegramId: transaction.user.telegramId,
        price: formatToRupiah(transaction.price),
    }));

    return mappedTransactions;
}
