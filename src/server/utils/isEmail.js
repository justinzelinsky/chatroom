// Credit: https://tylermcginnis.com/validate-email-address-javascript/

const isEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

module.exports = isEmail;
