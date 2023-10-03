import prisma from '@/app/libs/prismadb';

type ParamsType = {
    listingId?: string,
    userId?: string,
    authorId?: string,
}

const getReservations = async (params: ParamsType) => {

    try {

        const { listingId, userId, authorId } = params;
        const query: any = {};

        if (listingId) query.listingId = listingId

        if (userId) query.userId = userId

        if (authorId) query.Listing = { userId: authorId }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                Listing: true
            },
            orderBy: {
                createAt: `desc`
            }
        })

        const safeReservations = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toDateString(),
            listing: {
                ...reservation.Listing,
                createdAt: reservation.Listing.createAt.toISOString()
            }
        }))

        return safeReservations;
    } catch (error: any) {
        throw new Error(error)
    }

}

export default getReservations