import Handlebars from 'handlebars';
import type { ClassGroup } from "../domain/types";
import path from 'node:path';
import fs from 'node:fs';
import { hasPackage, parseClassName, parsePackageName } from './utils';
import type { ClassConverter } from '../domain/classConverter';
import { getLogger } from '../logger';


export class ConverterHandlebarsImpl implements ClassConverter {
    private logger = getLogger('ConverterHandlebarsImpl')
    /**
     * mapping情報から、MapStructのマッピングクラスの文字列を出力する
     * @param mapping 
     * @returns 
     */
    toStr(mapping: ClassGroup): string {

        // テンプレートエンジンを使って、コードを作成する
        const templatePath = path.join(__dirname, 'templates', 'template.hbs');

        // テンプレートを読み込む
        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        // 関数の登録
        Handlebars.registerHelper('parseClassName', parseClassName)
        Handlebars.registerHelper('parsePackageName', parsePackageName)
        Handlebars.registerHelper('hasPackage', hasPackage);

        const template = Handlebars.compile(templateSource);
        const result = template(mapping)

        this.logger.debug(result)
        return result
    }

}

