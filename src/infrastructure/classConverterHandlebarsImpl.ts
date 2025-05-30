import type { ClassConverter } from "../domain/classConverter";
import type { ClassDefinition } from "../domain/types";
import Handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs';
import { hasPackage, parseClassName, parsePackageName } from "./utils";

export class ClassConverterHandlebarsImpl implements ClassConverter {

    /**
     * ClassDefinition からclassの文字列を生成する
     * @param instance 
     * @returns 
     */
    toStr(instance: ClassDefinition): string {

        // テンプレートエンジンを使って、コードを作成する
        const templatePath = path.join(__dirname, 'templates', 'classTemplate.hbs');

        // テンプレートを読み込む
        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        Handlebars.registerHelper('parseClassName', parseClassName)
        Handlebars.registerHelper('parsePackageName', parsePackageName)
        Handlebars.registerHelper('hasPackage', hasPackage);

        const template = Handlebars.compile(templateSource);
        const result = template(instance)
        return result
    }



}

