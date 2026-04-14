const isEmail = (email) => /\S+@\S+\.\S+/.test(email);
module.exports = { isEmail };
