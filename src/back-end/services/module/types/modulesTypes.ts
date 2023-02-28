export type Module = {
    id: number,
    name: string,
    prof?: string,
    email?: string
}

export type Courses = {
    id: number,
    name: string,
    semester: number,
    dateAdd?: string,
    download?: boolean

}

export type Td = {
    id: number,
    name: string,
    semester: number,
    dateAdd?: string,
    download?: boolean
}

export type Tp = {
    id: number,
    name: string,
    semester: number,
    dateAdd?: string,
    download?: boolean
}