declare namespace eventCalendar{
 type TDataBlock = {
    in: string[];
    out: string[];
    exec: any;
    length?: number;
};
 type TDataConfig = TDataBlock[];
 type TID$1 = number | string;
 type TDispatch$1<T> = <A extends keyof T>(action: A, data: T[A]) => void;
interface DataHash {
    [key: string]: any;
}
interface IWritable<T> {
    subscribe: (fn: (v: T) => any) => any;
    update: (fn: (v: T) => any) => any;
    set: (val: T) => any;
}
 type TWritableCreator = (val: any) => IWritable<typeof val>;

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
    protected _nextHandler: TDispatch$1<T>;
    constructor();
    on(name: string, handler: any): void;
    exec(name: string, ev: any): void;
    setNext(next: TDispatch$1<T>): void;
}

 type TMethodsConfig = IDataMethodsConfig;
 type TDispatch = <A extends keyof TMethodsConfig>(action: A, data: TMethodsConfig[A]) => void;
interface IDataConfig {
    events: IEventData[];
    selected: IEventData;
    popupInfo: boolean;
    edit: "add" | "update" | boolean;
    mode: string;
    date: Date;
    dateRange?: Date[];
    sidebar: {
        show: boolean;
    } | false;
    bounds: [Date, Date];
    editorShape?: TEditorShape[];
    calendars?: ICalendar[];
    config: ISchedulerConfig$1;
    datepicker: TDatepickerConfig;
    colors?: IColorSchema[];
}
interface IBaseViewConfig {
    cellCss?: (date: Date) => string;
    template?: (event: IEventData) => string;
    eventHeight?: number;
}
interface IReadonlyConfig {
    dragResize?: boolean;
    readonly?: boolean;
    dragMove?: boolean;
}
 type IViewConfig = IWeekConfig | IMonthConfig | ITimelineConfig;
interface IViewItem {
    id: TID;
    label: string;
    layout: "day" | "week" | "month" | "year" | "agenda" | "timeline";
    config?: IViewConfig;
}
interface ISchedulerConfig$1 extends IReadonlyConfig {
    tableHeaderHeight?: number;
    autoSave?: boolean;
    dimPastEvents?: boolean;
    timeStep?: number;
    dragCreate?: boolean;
    eventInfoOnClick?: boolean;
    eventsOverlay?: boolean;
    eventHeight?: number;
    timeRange?: [number, number];
    editorOnDblClick?: boolean;
    createEventOnDblClick?: boolean;
    defaultEventDuration?: number;
    viewControl?: "auto" | "toggle" | "dropdown" | "none";
    views?: IViewItem[];
    dateClick?: boolean | TID;
}
interface IData {
    events: IEventData[];
    selected: IEventData;
    selectedId: TID;
    popupInfo: boolean;
    edit: "add" | "update" | boolean;
    mode: string;
    date: Date;
    bounds: [Date, Date];
    viewSize: {
        width: number;
        height: number;
    };
    viewData: any[];
    viewModel: any;
    editorShape?: TEditorShape[];
    calendars?: ICalendar[];
    config: ISchedulerConfig$1;
    datepicker: TDatepickerConfig;
    sidebar: {
        show: boolean;
    } | false;
    colors: IColorSchema[];
    dateFnsLocale?: any;
}
interface IApi {
    exec: any;
    on: any;
    getState: any;
    getReactiveState: any;
    setNext: (ev: IEventBus) => void;
    getStores: () => {
        state: DataStore;
    };
    intercept: any;
}
interface IEventBus {
    exec(name: string, ev: any): void;
    setNext(next: TDispatch): void;
}
 type IOption = {
    id: TID;
    label?: string;
    [key: string]: any;
};
 type TCommonShape = {
    key: string | any;
    label?: string;
    id?: TID;
};
 type ICommonConfig = {
    disabled?: boolean;
    placeholder?: string;
    [key: string]: any;
};
 type TTextFieldShape = TCommonShape & {
    type: "text" | "textarea";
    config?: ICommonConfig & {
        readonly?: boolean;
        focus?: boolean;
        type?: string;
        inputStyle?: string;
    };
};
 type TCheckboxShape = TCommonShape & {
    type: "checkbox";
    text?: string;
};
 type TRecurringEvent = TCommonShape & {
    type: "recurring";
};
 type TRadioShape = TCommonShape & {
    type: "radio";
    options: {
        id: TID;
        label?: string;
    }[];
};
 type TComboFieldShape = TCommonShape & {
    type: "combo" | "select" | "multiselect";
    options?: IOption[];
    template?: (opt: IOption) => string;
    config?: ICommonConfig;
};
 type TColorFieldShape = TCommonShape & {
    type: "color";
    colors?: string[];
    config?: ICommonConfig & {
        clear?: boolean;
    };
};
 type TColorSchemaFieldShape = TCommonShape & {
    type: "colorSchema";
    colors?: IColorSchema[];
    config?: ICommonConfig & {
        clear?: boolean;
    };
};
 type TDateFieldShape = TCommonShape & {
    type: "date";
    time?: boolean;
    config?: ICommonConfig;
};
 type TFilesFieldShape = TCommonShape & {
    type: "files";
    uploadURL?: string;
    config?: IUploaderConfig;
};
interface IUploaderConfig {
    accept?: string;
    disabled?: boolean;
    multiple?: boolean;
    folder?: boolean;
}
 type TEditorShape = TTextFieldShape | TComboFieldShape | TColorFieldShape | TDateFieldShape | TCheckboxShape | TRadioShape | TColorSchemaFieldShape | TRecurringEvent | TFilesFieldShape;
 type TID = string | number;
interface IColorSchema {
    background?: string;
    border?: string;
    textColor?: string;
    colorpicker?: string;
}
interface IEventData extends IReadonlyConfig {
    start_date: Date;
    end_date: Date;
    id?: TID;
    type?: TID;
    text?: string;
    details?: string;
    allDay?: boolean;
    color?: IColorSchema;
    recurring?: boolean;
    STDATE?: Date;
    DTEND?: Date;
    RRULE?: string | IRRULEObject;
    EXDATE?: Date[];
    section?: TID;
    [key: string]: any;
}
interface ICalendar {
    id: TID;
    label: string;
    active: boolean;
    color?: IColorSchema;
    readonly?: boolean;
}
 type TDatepickerConfig = {
    current: Date;
    markers: (d: Date) => string;
};
interface IRRULEObject {
    FREQ?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
    INTERVAL?: number;
    BYDAY?: string[];
    BYMONTH?: number;
    BYMONTHDAY?: number;
    BYSETPOS?: number;
    UNTIL?: Date;
    COUNT?: number;
    EXDATE?: Date[];
    weekDays?: IWeekDays;
    [key: string]: any;
}
 type IWeekDays = {
    id: string;
    name: string;
    index: number;
    fullName: string;
}[];
interface IWeekConfig extends IBaseViewConfig {
    timeRange?: [number, number];
    timeStep?: number;
    eventsOverlay?: false;
    eventMargin?: string;
    columnPadding?: string;
    weekStartsOn?: number;
}
interface IMonthConfig extends IBaseViewConfig {
    weekStartsOn?: number;
    maxEventsPerCell?: number;
}
interface ITimelineHeader {
    unit: string;
    format: string;
    step: number;
}
interface ITimelineConfig extends IBaseViewConfig {
    colsCount?: number;
    colsWidth?: number;
    minEventWidth?: number;
    minSectionHeight?: number;
    sectionWidth?: number;
    getBounds?: (date: Date, config: ITimelineConfig) => [Date, Date];
    getNext?: (date: Date, config: ITimelineConfig) => Date;
    getPrev?: (date: Date, config: ITimelineConfig) => Date;
    step?: [number, "day" | "week" | "month" | "year" | "hour" | "minute"];
    header?: ITimelineHeader[];
    sections?: ISection[];
    key?: string;
    unassignedCol?: boolean;
}
interface ISection {
    id: TID;
    label?: string;
    [key: string]: any;
}

 class DataStore extends Store<IData> {
    in: EventBus<TMethodsConfig>;
    private _router;
    private _registeredViews;
    constructor(w: TWritableCreator);
    init(state: Partial<IDataConfig>): void;
    setState(state: Partial<IData>, ctx?: TDataConfig): void;
    normalizeState(): void;
}
interface IDataMethodsConfig {
    ["set-date"]: {
        value: Date;
    };
    ["set-mode"]: {
        value: string;
    };
    ["set-bound"]: {
        step: number;
    };
    ["add-event"]: {
        event: IEventData;
    };
    ["delete-event"]: {
        id: TID$1;
    };
    ["update-event"]: {
        event: IEventData;
        id: TID$1;
    };
    ["update-calendar"]: {
        calendar: ICalendar;
        id: TID$1;
    };
    ["add-calendar"]: {
        calendar: ICalendar;
    };
    ["delete-calendar"]: {
        id: TID$1;
    };
    ["toggle-sidebar"]: {
        show: boolean;
    } | null;
    ["select-event"]: {
        id: TID$1;
        popup?: boolean;
    };
    ["edit-event"]: {
        id?: TID$1;
        add?: IEventData | Record<string, never>;
    } | null;
    ["close-event-info"]: null;
}

 const defaultColors: IColorSchema[];
 const defaultCalendars: ICalendar[];
 const defaultEditorShape: TEditorShape[];

 const en: any;

 const de: any;

 const ru: any;

 function uid(): string;

 class Events {
    private _api;
    constructor(api: IApi);
    on<K extends keyof TMethodsConfig>(event: K, callback: (config: TMethodsConfig[K]) => any): void;
    exec<K extends keyof TMethodsConfig>(event: K, data: TMethodsConfig[K]): void;
}

 type IEventTemplate = (event: IEventData, calendar: ICalendar) => string;
 type ITheme = "willow" | "material" | "willowDark";
interface ISchedulerConfig extends Partial<IDataConfig> {
    locale?: typeof en;
    theme?: ITheme;
    templates?: {
        monthEvent?: IEventTemplate;
        weekEvent?: IEventTemplate;
        multievent?: IEventTemplate;
        popup?: IEventTemplate;
        header?: (date: Date, dateFormat: string) => string;
    };
}
 class EventCalendar {
    api: IApi;
    events: Events;
    config: ISchedulerConfig;
    container: HTMLElement;
    private _widget;
    constructor(container: HTMLElement, config: ISchedulerConfig);
    destructor(): void;
    setConfig(config: Partial<ISchedulerConfig>): void;
    parse(data: IEventData[] | {
        events: IEventData[];
        calendars: ICalendar[];
    }): void;
    serialize(): {
        events: IEventData[];
        calendars: ICalendar[];
    };
    addEvent(config: TMethodsConfig["add-event"]): void;
    deleteEvent(config: TMethodsConfig["delete-event"]): void;
    updateEvent(config: TMethodsConfig["update-event"]): void;
    updateCalendar(config: TMethodsConfig["update-calendar"]): void;
    addCalendar(config: TMethodsConfig["add-calendar"]): void;
    deleteCalendar(config: TMethodsConfig["delete-calendar"]): void;
    getCalendar(config: {
        id: TID;
    }): any;
    toggleSidebar(config?: TMethodsConfig["toggle-sidebar"]): void;
    setMode(config: TMethodsConfig["set-mode"]): void;
    setDate(config: TMethodsConfig["set-date"]): void;
    showEventInfo(config: {
        id: TID;
    }): void;
    hideEventInfo(): void;
    createEvent(): void;
    openEditor(config: {
        id: TID;
    }): void;
    closeEditor(): void;
    getState(): any;
    getEvent(config: {
        id: TID;
    }): any;
    setLocale(locale: typeof en): void;
    setTheme(theme: ITheme): void;
    private _init;
    private _configToProps;
}

 class RestDataProvider extends EventBus<TMethodsConfig> {
    private _url;
    private _queue;
    constructor(url?: string);
    getEvents(): Promise<IEventData[]>;
    getCalendars(): Promise<IEventData[]>;
    protected getHandlers(handlers: Partial<Record<keyof TMethodsConfig, any>>): Partial<Record<keyof TMethodsConfig, any>>;
    protected send<T>(url: string, method: string, data?: any, customHeaders?: any): Promise<T>;
    protected parseEvents(data: any[]): any[];
}

export { EventCalendar, RestDataProvider, de, defaultCalendars, defaultColors, defaultEditorShape, en, ru, uid };
}