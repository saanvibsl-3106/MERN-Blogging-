import { NavLink,Outlet } from "react-router-dom";
export const Adminlayout=()=>{
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
