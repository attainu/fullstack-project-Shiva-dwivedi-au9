import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {
    return (
        <div className="landing">
            
            <section className="section">
                <h1>
                    Platform to monitor your workflow
                </h1>
                <p>
                    Mark your Attendance, apply for leave, complete given tasks
                </p>
                <button><Link to="/login">Get Started</Link> </button>
            </section>
        </div>
    )
}

export default LandingPage
