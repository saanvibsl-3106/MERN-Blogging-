import { NavLink,Outlet,Navigate } from "react-router-dom";
// import { useAuth } from "../store/auth";
import { useAuth } from "../../store/auth";
export const Adminlayout=()=>{
  const {user,isLoading}=useAuth();
  console.log("admin layout",user);

  if(isLoading){
    return <h1>Loading....</h1>
  }
  if(!user.isAdmin){
    return <Navigate to="/"/>
  }
   return (
     <>
       <header>
         <div className="container">
           <nav>
             <ul>
               <li>
                 <NavLink to="/admin/users">users</NavLink>
               </li>
               <li>
                 <NavLink to="/admin/contacts">contacts</NavLink>
               </li>
               <li>services</li>
               <li>Home</li>
             </ul>
           </nav>
         </div>
       </header>
       <Outlet/>
     </>
   );
};
