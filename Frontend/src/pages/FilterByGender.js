import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';

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
                <div style={{color:"aliceblue"}}>
                     {employee.filter(person => person.gender == 'female').length}
                </div>
            )
        }
    }

    const renderMales = (employee) => 
    {
        if(employee) {
            return(
                <div style={{color:"aliceblue"}}>
                     {employee.filter(person => person.gender == 'male').length}
                </div>
            )
        }
    }


    return (
        <div>
                 {renderFemales(employee)}
                 {renderMales(employee)}
                 <PieChart
  data={[
    { title: 'One', value: 10, color: '#E38627' },
    { title: 'Two', value: 15, color: '#C13C37' },
    { title: 'Three', value: 20, color: '#6A2135' },
  ]}
/>
        </div>
    )
}

export default FilterByGender
