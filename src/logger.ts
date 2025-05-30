import pino, { type Logger } from 'pino';

const isProd = process.env.NODE_ENV === 'production';


// 内部でロガーをキャッシュ
const loggers: Record<string, Logger> = {};
const baseLevel = 'warn'

// モジュールごとのログレベル設定
const moduleLogLevels: Record<string, pino.LevelWithSilent> = {
    // MappingFactoryExcelImpl: 'debug',
    // cli: 'info',
    // groupMappings: 'debug',
    // ConverterHandlebarsImpl: 'debug',
    FileClassRepository: 'info',
    // GenerateClassUserCase: 'debug',
    // convertToClassDefinitions: 'debug'
    GenerateMappingClassUserCase: 'info'
};

// ベースロガー（共通設定）
const baseLoggerConfig = {
    transport: !isProd
        ? {
            target: 'pino-pretty',
            options: {
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname',
                levelFirst: true,
            },
        }
        : undefined,
}

/**
 * モジュール名を指定して Logger を取得。
 * 初回アクセス時に生成し、以後はキャッシュされたものを返す。
 */
export function getLogger(moduleName: string): Logger {
    if (!loggers[moduleName]) {
        const level = moduleLogLevels[moduleName] ?? baseLevel;
        // console.log(`${moduleName}はなかったので${level}で作る`)
        loggers[moduleName] = pino({
            level,
            transport: baseLoggerConfig.transport
        }).child({ module: moduleName, level });
    }
    return loggers[moduleName];
}
