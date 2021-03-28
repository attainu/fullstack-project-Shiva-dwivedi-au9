import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default function Header() {
    return (
        <div>
            <header>
                    <h1 className="Title"><Link to="/">CorpEnviro</Link></h1>
                    <nav>
                        <button><Link to="/login">Login</Link> </button>
                    </nav>
            </header>
        </div>
    )
}
