import * as db from '../helpers/database'

//get a single cat by its id
export const getById = async (id: any) => {
  const query = 'SELECT * FROM cats WHERE ID = ?';
  const values = [id]
  const data = await db.run_query(query, values);
  return data;
}

//get the cats by filter
export const getByFilter = async (cats: any) => {
  const keys = Object.keys(cats);
  const values = Object.values(cats);
  let parm = '';
  for (let i = 0; i < values.length; i++) {
    parm += `${keys[i]}=? and `
  }
  parm = parm.slice(0, -4);
  const query = `SELECT * FROM cats WHERE ${parm}`;
  const data = await db.run_query(query, values);
  console.log(`testing ${query}`);
  return data;
}


//list all the cats in the database
export const getAll = async () => {
  // TODO: use page, limit, order to give pagination
  const query = "SELECT * FROM cats;"
  const data = await db.run_query(query, null);
  return data
}

//create a new cats in the database
export const add = async (cats: any) => {
  const keys = Object.keys(cats);
  const values = Object.values(cats);
  //keys.push('authorid');
  //values.push(2);
  const key = keys.join(',');
  let parm = '';
  // let parms = values.join(',');
  // console.log(`test${parms}`);
  for (let i = 0; i < values.length; i++) { parm += '?,' }
  parm = parm.slice(0, -1);
  const query = `INSERT INTO cats (${key}) VALUES (${parm})`;
  console.log(`testing ${query}`);
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

//delete a single cats by its id
export const deleteById = async (id: any) => {
  const query = 'delete FROM cats WHERE ID = ?';
  const values = [id]
  try {
    await db.run_delete(query, values);
    return { status: 204 };
  } catch (err: any) {
    return err;
  }
}

//update a cats in the database by its id
export const update = async (id: any, cats: any) => {
  const keys = Object.keys(cats);
  const values = Object.values(cats);
  let parm = '';
  for (let i = 0; i < values.length; i++) {
    parm += `${keys[i]}=?,`
  }
  parm = parm.slice(0, -1);
  const query = `UPDATE cats SET ${parm}  WHERE ID = ${id}`;
  console.log(`testing ${query}`);
  try {
    const xx = await db.run_update(query, values);
    console.log(xx)
    return { status: 202 };
  } catch (err: any) {
    return err;
  }
}
