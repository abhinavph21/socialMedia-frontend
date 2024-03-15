import React, { useEffect, useState } from 'react'
import SearchUser from '../SearchUser/SearchUser'
import PopularUserCard from './PopularUserCard'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../../redux/auth/auth.action'

const HomeRight = () => {
    // let popularUser = [1, 1, 1, 1]
    const auth = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const [popularUsers, setPopularUsers] = useState([])

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    useEffect(() => {
        let users = auth?.allUsers.filter((user) => user.id != auth.user.id && !user?.followers?.includes(auth.user.id))
        let lastIndex = 5
        if (users?.length < 5)
            lastIndex = users.length
        let subArray = users.slice(0, lastIndex)
        console.log(subArray);
        setPopularUsers(subArray)
    }, [auth?.allUsers])
    // console.log(auth?.allUsers);
    return (
        <div className="pr-5">
            {/* <SearchUser /> */}
            <div className="card p-5">
                <div className="flex justify-between py-5 items-center">
                    <p className="font-semibold opacity-70">Suggestions for you</p>
                    {/* <p className="text-xs font-semibold opacity-95">View All</p> */}
                </div>

                <div className="space-y-5">
                    {popularUsers.map((user) => (
                        <PopularUserCard
                            key={user.id}
                            user={user}
                        // description={"Follows you"}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeRight