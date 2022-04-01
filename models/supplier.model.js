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

export default {
  findAll
};
