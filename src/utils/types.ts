export type Maybe<T> = T | null | undefined;

export type Data = {
    count: number;
    entries: Entry[];
}

export type Row = {
    type?: string;
    id: number;
    api: string;
    auth: string;
    category: string;
    cors: string;
    description: string;
    https: string;
    link: string;
    expanded?: boolean;
}

export type Column = {
    key: string;
    name: string;
}

export type Entry = {
    API: any;
    Auth: any;
    Category: any;
    Cors: any;
    Description: any;
    HTTPS: any;
    Link: any;
}

export type ContextMenu = {
    rowId: number;
    top: number;
    left: number;
}

export type Detail = Row & { type: string }

export type Filter = Omit<Row, "id">

export type Comparator = (a: Row, b: Row) => number;