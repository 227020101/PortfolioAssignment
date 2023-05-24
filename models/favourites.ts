import * as db from '../helpers/database'

//get favourites by its id
export const getByUserId = async (id: any) => {
  const query = 'SELECT a.fid, b.id,b.name, b.alltext ,b.gender , b.age , b.location, b.imageurl FROM favourites a inner join cats b on a.catid = b.id WHERE UserID = ?';
  const values = [id]
  const data = await db.run_query(query, values);
  return data;
}


//create a new favourites in the database
export const add = async (favourites: any) => {
  const keys = Object.keys(favourites);
  const values = Object.values(favourites);
  const key = keys.join(',');
  let parm = '';
  for (let i = 0; i < values.length; i++) { parm += '?,' }
  parm = parm.slice(0, -1);
  const query = `INSERT INTO favourites (${key}) VALUES (${parm})`;
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

//delete a single favourites by its id
export const deleteById = async (id: any) => {
  const query = 'delete FROM favourites WHERE fid = ?';
  const values = [id]
  try {
    await db.run_delete(query, values);
    return { status: 204 };
  } catch (err: any) {
    return err;
  }
}