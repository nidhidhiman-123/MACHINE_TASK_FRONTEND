import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../baseUrl";

const AddEmployee = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
    phonenumber: "",

  })



  const handlesubmit = async (e) => {
    e.preventDefault();
  };


  const values = (e) => {

    setData({ ...data, [e.target.name]: e.target.value });

  }

  const add = () => {

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { emp_name, department, salary } = data;


    if (!emp_name || !department || !salary) {
      toast.error("All fields are required")
      return
    }

    axios
      .post(`${BASE_URL}/add`, { emp_name: emp_name, department: department, salary: salary }, config)
      .then((res) => {
        setData(res.data)
        toast.success('Record Add Successfully')
        navigate('/alldata');
      })
      .catch((err) => {
        toast.error(err?.response?.data?.msg);
      });
    setData({ emp_name: "", department: "", salary: "" })
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

                      placeholder="Enter Employee Name"
                      name="emp_name"
                      onChange={values}
                      value={data.emp_name}
                      required
                    />
                  </div>
                  <div className="form-group" align="left">
                    <label>Department*</label>
                    <input
                      type="text"
                      className="form-control formtext department"

                      placeholder="Enter Department"
                      name="department"
                      onChange={values}
                      value={data.department}

                    />
                  </div>
                  <div className="form-group " align="left">
                    <label>Salary*</label>
                    <input
                      type="number"
                      className="form-control formtext number"

                      placeholder="Enter Salary"
                      name="salary"

                      onChange={values}
                      value={data.salary}

                    />
                  </div>


                  <div className="submit-btn mt-2" align="right">
                    <input
                      type="submit"
                      name="submit"
                      className="btn btn-primary"
                      value="Add" onClick={add}

                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;