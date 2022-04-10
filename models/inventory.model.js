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

export default {
  findAll
};