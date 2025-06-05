import type { ClassGroup, MappingRow, MethodGroup } from './types'
import { mock } from '../mock-datas'
import { getLogger } from '../logger'

export interface MappingFactory {
    createMappingData(): Promise<ClassGroup[]>
}

export class MappingFactoryMockImpl implements MappingFactory {
    // eslint-disable-next-line @typescript-eslint/require-await
    public async createMappingData(): Promise<ClassGroup[]> {
        return mock
    }
}

/**
 * ツリー状のオブジェクトを生成するビジネスロジック
 * (がChatGPTが作ってくれたヤツを微調整)
 * @param rows
 * @returns
 */
export function groupMappings(rows: MappingRow[]): ClassGroup[] {
    const logger = getLogger('groupMappings')
    const classMap = new Map<
        string,
        { decorator?: string; uses?: string[]; methods: Map<string, MethodGroup> }
    >()

    for (const row of rows) {
        const {
            active = true,
            className,
            methodName,
            fromClass,
            toClass,
            fromField,
            toField,
            decorator,
            uses,
            qualifiedByName,
            ignoreByDefault,
            ignoreColumn,
            inverse,
        } = row

        if (!active) {
            continue
        }
        // 追加
        // const isActive = active ?? true  // 未指定時はtrueにする。
        // if (!isActive) {
        //     continue;
        // }
        // 追加 以上

        const toArray = (input?: string): string[] | undefined => {
            if (!input) return
            const result = input
                .split(/[\n\r,]+/) // カンマ・改行（\n, \r, \r\n）をすべて区切りとする
                .map((s) => s.trim()) // 各要素の前後空白を除去
                .filter((s) => s.length > 0) // 空文字は除外（不要ならこの行は省略）
            return result
        }

        if (!classMap.has(className)) {
            classMap.set(className, {
                decorator,
                uses: toArray(uses),
                methods: new Map(),
            })
        }

        const classEntry = classMap.get(className)
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const methodMap = classEntry!.methods

        // Keyだけをメソッド名、引数、戻り値、にした。
        const methodKey = `${methodName}::${fromClass}->${toClass}`

        if (!methodMap.has(methodKey)) {
            methodMap.set(methodKey, {
                methodName,
                fromClass,
                toClass,
                ignoreByDefault,
                inverse,
                fields: [],
            })
        }

        // from/toより、ignoreColumn 優先で適用
        if (ignoreColumn) {
            methodMap.get(methodKey)!.fields.push({ ignoreColumn })
        } else if (fromField) {
            // 追加(From/Toどっちかがなかったら、フィールド情報はpushしない)
            if (toField) {
                // 追加 以上
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                methodMap.get(methodKey)!.fields.push({ fromField, toField, qualifiedByName })
            }
        }
    }

    // Convert Map to array
    const result = Array.from(classMap.entries()).map(([className, entry]) => ({
        className,
        decorator: entry.decorator,
        uses: entry.uses,
        methods: Array.from(entry.methods.values()),
    }))

    logger.debug(result)
    return result
}
