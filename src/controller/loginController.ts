import { Request, Response } from "express"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { GeraTokenController } from "./GeraTokenController"

export class LoginController {

    doLogin (req: Request, res: Response): void {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).send("Informe as credenciais.")
        }

        else if (email === process.env.USER_LOGIN && password === process.env.USER_PASSWORD) {

            const geraToken = new GeraTokenController()
            const token = geraToken.GeraToken(email)

            res.status(200).json({
                message: "Login efetuado com sucesso.",
                auth: true,
                token: token
            })
        }

        else {
            res.status(401).send("Credenciais inválidas.")
        }
    }
}