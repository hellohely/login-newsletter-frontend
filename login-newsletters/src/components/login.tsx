import axios from "axios";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export function LogIn() {
  const { register, handleSubmit } = useForm<FormValues>();

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return (
    //Create object with logon credentials
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        //Send object to Express server

        axios
          .post("http://localhost:3000/login", data, { headers })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      })}
    >
      <h1>Logga in</h1>
      <input {...register("email")} placeholder="E-mail" />
      <input type="password" {...register("password")} placeholder="Lösenord" />
      <input type="submit" value="Logga in" />
    </form>
  );
}
