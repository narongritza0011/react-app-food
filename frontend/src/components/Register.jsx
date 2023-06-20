import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRedirectSuccess = () => {
    Swal.fire({
      title: "Register Successfuly",
      text: "You will be redirected to the new page.",
      icon: "success",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          navigate("/"); // Redirect to the desired page
        }, 1500);
      },
    });
  };
  const handleRedirectError = () => {
    Swal.fire({
      title: "Register Failed",
      text: msg,
      icon: "error",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          // navigate("/"); // Redirect to the desired page
        }, 1500);
      },
    });
  };
  const Register = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/register", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      console.log(response.data);
      handleRedirectSuccess();
      // navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
        handleRedirectError();
      }
    }
  };

  return (
    <div>
      <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4-desktop">
                <form className="box" onSubmit={Register}>
                  {/* <p className="has-text-centered has-text-danger">{msg}</p> */}

                  <div className="field mt-5">
                    <label className="label">Name</label>
                    <div className="controls">
                      <input
                        type="text"
                        className="input"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <label className="label">Email</label>
                    <div className="controls">
                      <input
                        type="text"
                        className="input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <label className="label">Password</label>
                    <div className="controls">
                      <input
                        type="password"
                        className="input"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <label className="label">Confirm Password</label>
                    <div className="controls">
                      <input
                        type="password"
                        className="input"
                        placeholder="******"
                        value={confPassword}
                        onChange={(e) => setconfPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button className="button is-success is-fullwidth">
                      Register
                    </button>
                  </div>
                  <p className="has-text-centered">
                    you have account? <Link to="/">Login</Link>
                  </p>
                  <div className="field mt-5"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
