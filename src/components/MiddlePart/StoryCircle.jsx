import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StoryCircle = ({ item }) => {
    return (
        <div className="cursor-pointer flex flex-col items-center mr-4" >
            <Avatar sx={{ width: "5rem", height: "5rem" }} className="rounded-full" src={item?.image} alt="" />
            <p >
                {item?.firstName?.length > 9 ? item.firstName.substring(0, 9) + "..." : item?.firstName}
            </p>
        </div>
    );
};

export default StoryCircle;