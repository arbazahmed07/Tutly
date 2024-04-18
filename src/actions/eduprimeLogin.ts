
export default async function eduprimeLogin(username:string,password:string) {
  try {

    const res = await fetch(
      "https://automation.vnrvjiet.ac.in/EduPrime3/Login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          xpassword: password,
          Domain: "VNRVJIET",
        }),
      }
    );

    const cookie = res.headers.get("set-cookie") || "";
    const data = await res.json();

    return {...data,cookie};

  } catch (error: any) {
    return null;
  }
}
