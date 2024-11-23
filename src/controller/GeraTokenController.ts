import jwt from "jsonwebtoken"
import { randomBytes } from "crypto";

export class GeraTokenController {
    static GeraToken(email: any) {
        throw new Error("Method not implemented.");
    }

    GeraToken(email: string) {
        
        const chave = randomBytes(10).toString('hex') //gerar um código aleátorio

        console.log(chave)

        const token = jwt.sign(
            { email: email }, //1° param
            chave, //2° param
            { expiresIn: '1h' } //3° param
        )

        console.log(`token: ${token}`)
        return token
        
    }

}
