import React, { createContext, useState } from 'react'


export const UserContextStore = createContext<any>({});

const UserContext = ({children}:{children:React.ReactNode}) => {


    const [userDetails, setUserDetails] = useState<any>({
        name:'',
        questionAndAnswer:{},
        zodiacSign:'',
        username:'',
        requestId:'',
    });
  return (
    <UserContextStore.Provider value={{userDetails, setUserDetails}}>
        {children}
    </UserContextStore.Provider>
  )
}

export default UserContext