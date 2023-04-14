
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean} from 'yup';

const TodoYup = object({
  summary: string().required(),
  done: boolean().default(false),
  category: string().default("default"),
  // userId: string().required(),
  createdOn: date().default(() => new Date()),
})

// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready')
})

// Use Crudlify to create a REST API for any collection
crudlify(app, {todos: TodoYup})

// bind to serverless runtime
export default app.init();
