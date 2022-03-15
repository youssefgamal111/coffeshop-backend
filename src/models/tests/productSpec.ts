import {product,productStore} from'../product';
const services=new productStore();
describe('product model',()=>{
    it('should have an index method', () => {
        expect(services.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(services.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(services.create).toBeDefined();
      });

      });
      it('create method should add a new product', async () => {
        const result:product = await services.create({
          name: 'tea',
          price:20
        });
        expect(result?.id).toEqual(1);
      });
      it('show method should return product withe price 20', async () => {
        const res:product=await services.show('tea');
        expect(res.price).toEqual(20);
      });
      it('index method should return array of products', async () => {
        const res:product[]=await services.index();
    
        expect(res).toEqual([{id:1,price:20,name:'tea'}]);
      }
      );
    
    