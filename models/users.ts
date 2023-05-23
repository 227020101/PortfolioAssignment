import * as db from '../helpers/database'

//get a single user by the (unique) username
export const findByUsername = async (username: any) => {
  const query = 'SELECT * from users where username = ?';
  const user = await db.run_query(query, [username]);
  return user;
}

export const LoginCheck = async (user: any) => {
  const username = user.username;
  const password = user.password;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  const values = [username, password];
  const result =  await db.run_query(query, values);
  return result;
}

//list all the users in the database
export const getAll = async () => {
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
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

//delete a single User by its id
export const deleteById = async (id: any) => {
  const query = 'delete FROM users WHERE ID = ?';
  const values = [id]
  try {
    await db.run_delete(query, values);
    return { status: 204 };
  } catch (err: any) {
    return err;
  }
}

//update a user in the database by its id
export const update = async (id: any, users: any) => {
  const keys = Object.keys(users);
  const values = Object.values(users);
  let parm = '';
  for (let i = 0; i < values.length; i++) {
    parm += `${keys[i]}=?,`
  }
  parm = parm.slice(0, -1);
  const query = `UPDATE users SET ${parm}  WHERE ID = ${id}`;
  try {
    const xx = await db.run_update(query, values);
    return { status: 202 };
  } catch (err: any) {
    return err;
  }
}