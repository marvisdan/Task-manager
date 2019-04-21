const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true, // required all time
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error('Email is invalid')
//       }
//     }
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 7,
//     validate(value) {
//       if (value.includes('password')) {
//         throw new Error('Password is not valid')
//       }
//     }
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) { // required only if user provide an age
//       if (value < 0) {
//         throw new Error('Age must be a positive number')
//       }
//     }
//   },
// });

// const me = new User({
//   name: ' Croco ',
//   email: '    Croco.Croc@gmail.com   ',
//   password: 'nckednfvelr'
//   // age: 'Mike',
// });

// me.save().then(result => {
//   console.log('res', result);

// })
//   .catch(error => {
//     console.log(error);
//   });

// const Task = mongoose.model('Task', {
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });

// const newTask = new Task({
//   description: ' Learn mongo & mongoose ',
// });

// newTask.save().then(result => {
//   console.log('res', result);

// }).catch(error => {
//   console.log('err', error);
// })