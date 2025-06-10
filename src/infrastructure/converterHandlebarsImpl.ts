import Handlebars from 'handlebars'
import type { ClassGroup } from '../domain/types'
import path from 'node:path'
import fs from 'node:fs'
import { hasPackage, parseClassName, parsePackageName } from './utils'
import type { ClassConverter } from '../domain/classConverter'
import { getLogger } from '../logger'

export class ConverterHandlebarsImpl implements ClassConverter {
    private logger = getLogger('ConverterHandlebarsImpl')

    constructor(private _templateSource: string) {}

    /**
     * mapping情報から、MapStructのマッピングクラスの文字列を出力する
     * @param mapping
     * @returns
     */
    toStr(mapping: ClassGroup): string {
        // 関数の登録
        Handlebars.registerHelper('parseClassName', parseClassName)
        Handlebars.registerHelper('parsePackageName', parsePackageName)
        Handlebars.registerHelper('hasPackage', hasPackage)

        const template = Handlebars.compile(this._templateSource)
        const result = template(mapping)

        this.logger.debug(result)
        return result
    }
}
