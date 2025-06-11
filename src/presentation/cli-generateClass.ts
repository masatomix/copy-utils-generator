#!/usr/bin/env node
import yargs from 'yargs'
// import { ClassDefinitionFactoryMockImpl } from "../domain/classdefinition-factory";
import { ClassConverterHandlebarsImpl } from '../infrastructure/classConverterHandlebarsImpl'
import { ClassDefinitionFactoryExcelImpl } from '../infrastructure/classDefinitionFactoryExcelImpl'
import { FileClassRepository } from '../infrastructure/fileClassRepository'
import { GenerateClassUserCase } from '../usercase/generateClassUserCase'
import { hideBin } from 'yargs/helpers'

import path from 'node:path'
import fs from 'node:fs'

const main = () => {
    const { excelPath, output } = createArgs()
    // '../MapStructSample/app/src/main/java/';

    // テンプレートエンジンを使って、コードを作成する
    const templatePath = path.join(__dirname, 'templates', 'classTemplate.hbs')

    // テンプレートを読み込む
    const templateSource = fs.readFileSync(templatePath, 'utf-8')

    // const factory = new ClassDefinitionFactoryImpl();
    const factory = new ClassDefinitionFactoryExcelImpl(excelPath)

    new GenerateClassUserCase(
        factory,
        new ClassConverterHandlebarsImpl(templateSource),
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
