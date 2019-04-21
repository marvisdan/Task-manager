require('../src/db/mongoose');
const Task = require('../src/models/tasks');


// Task.findByIdAndDelete('5cad2b4f71ee6b3327b1d7aa').then((task) => {
//   console.log('task', task);
//   return Task.countDocuments({ completed: false });
// }).then(count => {
//   console.log(count);
// }).catch((err) => {
//   console.log(err);
// })


const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
}

deleteTaskAndCount('5cad28d27a00843301db611d', false).then((task) => {
  console.log('task', task);
}).catch((err) => {
  console.log('error', err);
});
