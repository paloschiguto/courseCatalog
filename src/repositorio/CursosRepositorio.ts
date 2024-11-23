import { DataSource, Repository } from "typeorm";
import { Cursos } from "../entity/Curso";

class CursoRepositorio implements CursoRepositorio {
    delete(arg0: number) {
        throw new Error("Method not implemented.");
    }

    private repo: Repository<Cursos>

    constructor(dataSource: DataSource) {
        this.repo = dataSource.getRepository(Cursos);
    }

    async getAll(): Promise<Cursos[]> {
        const cursos = await this.repo.find()
        return cursos
    }

    async create(curso: Omit<Cursos, 'id' | 'dataCriacao'>): Promise<Cursos> {
        const novoCurso = await this.repo.create(curso)
        return this.repo.save(novoCurso)
    }

    async getById(id: number): Promise<Cursos | undefined> {
        const curso = await this.repo.findOneBy({id})
        return curso || undefined
    }

    async updateCurso(id: number, curso: Partial<Cursos>): Promise<Cursos | null> {
        const cursoExistente = await this.getById(id)
        if (!cursoExistente) {
            return undefined
        }

        const cursoAtualizado = this.repo.merge(cursoExistente, curso)
        return await this.repo.save(cursoAtualizado)
    }


    async salvarCurso(curso: Omit<Cursos, 'id'>): Promise<boolean> {
        const result = await this.repo.save(curso)
        return result ? true : false
    }

    async deletarCurso(id: number): Promise<boolean> {
        const result = await this.repo.delete(id)
        return result?.affected ? result.affected > 0 : false
    }
}


export default CursoRepositorio