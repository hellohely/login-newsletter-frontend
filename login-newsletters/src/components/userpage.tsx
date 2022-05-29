import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export function UserPage() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  let userId = cookies.get("userId");
  let userObject = { userId: userId.toString() };

  const [firstName, setFirstName] = useState("inte laddat");
  const [newsletter, setNewsletter] = useState(false);

  let newsletterText = "Du prenumererar inte på nyhetsbrevet";

  if (newsletter) {
    newsletterText = "Du prenumererar på nyhetsbrevet";
  }

  async function getUserData() {
    try {
      const response = await fetch("http://localhost:3000/userdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userObject),
      });
      const json = await response.json();

      setFirstName(json.name);
      setNewsletter(json.newsletter);
      console.log("Hejsan ", firstName, " din prenumeration är ", newsletter);
    } catch (error) {
      console.log(error);
    }
  }

  getUserData();

  function logOut() {
    cookies.remove("userId");
    navigate("/login");
    window.location.reload();
  }

  return (
    <div>
      <p>Välkommen {firstName}!</p>
      <p>{newsletterText}</p>
      <h4>Mina inställningar:</h4>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <label>Jag vill prenumerera på nyhetsbrevet</label>
        { newsletter && <input {...register("newsletter")} type="checkbox" defaultChecked />}
        { !newsletter && <input {...register("newsletter")} type="checkbox" />}
        <br />
        <br />
        <input type="submit" value="Spara val" />
      </form>

      <button onClick={logOut}>Logga ut</button>
    </div>
  );
}
