import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const Jobs = () => {
    const [jobs, setJobs] = useState();

    useEffect(() => {
        getJobs()
    }, [])

    const getJobs = async () => {
        await axios.get(`https://ats-dev-api.techenablers.info/api/v1/jobs`)
            .then((response) => {
                console.log("response", response)
                setJobs(response?.data?.data?.jobs?.data);
            }).catch((error) => {
                console.log(error)
            })
    }
    const SampleArrow = ({ onClick, position }) => (
        <div className={`slick-arrow slick-${position}`} onClick={onClick}>
            {position === "right" ? (
                <NavigateNextIcon />
            ) : (
                <ArrowBackIosIcon className="sliderArrow" />
            )}
        </div>
    );
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        prevArrow: <SampleArrow icon={<ArrowBackIosIcon />} position="left" />,
        nextArrow: <SampleArrow icon={<NavigateNextIcon />} position="right" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 2, slidesToScroll: 2 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
        ],
    };

    return (
        <Box>
            <Container>

                <Box className="homeCarousel">
                    <Slider {...settings}>
                        {jobs && jobs.map((job, item) => (
                            <Grid container columnSpacing={2} >
                                <Grid key={item} item md={12}>
                                    <Paper className='p-20 mb-10'>
                                        <Box className="d-flex gap-10 align-center pb-10">
                                            {job?.created_by?.meta?.profilePictureFullUrl ? (
                                                <img
                                                    className="company_logo"
                                                    src={job?.created_by?.meta?.profilePictureFullUrl}
                                                />
                                            ) : (
                                                <Avatar variant='rounded' className="company_logo">
                                                    {job?.created_by?.first_name.charAt(0)}
                                                    {job?.created_by?.last_name.charAt(0)}
                                                </Avatar>
                                            )}
                                            <Box>
                                                <Typography variant='subtitle1' className='heading hoverText'>
                                                    {job?.title && job?.title.length > 20
                                                        ? `${job?.title.slice(0, 20)}...`
                                                        : job?.title}
                                                </Typography>
                                                <Typography variant='body' className='fw-6'>By </Typography>
                                                <Typography variant='body' className='heading text-primary'>
                                                    {job?.client_organization?.name && job?.client_organization?.name.length > 13
                                                        ? `${job?.client_organization?.name.slice(0, 13)}...`
                                                        : job?.client_organization?.name}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box className="description h-50">
                                            <Typography
                                                variant="body"
                                                className="job_description"
                                                dangerouslySetInnerHTML={{
                                                    __html: job?.short_description.length > 70 ? `${job?.short_description.slice(0, 70)}...` : job?.short_description,
                                                }}
                                            ></Typography>
                                        </Box>

                                        <Box className="skillContainer HomeSkill">
                                            {job &&
                                                job?.skills?.length !== 0 &&
                                                job?.skills?.map((skill, index) => (
                                                    <Typography variant="body" className="skillItem" key={index}>
                                                        {skill?.name}
                                                    </Typography>
                                                ))}
                                        </Box>

                                        <Box className="JobCategory">
                                            {job?.job_type ? (
                                                <Box className="align-center d-flex p-0 ">
                                                    <BusinessCenterOutlinedIcon />
                                                    <Typography variant="body" className="categoryItem ">
                                                        {job?.job_type}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                ""
                                            )}
                                            {job?.min_pay_rate || job?.max_pay_rate ? (
                                                <Box className="align-center d-flex p-0 ">
                                                    <AttachMoneyRoundedIcon />
                                                    <Typography variant="body" className="categoryItem ">
                                                        {job?.min_pay_rate && job?.max_pay_rate ? (
                                                            <span className='align-center d-flex g-4'>
                                                                &#36; {job.min_pay_rate.toFixed(2)} - &#36; {job.max_pay_rate.toFixed(2)}
                                                            </span>
                                                        ) : job?.min_pay_rate ? (
                                                            <span className='align-center d-flex g-4'>
                                                                &#36; {job.min_pay_rate.toFixed(2)}
                                                            </span>
                                                        ) : job?.max_pay_rate ? (
                                                            <span className='align-center d-flex g-4'>
                                                                &#36; {job.max_pay_rate.toFixed(2)}
                                                            </span>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </Typography>

                                                </Box>
                                            ) : (
                                                ""
                                            )}
                                            {job?.experience_level ? (
                                                <Box className="align-center d-flex p-0 ">
                                                    <TrendingUpIcon />
                                                    <Typography variant="body" className="categoryItem ">
                                                        {job?.experience_level}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                ""
                                            )}

                                            {job?.location ? (
                                                <Box className="align-center d-flex p-0 ">
                                                    <LocationOnOutlinedIcon />
                                                    <Typography variant="body" className="categoryItem text-capitalize">
                                                        {job?.location}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                ""
                                            )}

                                        </Box>
                                        <Box className='d-flex justify-between '>
                                            <Button variant='contained' className="primary-btn">Apply</Button>
                                            <Avatar variant='rounded'><ShareIcon /></Avatar>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>

                        ))}
                    </Slider>
                </Box>
            </Container>

        </Box>
    )
}

export default Jobs


