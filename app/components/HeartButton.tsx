'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/Ai";
import { SafeUser } from "../types"
import useFavorite from "../hooks/useFavorite";

type HeartButtonProps = {
    listingId: string,
    currentUser?: SafeUser | null,
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {

    const {
        hasFavorited,
        toggleFavorite
    } = useFavorite({
        listingId,
        currentUser
    });

    return (
        <div
            className="relative hover:opacity-80 transition cursor-pointer"
            onClick={toggleFavorite}>
            <AiOutlineHeart size={28} className="fill-white absolute " />
            <AiFillHeart size={28} className={`${hasFavorited ? `fill-rose-500` : `fill-neutral-500/70`}`} />
        </div>
    )
}

export default HeartButton