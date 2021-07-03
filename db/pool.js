import pg from 'pg';
import dotenv from "dotenv"
dotenv.config();


const db_config = {
  connectionString: process.env.DATABASE_URL ,
  connectionTimeoutMillis: 300,
  // number of milliseconds a client must sit idle in the pool and not be checked out
  // before it is disconnected from the backend and discarded
  // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
  idleTimeoutMillis: 200,
  // maximum number of clients the pool should contain
  // by default this is set to 10.
  max: 20,
}

const pool = new pg.Pool(db_config)

pool.on('connect', client => {
  // client.query('DATABASE Is Connected')
  console.log("DATABASE Is Connected")
})

pool.on('remove', client => {
  // client.query('DATABASE Is Connected')
  console.log("DATABASE Is Not Connected")
})

export default pool;