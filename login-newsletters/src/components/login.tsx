import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

type FormValues = {
  email: string;
  password: string;
};

export function LogIn() {
  const { register, handleSubmit } = useForm<FormValues>();
  const cookies = new Cookies();
  const navigate = useNavigate();

  console.log(cookies.get("userId"));

  return (
    //Create object with logon credentials
    <form
      onSubmit={handleSubmit(async function login(data) {
        try {
          const response = await fetch("http://localhost:3000/authorization", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
          });
          console.log(response);
          const json = await response.json();
          console.log(json);
        } catch (error) {
          console.log(error);
        }
        navigate("/userpage");
      })}
    >
      <h1>Logga in</h1>
      <input {...register("email")} placeholder="E-mail" />
      <input type="password" {...register("password")} placeholder="Lösenord" />
      <input type="submit" value="Logga in" />
    </form>
  );
}
