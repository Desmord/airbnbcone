import prisma from '@/app/libs/prismadb'

type ParamasType = {
    listingId?: string
}

export default async function getListingById(
    params: ParamasType
) {

    try {
        const { listingId } = params;

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        })

        if (!listing) return null

        return {
            ...listing,
            createdAt: listing.createAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString(),

            }
        }

    } catch (error: any) {
        throw new Error(error)
    }

}