import fetch from 'node-fetch';
import { generateUser, generateTag, generateTask } from "./data.mjs";

const tagURI = 'http://localhost:8000/tags';
const signupURI = 'http://localhost:8000/signup';

async function insertUser(user) {

  const response = await fetch(signupURI, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },body: new URLSearchParams(user)
  });
  console.log(response);
}

async function insertTag(tag) {
  const response = await fetch(tagURI, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },body: new URLSearchParams(tag)
  });
  console.log(response);
}

async function insertTask(task) {
  const response = await fetch(taskURI, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },body: new URLSearchParams(task)
  });
  console.log(response);
}


for (let i = 0; i < 1000000; i++) {
  const tag = generateTag();
  const user = generateUser();
  const task = generateTask();

}