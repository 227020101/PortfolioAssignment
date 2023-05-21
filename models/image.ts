import * as db from '../helpers/database'

//upload image in the database by its id
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
  
    return { status: 202 };
  } catch (err: any) {
    return err;
  }
}
