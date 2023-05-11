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
  console.log(query)
  const result =  await db.run_query(query, values);
  // if (result.rows.length === 1) {
  //   const a = {
  //     id: result.rows[0].id,
  //     username: result.rows[0].username,
  //     email: result.rows[0].email,
  //     UserRole: result.rows[0].userrole
  //   };
  // }
  return result;
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