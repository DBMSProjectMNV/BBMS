import db from './db.js';

/* Schema
Retailer_id : string
Supplier_id : string
Supplier_name : string
Supplier_contact : string
Supplier_email : string
Supplier_address : string
*/

const findAll = async rid => {
  const sql = 'SELECT * FROM Suppliers WHERE Retailer_id = ?';
  try {
    const [rows] = await db.query(sql, [rid]);
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};
const find = async (rid, id) => {
  const sql =
  'SELECT * FROM Suppliers WHERE Retailer_id = ? AND Supplier_id = ?';
  try {
    const [[row]] = await db.query(sql, [rid, id]);
    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

const save = async (rid, id, supplier) => {
  const sql =
  'UPDATE Suppliers SET ? WHERE Retailer_id = ? AND Supplier_id = ?';
  try {
    await db.query(sql, [supplier, rid, id]);
  } catch (error) {
    return Promise.reject(error);
  }
};

const del = async (rid, id) => {
  const sql =
  'DELETE FROM Suppliers WHERE Retailer_id = ? AND Supplier_id = ?';
  try {
    await db.query(sql, [rid, id]);
  } catch (error) {
    return Promise.reject(error);
  }
};

const add = async supplier => {
  const sql = 'INSERT INTO Suppliers VALUES ?';
  const fields = [
    'Retailer_id',
    'Supplier_id',
    'Supplier_name',
    'Supplier_contact',
    'Supplier_email',
    'Supplier_address'
  ];
  try {
    const rows = await findAll(supplier['Retailer_id']);
    const maxm = Math.max(...rows.map(row => row['Supplier_id']));
    supplier['Supplier_id'] = maxm + 1;
    await db.query(sql, [[fields.map(col => supplier[col])]]);
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
