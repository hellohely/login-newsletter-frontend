import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export function LogIn() {
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <form onSubmit={handleSubmit((data) => {
        console.log(data);
        
    })}>
      <h1>Logga in</h1>
      <input {...register("email")} placeholder="E-mail" />
      <input type="password" {...register("password")}  placeholder="Lösenord"/>
      <input type="submit" value="Logga in" />
    </form>
  );
}
