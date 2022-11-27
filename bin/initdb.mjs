import fetch from 'node-fetch';
import { generateUser } from "./data.mjs";

const signupURI = 'http://localhost:8000/signup';


for (let i = 0; i < 100000; i++) {
  const user = generateUser();
  const response = await fetch(signupURI, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },body: new URLSearchParams(user)
  });
  //console.log(response);
}