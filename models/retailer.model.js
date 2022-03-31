import db from './db.js';

/* Schema
Retailer_id : string
Retailer_name : string
Retailer_contact : string
Retailer_email : string
Retailer_address : string
*/

const byName = async name => {
  const sql = 'SELECT * FROM Retailers WHERE Retailer_name = ?';
  try {
    const [[row]] = await db.query(sql, [name]);
    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

const byId = async id => {
  const sql = 'SELECT * FROM Retailers WHERE Retailer_id = ?';
  try {
    const [[row]] = await db.query(sql, [id]);
    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

const find = (value, by) => {
  if (by === 'name') {
    return byName(value);
  }
  return byId(value);
};

export default {
  find
};
