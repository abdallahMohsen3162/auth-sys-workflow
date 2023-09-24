"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function loginpage() {
  const[email, setmail] = useState("");
  const[password, setpassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/currentUser").then((res) => {
      console.log(res);
      if(res.data != "-1"){
        router.push("/");
      }
    })
  })

  const login = () => {
    axios.post("/api/users/login", {
      email:email,
      password:password,
    }).then((res) => {
      console.log(res.data);
      if(res.data.data != "-1"){
          router.push("/");
      }
    })
  }
  
  return (
    <div>
      <h1>login</h1>

      <br />

      <input placeholder='username' type="text" onChange={(e) => setmail(e.target.value)} />
      <input placeholder='email' type="text" onChange={(e) => setpassword(e.target.value)} />
      <br />
      <button onClick={login}>login</button>
      <br />
      <Link href={"/"}>go to home</Link>
    </div>
  )
}
