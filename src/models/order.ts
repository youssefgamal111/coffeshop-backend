import database from "../database";
export type order={id :Number,user_id: number,status :string};
export type order_product= {
    id? :number,
    quantity:number,
    order_id :number,
    product_id :number
}
export class orderservices{
async current(uID:number):Promise<order_product[]>{
    try{
        const conn= await database.client.connect();
        const sql='SELECT id FROM ORDERS where status=($1) AND user_id=($2)';
        const res=await conn.query(sql,['active',uID]);
        console.log( res.rows[0].id);
        if(res.rows[0].id!==null){
            const secondsql='SELECT * FROM orders_products WHERE order_id=($1)';
            const result=await conn.query(secondsql,[res.rows[0].id]);
            conn.release();
            
            return result.rows;
        }
        conn.release();
        return res.rows[0];

        }
        catch(err){
            throw new Error(`Could not get product with this name. Error: ${err}`);
        }
}



}