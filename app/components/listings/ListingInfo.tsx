'use client'

import useCountries from "@/app/hooks/useCountries"
import dynamic from 'next/dynamic'
import { SafeUser } from "@/app/types"
import { IconType } from "react-icons"

import Avatar from "../Avatar"
import ListingsCategory from "./ListingsCategory"

const Map = dynamic(() => import(`../Map`), {
    ssr: false
})

type ListingInfoProps = {
    user: SafeUser,
    description: string,
    roomCount: number,
    guestCount: number,
    bathroomCount: number,
    category: {
        icon: IconType,
        label: string,
        description: string,
    } | undefined,
    locationValue: string,
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    category,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue
}) => {

    const { getByValue } = useCountries()

    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-lg font-semibold flex flex-row items-center gap-2">
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-400">
                    <div>
                        {guestCount} guest
                    </div>
                    <div>
                        {roomCount} rooms
                    </div>
                    <div>
                        {bathroomCount} bathrooms
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingsCategory
                    icon={category.icon}
                    label={category.label} />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={coordinates} />
        </div>
    )
}

export default ListingInfo