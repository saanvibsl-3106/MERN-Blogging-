import { useEffect, useState } from "react";
import {useAuth} from "../store/auth";
import {Link} from "react-router-dom";

export const AdminUsers =()=>{

 const [users,setUsers]=useState([]);
  const {authorizationToken}=useAuth();

const getAllUsersData=async()=>{
  try{
    const response = await fetch("http://localhost:5001/api/admin/users", {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
      }
    });
    const data=await response.json();
    console.log(`users ${data}`);
    console.log(data);
    setUsers(data);
  }catch(error){
    console.log(error);
  }
}

const deleteUser=async(id)=>{
  try{
     const response = await fetch(
      `http://localhost:5001/api/admin/users/delete/${id}`,
       {
         method: "DELETE",
         headers: {
           Authorization: authorizationToken,
         },
       }
     );
     const data = await response.json();
     console.log(`user after delete ${data}`);

     if(response.ok){
      getAllUsersData();
     }
  }catch(error){
    console.log(error);
  }
  
}

  useEffect(()=>{
    getAllUsersData();
  },[])
     return (
       <>
         <section className="admin-users-section">
           <div className="container">
             <h1>Admin User Data</h1>
           </div>

           <div className="container admin-users">
             <table>
               <thead>
                 <tr>
                   <th>Name</th>
                   <th>Email</th>
                   <th>Phone</th>
                   <th>Update</th>
                   <th>Delete</th>
                 </tr>
               </thead>
               <tbody>
                 {users && users.length > 0 ? (
                   users.map((curUser, index) => (
                     <tr key={index}>
                       <td>{curUser.username}</td>
                       <td>{curUser.email}</td>
                       <td>{curUser.phone}</td>
                       <td>
                         <Link to={`${curUser._id}/edit`}>
                           Edit
                         </Link>
                       </td>
                       <td>
                         <button onClick={() => deleteUser(curUser._id)}>
                           Delete
                         </button>
                       </td>
                     </tr>
                   ))
                 ) : (
                   <tr>
                     <td colSpan="5" style={{ textAlign: "center" }}>
                       No users found
                     </td>
                   </tr>
                 )}
               </tbody>
             </table>
           </div>
         </section>
       </>
     );
};



