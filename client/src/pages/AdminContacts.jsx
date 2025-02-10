import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { useState } from "react";
import { toast } from "react-toastify";
export const AdminContacts = () => {
  const [contactData,setContactData]=useState([]);
  const {authorizationToken} =useAuth();
  const getContactsData =async()=>{
        try{
          const response = await fetch("http://localhost:5001/api/admin/contacts",{
            method: 'GET',
            headers: {
              Authorization:authorizationToken,
            },
          });
          const data=await response.json();
          console.log("contact data",data);
          if(response.ok){
            setContactData(data);
          }
        }catch(error){
          console.log(error);
        }
  }
  const deletecontactbyid = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.ok) {
        getContactsData();
        toast.success("deleted successfully");
      } else {
        toast.error("Not Deleted ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{getContactsData();
  },[])
  return (
    <>
      <h1>hello thapa contacts</h1>
      {contactData.map((currcontactdata, index) => {

        const {username,email,message,_id}=currcontactdata;

        return <div key={index}>
          <p>{username}</p>
          <p>{email}</p>
          <p>{message}</p>
          <button className="btn" onClick={()=>deletecontactbyid(_id)}>delete</button>
        </div>;
      })}
    </>
  );
};
