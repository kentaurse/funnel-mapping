const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String },
  isAdmin: { type: Boolean, default: false }
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

userSchema.methods.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

// Create admin user if it doesn't exist
async function createAdminUser() {
  try {
    const adminExists = await User.findOne({ email: 'admin@gmail.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: '123456',
        isAdmin: true
      });
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser();

module.exports = User;