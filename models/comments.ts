import * as db from '../helpers/database'

//get a single cat by its id
export const getById = async (id: any) => {
  const query = 'SELECT * FROM comments WHERE ID = ?';
  const values = [id]
  const data = await db.run_query(query, values);
  return data;
}

//list all the comments in the database
export const getAll = async () => {
  // TODO: use page, limit, order to give pagination
  const query = "SELECT * FROM comments;"
  const data = await db.run_query(query, null);
  return data
}

//create a new comments in the database
export const add = async (comments: any) => {
  const keys = Object.keys(comments);
  const values = Object.values(comments);
  //keys.push('authorid');
  //values.push(2);
  const key = keys.join(',');
  let parm = '';
  // let parms = values.join(',');
  // console.log(`test${parms}`);
  for (let i = 0; i < values.length; i++) { parm += '?,' }
  parm = parm.slice(0, -1);
  const query = `INSERT INTO comments (${key}) VALUES (${parm})`;
  console.log(`testing ${query}`);
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

//delete a single comments by its id
export const deleteById = async (id: any) => {
  const query = 'delete FROM comments WHERE ID = ?';
  const values = [id]
  try {
    await db.run_delete(query, values);
    return { status: 204 };
  } catch (err: any) {
    return err;
  }
}

//update a comments in the database by its id
export const update = async (id: any, comments: any) => {
  const keys = Object.keys(comments);
  const values = Object.values(comments);
  let parm = '';
  // let parms = values.join(',');
  // console.log(`test${parms}`);
  for (let i = 0; i < values.length; i++) {
    parm += `${keys[i]}=?,`
  }
  parm = parm.slice(0, -1);
  const query = `UPDATE comments  ${parm} SET WHERE ID = ${id}`;
  console.log(`testing ${query}`);
  try {
    const xx = await db.run_update(query, values);
    console.log(xx)
    return { status: 202 };
  } catch (err: any) {
    return err;
  }
}
