import { sql } from '@vercel/postgres';
const bcrypt = require('bcrypt');
import { redirect } from 'next/navigation';


export default function RegistrationForm() {

  async function handleSubmit(formData: FormData) {
    'use server';
    const hashedPassword = bcrypt.hash(formData.get('password'), 10) as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    console.log(hashedPassword);
    console.log(name);
    console.log(email);

    sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`

    redirect('/login');

  };

  return (
    <form action={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-md shadow-xl bg-blue-200 px-6 pt-4 pb-4">
        <h1 className="mb-3 text-2xl">Register</h1>
        <div className="w-full">
          <div className="mb-3">
            <label htmlFor="name" className="block mb-3">Name:</label>
            <input type="text" name="name" id="name" placeholder="Enter your name" className="block w-full"/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block mb-3">Email:</label>
            <input type="text" name="email" id="email" placeholder="Enter your email" className="block w-full"/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block mb-3">Enter Password:</label>
            <input type="text" name="password" id="password" placeholder="Create a password" className="block w-full"/>
          </div>
        </div>
        <input type="submit" value="Submit" className="rounded-md bg-blue-500 text-white cursor-pointer p-2"/>
      </div>

    </form>

  )
};