import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import write from "./write";

const auth = getAuth();

const signInUser = (option, email, password) => {
  return new Promise((resolve, reject) => {
    if (option === "signIn") {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          resolve(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          reject(errorMessage);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          const response = window.prompt("Enter a display name:");
          updateProfile(user, {
            displayName: response ? response : "User"
          }).then(() => resolve(user));
          write(`/user/${user.uid}/numGames`, 0);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          reject(errorMessage);
        });
    }
  });
};

export default signInUser;
