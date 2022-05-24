export function SignUp() {
  return (
    <div>
      <form>
        <h1>Registrera ny användare</h1>
        Förnamn: <input type={"text"}></input>
        Efternamn: <input type={"text"}></input>
        Email: <input type={"email"}></input>
        Önskat lösenord:<input type={"password"}></input>
        Ja, jag vill ta emot nyhetsbrev<input type={"checkbox"}></input>
        <input type={"submit"} value="Registrera"></input>
      </form>
    </div>
  );
}
