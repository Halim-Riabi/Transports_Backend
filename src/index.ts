import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import Transport from './transport.model';
import bodyParser from 'body-parser';
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('transport-server on 3000');
});

app.use(bodyParser.json());

const uri = 'mongodb://127.0.0.1:27017/Flyware';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions, (err: any) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Mongo Database connected successfully');
    }
  });

app.get('/Flyware', (req: Request, resp: Response) => {
  Transport.find((err: any, Flyware: any) => {
    if (err) resp.status(500).send(err);
    else resp.send(Flyware);
  });
});

app.get('/Flyware/:id', (req: Request, resp: Response) => {
  Transport.findById(req.params.id, (err: any, transport: any) => {
    if (err) resp.status(500).send(err);
    else resp.send(transport);
  });
});

app.put('/Flyware/:id', (req: Request, resp: Response) => {
  Transport.findByIdAndUpdate(req.params.id, req.body, (err: any) => {
    if (err) resp.status(500).send(err);
    else resp.send('Transport updated');
  });
});

app.delete('/Flyware/:id', (req: Request, resp: Response) => {
  Transport.findByIdAndDelete(req.params.id, (err: any) => {
    if (err) resp.status(500).send(err);
    else resp.send('Transport deleted');
  });
});

app.get('/FlywareSearch', (req: Request, res: Response) => {
  const search = req.query.search || '';
  const page: number = parseInt(req.query.page?.toString() || '1');
  const size: number = parseInt(req.query.size?.toString() || '5');

  Transport.paginate({ title: { $regex: `.*${search}.*`, $options: 'i' } }, { page: page, limit: size }, (err: any, Flyware: any) => {
    if (err) res.status(500).send(err);
    else res.send(Flyware);
  });
});
app.post('/Flyware', (req: Request, resp: Response) => {
    const transport = new Transport(req.body);
    transport.save()
      .then((savedTransport: any) => {
        resp.send(savedTransport); // Send the saved document in the response
      })
      .catch((err: any) => {
        resp.status(500).send(err);
      });
  }); 
  

app.get('/', (req, resp) => {
  resp.send('Transport home page');
});

app.listen(8085, () => {
  console.log('Server started');
});
