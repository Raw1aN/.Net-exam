import { Router } from 'express';
import ThemeARouter from './routes';
import ThemeBRouter from './routes';

class MasterRouter {
    private _router = Router();
    private _subrouterA = ThemeARouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    /**
     * Connect routes to their matching routers.
     */
    private _configure() {
        this._router.use('/result', this._subrouterA);
    }
}

export = new MasterRouter().router;