import type { ClassRepository } from '../domain/classRepository'
import type { ClassInfo } from '../domain/types'
import path from 'node:path'
import fs from 'node:fs'
import { parseClassName, parsePackageName } from './utils'
import { getLogger } from '../logger'

export class FileClassRepository implements ClassRepository {
    private logger = getLogger('FileClassRepository')
    constructor(private _baseDir: string) {}

    /**
     * ClassInfo インタフェースの情報からクラス名を取得して所定のディレクトリにコード出力する。
     * code 文字列からクラス名等はとれるけど、解析がメンドウなので ClassInfo の情報のみで出力先は決める
     * @param classInfo ;
     * @param code
     */
    save(classInfo: ClassInfo, code: string) {
        const dir = createPackageDirectory(this._baseDir, classInfo.className)
        this.logger.debug(`${dir} ディレクトリ作成完了`)
        const outputPath = path.join(dir, `${parseClassName(classInfo.className)}.java`)
        // ファイルに出力
        fs.writeFileSync(outputPath, code)
        this.logger.info(`${outputPath} ファイル出力完了`)
    }
}

/**
 * baseDir配下に、パッケージ付きクラス名を元にディレクトリを作成し、パスを返す
 * @param baseDir
 * @param fqcn
 * @returns
 */
function createPackageDirectory(baseDir: string, fqcn: string): string {
    const logger = getLogger('FileClassRepository')
    const packageName = parsePackageName(fqcn)
    const packagePath = packageName.replace(/\./g, path.sep) // ドットを区切りにフォルダへ変換
    const fullPath = path.join(baseDir, packagePath)

    logger.debug(`packageName: ${packageName}`)
    logger.debug(`packagePath: ${packagePath}`)

    fs.mkdirSync(fullPath, { recursive: true }) // フォルダ作成（再帰的）

    return fullPath
}
