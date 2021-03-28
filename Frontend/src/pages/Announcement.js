import React, { useEffect, useState} from 'react'
import './Announcement.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios'


const token = localStorage.getItem("token")
const createAnnouncementURL = "https://corpenviro-backend.herokuapp.com/api/auth/Createannoucement"
const getAnnouncementURL = "https://corpenviro-backend.herokuapp.com/api/auth/Announcements"
const deleteAnnouncementURL = "https://corpenviro-backend.herokuapp.com/api/auth/DeleteAnnouncement"

function Announcement() {

    const [announcement , setAnnouncement] = useState("")
    const [createdAnnounce, setCreatedAnnounce] = useState({})
    const [open, setOpen] = useState(false);
    
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    useEffect(() => {
        
        setInterval(() => {
            fetch(getAnnouncementURL)
            .then(res=>res.json())
            .then(data => setAnnouncement(data))
    
        },2000)
       
    }, [])

    const subject = (e) => {
       const  Announcement_Subject = e.target.value
        setCreatedAnnounce({...createdAnnounce , ...{Announcement_Subject}})
    }

    const announce= (e) => {
        const Announcement = e.target.value
        setCreatedAnnounce({...createdAnnounce , ...{Announcement}})
    }

    const createdBy = (e) => {
        const Announcement_created_by = e.target.value
        setCreatedAnnounce({...createdAnnounce , ...{Announcement_created_by}})
    }

    const createAnnouncement = (e) => {
        e.preventDefault()
        axios.post(createAnnouncementURL , createdAnnounce, {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'x-access-token':token
            }
           })
           .then((res) => console.log(res))
           setCreatedAnnounce("")
           onCloseModal()
    }

    const deleteAnnouncement = (e) => {

        fetch(deleteAnnouncementURL, {
            method: "DELETE",
            headers:  {
                  'Accept':'application/json',
                  'Content-Type':'application/json',
                  'x-access-token':token
               },
            body: JSON.stringify({
                _id:e.target.value
            }),
        },1000)
    }

    const renderAnnouncements =(announcement) => {
        if(announcement) {
            return announcement.map((item=>{
                return(
                    <div className="allAnnouncements">
                        <div>
                            <h4>Subject : {item.Announcement_Subject} </h4>
                            <p>{item.Announcement}</p>
                            <h6>Created By : {item.Announcement_created_by}</h6>
                        </div>
                       
                        <button onClick={deleteAnnouncement} className="delBTN" value={item._id}><i class="fas fa-trash-alt"></i></button>
                    </div>
                )
            }))
        }
    }

    return (

        <div className="ann">
             <div className="createAnnouncement">
       
            <button onClick={onOpenModal}>Create New Announcement<i class="fas fa-plus-square"></i></button> 
            <Modal open={open} onClose={onCloseModal} center>
                    <form onSubmit={createAnnouncement}>
                        <label htmlFor="Announcement_Subject">Subject</label>
                        <input onChange={subject} type="text" placeholder="Enter the subject" name="Announcement_Subject" required/>

                        <label htmlFor="Announcement">Announcement</label>
                        <input onChange={announce} type="text" placeholder="Enter the Announcement" name="Announcement" required/>

                        <label htmlFor="Announcement_created_by">Created by</label>
                        <input onChange={createdBy} type="text" placeholder="Who's creating it?" name="Announcement_created_by" required/>

                        <button className="createBTN" type="submit">Create Announcement</button>
                    </form>
            </Modal>

      
  </div>
             <h2>All Announcements</h2>
            {renderAnnouncements(announcement)}
        </div>
       
    )
}

export default Announcement
