import type { ClassDefinition, ClassGroup } from './domain/types'

export const mock: ClassGroup[] = [
    {
        className: 'org.example.mapper.UserMapper',
        decorator: 'hogehogeDeco',
        methods: [
            {
                methodName: 'toDto',
                fromClass: 'UserCommand',
                toClass: 'UserDto',
                fields: [
                    {
                        fromField: 'name',
                        toField: 'name',
                    },
                    {
                        fromField: 'email',
                        toField: 'email',
                    },
                ],
            },
            {
                methodName: 'toDto',
                fromClass: 'UserCommand',
                toClass: 'UserDto',
                fields: [
                    {
                        fromField: 'name',
                        toField: 'name',
                    },
                ],
            },
        ],
    },
    {
        className: 'org.example.mapper.UserMapper2',
        methods: [
            {
                methodName: 'toDto',
                fromClass: 'UserCommand',
                toClass: 'UserDto',
                fields: [],
            },
        ],
    },
]

export const classDefinitionsMock: ClassDefinition[] = [
    {
        className: 'UserMapper',
        immutable: false, // ← 例: @Data
        fields: [
            { type: 'java.lang.String', name: 'fullName' },
            { type: 'java.lang.String', name: 'email' },
            { type: 'int', name: 'age' },
            { type: 'java.lang.String', name: 'name' },
            { type: 'java.lang.String', name: 'emailAddress' },
            { type: 'java.lang.Integer', name: 'age' }, // 重複に注意
        ],
    },
    {
        className: 'UserMapper2',
        immutable: true, // ← 例: @Value
        fields: [
            { type: 'java.lang.String', name: 'name' },
            { type: 'java.lang.String', name: 'emailAddress' },
            { type: 'java.lang.String', name: 'value1' },
        ],
    },
]
