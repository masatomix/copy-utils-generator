import type { ClassRepository } from '../domain/classRepository'
import type { ClassInfo } from '../domain/types'
import { getLogger } from '../logger'

export class ConsoleClassRepository implements ClassRepository {
    private logger = getLogger('ConsoleClassRepository')
    // constructor(private _baseDir: string) {}

    /**
     * ClassInfo インタフェースの情報からクラス名を取得して所定のディレクトリにコード出力する。
     * code 文字列からクラス名等はとれるけど、解析がメンドウなので ClassInfo の情報のみで出力先は決める
     * @param classInfo ;
     * @param code
     */
    save(classInfo: ClassInfo, code: string) {
        this.logger.debug(code)
        console.log(code)
    }
}
