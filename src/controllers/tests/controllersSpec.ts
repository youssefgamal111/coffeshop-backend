import supertest from "supertest";
import app from '../../server';
const request = supertest(app);
let token:string='';
describe('Test user endpoint responses ', () => {
    
    it('gets the apiauthenticate endpoint', async () => {
        
        const response = await request.post('/authenticate').send({username:'yongo',password:'xfd17g'});
        token =response.body.data.token;
        
        expect(response.status).toBe(200);
        
    });
    





 it('gets the api show endpoint', async () => {
        
    const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`);
 
    expect(response.status).toBe(200);
    
 }


 );
 it('gets the api create endpoint', async () => {
        
    const response = await request.post('/users/create')
    .send({username:'ali0',firstname:'ali',lastname:'kamal',password:'bgbgh'})
    
 
    expect(response.status).toBe(200);
    
 }


 );
 it('gets the api index endpoint and should return 401 because no token', async () => {
        
    const response = await request.get('/users')
 
    expect(response.status).toBe(401);
    
 }


 );

});
describe('Test order endpoint responses ', () => {
  
   it('gets the current endpoint', async () => {
       
       const response = await request.get('/order/1').set('Authorization', `Bearer ${token}`);
       
       expect(response.status).toBe(200);
       
   });
   



});
describe('Test products endpoint responses ', () => {
  
   it('gets the products endpoint', async () => {
       
       const response = await request.get('/products');
       
       expect(response.status).toBe(200);
       
   });
   it('gets the product tea endpoint', async () => {
       
      const response = await request.get('/products/tea');
      
      expect(response.status).toBe(200);
      
  });
  it('gets the  create product  endpoint', async () => {
       
   const response = await request.post('/products/create')
   .send({username:'ali0',firstname:'ali',lastname:'kamal',password:'bgbgh'})
   .set('Authorization', `Bearer ${token}`);
   
   expect(response.status).toBe(200);
   
});



});