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

  const [firstName, setFirstName] = useState("Okänd");
  const [newsletter, setNewsletter] = useState(false);
  //const [newsletterText, setNewsletterText] = useState("Du prenumererar inte på nyhetsbrevet");

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

  function logOut() {
    cookies.remove("userId");
    navigate("/login");
    window.location.reload();
  }

  getUserData();

  return (
    <div>
      <p>Välkommen {firstName}!</p>
      <h4>Mina inställningar:</h4>
      <form
        onSubmit={handleSubmit(async function newsletterSettings(data) {
          let newsletterPost = {
            newsletter: data.newsletter.toString(),
            userId: userId.toString(),
          };
          console.log(newsletterPost);

          try {
            const response = await fetch(
              "http://localhost:3000/newslettersettings",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(newsletterPost),
              }
            );
            console.log(response);
            const json = await response.json();
            console.log(json);
          } catch (error) {
            console.log(error);
          }
        })}
      >
        <label>Ja tack, jag vill prenumerera på nyhetsbrevet</label>

        <input {...register("newsletter")} type="checkbox" defaultChecked />

        <br />
        <br />
        <input type="submit" value="Spara val" />
      </form>

      <button onClick={logOut}>Logga ut</button>
    </div>
  );
}
