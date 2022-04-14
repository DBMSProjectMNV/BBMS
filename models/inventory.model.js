import db from './db.js';

/* Schema
Retailer_id: string
Medicine_name: string
MRP: float
Stock: number
*/

const fields = ['Medicine_name', 'MRP', 'Stock'];

const findAll = async rid => {
  const sql = 'SELECT * FROM Inventory WHERE Retailer_id = ?';
  try {
    const [rows] = await db.query(sql, [rid]);
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

const find = async (rid, name) => {
  const sql =
  'SELECT * FROM Inventory WHERE Retailer_id = ? AND Medicine_name = ?';
  try {
    const [[row]] = await db.query(sql, [rid, name]);
    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

const save = async (rid, name, med) => {
  const sql = `
    UPDATE Inventory SET
      Medicine_name = ?,
      MRP = ?,
      Stock = ?
    WHERE Retailer_id = ? AND Medicine_name = ?
  `;
  try {
    const now = await find(rid, name);
    const array = fields.map(col => med[col] || now[col]).concat([rid, name]);
    await db.query(sql, array);
  } catch (error) {
    return Promise.reject(error);
  }
};

const del = async (rid, name) => {
  const sql =
  'DELETE FROM Inventory WHERE Retailer_id = ? AND Medicine_name = ?';
  try {
    await db.query(sql, [rid, name]);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  findAll,
  find,
  save,
  del
};
