import axios from "axios";
import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export function SignUp() {
  const { register, handleSubmit } = useForm<FormValues>();

  const headers = { 
      Accept: 'application/json',
    'Content-Type' : 'application/json',
};

  return (
      //spara användarens inputs till ett objekt
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        //fixa cors-fel, behöver headers! //works with chrome plugin moesif
        axios.post('http://localhost:3000/add', data, { headers })
        .then(function(response){
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
          });
      })}
    >
      <h1>Registrera ny användare</h1>
      <label htmlFor="firstName">Förnamn:</label>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input {...register("email")} />
      <input type="password" {...register("password")} />
      <input type="submit" />
    </form>
  );
}





//Användarens unika ID?
