import axios from "axios";
import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  newsletter: boolean;
};

export function SignUp() {
  const { register, handleSubmit } = useForm<FormValues>();

  //Headers for post call to server
  const headers = { 
      Accept: 'application/json',
    'Content-Type' : 'application/json',
};

  return (
      //Create object from user input
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        //Sends object to mongodb database through express server
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
      <input {...register("firstName")} placeholder="Förnamn"/>
      <input {...register("lastName")} placeholder="Efternamn" />
      <input {...register("email")} placeholder="E-mail"/>
      <input type="password" {...register("password")} placeholder="Önskat lösenord"/>
      <input type="checkbox" {...register("newsletter")} defaultChecked/><p>Ja tack, jag vill prenumerera på nyhetsbrevet</p>
      <input type="submit" value="Registrera" />
    </form>
  );
}
