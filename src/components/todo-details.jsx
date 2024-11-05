import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"


export function ToDoDetails(){

    const [appointment, setAppointments] = useState([{AppointmentId:0, Title:'', Description:'', Date:'', UserId:''}])
    let params = useParams();
    let navigate = useNavigate();

    useEffect(()=>{

        axios.get(`http://127.0.0.1:4040/get-appointment/${params.id}`)
        .then(response=>{
             setAppointments(response.data);
        })

    },[])

    function handleDeleteClick(){
        var flag = window.confirm (`Are you sure?  Want to delete?`);
        if(flag===true) {
            axios.delete(`http://127.0.0.1:4040/delete-appointment/${params.id}`)
            .then(()=>{
                alert('Appointment Deleted Successfully..');
                navigate('/user-dash');
            })
        }
    }

    return(
        <div className="m-2 p-2 bg-light">
            <h3>Appointment Details</h3>
            <dl>
                <dt>Title</dt>
                <dd>{appointment[0].Title}</dd>
                <dt>Description</dt>
                <dd>{appointment[0].Description}</dd>
                <dt>Date</dt>
                <dd>{moment(appointment[0].Date).format('dddd DD MMMM YYYY')}</dd>
            </dl>
             <div>
                <button onClick={handleDeleteClick} className="bi bi-trash-fill btn btn-danger"> Delete</button>
                <Link to={`/todo-edit/${appointment[0].AppointmentId}`} className="bi bi-pen-fill btn btn-warning ms-2"> Edit</Link>
             </div>
            <Link to="/user-dash">Back to Appointments</Link>
        </div>
    )
}