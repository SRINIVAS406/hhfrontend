import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const UserProfile = () => {
  const hostUrl = import.meta.env.VITE_HOST_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [parentId, setParentId] = useState("");
  const [job, setJob] = useState("");
  const [companyname, setCompany] = useState("");
  const [userid, setUserid] = useState("");
  const [formValid, setFormValid] = useState(true);
  const [skill, setSkill] = useState("");
  const navigate = useNavigate();
  const [about, setAbout] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Fetch the list of users and set it to the users state
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
    axios
      .get(hostUrl + "/authonticate", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        let userData = response.data.user;
        setName(userData.name || "");
        setEmail(userData.email || "");
        setPassword(userData.password || ""); // Note: You might not want to expose the password in this way; it's just for demonstration.
        setParentId(userData.parentId || "");
        setJob(userData.job || "");
        setCompany(userData.companyname || "");
        setUserid(userData._id || "");
        setSkill(userData.skill || "");
        setAbout(userData.about || "");
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Fetch the list of users and set it to the users state
    axios
      .get(hostUrl + "/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const validateForm = () => {
    // Add your validation logic here
    // For , you can check if fields are not empty, valid email format, etc.
    const isValid =
      name && email && password && parentId && job && companyname && skill;
    return isValid;
  };

  const isFieldEmpty = (fieldValue) => {
    return fieldValue.trim() === "";
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    // Validate the form before updating profile
    if (validateForm()) {
      // Assuming you have the user ID available (you might need to pass it as a prop or retrieve it in some way)
      const userId = userid;

      // Update the user record instead of registering a new one
      axios
        .put(hostUrl+`/updateUser/${userId}`, {
          name,
          email,
          password,
          parentId,
          job,
          companyname,
          about,
          skill,
        })
        .then((result) => {
          console.log(result);
          alert("Profile updated successfully!");
          // You may want to redirect the user to a different page after successful update
          navigate("/home");
        })
        .catch((err) => console.log(err));
    } else {
      setFormValid(false);
    }
  };

  return (
    <div>
      <Header />
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
            <h2 className="mb-3 text-primary text-center">Your Profile</h2>
            {!formValid && (
              <div className="alert alert-danger" role="alert">
                Please fill in all required fields.
              </div>
            )}
            <form onSubmit={handleUpdateProfile}>
              <div
                className={`mb-3 text-start ${
                  isFieldEmpty(parentId) ? "text-danger" : ""
                }`}
              >
                <label htmlFor="InputParent" className="form-label">
                  <strong>Reference</strong>
                </label>
                <select
                  className="form-control"
                  id="InputParentd"
                  onChange={(event) => setParentId(event.target.value)}
                  value={parentId}
                  disabled="true"
                >
                  {" "}
                  <option value="">--None--</option>
                  {email ? (
                    email == "srinivas.reddy.94807@gmail.com" ? (
                      <>
                        <option value="root">root</option>
                      </>
                    ) : (
                      <></>
                    )
                  ) : (
                    ""
                  )}
                  {users.map((userdetails) => (
                    <option key={userdetails._id} value={userdetails._id}>
                      {userdetails.name}
                    </option>
                  ))}
                </select>
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
                  placeholder="Enter Name"
                  className="form-control"
                  id="InputName"
                  value={name}
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
                  value={email}
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
                  placeholder="Enter Job"
                  className="form-control"
                  id="InputJob"
                  value={job}
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
                  <strong>Skill</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter Skill"
                  className={`form-control ${
                    isFieldEmpty(skill) ? "text-danger" : ""
                  }`}
                  id="InputSkill"
                  value={skill}
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
                  placeholder="Enter Company"
                  className="form-control"
                  id="InputCompany"
                  value={companyname}
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
                  value={about}
                  onChange={(event) => setAbout(event.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
