import db from './db.js';

/* Schema
Retailer_id : string
Supplier_id : string
Order_id : string
Medicine_name : string
Quantity : number
MRP : number
Order_date : date
Order_status : enum
*/

const findAll = async rid => {
  const sql = 'SELECT * FROM Orders WHERE Retailer_id = ?';
  try {
    const [rows] = await db.query(sql, [rid]);
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

const find = async (rid, oid) => {
  const sql =
  'SELECT * FROM Orders WHERE Retailer_id = ? AND Order_id = ?';
  try {
    const [[row]] = await db.query(sql, [rid, oid]);
    return row;
  } catch (error) {
    return Promise.reject(error);
  }
};

const save = async (rid, id, order) => {
  const sql = 'UPDATE Orders SET ? WHERE Retailer_id = ? AND Order_id = ?';
  try {
    await db.query(sql, [order, rid, id]);
  } catch (error) {
    return Promise.reject(error);
  }
};

const add = async order => {
  const sql = 'INSERT INTO Orders VALUES ?';
  const fields = [
    'Retailer_id',
    'Order_id',
    'Medicine_name',
    'Quantity',
    'MRP',
    'Order_date',
    'Supplier_id',
    'Order_status'
  ];
  order['Order_id'] = null;
  order['Order_status'] = 'Pending';
  try {
    await db.query(sql, [[fields.map(col => order[col])]]);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  findAll,
  find,
  save,
  add
};
