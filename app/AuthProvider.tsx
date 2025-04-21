"use client"
import { api } from '@/convex/_generated/api';
import { useUser } from '@stackframe/stack';
import { useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react'
import { UserContext } from './_context/UserContext';
import { Id } from '@/convex/_generated/dataModel';

export interface userTypes {
  _id: Id<"users">;
  _creationTime: number;
  subscriptionId?: string | undefined;
  name: string;
  email: string;
  credits: string;
}

type Props = {
    children: React.ReactNode
}

const AuthProvider = ({children}: Props) => {
  const [userData, setUserData] = useState<userTypes | undefined>()

    const user = useUser();
const CreateUser = useMutation(api.users.CreateUser);
useEffect(() => {
    console.log(user)
    user && CreateNewUser()
}, [user])

const CreateNewUser = async()=> {
 const result = await CreateUser({
  name: user?.displayName as string,
  email: user?.primaryEmail as string
})
setUserData(result)
}

  return (
    <div>
      <UserContext.Provider value={{userData, setUserData}}>
        {children}
      </UserContext.Provider>
    </div>
  )
}

export default AuthProvider