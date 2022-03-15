import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const{POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_test,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,BCRYPT_PASSWORD,
    SALTY_ROUNDS,TOKEN_SECRET
}=process.env;
 
        let client:Pool=new Pool({
            user:POSTGRES_USER,
            host:POSTGRES_HOST,
            database:POSTGRES_DB,
            password: POSTGRES_PASSWORD

        });
     if(ENV==='test'){
          client=new Pool({
            user:POSTGRES_USER,
            host:POSTGRES_HOST,
            database:POSTGRES_DB_test,
            password: POSTGRES_PASSWORD

        });
     }
    
    export default{client,pepper:BCRYPT_PASSWORD,salt:SALTY_ROUNDS,ENV:ENV,TOKEN_SECRET:TOKEN_SECRET}