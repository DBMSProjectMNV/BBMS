import db from './db.js';

/* Schema
Retailer_id: string
Medicine_name: string
MRP: float
Stock: number
*/

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
  const sql =
  'UPDATE Inventory SET ? WHERE Retailer_id = ? AND Medicine_name = ?';
  try {
    await db.query(sql, [med, rid, name]);
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

const add = async med => {
  const sql = 'INSERT INTO Inventory VALUES ?';
  const fields = ['Retailer_id', 'Medicine_name', 'MRP', 'Stock'];
  try {
    await db.query(sql, [[fields.map(col => med[col])]]);
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
