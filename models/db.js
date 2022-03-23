import mysql from 'mysql2';
import { DB } from '../config.js';

const pool  = mysql.createPool({
  host : DB.host, // The hostname of the database you are connecting to.
  // (Default: localhost)
  port : 3306, // The port number to connect to.
  // (Default: 3306)
  user : DB.user, // The MySQL user to authenticate as.
  password : DB.password, // The password of that MySQL user.
  database : DB.database, // Name of the database to use for this connection.
}).promise();

export default pool;


/* export default {
  username: 'owner',
  password: 'password'
};*/
