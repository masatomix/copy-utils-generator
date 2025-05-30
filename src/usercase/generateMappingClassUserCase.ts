import type { ClassConverter } from "../domain/classConverter"
import type { ClassRepository } from "../domain/classRepository"
import type { MappingFactory } from "../domain/mapping-factory"
import type { ClassGroup } from "../domain/types"
import { getLogger } from "../logger"

export class GenerateMappingClassUserCase {
    private logger = getLogger('GenerateMappingClassUserCase')
    constructor(
        private _factory: MappingFactory,
        private _classConverter: ClassConverter,
        private _classRepository: ClassRepository) { }

    async execute() {
        //  設定情報について、ツリー状のオブジェクトを組み立てる
        //  クラス名 x1 に対してメソッド x n 
        //  メソッドx1 に対してフィールドのマッピング情報 x 
        const instances: ClassGroup[] = await this._factory.createMappingData()


        // クラスごとのマッピング情報になったので順次処理
        for (const instance of instances) {
            // handlebars で、stringに変換、ファイル出力
            const code = this._classConverter.toStr(instance)
            this.logger.debug(code)
            this._classRepository.save(instance, code)
        }
    }
}