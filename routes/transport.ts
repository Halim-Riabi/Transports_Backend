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

export = router;
