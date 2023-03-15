import * as db from '../helpers/database'

//get a single cat by its id
export const getById = async (id: any) => {
  let query = 'SELECT * FROM cats WHERE ID = ?';
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}

//list all the cats in the database
export const getAll = async () => {
  // TODO: use page, limit, order to give pagination
  let query = "SELECT * FROM cats;"
  let data = await db.run_query(query, null);
  return data
}

//create a new cats in the database
export const add = async (cats: any) => {
  let keys = Object.keys(cats);
  let values = Object.values(cats);
  //keys.push('authorid');
  //values.push(2);
  let key = keys.join(',');
  let parm = '';
  // let parms = values.join(',');
  // console.log(`test${parms}`);
  for (let i: number = 0; i < values.length; i++) { parm += '?,' }
  parm = parm.slice(0, -1);
  let query = `INSERT INTO cats (${key}) VALUES (${parm})`;
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
  let query = 'delete FROM cats WHERE ID = ?';
  let values = [id]
  try {
    await db.run_delete(query, values);
    return { status: 204 };
  } catch (err: any) {
    return err;
  }
}

//update a cats in the database by its id
export const update = async (id: any, cats: any) => {
  let keys = Object.keys(cats);
  let values = Object.values(cats);
  let parm = '';
  // let parms = values.join(',');
  // console.log(`test${parms}`);
  for (let i: number = 0; i < values.length; i++) {
    parm += `${keys[i]}=?,`
  }
  parm = parm.slice(0, -1);
  let query = `UPDATE cats  ${parm} SET WHERE ID = ${id}`;
  console.log(`testing ${query}`);
  try {
    let xx = await db.run_update(query, values);
    console.log(xx)
    return { status: 202 };
  } catch (err: any) {
    return err;
  }
}
