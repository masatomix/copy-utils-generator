import { excel2json } from 'excel-csv-read-write'
import {
    convertToClassDefinitions,
    type ClassDefinitionFactory,
} from '../domain/classdefinition-factory'
import type { ClassDefinition, MappingRowOfClass } from '../domain/types'
// import { getLogger } from "../logger";

export class ClassDefinitionFactoryExcelImpl implements ClassDefinitionFactory {
    constructor(private _path: string) {}

    async createClassData(): Promise<ClassDefinition[]> {
        const mappings = await excel2json(this._path)
        // console.table(mappings)
        // Excelから読み込んで、データを生成する
        const ret = convertToClassDefinitions(mappings as MappingRowOfClass[])
        return ret
    }
}
