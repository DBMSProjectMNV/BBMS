import db from './db.js';
import Inventory from './inventory.model.js';

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

const finish = async (rid, oid) => {
  const sql = `
    UPDATE Orders
    SET Order_status = "COMPLETED"
    WHERE Retailer_id = ? AND Order_id = ?
  `;
  try {
    const [result] = await db.query(sql, [rid, oid]);
    if (result.affectedRows === 1) {
      const order = await find(rid, oid);
      const obj = {
        'Retailer_id': order['Retailer_id'],
        'Medicine_name': order['Medicine_name'],
        'MRP': order.MRP,
        'Stock': order.Quantity
      };
      const med = await Inventory.find(rid, order['Medicine_name']);
      if (med) {
        obj.Stock += med.Stock;
        await Inventory.save(rid, order['Medicine_name'], obj);
      } else {
        await Inventory.add(obj);
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const cancel = async (rid, oid) => {
  const sql = `
    UPDATE Orders
    SET Order_status = "CANCELLED"
    WHERE Retailer_id = ? AND Order_id = ?
  `;
  try {
    await db.query(sql, [rid, oid]);
  } catch (error) {
    return Promise.reject(error);
  }
};

const pending = async rid => {
  const sql = `
    SELECT * FROM Orders
    WHERE Retailer_id = ? AND Order_status = "PENDING"
  `;
  try {
    const [rows] = await db.query(sql, [rid]);
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};
const completed = async rid => {
  const sql = `
    SELECT * FROM Orders
    WHERE Retailer_id = ? AND Order_status = "COMPLETED"
  `;
  try {
    const [rows] = await db.query(sql, [rid]);
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};
const cancelled = async rid => {
  const sql = `
    SELECT * FROM Orders
    WHERE Retailer_id = ? AND Order_status = "CANCELLED"
  `;
  try {
    const [rows] = await db.query(sql, [rid]);
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  findAll,
  find,
  save,
  finish,
  cancel,
  pending,
  cancelled,
  completed,
  add
};
