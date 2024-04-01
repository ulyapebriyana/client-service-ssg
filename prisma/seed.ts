import prisma from "../lib/db"

async function main() {
    const month1 = await prisma.membershipPlanning.create({
        data: {
            duration: 12,
            price: 1000000,
            description: "beli satu gratis 1 tahun"
        }
    })
    console.log({ month1 })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })