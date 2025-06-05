import type { ClassInfo } from './types'

export interface ClassConverter {
    /**
     * ClassInfo からclassの文字列を生成する
     * サブクラスの引数は ClassDefinition や、ClassGroup の可能性あり。
     * @param instance
     * @returns
     */
    toStr(instance: ClassInfo): string
}
