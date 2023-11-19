// const {coffeeStock,isCoffeeStockReady} = require("./state")
// console.log(coffeeStock)
// console.log(isCoffeeStockReady)

// Async with Callback

function getUsers(isOffline, callback) {
  setTimeout(() => {
    const users = ["John", "Jack", "Abigail"];

    if (isOffline) {
      callback(new Error("Cannot retrieve users due to offline"), null);
      return;
    }

    callback(null, users);
  }, 3000);
  console.log("This is GetUsers");
}
// Callback function
function usersCallback(err, users) {
  if (err) {
    console.log("process failed: ", err.message);
    return;
  }
  console.log("process success: ", users);
  console.log("This is usersCallback");
}

// Aync with Promise
function getUserProm(isOffline) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const users = ["John", "Jack", "Abigail"];

      if (isOffline) {
        rej(new Error("Failed due to Offine"));
        return;
      }

      res(users);
    }, 3000);
  });
}

// Promisify Async Callback
const {promisify} = require('util')


getUsers(true, usersCallback);

// Promisified
const getUserPromise = promisify(getUsers);
getUserPromise(true)
  .then(u=>console.log(u))
  .catch(err=>console.log(err.message))

// Ayncs Promise Call
getUserProm(false)
  .then((users) => console.log(users))
  .catch((err) => console.log(err.message));
