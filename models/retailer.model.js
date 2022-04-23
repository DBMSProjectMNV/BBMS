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

const save = async (rid, ret) => {
  const sql = 'UPDATE Retailers SET ? WHERE Retailer_id = ?';
  try {
    await db.query(sql, [ret, rid]);
  } catch (error) {
    return Promise.reject(error);
  }
};

const add = async ret => {
  const sql = 'INSERT INTO Retailers VALUES ?';
  const fields = [
    'Retailer_id',
    'Retailer_name',
    'Retailer_contact',
    'Retailer_email',
    'Retailer_address'
  ];
  try {
    const [rows] = await db.query('SELECT Retailer_id FROM Retailers');
    const maxm = Math.max(...rows.map(row => parseInt(row['Retailer_id'], 10)));
    ret['Retailer_id'] = `${maxm + 1}`;
    await db.query(sql, [[fields.map(col => ret[col])]]);
    return ret['Retailer_id'];
  } catch (error) {
    return Promise.reject(error);
  }
};

const del = async rid => {
  const sql = 'DELETE FROM Retailers WHERE Retailer_id = ?';
  await db.query(sql, [rid]);
};

export default {
  find,
  save,
  add,
  del
};
