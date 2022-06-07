import { NextFunction, Request, Response, Router } from 'express';
import {isNumberObject} from "util/types";
// import ThemeAController from '../../src/Controllers/Controller';


class ThemeARouter {
    private _router = Router();
    // private _controller = ThemeAController;

    get router() {
        return this._router;
    }





    constructor() {
        this._configure();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */




    private _configure() {

        const crimes =[[
            { id: 1, passportSeria: "1234",passportNumber:"888888",criminal: "1" },
            { id: 2, passportSeria: "1234",passportNumber:"888998",criminal: "2"},
            { id: 3, passportSeria: "3333",passportNumber:"333333",criminal: "2"}]]


        this._router.post('/search', (req: Request, res: Response, next: NextFunction) => {
                try {
                    const passportSeria = (req.body as { passportSeria:string } ).passportSeria;
                    const passportNumber = (req.body as { passportNumber:string } ).passportNumber;
                    const criminal = (req.body as { criminal:string } ).criminal;
                    console.log(passportSeria)
                    console.log(passportNumber)
                    console.log(criminal)
                    let flag = false;
                    for(let key in crimes[0]){
                        console.log(crimes[0][key].criminal)
                        if(crimes[0][key].passportSeria === passportSeria && crimes[0][key].passportNumber === passportNumber && crimes[0][key].criminal === criminal){
                            flag = true;
                        }
                    }
                    return res.status(200).json({flag})
                }
                catch (e){
                    console.log(e)
                }
        });

        this._router.post('/result', (req: Request, res: Response, next: NextFunction) => {
            try {
                console.log("OKKKKK")
                console.log(req.body)
                const age = (req.body as { age:number }).age;
                const firstName = (req.body as { firstName:string } ).firstName;
                const secondName = (req.body as { secondName:string } ).secondName;
                const secondName2 = (req.body as { secondName2:string } ).secondName2;
                const passportSeria = (req.body as { passportSeria:number } ).passportSeria;
                const passportNumber = (req.body as { passportNumber:number } ).passportNumber;
                const issued = (req.body as { issued:number } ).issued;
                const issuedDate = (req.body as { issuedDate:string } ).issuedDate;
                const criminal = (req.body as { criminal:number } ).criminal;
                const credit = (req.body as { credit:number } ).credit;
                const purpose = (req.body as { purpose:number } ).purpose;
                const employment = (req.body as { employment:number } ).employment;
                const enother = (req.body as { enother:number } ).enother;
                const pledge = (req.body as { pledge:string } ).pledge;


                let summ = 0;


                if(age > 20 && age < 29 && credit < 1000000){
                    summ += 12;
                }
                else if (age > 20 && age < 29 && credit >= 1000000 && credit <=3000000){
                    summ += 9;
                }
                else if (age > 20 && age < 29 && credit >3000000){

                }
                else if (age >= 29 && age <= 59){
                    summ += 14;
                }
                else if (age >= 60 && age <= 72 && credit == 0){
                    summ += 8;
                }

                if (criminal == 2){
                    summ += 15
                }

                if (employment == 1){
                    summ +=14
                }
                else if (employment == 2){
                    summ+=12
                }
                else if (employment ==3){
                    summ+=8
                }
                else if (employment == 4 && age <70){
                    summ+=5
                }

                if (purpose == 1){
                    summ+=14
                }
                else if (purpose ==2 ){
                    summ+=8
                }
                else if (purpose == 3){
                    summ+=12
                }

                if (enother == 1){
                    if(purpose !==1){
                        summ+=15
                    }
                }

                if(credit>=0 && credit <= 1000000){
                    summ += 12;
                }
                else if(credit >=1000001 && credit <= 5000000){
                    summ += 14;
                }
                else if(credit >=5000001 && credit <= 10000000){
                    summ += 8;
                }

                let message = ""

                if(summ < 80){
                    message = "Кредит отклонен"
                }
                else if (summ >=80 && summ <= 83){
                    message = "Кредит одобрен со ставкой 80 - 30%"
                }
                else if (summ >=84 && summ <= 87){
                    message = "Кредит одобрен со ставкой 84 - 26%"
                }
                else if (summ >=88 && summ <= 91){
                    message = "Кредит одобрен со ставкой 88 - 22%"
                }
                else if (summ >=92 && summ <= 95){
                    message = "Кредит одобрен со ставкой 92 - 19%"
                }
                else if (summ >=96 && summ <= 99){
                    message = "Кредит одобрен со ставкой 96 - 15%"
                }
                else if (summ >=100){
                    message = "Кредит одобрен со ставкой 100 - 12,5%"
                }

                console.log(req.body)

                return res.status(200).json({
                    message,
                    summ,
                })
            }
            catch (error) {
                next(error);
            }
        });
    }
}

export = new ThemeARouter().router;