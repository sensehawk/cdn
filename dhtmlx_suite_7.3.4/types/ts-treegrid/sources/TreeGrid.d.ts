import { GridEvents, IAdjustBy, IEventHandlersMap, ProGrid, ICellRect, IRow, ICol, IColumnsWidth } from "../../ts-grid";
import { IEventSystem } from "../../ts-common/events";
import { DataEvents, DragEvents, IDataEventsHandlersMap, IDragEventsHandlersMap, IDataItem } from "../../ts-data";
import { TreeGridCollection } from "./TreeGridCollection";
import { ITreeEventHandlersMap, ITreeGrid, ITreeGridConfig, TreeGridEvents } from "./types";
import { Id } from "../../ts-common/types";
export declare class TreeGrid extends ProGrid implements ITreeGrid {
    data: TreeGridCollection;
    events: IEventSystem<DataEvents | GridEvents | DragEvents | TreeGridEvents, IEventHandlersMap & IDataEventsHandlersMap & IDragEventsHandlersMap & ITreeEventHandlersMap>;
    private _pregroupData;
    constructor(container: HTMLElement, config: ITreeGridConfig);
    scrollTo(rowId: Id, colId: Id): void;
    expand(rowId: Id): void;
    collapse(rowId: Id): void;
    expandAll(): void;
    collapseAll(): void;
    groupBy(property: string | ((item: IDataItem) => string)): void;
    ungroup(): void;
    showRow(rowId: Id): void;
    hideRow(rowId: Id): void;
    getCellRect(rowId: Id, colId: Id): ICellRect;
    protected _adjustColumnsWidth(rows: IRow[], cols: ICol[], adjust?: IAdjustBy): IColumnsWidth;
    protected _createCollection(prep: (data: any[]) => any[]): void;
    protected _getRowIndex(rowId: Id): number;
    protected _setEventHandlers(): void;
    private _groupBy;
    private _serialize;
}
