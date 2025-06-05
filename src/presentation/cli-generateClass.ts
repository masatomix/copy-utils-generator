#!/usr/bin/env node
import yargs from 'yargs'
// import { ClassDefinitionFactoryMockImpl } from "../domain/classdefinition-factory";
import { ClassConverterHandlebarsImpl } from '../infrastructure/classConverterHandlebarsImpl'
import { ClassDefinitionFactoryExcelImpl } from '../infrastructure/classDefinitionFactoryExcelImpl'
import { FileClassRepository } from '../infrastructure/fileClassRepository'
import { GenerateClassUserCase } from '../usercase/generateClassUserCase'
import { hideBin } from 'yargs/helpers'

const main = () => {
    const { excelPath, output } = createArgs()
    // '../MapStructSample/app/src/main/java/';

    // const factory = new ClassDefinitionFactoryImpl();
    const factory = new ClassDefinitionFactoryExcelImpl(excelPath)

    new GenerateClassUserCase(
        factory,
        new ClassConverterHandlebarsImpl(),
        new FileClassRepository(output)
    )
        .execute()
        .catch((error) => console.error(error))
}

const createArgs = () => {
    const argv = yargs(hideBin(process.argv))
        .option('excelPath', {
            type: 'string',
            description: 'Excel file Path',
            default: './classdata.xlsx',
        })
        .option('output', {
            type: 'string',
            description: 'Output directory',
            default: './output',
        })
        .help()
        .parseSync() // 型付きで取得
    return argv
}

main()
