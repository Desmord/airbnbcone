'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import {
    GiWindmill,
    GiIsland,
    GiBoatFishing,
    GiCastle,
    GiForestCamp,
    GiCaveEntrance,
    GiCactus,
    GiBarn,
} from 'react-icons/gi'
import { FaSkiing, } from 'react-icons/fa'
import { MdOutlineVilla } from 'react-icons/md'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5';

import Container from "../Container"
import CategoryBox from '../CategoryBox'

type categoriesType = {
    label: string,
    icon: any,
    description: string
}

export const CATEGORIES: categoriesType[] = [
    {
        label: `Beach`,
        icon: TbBeach,
        description: `This property exist Beach.`
    },
    {
        label: `Windmills`,
        icon: GiWindmill,
        description: `This property exist Windmills.`
    },
    {
        label: `Modern`,
        icon: MdOutlineVilla,
        description: `This property exist Modern.`
    },
    {
        label: `Countyside`,
        icon: TbMountain,
        description: `This property exist Countryside.`
    },
    {
        label: `Pools`,
        icon: TbPool,
        description: `This property exist Pools.`
    },
    {
        label: `Islands`,
        icon: GiIsland,
        description: `This property exist Islands.`
    },
    {
        label: `Lake`,
        icon: GiBoatFishing,
        description: `This property exist lake.`
    },
    {
        label: `Skiing`,
        icon: FaSkiing,
        description: `This property exist Skiing.`
    },
    {
        label: `Castles`,
        icon: GiCastle,
        description: `This property is in a castle.`
    },
    {
        label: `Camping`,
        icon: GiForestCamp,
        description: `This property  has camping activities.`
    },
    {
        label: `Arctic`,
        icon: BsSnow,
        description: `This property has camping activities.`
    },
    {
        label: `Cave`,
        icon: GiCaveEntrance,
        description: `This property is in a Cave.`
    },
    {
        label: `Desert`,
        icon: GiCactus,
        description: `This property is in a Desert.`
    },
    {
        label: `Barns`,
        icon: GiBarn,
        description: `This property is in a Barn.`
    },
    {
        label: `Lux`,
        icon: IoDiamond,
        description: `This property is Luxurious.`
    },
]

const Categories = () => {

    const params = useSearchParams();
    const category = params?.get(`category`);
    const pathName = usePathname();
    const isMainPage = pathName === `/`;

    if (!isMainPage) {
        return null
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {CATEGORIES.map((item) => {
                    return <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        description={item.description}
                        icon={item.icon} />
                })}
            </div>
        </Container>
    )
}

export default Categories