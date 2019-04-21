require('../src/db/mongoose');

const User = require('../src/models/user');


// User.findByIdAndUpdate('5cacd3964a93012debc24a75', {
//   age: 0,
// }).then((user) => {
//   console.log(user);
//   return User.countDocuments({ age: 0 });
// }).then(users => {
//   console.log(users);
// }).catch((error) => {
//   console.log(error);
// })

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndDelete(id, { age });
  const count = await User.countDocuments({ age });
  return count;
}

updateAgeAndCount('5cace169f8391030e038a839', 0).then((count) => {
  console.log(count);
}).catch(err => {
  console.log(err);
})