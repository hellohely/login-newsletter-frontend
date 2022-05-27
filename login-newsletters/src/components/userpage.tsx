import Cookies from "universal-cookie";

export function UserPage() {
    const cookies = new Cookies();

let userId = cookies.get("userId");
console.log(userId);

return(<p>{userId}</p>)
}