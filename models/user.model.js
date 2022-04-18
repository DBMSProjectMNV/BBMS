import bcrypt from 'bcrypt';
import db from './db.js';

/* Schema
uid : int
name : string
rid : string
*/

const verifyPassword = async (username, password) => {
  let sql;
  try {
    const User = { name: username };
    sql = 'SELECT Retailer_id FROM Retailers WHERE Retailer_name = ?';
    const [retailers] = await db.query(sql, [username]);
    if (retailers.length !== 1) {
      return null;
    }
    User.rid = retailers[0]['Retailer_id'];
    sql =
    'SELECT User_id, Password_hash FROM User_Accounts WHERE Retailer_id = ?';
    const [[row]] = await db.query(sql, [User.rid]);
    User.uid = row['User_id'];
    const hash = row['Password_hash'].toString();
    const result = await bcrypt.compare(password, hash);
    return result ? User : null;
  } catch (error) {
    return Promise.reject(error);
  }
};

const verifyById = async (password, rid) => {
  const sql =
  'SELECT Password_hash FROM User_Accounts WHERE Retailer_id = ?';
  try {
    const [[row]] = await db.query(sql, [rid]);
    const hash = row['Password_hash'].toString();
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

const changePassword = async (newPassword, rid) => {
  const sql =
  'UPDATE User_Accounts SET Password_hash = ? WHERE Retailer_id = ?';
  try {
    const hash = await bcrypt.hash(newPassword, 10);
    const result = await db.query(sql, [hash, rid]);
    return result.affectedRows === 1;
    // assert result.affectedRows === 1
  } catch (error) {
    return Promise.reject(error);
  }
};

const findHintQ = async username => {
  let sql;
  try {
    sql = 'SELECT Retailer_id FROM Retailers WHERE Retailer_name = ?';
    const [retailers] = await db.query(sql, [username]);
    if (retailers.length !== 1) {
      return null;
    }
    const rid = retailers[0]['Retailer_id'];
    sql = 'SELECT Hint_question FROM User_Accounts WHERE Retailer_id = ?';
    const [[row]] = await db.query(sql, [rid]);
    if (row['Hint_question']) {
      return [row['Hint_question'], rid];
    }
    return null;
  } catch (error) {
    return Promise.reject(error);
  }
};

const verifyAnswer = async (rid, ans) => {
  const sql = 'SELECT Answer FROM User_Accounts WHERE Retailer_id = ?';
  try {
    const [[row]] = await db.query(sql, [rid]);
    if (row && row.Answer === ans) {
      return true;
    }
    return false;
  } catch (error) {
    return Promise.reject(error);
  }
};

const add = async user => {
  const sql = `
    INSERT INTO User_Accounts
    (Password_hash, Hint_question, Answer, Retailer_id) VALUES ?
  `;
  const fields = ['Password_hash', 'Hint_question', 'Answer', 'Retailer_id'];
  try {
    user['Password_hash'] = await bcrypt.hash(user.password, 10);
    await db.query(sql, [[fields.map(col => user[col])]]);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  verifyPassword,
  verifyById,
  changePassword,
  findHintQ,
  verifyAnswer,
  add
};
