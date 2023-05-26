
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import { BASE_URL } from '../baseUrl';

const Edit = () => {


  const navigate = useNavigate();
  const [data, setData] = useState();

  const { id } = useParams();



  useEffect(() => {
    axios
      .get(`${BASE_URL}/singlerecord/${id}`)
      .then((res) => {
        setData(res.data)

      })
      .catch((err) => {
        toast.error("not found");
      });

  }, [])

  const handlesubmit = async (e) => {
    e.preventDefault();
  };


  const values = (e) => {

    setData({ ...data, [e.target.name]: e.target.value });

  }


  const edit = () => {

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { emp_name, department, salary } = data;


    axios
      .put(`${BASE_URL}/update/${id}`, { emp_name: emp_name, department: department, salary: salary }, config)
      .then((res) => {
        setData(res.data)
        toast.success('Record Update Successfully')

        navigate('/alldata');
      })
      .catch((err) => {
        toast.error(err?.response?.data?.msg);
      });

  }
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="container mt-4">

        <div className="col-sm-6 mx-auto">
          <div className="card">

            <div className="card-body">
              <form onSubmit={handlesubmit}>
                <div className="form-login-wrapper">
                  <div className="form-group" align="left">
                    <label>Employee Name*</label>
                    <input
                      type="text"
                      className="form-control formtext"
                      onChange={values}
                      value={data?.emp_name}
                      name="emp_name"


                    />

                  </div>
                  <div className="form-group" align="left">
                    <label>Department*</label>
                    <input
                      type="text"
                      className="form-control formtext department"

                      placeholder="Enter Department"
                      name="department"
                      value={data?.department}
                      onChange={values}
                    />
                  </div>
                  <div className="form-group " align="left">
                    <label>Salary*</label>
                    <input
                      type="number"
                      className="form-control formtext number"
                      value={data?.salary}
                      placeholder="Enter Salary"
                      name="salary"

                      onChange={values}

                    />
                  </div>


                  <div className="submit-btn mt-2" align="right">
                    <input
                      type="submit"
                      name="submit"
                      className="btn btn-danger"
                      value="Edit"
                      onClick={edit}

                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}
export default Edit;