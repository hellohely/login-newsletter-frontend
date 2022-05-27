import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";


type FormValues = {
  email: string;
  password: string;
};

export function LogIn() {
  const { register, handleSubmit } = useForm<FormValues>();
  const cookies = new Cookies();

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    withCredentials: true
  };

  return (
    //Create object with logon credentials
    <form
      onSubmit={handleSubmit((data) => {
        //console.log(data);
        //Send object to Express server

        axios
          .post("http://localhost:3000/login", data, { headers })
          .then(function (response) {
              //let kaka = response.headers["set-cookie"]
            console.log(response);
            
            if (response.status === 200) {
                //Server responds with user ID. Need to save user ID to cookies
                //let kaka: any = cookies.get("kaka");
                //console.log(kaka);
                
                console.log(response.data);

                cookies.set('userID', response.data.id)
                console.log(cookies.get('userID'));
                
                
                
              return console.log("Anv inloggad");
            }
            console.log("Okänt fel");
          })
          .catch(function (error) {
            console.log(error);
            if (error.code === "ERR_BAD_REQUEST") {
              return console.log("Felaktigt anv el lösen");
            }
            console.log("Okänt fel");
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
