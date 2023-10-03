import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'

type Params = {
    reservationId?: string
}


export const DELETE = async (
    request: Request,
    { params }: { params: Params }
) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error()

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== `string`) {
        throw new Error(`Invalid ID`)
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { Listing: { userId: currentUser.id } }
            ]
        }
    })

    return NextResponse.json(reservation)

}