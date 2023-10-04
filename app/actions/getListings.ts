import prisma from '@/app/libs/prismadb';


export type ListingsParams = {
    userId?: string
}

const getListings = async ({ userId }: ListingsParams) => {

    try {

        let query: any = {}

        if (userId) {
            query.userId = userId
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createAt: `desc`
            }
        })

        const safeListings = listings.map((listing) => ({
            ...listing,
            createAt: listing.createAt.toISOString(),
        }))

        return safeListings
    } catch (error: any) {
        throw new Error(error)
    }

}


export default getListings