import {user,userservices} from '../user'
import database from '../../database';
import bcrypt from 'bcrypt';
const services=new userservices();
describe('user model',()=>{
    it('should have an index method', () => {
        expect(services.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(services.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(services.create).toBeDefined();
      });
      it('should have a authh method', () => {
        expect(services.authenticate).toBeDefined();
      });
      it('create method should add a new user', async () => {
        const hash=bcrypt.hashSync(`xfd17g${database.pepper}`,parseInt(database.salt as string))
        const result = await services.create({
          username: 'yongo',
          firstname:'youssef',
          lastname: 'gamal',
          password: 'xfd17g'
        });
        expect(result?.id).toEqual(1);
      });
      it('show method should return yongo', async () => {
        const res=await services.show(1);
        expect(res.username).toEqual('yongo');
      }
      );
    
    
    

});