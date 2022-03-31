import db from './db.js';

/* Schema
Retailer_id : string
Staff_id : string
Staff_name : string
Staff_contact : string
Staff_email : string
Staff_address : string
Job_role : string
Salary : float or number
*/

const findAll = async rid => {
  const sql = 'SELECT * FROM Staffs WHERE Retailer_id = ?';
  try {
    const [rows] = await db.query(sql, [rid]);
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  findAll
};
