import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StoryCircle = ({ }) => {
    let image = "https://cdn.pixabay.com/photo/2018/04/05/09/32/portrait-3292287_640.jpg"
    let username = "abhinav"
    return (
        <div className="cursor-pointer flex flex-col items-center mr-4" >
            <Avatar sx={{ width: "5rem", height: "5rem" }} className="rounded-full" src={image} alt="" />
            <p >
                {username?.length > 9 ? username.substring(0, 9) + "..." : username}
            </p>
        </div>
    );
};

export default StoryCircle;