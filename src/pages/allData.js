import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../baseUrl';



const AllData = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [alldata, setAllData] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/all`)
      .then((res) => {
        setAllData(res.data)
      })
      .catch((err) => {
        toast.error("not found");
      });

  })

  const deleteRecord = (e, id) => {
    e.preventDefault()

    axios
      .delete(`${BASE_URL}/delete/${id}`)
      .then((res) => {
        const filter_data = alldata.filter((val) => val._id != id)
        setAllData(filter_data)
        toast.success('Record Delete Successfully')
      })
      .catch((err) => {
        toast.error("Error found");
      });
  }
  const updateRecord = (e, id) => {
    e.preventDefault()
    navigate(`/edit/${id}`);

  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className='container pt-4'>

        <h4>All Employee's Record</h4>
        <table class="table table-condensed mt-4">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              alldata?.map((item, i) => {
                return (
                  <>
                    <tr>
                      <td>{item.emp_name}</td>
                      <td>{item.department}</td>
                      <td>{item.salary}</td>
                      <td>

                        <button className='btn btn-primary' onClick={(e) => { updateRecord(e, item._id) }}>Edit</button>
                        <button className='btn btn-primary m-2' onClick={(e) => { deleteRecord(e, item._id) }}>Delete</button></td>
                    </tr>
                  </>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
export default AllData;