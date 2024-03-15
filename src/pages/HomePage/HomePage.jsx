import React from 'react'
import { Grid } from "@mui/material"
import { Route, Routes, useLocation } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import MiddlePart from '../../components/MiddlePart/MiddlePart'
import CreateReelsForm from '../Reels/CreateReelsForm'
import Profile from '../Profile/Profile'
import Reels from '../Reels/Reels'
import HomeRight from '../../components/HomeRight/HomeRight'

const HomePage = () => {
    const location = useLocation()
    return (
        <div className="px-20">
            <Grid container spacing={0}>
                <Grid className="relative " item xs={0} lg={3}>
                    <div className="sticky top-0 ">
                        <Sidebar />
                    </div>
                </Grid>
                <Grid
                    className="px-5 flex justify-center "
                    item
                    lg={location.pathname === "/" ? 6 : 9}
                    xs={12}
                >
                    <Routes>
                        <Route path="/" element={<MiddlePart />} />
                        <Route path="/reels" element={<Reels />} />
                        <Route path="/create-reels" element={<CreateReelsForm />} />
                        <Route path="/profile/:id" element={<Profile />} />
                    </Routes>
                </Grid>
                {(location.pathname === "/") && (
                    <Grid className="relative " item lg={3}>
                        <div className="sticky top-0  w-full">
                            <HomeRight />
                        </div>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default HomePage