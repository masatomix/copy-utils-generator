import type { ClassConverter } from "../domain/classConverter"
import type { ClassDefinitionFactory } from "../domain/classdefinition-factory"
import type { ClassRepository } from "../domain/classRepository"
import type { ClassDefinition } from "../domain/types"
import { getLogger } from "../logger"

export class GenerateClassUserCase {
    private logger = getLogger('GenerateClassUserCase')

    constructor(
        private _factory: ClassDefinitionFactory,
        private _classConverter: ClassConverter,
        private _classRepository: ClassRepository) { }

    async execute() {

        const instances: ClassDefinition[] = await this._factory.createClassData()

        // クラスごとの情報になったので順次処理
        for (const instance of instances) {
            // handlebars で、stringに変換、ファイル出力
            const code = this._classConverter.toStr(instance)
            this.logger.debug(code)
            this._classRepository.save(instance, code)
        }
    }
}