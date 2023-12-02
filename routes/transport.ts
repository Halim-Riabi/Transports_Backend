import express, { Request, Response, Router } from 'express';
import transportModel, { TransportModelType } from '../model/transport';

const router: Router = express.Router();

process.on('uncaughtException', function (err: Error) {
    console.log(err);
});

router.post('/ajout', (req: Request, res: Response) => {
    let data = req.body;
    let transport: TransportModelType = new transportModel(data);

    transport.save()
        .then(
            (saved: TransportModelType) => {
                res.status(200).send(saved);
            }
        )
        .catch(
            (err: Error) => {
                res.status(400).send(err);
            }
        );
});

router.get('/all', (req: Request, res: Response) =>{
    transportModel.find({})
    .then(
        (TransportModelType)=>{
            res.status(200).send(TransportModelType);
        }
    )
    .catch(
        (err: Error) =>{
            res.status(400).send(err);
        }
    )
})

router.get('/getbyid/:id', (req: Request, res: Response) =>{
    let id = req.params.id;
    transportModel.findOne({_id : id})
    .then(
        (TransportModelType)=>{
            res.status(200).send(TransportModelType);
        }
    )
    .catch(
        (err: Error) =>{
            res.status(400).send(err);
        }
    )
});

router.delete('/delete/:id', (req: Request, res: Response) =>{
    let id = req.params.id;
    transportModel.findByIdAndDelete({_id : id})
    .then(
        (TransportModelType)=>{
            res.status(200).send(TransportModelType);
        }
    )
    .catch(
        (err: Error) =>{
            res.status(400).send(err);
        }
    )
})

router.put('/update/:id', (req: Request, res: Response) =>{
    let id = req.params.id;
    let data = req.body;

    transportModel.findByIdAndUpdate({_id:id}, data)
    .then(
        (TransportModelType)=>{
            res.status(200).send(TransportModelType);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})

export = router;

