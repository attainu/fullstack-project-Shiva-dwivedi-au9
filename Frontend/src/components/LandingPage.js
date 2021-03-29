import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import description from '../images/FE_BE.png'
import objective from '../images/Objective.png'
import AOS from 'aos';
import 'aos/dist/aos.css'

function LandingPage() {

    useEffect(() => {

        AOS.init({
            offset: 200,
            delay: 10,
            duration: 900,
        });
    
    },[])


    return (
        <div className="landing">
            
            <section className="section">
                <h1>
                   CorpEnviro
                </h1>
                <p>
                Our Project name Is CorpEnviro, And it is inspired by real time Employee Management system which most of companies have. This project was done by Hemanshu Upadhyay and Shiva Dwivedi under the mentorship of Akash Handa, in 3 weeks of timeline.
                </p>
                <button><Link to="/login">Get Started</Link> </button>
            </section>

            <div className="img1" data-aos = "zoom-in-left">
                <img src={description} alt="Project Description" />
            </div>
            <div className="img2" data-aos = "zoom-in-right">
                <img src={objective} alt="Project Objective" />
            </div>
        </div>
    )
}

export default LandingPage
