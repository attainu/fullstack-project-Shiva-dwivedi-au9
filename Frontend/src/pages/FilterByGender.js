import React, { useEffect, useState } from 'react'

const Emp_URL = "https://corpenviro-backend.herokuapp.com/api/auth/Allemployees"

function FilterByGender() {

    const [employee, setEmployee] = useState("")

    useEffect(() => {

        setInterval(() => {
            fetch(Emp_URL)
            .then( res => res.json())
            .then( (data) =>{ setEmployee(data)})
    
        }, 1000)
        
    },[])

    const renderFemales = (employee) => 
    {
        if(employee) {
            return(
                <div style={{color:"black",fontSize:"30px",fontWeight:"bold"}}>
                     {employee.filter(person => person.gender == 'female').length}
                </div>
            )
        }
    }

    const renderMales = (employee) => 
    {
        if(employee) {
            return(
                <div style={{color:"black",fontSize:"30px",fontWeight:"bold"}}>
                     {employee.filter(person => person.gender == 'male').length}
                </div>
            )
        }
    }


    return (
        <div className="filtereByGender">
            <div className="filterFemale">
            <h5>Female Employees</h5> 
            {renderFemales(employee)}
            </div>
            <div className="filterMale">
            <h5>Male Employees</h5> 
            {renderMales(employee)}
            </div>
        </div>
    )
}

export default FilterByGender
