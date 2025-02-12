import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
export const Register = () => {
    const navigate=useNavigate();
    const [user,setUser]=useState({
        username:"",
        email:"",
        phone:"",
        password:""
    });
    
    const handleInput=(e)=>{
      console.log(e);
      let name =e.target.name;
      let value=e.target.value;

      setUser({
        ...user,
        [name]:value,
      })
    };

    // handle form submit
    const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log(user);
      try{
      const response =await fetch(`http://localhost:5001/api/auth/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(user),
       
      });
      // console.log(response);
      const res_data = await response.json();
      console.log("res from server", res_data.extraDetails);
       if (response.ok) {
        // storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("registration successful!");
         navigate("/login");
       }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
       }
       
    }catch(error){
        console.log(error);
      }
    };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container  grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/register.png"
                  alt="a girl is trying to do reistration"
                  width="500"
                  height="500"
                />
              </div>

              {/* code for registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br></br>

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      id="username"
                      required
                      autoComplete="off"
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="enetr ur email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      placeholder="phone"
                      required
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
