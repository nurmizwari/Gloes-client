import http from "./axios";

export async function loginForm(email, password) {
  try {
    const response = await http.post("/login", {
      email,
      password,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
