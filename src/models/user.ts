import database from "../database";
import bcrypt from 'bcrypt';
export type user={
id?:number;
username:string;
firstname:string;
lastname:string;
readonly password:string;
}

export class userservices {
    
    async index():Promise<user[]> {
        try{
           
        const conn= await database.client.connect();
        const sql='SELECT * FROM users';
        const res=await conn.query(sql);
        conn.release();
        return res.rows;}
        catch(err){
            throw new Error(`Could not get users. Error: ${err}`);
        }
        
    }

  async show(id:number):Promise<user> {
      try{
      const conn=await database.client.connect();
      const sql='SELECT * FROM users WHERE id=($1)';
      const res=await conn.query(sql,[id]);
      conn.release();
      return  res.rows[0];
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
      
  }

    async create(u:user):Promise<user|null> {
    try{
        const conn=await database.client.connect();
        const checkUserNameSQL='SELECT * FROM users where username=($1)';
        const userNameRes=await conn.query(checkUserNameSQL,[u.username]);
        if(userNameRes.rows.length===0)
        {const sql='INSERT INTO users (username,firstname,lastname,password) VALUES($1,$2,$3,$4) RETURNING *;';
        const hash=bcrypt.hashSync(`${u.password}${database.pepper}`,parseInt(database.salt as string));
        const res=await conn.query(sql,[u.username,u.firstname,u.lastname,hash]);
        conn.release();
        
        return  res.rows[0];}
        else{
           return null;
        }
      } catch (err) {
          throw new Error(`Could not add new user ${u.firstname} ${u.lastname} . Error: ${err}`)
      }
        
 } 
 async authenticate(username:string,password:string):Promise<user|null> {

    const conn=await database.client.connect();
     const sql='SELECT * FROM users where username=($1)';
     const res=await conn.query(sql,[username]);
     
     if( res.rows.length){
         const user=res.rows[0];
         if(bcrypt.compareSync(password+database.pepper,user.password)){
             return user;
         }
      
     }

    return null; 
 }


}
