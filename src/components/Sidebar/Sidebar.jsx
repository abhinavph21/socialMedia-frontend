import React from 'react'
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Divider, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from 'react-redux'
import { navigationMenu } from './NavigationMenu'

const Sidebar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openLogoutMenu = Boolean(anchorEl);
    // const { auth } = useSelector((store) => store);

    const auth = useSelector(store => store.auth)
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const handleOpenLogoutMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        console.log('jwt');
        localStorage.removeItem('jwt')
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }

    return (
        <div className="card text-white  h-screen flex flex-col justify-between py-5 bg-[rgb(3,11,40)]">
            <div className="space-y-8 pl-5">
                <div className="">
                    <span className="logo">Social Media</span>
                </div>
                <div className="space-y-8">
                    {navigationMenu.map((item, idx) => (
                        <div key={idx}
                            onClick={() =>
                                item.title === "Profile"
                                    ? navigate(`/profile/${auth.user.id}`)
                                    : navigate(`${item.path}`)
                            }
                            className="cursor-pointer flex space-x-3 items-center"
                        >
                            {item.icon}
                            <p className="text-xl">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <Divider />
                <div className="pl-5 flex items-center  justify-between pt-5">
                    <div className="flex items-center space-x-3">
                        <Avatar
                            alt="Remy Sharp"
                            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
                        />

                        <div>
                            <p className="font-bold">{auth?.user?.firstName + " " + auth?.user?.lastName}</p>
                            <p className="opacity-70">@{auth?.user?.firstName + "_" + auth?.user?.lastName}</p>
                        </div>
                    </div>
                    <Button
                        id="basic-button"
                        aria-controls={openLogoutMenu ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openLogoutMenu ? "true" : undefined}
                        onClick={handleOpenLogoutMenu}
                    >
                        <MoreHorizIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openLogoutMenu}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Sidebar