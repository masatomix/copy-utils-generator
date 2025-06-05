import type { ClassInfo } from './types'

export interface ClassRepository {
    save(classInfo: ClassInfo, code: string): void
}
