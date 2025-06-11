import type { ClassConverter } from '../domain/classConverter'
import type { ClassDefinition } from '../domain/types'
import Handlebars from 'handlebars'
import { hasPackage, parseClassName, parsePackageName } from './utils'

export class ClassConverterHandlebarsImpl implements ClassConverter {
    constructor(private _templateSource: string) {}

    /**
     * ClassDefinition からclassの文字列を生成する
     * @param instance
     * @returns
     */
    toStr(instance: ClassDefinition): string {
        Handlebars.registerHelper('parseClassName', parseClassName)
        Handlebars.registerHelper('parsePackageName', parsePackageName)
        Handlebars.registerHelper('hasPackage', hasPackage)

        const template = Handlebars.compile(this._templateSource)
        const result = template(instance)
        return result
    }
}
