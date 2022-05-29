import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export function UserPage() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  let userId = cookies.get("userId");
  let userObject = { userId: userId.toString() };
  console.log(userObject);

  const [firstName, setFirstName] = useState("inte laddat");
  const [newsletter, setNewsletter] = useState(false);

  let newsletterText = "Du prenumererar inte på nyhetsbrevet";

  if(newsletter) {
    newsletterText = "Du prenumererar på nyhetsbrevet"
  }
 
  async function getUserData() {
    try {
      const response = await fetch("http://localhost:3000/userdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userObject),
      });
      console.log(response);
      const json = await response.json();
      console.log(json);

      setFirstName(json.name);
      setNewsletter(json.newsletter);
      console.log("Hejsan ", firstName, " din prenumeration är ", newsletter);
    } catch (error) {
      console.log(error);
    }
  }

  const { register, handleSubmit } = useForm();

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
      <form onSubmit={handleSubmit((data) => {
          console.log(data);
          
      }) }>
          <label>Jag vill prenumerera på nyhetsbrevet</label>
        <input {...register("newsletter")} type="checkbox" defaultChecked/><br/><br/>
        <input type="submit" value="Spara val" />
      </form>

      <button onClick={logOut}>Logga ut</button>
    </div>
  );
  }
