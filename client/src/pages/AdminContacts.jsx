import { useEffect } from "react";

export const AdminContacts = () => {
  const getContactsData =async()=>{
        try{
          const response=await fetch();
        }catch(error){
          console.log(error);
        }
  }
  useEffect(()=>{getContactsData();
  },[])
  return <h1>admin contacts panel</h1>;
};
