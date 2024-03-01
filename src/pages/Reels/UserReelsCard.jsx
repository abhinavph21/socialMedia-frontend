import React from 'react'

const UserReelsCard = ({ reel }) => {
    return (
        <div className="w-[15rem] px-2">
            <video
                className="w-full h-full"
                src={reel.video}
                controls
            />
        </div>
    )
}

export default UserReelsCard