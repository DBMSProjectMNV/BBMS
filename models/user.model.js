import bcrypt from 'bcrypt';
import db from './db.js';

/* Schema
User_id : int
name : string
role : 'admin', 'staff'
id : staff_id or retailer_id
*/

const verifyPassword = async (username, password) => {
  let sql;
  try {
    const User = { name: username };
    sql = 'SELECT User_id, Retailer_id FROM Retailers WHERE Retailer_name = ?';
    const [retailers] = await db.query(sql, [username]);
    sql = 'SELECT User_id, Staff_id FROM Staffs WHERE Staff_name = ?';
    const [staffs] = await db.query(sql, [username]);
    if (retailers.length !== 1) {
      if (staffs.length !== 1) {
        return null;
      }
      User['User_id'] = staffs[0]['User_id'];
      User.id = staffs[0].Staff_id;
      User.role = 'staff';
    } else {
      User['User_id'] = retailers[0]['User_id'];
      User.id = retailers[0].Retailer_id;
      User.role = 'admin';
    }
    sql = 'SELECT Password_hash FROM User_Accounts WHERE User_id = ?';
    const [[row]] = await db.query(sql, [User['User_id']]);
    const result = await bcrypt.compare(password, row.Password_hash);
    return result ? User : null;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  verifyPassword
};
