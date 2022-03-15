 import database from "../database"
 export type product={
    id?:Number;
    price:number;
    name:string;

}
export class productStore{
    async index():Promise<product[]>{
        try{
        const conn= await database.client.connect();
        const sql='SELECT * FROM products ;';
        const res=await conn.query(sql);
        conn.release();
        
        return res.rows;

        }
        catch(err){
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }
    async show(name:String):Promise<product>{
        try{
        const conn= await database.client.connect();
        const sql='SELECT * FROM products where name=($1)';
        const res=await conn.query(sql,[name]);
        
        conn.release();
        return res.rows[0];

        }
        catch(err){
            throw new Error(`Could not get product with this name. Error: ${err}`);
        }
    }
    async create(prod:product):Promise<product>{

        try{
            const conn= await database.client.connect();
            const sql='INSERT INTO products(name,price) values($1,$2) RETURNING *; ';
            const res=await conn.query(sql,[prod.name,prod.price]);
            conn.release();
            return res.rows[0];
    
            }
            catch(err){
                throw new Error(`Could not create product with this name. Error: ${err}`);
            }

    }

}