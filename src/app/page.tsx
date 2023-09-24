"use client"
import Image from 'next/image'
import Link from 'next/link'
import connect from '@/dbconfig/dnConfig';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Home() {
  const [userId,setUserid] = useState("");

  useEffect(() => {
    axios.get("/api/currentUser").then((res) => {

      setUserid(res.data);
      if(!res.data){
        setUserid("-1");
      }
    })  
  }, [])
  
  const logout = () => {
    setUserid("-1");
    axios.get("/api/users/logout").then((res) => {})
  }
  
  return (
    <main>
     


    <div className='main'>
      {
        userId!="-1"?(
          <button onClick={logout} className='logout'>logout</button>
        ):(
        <>
          <Link href={"/login"}>login</Link>
          <br />
          <Link href={"/signup"}>signup</Link>
        </>
        )
      }
    </div>
   
    

    </main>
  )
}


//database username: youtupe or youtup
//database password: A951M951
//mongodb+srv://<username>:<password>@cluster0.k9m8usf.mongodb.net/