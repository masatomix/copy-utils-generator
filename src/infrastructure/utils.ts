export function parsePackageName(fqcn: string): string {
    return parseFqcn(fqcn).packageName
}

export function hasPackage(fqcn: string): boolean {
    return !(parseFqcn(fqcn).packageName === '')
}

export function parseClassName(fqcn: string): string {
    return parseFqcn(fqcn).className
}

type FqcnParts = {
    packageName: string
    className: string
}

function parseFqcn(fqcn: string): FqcnParts {
    const lastDotIndex = fqcn.lastIndexOf('.')
    if (lastDotIndex === -1) {
        // FQCNにドットがない → デフォルトパッケージ
        return {
            packageName: '',
            className: fqcn,
        }
    }

    return {
        packageName: fqcn.substring(0, lastDotIndex),
        className: fqcn.substring(lastDotIndex + 1),
    }
}
