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
        description: ``
    },
    {
        label: `Modern`,
        icon: MdOutlineVilla,
        description: ``
    },
    {
        label: `Countyside`,
        icon: TbMountain,
        description: ``
    },
    {
        label: `Pools`,
        icon: TbPool,
        description: ``
    },
    {
        label: `Lake`,
        icon: GiBoatFishing,
        description: ``
    },
    {
        label: `Castles`,
        icon: GiCastle,
        description: ``
    },
    {
        label: `Cave`,
        icon: GiCaveEntrance,
        description: ``
    },
    {
        label: `Desert`,
        icon: GiCactus,
        description: ``
    },
    {
        label: `Barns`,
        icon: GiBarn,
        description: ``
    },
    {
        label: `Lux`,
        icon: IoDiamond,
        description: ``
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