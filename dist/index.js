"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const transport_model_1 = __importDefault(require("./transport.model"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('transport-server on 3000');
});
app.use(body_parser_1.default.json());
const uri = 'mongodb://127.0.0.1:27017/Flyware';
mongoose_1.default.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log('Mongo Database connected successfully');
    }
});
app.get('/Flyware', (req, resp) => {
    transport_model_1.default.find((err, Flyware) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(Flyware);
    });
});
app.get('/Flyware/:id', (req, resp) => {
    transport_model_1.default.findById(req.params.id, (err, transport) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(transport);
    });
});
app.put('/Flyware/:id', (req, resp) => {
    transport_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send('Transport updated');
    });
});
app.delete('/Flyware/:id', (req, resp) => {
    transport_model_1.default.findByIdAndDelete(req.params.id, (err) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send('Transport deleted');
    });
});
app.get('/FlywareSearch', (req, res) => {
    var _a, _b;
    const search = req.query.search || '';
    const page = parseInt(((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || '1');
    const size = parseInt(((_b = req.query.size) === null || _b === void 0 ? void 0 : _b.toString()) || '5');
    transport_model_1.default.paginate({ title: { $regex: `.*${search}.*`, $options: 'i' } }, { page: page, limit: size }, (err, Flyware) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(Flyware);
    });
});
app.post('/Flyware', (req, resp) => {
    const transport = new transport_model_1.default(req.body);
    transport.save()
        .then((savedTransport) => {
        resp.send(savedTransport); // Send the saved document in the response
    })
        .catch((err) => {
        resp.status(500).send(err);
    });
});
app.get('/', (req, resp) => {
    resp.send('Transport home page');
});
app.listen(8085, () => {
    console.log('Server started');
});
