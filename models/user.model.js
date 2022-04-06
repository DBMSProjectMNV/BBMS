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
      return row['Hint_question'];
    }
    return null;
  } catch (error) {
    return Promise.reject(error);
  }
};

const verifyAnswer = async (hintq, ans) => {
  const sql = 'SELECT Answer FROM User_Accounts WHERE Hint_question = ?';
  try {
    const [[row]] = await db.query(sql, [hintq]);
    if (row.Answer === ans) {
      return true;
    }
    return false;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  verifyPassword,
  findHintQ,
  verifyAnswer
};
