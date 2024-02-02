import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const Register = () => {
  const hostUrl = import.meta.env.VITE_HOST_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [parentId, setParentId] = useState("");
  const [job, setJob] = useState("");
  const [companyname, setCompany] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ value: "" });
  const [formValid, setFormValid] = useState(true);
  const [skill, setSkill] = useState("");
  const navigate = useNavigate();
  const [about, setAbout] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users and set it to the users state
    axios
      .get(hostUrl + "/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (query) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {
      axios
        .post(hostUrl + "/register", {
          name,
          email,
          password,
          parentId: selectedUser ? selectedUser.value : "",
          job,
          companyname,
          about,
          skill,
        })
        .then((result) => {
          console.log(result);
          if (result.data === "Already registered") {
            alert("E-mail already registered! Please Login to proceed.");
            navigate("/login");
          } else {
            alert("Registered successfully! Please Login to proceed.");
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
    } else {
      setFormValid(false);
    }
  };

  const validateForm = () => {
    // Add your validation logic here
    // For , you can check if fields are not empty, valid email format, etc.
    const isValid =
      name && email && password && selectedUser && job && companyname && skill;
    return isValid;
  };

  const isFieldEmpty = (fieldValue) => {
    
    return fieldValue.trim() === "";
  };

  let userOptions = users.map((userdetails) => ({
    value: userdetails._id,
    label: userdetails.name,
  }));

  //alert(userOptions);
  if(!userOptions.length>0){
    userOptions = [{
        value: 'root',
        label: 'Root',
      }];
   // setSelectedUser({value:'root'});
   // alert(userOptions[0].value);
  }

  return (
    <div className="container-fluid vh-100">
      <div
        className="row justify-content-center align-items-center text-left vh-100"
        style={{
          backgroundImage:
            "linear-gradient(rgb(0, 213, 255), rgb(0, 149, 255), rgba(93, 0, 255, 0.557))",
          height: "100%",
        }}
      >
        <div
          className="col-sm-12 col-md-8 col-lg-6 bg-white p-3 rounded"
          style={{ height: "auto", marginTop: "20px", marginBottom: "180px" }}
        >
          <h2 className="mb-3 text-primary text-center">Register</h2>
          {!formValid && (
            <div className="alert alert-danger" role="alert">
              Please fill in all required fields.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div
              className={`mb-3 text-start ${
                isFieldEmpty(selectedUser.value) ? "text-danger" : ""
              }`}
            >
              <label htmlFor="InputParent" className="form-label">
                <strong>Reference</strong>
              </label>
              <Select
                options={userOptions}
                value={selectedUser}
                onChange={(selectedOption) => setSelectedUser(selectedOption)}
                placeholder="Search or select reference..."
                isSearchable
                required
              />
            </div>
            <div
              className={`mb-3 text-start ${
                isFieldEmpty(name) ? "text-danger" : ""
              }`}
            >
              <label htmlFor="InputName" className="form-label">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="form-control"
                id="InputName"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div
              className={`mb-3 text-start ${
                isFieldEmpty(email) ? "text-danger" : ""
              }`}
            >
              <label htmlFor="InputEmail1" className="form-label">
                <strong>Email Id</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                id="InputEmail1"
                onChange={(event) => setEmail(event.target.value.toLocaleLowerCase())}
                required
              />
            </div>
            <div
              className={`mb-3 text-start ${
                isFieldEmpty(password) ? "text-danger" : ""
              }`}
            >
              <label htmlFor="InputPassword1" className="form-label">
                <strong>Password</strong>
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="form-control"
                  id="InputPassword1"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`mb-3 text-start ${
                isFieldEmpty(job) ? "text-danger" : ""
              }`}
            >
              <label htmlFor="InputJob" className="form-label">
                <strong>Job Title</strong>
              </label>
              <input
                type="text"
                placeholder="Enter title ex. Servicenow Developer, Python Developer"
                className="form-control"
                id="InputJob"
                onChange={(event) => setJob(event.target.value)}
                required
              />
            </div>
            <div
              className={`mb-3 text-start ${
                isFieldEmpty(skill) ? "text-danger" : ""
              }`}
            >
              <label htmlFor="InputSkill" className="form-label">
                <strong>Skill </strong>
              </label>
              <input
                type="text"
                placeholder="Enter Skill ex. GRC/ITSM/CMDB"
                className={`form-control ${
                  isFieldEmpty(skill) ? "text-danger" : ""
                }`}
                id="InputSkill"
                onChange={(event) => setSkill(event.target.value)}
                required
              />
              <div className="invalid-feedback">Skill is required.</div>
            </div>
            <div
              className={`mb-3 text-start ${
                isFieldEmpty(companyname) ? "text-danger" : ""
              }`}
            >
              <label htmlFor="InputCompany" className="form-label">
                <strong>Your Company Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter your present company name"
                className="form-control"
                id="InputCompany"
                onChange={(event) => setCompany(event.target.value)}
                required
              />
            </div>
            <div
              className={`mb-3 text-start ${
                isFieldEmpty(about) ? "text-danger" : ""
              }`}
            >
              <label htmlFor="InputAbout" className="form-label">
                <strong>About Yourself</strong>
              </label>
              <textarea
                placeholder="Tell us about yourself"
                className={`form-control ${
                  isFieldEmpty(about) ? "is-invalid" : ""
                }`}
                id="InputAbout"
                onChange={(event) => setAbout(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>

          <p className="container my-2">Already have an account ?</p>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
