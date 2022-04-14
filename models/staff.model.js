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

const find = async (rid, id) => {
  const sql =
  'SELECT * FROM Staffs WHERE Retailer_id = ? AND Staff_id = ?';
  try {
    const [[row]] = await db.query(sql, [rid, id]);
    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

const save = async (rid, id, staff) => {
  const sql = 'UPDATE Staffs SET ? WHERE Retailer_id = ? AND Staff_id = ?';
  try {
    await db.query(sql, [staff, rid, id]);
  } catch (error) {
    return Promise.reject(error);
  }
};

const del = async (rid, id) => {
  const sql =
  'DELETE FROM Staffs WHERE Retailer_id = ? AND Staff_id = ?';
  try {
    await db.query(sql, [rid, id]);
  } catch (error) {
    return Promise.reject(error);
  }
};

const add = async staff => {
  const sql = 'INSERT INTO Staffs VALUES ?';
  const fields = [
    'Retailer_id',
    'Staff_id',
    'Staff_name',
    'Staff_contact',
    'Staff_email',
    'Staff_address',
    'Job_role',
    'Salary'
  ];
  try {
    console.log(staff);
    const rows = await findAll(staff['Retailer_id']);
    const maxm = Math.max(...rows.map(row => row['Staff_id']));
    staff['Staff_id'] = maxm + 1;
    await db.query(sql, [[fields.map(col => staff[col])]]);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  findAll,
  find,
  save,
  del,
  add
};
