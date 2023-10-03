import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOlny";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationClient from "./ReservationClient";

const ReservationPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login" />
            </ClientOnly>
        )
    }

    const reservation = await getReservations({
        authorId: currentUser.id
    })


    if (reservation.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservation found"
                    subtitle="Looks like you have no reservation on your property" />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationClient
                reservations={reservation}
                currentUser={currentUser} />
        </ClientOnly>
    )

}

export default ReservationPage