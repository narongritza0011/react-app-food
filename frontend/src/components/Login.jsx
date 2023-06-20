import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRedirectSuccess = () => {
    Swal.fire({
      title: "Login Successfuly",
      text: "You will be redirected to the new page.",
      icon: "success",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to the desired page
        }, 1500);
      },
    });
  };

  const handleRedirectError = () => {
    Swal.fire({
      title: "Login Failed",
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

  const Auth = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      console.log(response.data);
      handleRedirectSuccess();
      // navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        handleRedirectError();
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form className="box" onSubmit={Auth}>
                {/* <p className="has-text-centered has-text-danger">{msg}</p> */}
                <div className="field mt-5">
                  <label className="label">บัญชีผู้ใช้</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">รหัสผ่าน</label>
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
                  <button className="button is-success is-fullwidth">
                    เข้าสู่ระบบ
                  </button>
                  <br />
                </div>
                <div className="field mt-5">
                  <Link
                    to="/register"
                    className="button is-warning  is-fullwidth"
                  >
                    สมัครสมาชิก
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
