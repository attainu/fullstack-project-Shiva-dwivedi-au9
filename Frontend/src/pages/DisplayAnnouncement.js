import React, {useEffect,useState} from 'react'
import MovingText from 'react-moving-text'

const getAnnouncementURL = "https://corpenviro-backend.herokuapp.com/api/auth/Announcements"

function DisplayAnnouncement() {

    const [announcement , setAnnouncement] = useState("")

    useEffect(() => {
        
        setInterval(() => {
            fetch(getAnnouncementURL)
            .then(res=>res.json())
            .then(data => setAnnouncement(data))
    
        },2000)
       
    }, [])

    const renderAnnouncements =(announcement) => {
        if(announcement) {
            return announcement.map((item=>{
                return(
                    <div className="DisplayAnnouncements">
                            <p>{item.Announcement}</p>
                    </div>
                )
            }))
        }
    }

    return (
        <div> 
        <MovingText
            type="fadeInFromLeft"
            duration="8000ms"
            delay="1s"
            direction="alternate"
            timing="ease-out"
            iteration="infinite"
            fillMode="none">
            {renderAnnouncements(announcement)}
        </MovingText>
            
        </div>
    )
}

export default DisplayAnnouncement
