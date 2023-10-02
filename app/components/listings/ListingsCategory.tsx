'use client'

import { IconType } from "react-icons"

type ListingsCategoryProps = {
    icon: IconType,
    label: String
}

const ListingsCategory: React.FC<ListingsCategoryProps> = ({
    icon: Icon,
    label
}) => {
    return (
        <div className="flex flex-col gap-6 ">
            <div className="flex flex-row items-center gap-4">
                <Icon size={40} className="text-neutral-600" />
                <div className="flex flex-col">
                    <div className="text-lg font-semibold">
                        {label}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingsCategory