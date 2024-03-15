import React, { useEffect, useRef, useState } from "react";
// import ReelsCard from "./ReelsCard";
// import { reels } from "./ReelsData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllReels } from "../../redux/reels/reels.action";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const Reels = () => {
    const reel = useSelector(store => store.reel);
    const dispatch = useDispatch();

    const sliderRef = useRef(null);
    const videoRef = useRef(null)

    useEffect(() => {
        dispatch(getAllReels())
    }, [])

    // useEffect(() => {
    //     let height = document.getElementsByClassName("video").clientHeight;
    //     console.log(height);
    // }, [])

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    const handlePrevious = () => {
        sliderRef.current.slickPrev();
    };

    console.log(videoRef?.current?.clientHeight);

    return (
        <div className="flex items-center h-screen ">
            <div className="relative flex items-center">
                <Slider className=" w-[25rem] flex items-center" ref={sliderRef} {...settings}>
                    {reel?.reels?.map((reel) => (
                        <div className="" key={reel.id}>
                            <video
                                className="video"
                                src={reel.video}
                                // autoPlay
                                controls
                                ref={videoRef}
                            />
                            <div>{reel.title}</div>
                        </div>
                    ))}
                </Slider>
                <div className="absolute top-1/2 -left-32">
                    <IconButton color="primary" onClick={handlePrevious}>
                        <ArrowBackIosIcon />
                    </IconButton>

                </div>
                <div className="absolute top-1/2 -right-32">
                    <IconButton color="primary" onClick={handleNext}>
                        <ArrowForwardIosIcon />
                    </IconButton>

                </div>
            </div>


        </div>
    );
};

export default Reels;
