import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import CardsMain from "./Cards";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import {Autoplay, Navigation } from "swiper";


const CarouselMain = () => {
    let cities = [
        [
        {
            country: "Japan",
            place: "Tokyo",
            image:
            "./assets/Tokyo.png",
        },
        {
            country: "Italy",
            place: "Roma",
            image: "./assets/Roma.png",
        },
        {
            country: "Argentina",
            place: "Rio Negro",
            image:"./assets/Rio-Negro.png",
        },
        {
            country: "Brazil",
            place: "Rio de Janeiro",
            image:"./assets/Rio-de-Janeiro.png",
        },
        ],
        [
        {
            country: "Panama",
            place: "Panama",
            image:"./assets/Panama.png",
        },
        {
            country: "Norway",
            place: "Oslo",
            image:"./assets/Oslo.png",
        },
        {
            country: "United states",
            place: "New York",
            image:"./assets/New-York.png",
        },
        {
            country: "Russia",
            place: "Moscow",
            image:"./assets/Moscow.png",
        },
        ],
        [
        {
            country: "Spain",
            place: "Madrid",
            image:"./assets/Madrid.png",
        },
        {
            country: "Armenia",
            place: "Yerevan",
            image:"./assets/Yerevan.png",
        },
        {
            country: "Egypt",
            place: "Cairo",
            image:"./assets/Cairo.png",
        },
        {
            country: "Greece",
            place: "Atenas",
            image:"./assets/Atenas.png",
        },
        ],
    ];
    return (
        <>
        <h2 className="carouselTitle">Popular MyTineraries</h2>
        <Swiper 
        navigation={true} 
        autoplay={{
            delay: 3500,
            disableOnInteraction: false
        }} 
        modules={[Navigation, Autoplay]} 
        loop={true} 
        className="mySwiper"
        >
        {cities.map((citiesArray, index) =>{
            return (
                <>
                <SwiperSlide key={index}>
                <div className="d-flex justify-content-center flex-wrap">
                {citiesArray.map(city =>{
                    return <CardsMain city={city} key={city.place}/>
                })}
                </div>
                </SwiperSlide>
                </>
            )

        } )}
        
        </Swiper>
        </>
    );
    };

export default CarouselMain;
