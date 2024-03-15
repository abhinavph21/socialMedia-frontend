import { Avatar } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { followUser } from '../../redux/auth/auth.action'

const PopularUserCard = ({ user }) => {
    const dispatch = useDispatch()

    const handleFollowUser = () => {
        dispatch(followUser(user?.id))
        alert("you are now following " + user?.firstName + " " + user?.lastName)
    }
    return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center'>
                <Avatar sx={{ bgcolor: "#212534", color: "rgb(88,199,250)" }} className='w-9 h-9 rounded-full' src={user?.image} alt="" />
                <div className='ml-2'>
                    <p className='text-sm font-semibold'>{user?.firstName + " " + user?.lastName}</p>
                    {/* <p className='text-sm font-semibold opacity-70'>{description}</p> */}
                </div>
            </div>
            <button className='text-blue-700 text-sm font-semibold'
                onClick={handleFollowUser}
            >Follow</button>
        </div>
    )
}

export default PopularUserCard