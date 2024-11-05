import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";


export function ToDoAddAppointment(){

    const [cookies, setCookie, removeCookie] = useCookies(['userid']);
    let navigate = useNavigate();

    const formik = useFormik({
         initialValues: {
             AppointmentId:0,
             Title:'',
             Description:'',
             Date:'',
             UserId: cookies['userid']
         },
         onSubmit: (appointment)=> {
              axios.post(`http://127.0.0.1:4040/add-appointment`, appointment)
              .then(()=>{
                  alert('Appointment Added successfully..');
                  navigate('/user-dash');
              })
         }
    })

    return(
        <div>
            <h3 className="d-flex bg-light m-2 justify-content-between"><span>Add New Appointment</span> <span>{cookies['userid']}</span> <button className="btn btn-link">Signout</button> </h3>
            <div className="bg-light p-2 m-2 w-25">
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Id</dt>
                    <dd><input type="number" onChange={formik.handleChange} name="AppointmentId" className="form-control" /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Title" className="form-control" /></dd>
                    <dt>Description</dt>
                    <dd><textarea rows={4} onChange={formik.handleChange} cols={40} className="form-control" name="Description"></textarea></dd>
                    <dt>Date</dt>
                    <dd><input type="date" onChange={formik.handleChange} name="Date" className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-dark w-100">Add Appointment</button>
                <Link to="/user-dash" className="btn mt-1 btn-warning w-100"> Cancel</Link>
            </form>
        </div>
        </div>
       
    )
}