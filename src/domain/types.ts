// マッピング生成用Type達

/**
 * 行データ
 */
export type MappingRow = {
    active?: boolean
    className: string
    methodName: string
    fromClass: string
    toClass: string
    fromField?: string
    toField?: string
    decorator?: string
    uses?: string
    qualifiedByName?: string
    ignoreByDefault?: boolean
    ignoreColumn?: string
    inverse?: boolean
    updateMethod?: boolean
}

/**
 * フィールドのマッピング情報
 */
export type FieldGroup = {
    fromField?: string
    toField?: string
    qualifiedByName?: string
    ignoreColumn?: string
}

/**
 * メソッドの情報
 */
export type MethodGroup = {
    methodName: string // メソッド名
    fromClass: string // 引数
    toClass: string //戻り値
    ignoreByDefault?: boolean
    inverse?: boolean
    updateMethod?: boolean 
    fields: FieldGroup[] // マッピングする情報。コレは空配列の可能性はある
}

/**
 * クラス情報
 */
export interface ClassGroup extends ClassInfo {
    methods: MethodGroup[]
    decorator?: string
    uses?: string[]
}

////////////////////////////////////////////////////////////////////
// Class生成用Type達
/**
 * 行データ
 */
export type MappingRowOfClass = {
    active?: boolean
    className: string
    type: string
    fieldName: string
    immutable?: boolean
    AllArgsConstructor?: boolean
    Builder?: boolean
}

/**
 * クラス情報
 */
export interface ClassDefinition extends ClassInfo {
    fields: Field[]
    immutable: boolean // @Valueか@Dataかを選ぶ
    AllArgsConstructor: boolean
    Builder: boolean
}

/**
 * フィールド情報
 */
interface Field {
    type: string
    name: string
}

/**
 * クラス、マッピングとも共通の親インタフェース
 */
export interface ClassInfo {
    className: string
}
