declare namespace kanban{
type TID = number | string;
type TDispatch<T> = <A extends keyof T>(action: A, data: T[A]) => void;
interface DataHash {
    [key: string]: any;
}
interface IWritable<T> {
    subscribe: (fn: (v: T) => any) => any;
    update: (fn: (v: T) => any) => any;
    set: (val: T) => any;
}
type TWritableCreator = (val: any) => IWritable<typeof val>;
interface IEventBus<T> {
    exec(name: string, ev: any): void;
    setNext(next: TDispatch<T>): void;
}

type TState<Type> = {
    [Property in keyof Type]: IWritable<Type[Property]>;
};
class Store<T extends DataHash> {
    private _state;
    private _values;
    private _writable;
    constructor(writable: TWritableCreator);
    setState(data: Partial<T>): void;
    getState(): T;
    getReactive(): TState<T>;
    private _wrapWritable;
}

class EventBus<T> {
    private _handlers;
    protected _nextHandler: TDispatch<T>;
    constructor();
    on(name: string, handler: any): void;
    exec(name: string, ev: any): void;
    setNext(next: TDispatch<T>): void;
}

function tempID(): string;

class ExportManager {
    private _store;
    constructor(store: DataStore);
    json(fileName?: string): void;
    private _save;
}

interface IMoveCardConfig {
    columnId: TID;
    rowId?: TID | null;
    before?: TID | null;
}

type THandlersFunction = {
    [Key in keyof THandlersConfig]: (store: DataStore, config?: THandlersConfig[Key]) => void;
};
interface ICoords {
    x: number;
    y: number;
}
interface IRect extends ICoords {
    top: number;
    bottom: number;
    left: number;
    right: number;
    width: number;
    height: number;
    id?: TID;
}
interface IUser {
    id: TID;
    label?: string;
    avatar?: string;
    [key: string]: any;
}
interface ICard {
    id?: TID;
    label?: string;
    description?: string;
    progress?: number;
    users?: TID | TID[];
    end_date?: Date | string;
    start_date?: Date | string;
    color?: string;
    priority?: any;
    attached?: IAttachment[];
    comments?: IComment[];
    css?: string;
    [key: string]: any;
}
interface INormalizedCard extends ICard {
    id: TID;
}
interface IAttachment {
    id?: TID;
    url?: string;
    previewURL?: string;
    coverURL?: string;
    file?: any;
    name?: string;
    status?: any;
    isCover?: boolean;
}
interface IRow {
    id: TID;
    label?: string;
    collapsed?: boolean;
    css?: string;
}
interface IColumn {
    id: TID;
    label?: string;
    limit?: number | Record<string, number>;
    strictLimit?: boolean;
    collapsed?: boolean;
    css?: string;
    overlay?: any;
}
type TAreaMeta = {
    columnId: TID;
    rowId?: TID;
    column: IColumn;
    row?: IRow;
    cardsCount: number;
    totalLimit?: number;
    isOverLimit?: boolean;
    noFreeSpace?: boolean;
    height?: number | null;
};
type TAreasMeta = Record<string, TAreaMeta>;
type TCardsMap = Record<string, INormalizedCard[] | undefined>;
interface ICardMeta {
    found?: boolean;
    dimmed?: boolean;
    dragging?: boolean;
}
type TLayoutType = `${TScrollType}:${TRenderType}`;
type TScrollType = "default" | "column";
type TRenderType = "default" | "lazy";
interface IEditorConfig {
    autoSave?: boolean;
    debounce?: number;
}
interface IStoreConfig {
    history?: boolean;
}
interface IKanbanProps {
    cards: ICard[];
    columns: IColumn[];
    rows?: IRow[];
    cardShape?: TCardShape;
    columnShape?: IColumnShape;
    rowShape?: IRowShape;
    editorShape?: TEditorShape[];
    editor?: IEditorConfig;
    /** @deprecated use editor.autoSave instead */
    editorAutoSave?: boolean;
    cardTemplate?: any;
    readonly?: TReadonlyConfig;
    columnKey?: string;
    rowKey?: string;
    links?: ILink[];
    scrollType?: TScrollType;
    renderType?: TRenderType;
    cardHeight?: number;
    api?: IApi;
    history?: boolean;
}
interface IDataStoreState {
    columns: IColumn[];
    columnKey: string;
    rows: IRow[];
    rowKey?: string;
    cards: INormalizedCard[];
    cardsMap: TCardsMap;
    areasMeta: TAreasMeta;
    cardShape: ICardShape;
    columnShape?: IColumnShape;
    rowShape?: IRowShape;
    cardsMeta: Record<TID, ICardMeta | undefined>;
    links: ILink[];
    dragItemId: TID | null;
    before: TID | null;
    overAreaId?: TID | null;
    dragItemsCoords: TDragItemsCoords | null;
    search: ISearchConfig | null;
    selected?: TID[] | null;
    scroll?: IScrollConfig | null;
    sort?: IAreaSortConfig | ISortConfig | null;
    edit?: IEditConfig | null;
    readonly?: IReadonlyModes | null;
    cardHeight?: number | null;
    layout: TLayoutType;
    history: IHistory;
    currentUser?: TID | null;
}
interface IHistoryConfig {
    ev: THandlersConfig[keyof THandlersConfig];
    key: keyof THandlersConfig;
    undo: () => void;
}
interface IHistory {
    undo: (IHistoryConfig | string)[];
    redo: (Omit<IHistoryConfig, "undo"> | string)[];
    batches: Record<string, IHistoryConfig[]>;
}
interface IScrollConfig {
    id: TID | undefined;
    to: "column" | "row" | "card";
    options?: ScrollIntoViewOptions;
}
type TSortDir = "asc" | "desc";
interface IAreaSortConfig {
    columns: Record<TID, ISortConfig | undefined>;
}
interface ISortConfig {
    by?: string | ((card: INormalizedCard) => any);
    dir?: TSortDir;
    preserve?: boolean;
}
interface ISortItemOption extends ISortConfig {
    /** @deprecated use text instead */
    label?: string;
    text: string;
    id?: TID;
    icon?: TWxIcons;
}
type TDropAreasCoords = IRect[];
type TDragItemsCoords = Record<string, IRect>;
type TSearchRule = (card: INormalizedCard, value: string, by?: string) => boolean;
interface ISearchConfig {
    value: string | null;
    by?: string;
    searchRule?: TSearchRule;
}
interface IMenuItem {
    id: string;
    icon?: TWxIcons;
    text?: string;
    disabled?: boolean;
}
type TMenuItemsFn<T> = (config: T) => IMenuItem[] | null;
type TMenuItemsConfig<T> = IMenuItem[] | TMenuItemsFn<T> | null;
interface ICardField {
    show?: boolean;
    config?: Record<string, any>;
}
interface IComment {
    id: TID;
    userId: TID;
    cardId: TID;
    text: string;
    html?: string;
    date: Date;
}
interface ILink {
    id: TID;
    masterId: TID;
    slaveId: TID;
    relation: TRelationOptions;
}
interface ICardShape {
    label: ICardField;
    description?: ICardField;
    progress?: ICardField;
    start_date?: ICardField & {
        format?: string;
    };
    end_date?: ICardField & {
        format?: string;
    };
    menu?: {
        show?: boolean;
        items?: TMenuItemsConfig<{
            card: ICard;
        }>;
    };
    attached?: ICardField;
    users?: ICardField & {
        values?: IUser[];
    };
    priority?: ICardField & {
        values?: {
            id: TID;
            color: string;
            label?: string;
        }[];
    };
    color?: ICardField & {
        values?: string[];
    };
    cover?: ICardField;
    comments?: ICardField;
    headerFields?: {
        key: string;
        css?: string;
        label?: string;
    }[];
    css?: TCssProp;
    votes?: ICardField;
}
type TCssProp = (obj: any) => string;
type TCardShape = ObjectOrBoolean<ICardShape>;
type CombineTypes<T, N> = {
    [P in keyof T]: T[P] extends Record<any, any> ? T[P] & N : (T[P] & N) | null;
};
type ObjectOrBoolean<T> = {
    [P in keyof T]: T[P] | boolean;
};
interface IColumnShape {
    menu?: {
        show?: boolean;
        items?: TMenuItemsConfig<{
            column: IColumn;
            columns: IColumn[];
            columnIndex: number;
        }>;
    };
    css?: TCssProp;
}
type TColumnShape = ObjectOrBoolean<IColumnShape>;
interface IRowShape {
    menu?: {
        show?: boolean;
        items?: TMenuItemsConfig<{
            row: IRow;
            rows: IRow[];
            rowIndex: number;
        }>;
    };
    css?: TCssProp;
}
type TRowShape = ObjectOrBoolean<IRowShape>;
interface IUploaderConfig {
    accept?: string;
    disabled?: boolean;
    multiple?: boolean;
    folder?: boolean;
}
type TCommonShape = {
    key: string | any;
    label?: string;
    id?: TID;
};
type TTextFieldShape = TCommonShape & {
    type: "text" | "textarea";
    config?: {
        placeholder?: string;
        readonly?: boolean;
        focus?: boolean;
        type?: string;
        disabled?: boolean;
        inputStyle?: string;
    };
};
type TProgressFieldShape = TCommonShape & {
    type: "progress";
    config?: {
        min?: number;
        max?: number;
        step?: number;
    };
};
type TMultiselectFieldShape = TCommonShape & {
    type: "multiselect";
    values?: IUser[];
    options?: IUser[];
    config?: Record<string, any>;
};
type TComboFieldShape = TCommonShape & {
    type: "combo" | "select";
    values?: {
        id: any;
        label?: string;
    }[];
    options?: {
        id: any;
        label?: string;
    }[];
    config?: Record<string, any>;
};
type TColorFieldShape = TCommonShape & {
    type: "color";
    values?: string[];
    colors?: string[];
    config?: {
        placeholder?: string;
        clear?: boolean;
    };
};
type TDateFieldShape = TCommonShape & {
    type: "date";
    format?: string;
    config?: Record<string, any>;
};
type TDateRangeShape = TCommonShape & {
    type: "dateRange";
    format?: string;
    key: {
        start: TID;
        end: TID;
    };
    config?: Record<string, any>;
};
type TFilesFieldShape = TCommonShape & {
    type: "files";
    uploadURL?: string;
    config?: IUploaderConfig;
};
type TCommentsShape = TCommonShape & {
    type: "comments";
    config?: {
        format?: string;
        placement?: "page" | "editor";
        html?: boolean;
    };
};
type TLinksShape = TCommonShape & {
    type: "links";
    values?: ILink[];
    config?: {};
};
type TEditorShape = TTextFieldShape | TMultiselectFieldShape | TComboFieldShape | TProgressFieldShape | TColorFieldShape | TDateFieldShape | TFilesFieldShape | TDateRangeShape | TCommentsShape | TLinksShape;
interface IReadonlyModes {
    edit?: boolean;
    add?: boolean;
    select?: boolean;
    dnd?: boolean;
}
type TReadonlyConfig = IReadonlyModes | boolean;
interface IApi {
    exec: EventBus<THandlersConfig>["exec"];
    on: EventBus<THandlersConfig>["on"];
    intercept: EventBus<THandlersConfig>["on"];
    getState: () => IDataStoreState;
    getReactiveState: () => ToReactive<IDataStoreState>;
    setNext: (ev: IEventBus<THandlersConfig>) => void;
    getStores: () => {
        data: DataStore;
    };
    getCard: (id: TID) => ICard | undefined;
    getAreaCards: (columnId: TID, rowId?: TID) => ICard[] | undefined;
    serialize: () => {
        cards: ICard[];
        columns: IColumn[];
        rows?: IRow[] | null;
    };
    export: ExportManager;
    undo: () => void;
    redo: () => void;
}
interface ISearchOption {
    id: string | null;
    label?: string;
    searchRule?: TSearchRule;
}
type TItemTemplate = (config: Record<string, any>) => void[];
interface IToolbarDefaultItem {
    type: "addRow" | "addColumn" | "spacer" | "undo" | "redo";
}
interface ISearchItem {
    type: "search";
    options?: ISearchOption[];
}
interface ISortItem {
    type: "sort";
    options?: ISortItemOption[];
}
interface IEditConfig {
    cardId: TID;
}
interface ITemplateItem {
    type: "template";
    template?: TItemTemplate;
}
type IToolbarItem = IToolbarDefaultItem | ISearchItem | ISortItem | ITemplateItem;
type TWxIcons = "wxi-alert" | "wxi-angle-dbl-down" | "wxi-angle-dbl-left" | "wxi-angle-dbl-right" | "wxi-angle-dbl-up" | "wxi-angle-down" | "wxi-angle-left" | "wxi-angle-right" | "wxi-angle-up" | "wxi-arrow-down" | "wxi-arrow-left" | "wxi-arrow-right" | "wxi-arrow-up" | "wxi-arrows-h" | "wxi-arrows-v" | "wxi-asc" | "wxi-assign" | "wxi-bullhorn" | "wxi-calendar" | "wxi-camera" | "wxi-cat" | "wxi-check" | "wxi-clock" | "wxi-close" | "wxi-content-copy" | "wxi-content-cut" | "wxi-content-paste" | "wxi-convert" | "wxi-delete-outline" | "wxi-delete" | "wxi-desc" | "wxi-dots-h" | "wxi-dots-v" | "wxi-download" | "wxi-duplicate" | "wxi-earth" | "wxi-edit" | "wxi-emoticon-outline" | "wxi-empty" | "wxi-external" | "wxi-eye" | "wxi-file" | "wxi-filter-check" | "wxi-filter-outline" | "wxi-folder" | "wxi-food-fork-drink" | "wxi-human-handsdown" | "wxi-indent" | "wxi-information-outline" | "wxi-loading" | "wxi-menu-down" | "wxi-menu-right" | "wxi-paperclip" | "wxi-paste" | "wxi-pin-outline" | "wxi-plus" | "wxi-pound" | "wxi-redo" | "wxi-refresh" | "wxi-rename" | "wxi-search" | "wxi-soccer" | "wxi-sort" | "wxi-split" | "wxi-star-outline" | "wxi-subtask" | "wxi-table-column-plus-after" | "wxi-table-row-plus-after" | "wxi-table-row-plus-before" | "wxi-undo" | "wxi-unindent" | "wxi-upload" | "wxi-view-column" | "wxi-view-grid" | "wxi-view-sequential";
type TRelationOptions = "relatesTo" | "requiredFor" | "duplicate" | "parent";
type ToReactive<Type> = {
    [Property in keyof Type]: IWritable<Type[Property]>;
};

class DataStore extends Store<IDataStoreState> {
    in: EventBus<THandlersConfig>;
    out: EventBus<THandlersConfig>;
    sortRule?: (config: ISortConfig) => (a: ICard, b: ICard) => number;
    config: IStoreConfig;
    private _router;
    constructor(w: TWritableCreator, config?: IStoreConfig);
    setState(state: Partial<IDataStoreState>, ctx?: any): void;
    init(state: Partial<Omit<IDataStoreState, "cards" | "readonly" | "cardShape" | "columnShape" | "rowShape">> & {
        cards: ICard[];
        readonly: TReadonlyConfig;
        cardShape: TCardShape;
        columnShape: TColumnShape;
        rowShape: TRowShape;
    }): void;
    undo(): void;
    redo(): void;
    protected _setHandlers(handlersMap: THandlersFunction): void;
    protected _initStructure(): void;
    private _computeLimits;
    private _normalizeCards;
    private _normalizeShapes;
    private _normalizeReadonlyConfig;
}
type THandlersConfig = CombineTypes<{
    ["add-card"]: {
        id?: TID;
        card?: Partial<ICard>;
        select?: boolean;
    } & IMoveCardConfig;
    ["update-card"]: {
        id: TID;
        card: Partial<INormalizedCard>;
        replace?: boolean;
    };
    ["duplicate-card"]: {
        id: TID;
        card?: Partial<INormalizedCard>;
    };
    ["delete-card"]: {
        id: TID;
    };
    ["move-card"]: {
        id: TID;
        card?: Partial<INormalizedCard>;
    } & IMoveCardConfig;
    ["add-column"]: {
        id?: TID;
        column?: Partial<IColumn>;
        before?: TID;
    };
    ["update-column"]: {
        id?: TID;
        column?: Partial<IColumn>;
        replace?: boolean;
    };
    ["move-column"]: {
        id?: TID;
        before?: TID;
    };
    ["delete-column"]: {
        id: TID;
    };
    ["add-row"]: {
        id?: TID;
        row?: Partial<IRow>;
        before?: TID;
    };
    ["update-row"]: {
        id?: TID;
        row?: Partial<IRow>;
        replace?: boolean;
    };
    ["move-row"]: {
        id?: TID;
        before?: TID;
    };
    ["delete-row"]: {
        id: TID;
    };
    ["set-search"]: ISearchConfig;
    ["start-drag-card"]: {
        id: TID;
        rowId?: TID | null;
        columnId: TID;
        before?: TID | null;
        source: TID[];
        dragItemsCoords: IDataStoreState["dragItemsCoords"] /** @deprecated will be removed in later versions */;
        dropAreasCoords: TDropAreasCoords | null /** @deprecated will be removed in later versions */;
    };
    ["drag-card"]: {
        id: TID;
        rowId?: TID | null;
        columnId?: TID | null;
        before?: TID | null;
        source: TID[];
    };
    ["end-drag-card"]: {
        id: TID;
        rowId?: TID | null;
        columnId?: TID | null;
        before?: TID | null;
        source: TID[];
    };
    ["select-card"]: {
        id: TID;
        groupMode?: boolean;
    };
    ["unselect-card"]: {
        id: TID | null;
    };
    ["scroll"]: IScrollConfig;
    ["set-sort"]: (ISortConfig & {
        columnId?: TID;
    }) | null;
    ["set-edit"]: IEditConfig | null;
    ["add-comment"]: {
        id?: TID;
        cardId: TID;
        comment: Partial<Omit<IComment, "userId">>;
    };
    ["update-comment"]: {
        id: TID;
        cardId: TID;
        comment: Partial<Omit<IComment, "userId">>;
    };
    ["delete-comment"]: {
        id: TID;
        cardId: TID;
    };
    ["add-link"]: {
        id?: TID;
        link: ILink;
    };
    ["delete-link"]: {
        id: TID;
    };
    ["add-vote"]: {
        cardId: TID;
    };
    ["delete-vote"]: {
        cardId: TID;
    };
}, {
    $meta?: {
        skipHistory?: boolean;
        batch?: string;
        restore?: TID;
    };
}>;

const defaultCardShape: ICardShape;
const defaultEditorShape: TEditorShape[];
const getDefaultCardMenuItems: ({ store }: {
    store: DataStore;
}) => {
    id: string;
    icon: string;
    text: string;
}[];
const getDefaultColumnMenuItems: ({ columns, columnIndex, }: {
    columns: IColumn[];
    columnIndex: number;
    store?: DataStore | undefined;
}) => ({
    id: string;
    icon: string;
    text: string;
    disabled?: undefined;
} | {
    id: string;
    icon: string;
    text: string;
    disabled: boolean;
})[];
const getDefaultRowMenuItems: ({ rows, rowIndex, }: {
    rows: IRow[];
    rowIndex: number;
    store?: DataStore | undefined;
}) => ({
    id: string;
    icon: string;
    text: string;
    disabled?: undefined;
} | {
    id: string;
    icon: string;
    text: string;
    disabled: boolean;
})[];

class Events {
    private _api;
    constructor(api: IApi);
    on<K extends keyof THandlersConfig>(event: K, callback: (config: THandlersConfig[K]) => any): void;
    exec<K extends keyof THandlersConfig>(event: K, data: THandlersConfig[K]): void;
}

type TThemeConfig = {
    name: string;
    fonts: boolean;
};
interface IKanbanConfig extends IKanbanProps {
    locale?: Record<string, any>;
    theme?: TThemeConfig;
}
class Kanban {
    api: IApi;
    export: ExportManager;
    events: Events;
    config: IKanbanConfig;
    container: HTMLElement;
    private _kanban;
    constructor(container: HTMLElement, config: IKanbanConfig);
    destructor(): void;
    setConfig(config: Partial<IKanbanConfig>): void;
    parse(data: {
        cards?: ICard[];
        columns?: IColumn[];
        rows?: IRow[];
    }): void;
    serialize(): {
        cards: INormalizedCard[];
        columns: IColumn[];
        rows: IRow[];
    };
    undo(): void;
    redo(): void;
    getCard(id: TID): ICard;
    getAreaCards(columnId: TID, rowId?: TID): ICard[];
    getSelection(): TID[];
    addCard(config: THandlersConfig["add-card"]): void;
    updateCard(config: THandlersConfig["update-card"]): void;
    duplicateCard(config: THandlersConfig["duplicate-card"]): void;
    deleteCard(config: THandlersConfig["delete-card"]): void;
    moveCard(config: THandlersConfig["move-card"]): void;
    addColumn(config: THandlersConfig["add-column"]): void;
    updateColumn(config: THandlersConfig["update-column"]): void;
    addRow(config: THandlersConfig["add-row"]): void;
    updateRow(config: THandlersConfig["update-row"]): void;
    moveColumn(config: THandlersConfig["move-column"]): void;
    moveRow(config: THandlersConfig["move-row"]): void;
    deleteColumn(config: THandlersConfig["delete-column"]): void;
    deleteRow(config: THandlersConfig["delete-row"]): void;
    addComment(config: THandlersConfig["add-comment"]): void;
    updateComment(config: THandlersConfig["update-comment"]): void;
    deleteComment(config: THandlersConfig["delete-comment"]): void;
    selectCard(config: THandlersConfig["select-card"]): void;
    unselectCard(config: THandlersConfig["unselect-card"]): void;
    setSearch(config: THandlersConfig["set-search"]): void;
    setSort(config: THandlersConfig["set-sort"]): void;
    setEdit(config: THandlersConfig["set-edit"]): void;
    scroll(config: THandlersConfig["scroll"]): void;
    setLocale(locale: Record<string, any>): void;
    private _init;
    private _configToProps;
}

interface IToolbarConfig {
    api: IApi;
    items?: string[] | TItemTemplate[] | IToolbarItem[];
    locale?: Record<string, any>;
    theme?: string;
}
class Toolbar {
    api: IApi;
    events: Events;
    config: IToolbarConfig;
    container: HTMLElement;
    private _toolbar;
    constructor(container: HTMLElement, config: IToolbarConfig);
    destructor(): void;
    setConfig(config: Partial<IToolbarConfig>): void;
    setLocale(locale: Record<string, any>): void;
    private _init;
    private _configToProps;
    private _normalizeItems;
}

class RestDataProvider extends EventBus<THandlersConfig> {
    private _queue;
    private _customHeaders;
    protected _url: string;
    constructor(url?: string);
    getCards(): Promise<ICard[]>;
    getColumns(): Promise<IColumn[]>;
    getRows(): Promise<IRow[]>;
    getUsers(): Promise<IRow[]>;
    protected getHandlers(handlers: Partial<Record<keyof THandlersConfig, any>>): Partial<Record<"add-card" | "update-card" | "delete-card" | "move-card" | "add-column" | "delete-column" | "update-column" | "move-column" | "add-row" | "delete-row" | "update-row" | "move-row" | "duplicate-card" | "set-search" | "start-drag-card" | "drag-card" | "end-drag-card" | "select-card" | "unselect-card" | "scroll" | "set-sort" | "set-edit" | "add-comment" | "update-comment" | "delete-comment" | "add-link" | "delete-link" | "add-vote" | "delete-vote", any>>;
    setHeaders(headers: any): void;
    getIDResolver(): (id: TID, type: number) => TID;
    protected send<T>(url: string, method: string, data?: any, customHeaders?: any): Promise<T>;
    protected parseCards(data: ICard[]): ICard[];
    protected prepareCard(card: ICard): {
        users: TID | TID[] | null;
        id?: TID | undefined;
        label?: string | undefined;
        description?: string | undefined;
        progress?: number | undefined;
        end_date?: string | Date | undefined;
        start_date?: string | Date | undefined;
        color?: string | undefined;
        priority?: any;
        attached?: IAttachment[] | undefined;
        comments?: IComment[] | undefined;
        css?: string | undefined;
    } | null;
}

class RemoteEvents {
    protected _remote: any;
    protected _ready: Promise<any>;
    constructor(url: string, token: string);
    protected ready(): Promise<any>;
    protected on(name: string | any, handler?: any): void;
}

function kanbanUpdates(api: any, resolver: any): {
    cards: (obj: any) => void;
    columns: (obj: any) => void;
    rows: (obj: any) => void;
};

export { CombineTypes, ICardField, IDataStoreState, IEventBus, IHistoryConfig, IKanbanProps, IMoveCardConfig, IReadonlyModes, IRect, ISearchOption, ISortItemOption, IStoreConfig, IToolbarItem, Kanban, ObjectOrBoolean, RemoteEvents, RestDataProvider, Store, TAreaMeta, TColorFieldShape, TColumnShape, TComboFieldShape, TDateFieldShape, TDateRangeShape, TDispatch, TFilesFieldShape, THandlersFunction, TID, TItemTemplate, TMenuItemsConfig, TMultiselectFieldShape, TProgressFieldShape, TRowShape, TSortDir, TTextFieldShape, TWxIcons, Toolbar, defaultCardShape, defaultEditorShape, getDefaultCardMenuItems, getDefaultColumnMenuItems, getDefaultRowMenuItems, kanbanUpdates, tempID };
}