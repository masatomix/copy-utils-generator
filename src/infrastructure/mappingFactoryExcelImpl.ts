import { excel2json } from 'excel-csv-read-write'
import { groupMappings, type MappingFactory } from '../domain/mapping-factory'
import type { ClassGroup, MappingRow } from '../domain/types'
// import { getLogger } from "../logger";

export class MappingFactoryExcelImpl implements MappingFactory {
    // private logger = getLogger('MappingFactoryExcelImpl')

    public constructor(private _path: string) {}

    public async createMappingData(): Promise<ClassGroup[]> {
        const mappings = await excel2json(this._path)
        // console.table(mappings)
        // Excelから読み込んで、データを生成する
        const ret = groupMappings(mappings as MappingRow[])
        return ret
    }
}
