import { excelBuffer2json } from 'excel-csv-read-write'
import {
    convertToClassDefinitions,
    type ClassDefinitionFactory,
} from '../domain/classdefinition-factory'
import type { ClassDefinition, MappingRowOfClass } from '../domain/types'
// import { getLogger } from "../logger";

export class classDefinitionFactoryExceBufferImpl implements ClassDefinitionFactory {
    constructor(private _buffer: ArrayBuffer) {}

    async createClassData(): Promise<ClassDefinition[]> {
        const mappings = await excelBuffer2json(this._buffer)
        // console.table(mappings)
        // Excelから読み込んで、データを生成する
        const ret = convertToClassDefinitions(mappings as MappingRowOfClass[])
        return ret
    }
}
