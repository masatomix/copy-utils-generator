#!/usr/bin/env node
import yargs from "yargs"
// import { MappingFactoryMockImpl } from "../domain/mapping-factory"
import { ConverterHandlebarsImpl } from "../infrastructure/converterHandlebarsImpl"
import { FileClassRepository } from "../infrastructure/fileClassRepository"
import { MappingFactoryExcelImpl } from "../infrastructure/mappingFactoryExcelImpl"
import { GenerateMappingClassUserCase } from "../usercase/generateMappingClassUserCase"
import { hideBin } from 'yargs/helpers';

const main =  () => {
    const { excelPath, output: outputPath } = createArgs()
    //'../MapStructSample/app/src/main/java/'

    const factory = new MappingFactoryExcelImpl(excelPath)
    // const factory = new MappingFactoryMockImpl()

    new GenerateMappingClassUserCase(factory,
        new ConverterHandlebarsImpl(),
        new FileClassRepository(outputPath)
    ).execute().catch(error => console.error(error))

}




const createArgs = () => {
    const argv = yargs(hideBin(process.argv))
        .option('excelPath', {
            type: 'string',
            description: 'Excel file Path',
            default: './mappingdata.xlsx',
        })
        .option('output', {
            type: 'string',
            description: 'Output directory',
            default: './output',
        })
        .help()
        .parseSync(); // 型付きで取得

    return argv
}


main()
