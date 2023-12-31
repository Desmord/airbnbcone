import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOlny";

import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {

    const listings = await getFavorites();
    const currentUser = await getCurrentUser();

    if (listings.length === 0)
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorite listings." />

            </ClientOnly>
        )

    return (
        <ClientOnly>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser} />
        </ClientOnly>
    )
}

export default ListingPage