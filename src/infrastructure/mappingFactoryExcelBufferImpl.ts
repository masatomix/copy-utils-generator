import { excelBuffer2json } from 'excel-csv-read-write'
import { groupMappings, type MappingFactory } from '../domain/mapping-factory'
import type { ClassGroup, MappingRow } from '../domain/types'
// import { getLogger } from "../logger";

export class MappingFactoryExcelBufferImpl implements MappingFactory {
    // private logger = getLogger('MappingFactoryExcelImpl')

    constructor(private _buffer: ArrayBuffer) {}

    public async createMappingData(): Promise<ClassGroup[]> {
        const mappings = await excelBuffer2json(this._buffer)
        // console.table(mappings)
        // Excelから読み込んで、データを生成する
        const ret = groupMappings(mappings as MappingRow[])
        return ret
    }
}
