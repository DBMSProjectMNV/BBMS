const admin = {
  name: 'owner',
  contact: '9876543201',
  email: 'owner@medstore.com',
  address: `owner's address is this`
};

const find = async name => {
  if (name === admin.name) {
    return admin;
  }
  return Promise.reject('Invalid username');
};

export default {
  find
};
