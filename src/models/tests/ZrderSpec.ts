import database from '../../database';
import { orderservices } from '../order';
const services=new orderservices();
describe('order model',()=>{

    it('should have a current method', () => {
        expect(services.current).toBeDefined();
      });

      it('current method should return the order attached to this user', async () => {
        const conn= await database.client.connect();
        const sql='INSERT INTO ORDERS (status,user_id) VALUES($1,$2) RETURNING *';
        const res=await conn.query(sql,['active',1]);
       const secsql='INSERT INTO orders_products ( quantity,order_id,product_id) VALUES($1,$2,$3) ';
        const secres=await conn.query(secsql,[2,1,1]);
        
        const result=await services.current(1);
        conn.release();
        expect(result[0].quantity).toEqual(2);
      });
    
    });
    
    