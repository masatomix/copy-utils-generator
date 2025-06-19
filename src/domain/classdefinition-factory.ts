import { getLogger } from '../logger'
import { classDefinitionsMock } from '../mock-datas'
import type { ClassDefinition, MappingRowOfClass } from './types'

/**
 * クラス定義情報クラスを生成するFactory
 */
export interface ClassDefinitionFactory {
    createClassData(): Promise<ClassDefinition[]>
}

/**
 * クラス定義情報クラスを生成するFactory
 * Mockから返すImpl
 *
 */
export class ClassDefinitionFactoryMockImpl implements ClassDefinitionFactory {
    // eslint-disable-next-line @typescript-eslint/require-await
    public async createClassData(): Promise<ClassDefinition[]> {
        return classDefinitionsMock
    }
}

export function convertToClassDefinitions(rows: MappingRowOfClass[]): ClassDefinition[] {
    const logger = getLogger('convertToClassDefinitions')
    const classMap = new Map<string, ClassDefinition>()

    for (const row of rows) {
        const {
            // デフォルト値が必要な場合はココでセット
            active = true, // 未指定時はtrueにする。
            immutable = false, // 未指定時はfalseにする。
            className,
            type,
            fieldName,
            AllArgsConstructor = true,
            Builder = true,
        } = row
        const fqcn = className

        if (!active) {
            continue
        }

        if (!classMap.has(fqcn)) {
            classMap.set(fqcn, {
                className: fqcn,
                fields: [],
                // クラス単位はココにプロパティを追加
                immutable,
                AllArgsConstructor: Builder ? true : AllArgsConstructor, // BuilderがTrueの場合は、常にTrueにする
                Builder,
            })
        }

        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        classMap.get(fqcn)!.fields.push({
            type,
            name: fieldName,
        })
    }

    const result = Array.from(classMap.values())
    logger.debug(result)

    return result
}
