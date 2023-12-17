import { useState } from "react";
import UserContext from "./userContext";



const UserState = (props) => {
    const [data,setData] = useState([]);
    const fetchDatafn = async () => {
      try {
        const response = await fetch('http://localhost:3002/users/gamesdata');
        if (!response.ok) {
        console.log("Error file fetching");
        }
      
        const result = await response.json();
       
        setData(result.data);
        return result.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    return (
            <UserContext.Provider
              value={{data, fetchDatafn}}
            >
              {props.children}
            </UserContext.Provider>
          );
}

export default UserState;