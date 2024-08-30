import express, { Request, Response } from 'express';
import os from 'os';

const app = express();
const PORT = 3002;

app.get('/hello', (req: Request, res: Response) => {
  const name = req.query.name || 'World';
  res.json({
    greeting: `Hello, ${name}`
  });

  
});

app.get('/info', (req: Request, res: Response) => {
    const clientAddress = req.ip;
    const hostName = os.hostname();
    const requestTime = new Date().toISOString();
    
    const info = {
      time: requestTime,
      client_address: clientAddress,
      host_name: hostName,
      headers: req.headers
    };
  
    // Print the info object in a readable format to the console
    
    res.json(info);
    console.log('GET /info - Request Information:\n', JSON.stringify(info, null, 2));
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
