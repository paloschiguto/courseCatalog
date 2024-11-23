import { appDataSource } from "../data-source"
import CursoRepositorio from "../repositorio/CursosRepositorio"
import CursosRepositorio from "../repositorio/CursosRepositorio"
import { Request, Response } from "express"

export class Cursos {

    private cursoRepositorio: CursosRepositorio
    nome: any
    instrutor: any
    data: Date

    constructor() {
        this.cursoRepositorio = new CursosRepositorio(appDataSource)
    }

    ListarCursos = async (req: Request, res: Response) => {
        const cursos = await this.cursoRepositorio.getAll()
        if (cursos.length === 0) {
            res.status(404).send("Não há cursos disponíveis.")
        }
        else {
            res.status(200).json(cursos)
        }
    }

    CriarCursos = async (req: Request, res: Response) => {
        const cursoNome = req.body.nome
        const cursoIntrutor = req.body.instrutor
        const cursoData = new Date()

        const curso = new Cursos()
        curso.nome = cursoNome
        curso.instrutor = cursoIntrutor
        curso.data = cursoData

        try {
            const novoCurso = await this.cursoRepositorio.create(curso)
            res.status(201).send(`Curso "${cursoNome}" criado com sucesso.`)
        } catch (error) {
            res.status(400).send(`Erro ao criar curso ${error.message}`)
        }

    }

    AtualizarCurso = async (req: Request, res: Response) => {
        const getId = req.params.id
        if (!getId) {
            res.status(400).send("O id do curso não foi informado.")
        } else {
            const curso = await this.cursoRepositorio.getById(+getId)
            if (!curso) {
                res.status(404).json({ message: `Curso de id ${getId} não encontrado!` })
            }

            const cursoAtualizado = await this.cursoRepositorio.updateCurso(+getId, curso!)

            const { nome, instrutor } = req.body
            curso.nome = nome || curso.nome
            curso.instrutor = instrutor || curso.instrutor

            const atualizado = this.cursoRepositorio.salvarCurso(curso)

            if (!atualizado) {
                res.status(400).send(`Erro ao atualizar curso ${getId}`)
            }

            res.status(200).json({ message: `Curso ${getId} alterado com sucesso!` })
        }
    }

    deleteCurso = async (req: Request, res: Response) => {
        const id = req.params.id
        if (id === "") {
            res.status(400).send("O id do curso não foi informado.")
        } else {
            const deletar = await this.cursoRepositorio.deletarCurso(parseInt(id))
            if (!deletar){
                res.status(500).send("Erro ao deletar!")
            }
            res.status(200).json({
                message: `Curso ${id} deletado com sucesso!`
            })
        }
    }
}
