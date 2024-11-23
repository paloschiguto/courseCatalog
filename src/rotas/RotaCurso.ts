import {Cursos} from "../controller/CursosController"
import express from 'express'  

const cursoRota = new Cursos()
const router = express.Router()

router.get('/cursos', cursoRota.ListarCursos)
router.post('/criar_curso', cursoRota.CriarCursos)
router.put('/atualizar_curso/:id', cursoRota.AtualizarCurso)
router.delete('/deletar_curso/:id', cursoRota.deleteCurso)

export default router