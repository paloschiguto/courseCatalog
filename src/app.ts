import express, {Application} from "express"
import cors from "cors"
import loginRouter from "./rotas/RotaLogin"
import cursoRota from "./rotas/RotaCurso"

const app: Application = express()
app.use(express.json())
app.use(cors())

app.use("/api/webmob", loginRouter)
app.use("/api/webmob", cursoRota)

export default app