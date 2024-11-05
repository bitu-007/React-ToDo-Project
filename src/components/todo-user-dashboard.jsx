import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";


export function ToDoUserDashBoard(){

    let navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['userid']);
    const [appointments, setAppointments] = useState([{AppointmentId:0, Title:'', Description:'', Date:'', UserId:''}]);

    function handleSignout(){
        removeCookie('userid');
        navigate('/user-login');
    }

    useEffect(()=>{

          axios.get(`http://127.0.0.1:4040/get-appointments/${cookies['userid']}`)
          .then(response=>{
             setAppointments(response.data);
          })

    },[])

    return(
        <div className="p-4 bg-light m-4">
            <h3 className="d-flex justify-content-between"><span>User Dashboard</span> <span>{cookies['userid']}</span> <button className="btn btn-link" onClick={handleSignout}>Signout</button> </h3>
            <div>
                <Link to="/add-appointment" className="bi btn btn-primary my-2 bi-calendar-check"> Add Appointment </Link>
            </div>
            <div className="d-flex">
                {
                    appointments.map(appointment=>
                        <div key={appointment.AppointmentId} className="alert alert-success m-4">
                            <div className="fs-4"> {appointment.Title} </div>
                            <div className="my-2">
                                <Link to={`/todo-details/${appointment.AppointmentId}`} className="bi bi-eye-fill btn btn-success me-2"> View</Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}