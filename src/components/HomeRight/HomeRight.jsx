import React from 'react'
import SearchUser from '../SearchUser/SearchUser'
import PopularUserCard from './PopularUserCard'

const HomeRight = () => {
    let popularUser = [1, 1, 1, 1]
    return (
        <div className="pr-5">
            <SearchUser />
            <div className="card p-5">
                <div className="flex justify-between py-5 items-center">
                    <p className="font-semibold opacity-70">Suggestions for you</p>
                    <p className="text-xs font-semibold opacity-95">View All</p>
                </div>

                <div className="space-y-5">
                    {popularUser.map((data, index) => (
                        <PopularUserCard
                            key={index}
                            image="https://cdn.pixabay.com/photo/2016/11/29/20/22/girl-1871104_1280.jpg"
                            username={"abhinav"}
                            description={"Follows you"}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeRight