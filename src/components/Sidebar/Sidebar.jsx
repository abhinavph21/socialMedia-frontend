import React from 'react'
import { useNavigate } from "react-router-dom";

import { navigationMenu } from './NavigationMenu'

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="card text-white  h-screen flex flex-col justify-between py-5 bg-[rgb(3,11,40)]">
            <div className="space-y-8 pl-5">
                <div className="">
                    <span className="logo">Social Media</span>
                </div>
                <div className="space-y-8">
                    {navigationMenu.map((item) => (
                        <div
                            onClick={() =>
                                navigate(`${item.path}`)
                            }
                            className="cursor-pointer flex space-x-3 items-center"
                        >
                            {item.icon}
                            <p className="text-xl">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar