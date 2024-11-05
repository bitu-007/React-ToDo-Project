import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";
import axios from "axios";


export function ToDoEdit() {

    let params = useParams();
    let navigate = useNavigate();
    const [appointment, setAppointments] = useState([{ AppointmentId: 0, Title: '', Description: '', Date: '', UserId: '' }])
    const [cookies, setCookie, removeCokie] = useCookies(['userid']);


    const formik = useFormik({

        initialValues: {
            AppointmentId: appointment[0].AppointmentId,
            Title: appointment[0].Title,
            Description: appointment[0].Description,
            Date: appointment[0].Date,
            UserId: cookies['userid']
        },
        onSubmit: (task) => {
            axios.put(`http://127.0.0.1:4040/edit-appointment/${params.id}`, task)
                .then(() => {
                    alert('Appointment Modify Successfully...');
                    navigate(`/todo-details/${params.id}`);
            })
        },
        enableReinitialize: true
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:4040/get-appointment/${params.id}`)
            .then(response => {
                setAppointments(response.data);
            })
    }, []);
    

    return (
        <div className="m-2 p-2 bg-light">
            <h2>Edit Appointment</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Appointment Id</dt>
                    <dd><input type="text" value={formik.values.AppointmentId} name="AppointmentId" onChange={formik.handleChange} /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" value={formik.values.Title} name="Title" onChange={formik.handleChange} /></dd>
                    <dt>Description</dt>
                    <dd>
                        <textarea name="Description" value={formik.values.Description} onChange={formik.handleChange}></textarea>
                    </dd>
                    <dt>Date</dt>
                    <dd><input type="date" name="Date" value={formik.values.Date.slice(0, formik.values.Date.indexOf("T"))} onChange={formik.handleChange} /></dd>
                </dl>
                <button type="submit" className="btn btn-success">Save</button>
                <Link to= {`/todo-details/${params.id}`} className="btn btn-danger ms-2" >Cancel</Link>
            </form>
        </div>
    )
}