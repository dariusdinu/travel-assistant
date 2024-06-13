import axios from "axios";

async function authenticate(
  mode,
  { firstName, lastName, birthDate, email, password }
) {
  try {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const url = `${apiUrl}/users/${mode}`;
    const response = await axios.post(url, {
      firstName,
      lastName,
      birthDate,
      email,
      password,
    });
    const { idToken, localId } = response.data;
    return { token: idToken, user: localId };
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("No response from the server");
    } else {
      throw new Error("An error occurred");
    }
  }
}

function signUp({ firstName, lastName, birthDate, email, password }) {
  return authenticate("sign-up", {
    firstName,
    lastName,
    birthDate,
    email,
    password,
  });
}

function signInWithPassword(email, password) {
  return authenticate("sign-in-with-password", { email, password });
}

export { signInWithPassword, signUp };
