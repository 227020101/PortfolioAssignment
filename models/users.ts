import * as db from '../helpers/database'

//get a single user by the (unique) username
export const findByUsername = async (username: string) => {
  const query = 'SELECT * from users where username = ?';
  const user = await db.run_query(query, [username]);
  return user;
}

//list all the user in the database
export const getAll = async () => {
  // TODO: use page, limit, order to give pagination
  const query = "SELECT * FROM users;"
  const data = await db.run_query(query, null);
  return data
}

//create a new user in the database
export const add = async (user: any) => {
  const keys = Object.keys(user);
  const values = Object.values(user);
  const key = keys.join(',');
  let parm = '';
  for (let i = 0; i < values.length; i++) { parm += '?,' }
  parm = parm.slice(0, -1);
  const query = `INSERT INTO users (${key}) VALUES (${parm})`;
  console.log(`testing ${query}`);
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}