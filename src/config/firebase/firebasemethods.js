import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import app from "./firebaseconfig";
import { getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";


const database = getDatabase(app)
const auth = getAuth(app);


const saveDetails = (nodeName, obj) => {
  // for id/key start
  let postListRef = ref(database, nodeName);
  obj.id = push(postListRef).key;
  console.log(obj.id);
  // for id/key end

  let newpostListRef = ref(database, `${nodeName}/${obj.id}`);
  return set(newpostListRef, obj);
}

let getData = (nodeName) => {

  const dbRef = ref(database, nodeName);
  return new Promise((resolve, reject) => {
    onValue(dbRef,
      (snapshot) => {
        const detailsArray = [];
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          // console.log(childData)
          detailsArray.push(childData)
          // ...
        });
        // console.log(detailsArray)
        resolve(detailsArray)
      }, {
      onlyOnce: false,
    });
  })
}

let updateData = (obj, nodeName, id) => {
  let newpostListRef = ref(database, `${nodeName}/${id ? id : obj.id}`);
  return update(newpostListRef, obj);
}

let deleteData = (nodeName, id) => {
  remove(ref(database, `${nodeName}/${id}`)).then(() => {
    console.log("Deleted successfully")
  }).catch((err) => {
    console.log(err)
  });
}

const saveData = (nodeName, userObj, uid) => {
  userObj.id = uid;
  return set(ref(database, `${nodeName}/${uid}`), userObj);
}

const getSingleData = (nodeName, uid) => {
    const starCountRef = ref(database, `${nodeName}/${uid}`);
    return new Promise((resolve, reject) => {
     onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        resolve(data)
    });
})
}

const SignUp = (userObj) => {
  return new Promise((resolve, reject) => {

    createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        saveData("users", userObj, user.uid).then(() => {

          resolve(user);
        })
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        reject(errorMessage)
      });
  })

}


const logIn = (userObj) => {

  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, userObj.email, userObj.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log(user)
        getData("users", user.uid).then((res) => {
          resolve(user)
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorMessage)
      });
  })

}



let checkAuthUser = (user) => {
  return new Promise((resolve, reject) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
     const uid = user.uid;
      resolve(uid)
    } else {
      reject("User is signed out")
    }
  });
})
};
let logOutUser = () => {
  return new Promise((resolve, reject) => {
  signOut(auth)
    .then(() => {
      resolve("Sign-out successful")
    })
    .catch((error) => {
      reject(error)
    });
  });
};


export { saveDetails, getData, updateData, deleteData, SignUp, logIn,getSingleData,checkAuthUser,logOutUser }