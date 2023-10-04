import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'

type Params = {
    listingId?: string
}

export const DELETE = async (request: Request, { params }: { params: Params }) => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        console.log(`dss`)
        return NextResponse.error()
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== `string`) {
        throw new Error(`Invalid ID`)
    }

    console.log(`ss`)

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)


}
