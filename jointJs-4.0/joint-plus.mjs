// joint namespaces which are enhanced by joint-plus:
import {
    shapes as shapesJoint,
    layout as layoutJoint,
    elementTools as elToolsJoint,
    dia as diaJoint
} from '@joint/core';

// joint shapes namespaces:
const standardJoint = shapesJoint.standard;

// joint-plus shapes namespaces:
import * as standardRappid from './packages/joint-shapes-record/record.mjs';
import * as bpmn2 from './packages/joint-shapes-bpmn2/bpmn2.mjs';
import * as chart from './packages/joint-shapes-chart/chart.mjs';
import * as measurement from './packages/joint-shapes-measurement/measurement.mjs';

// joint-plus enhancements to joint namespaces:
// - layout:
import { ForceDirected } from './packages/joint-layout-force-directed/ForceDirected.mjs';
import { GridLayout } from './packages/joint-layout-grid/GridLayout.mjs';
import { StackLayout } from './packages/joint-layout-stack/StackLayout.mjs';
import { TreeLayout } from './packages/joint-layout-tree/TreeLayout.mjs';
const layoutRappid = {
    ForceDirected,
    GridLayout,
    StackLayout,
    TreeLayout
}

// - elementTools:
import { RecordScrollbar } from './packages/joint-shapes-record-scrollbar/RecordScrollbar.mjs';
import { SwimlaneBoundary } from './packages/joint-shapes-bpmn2-swimlane-boundary/SwimlaneBoundary.mjs';
import { SwimlaneTransform } from './packages/joint-shapes-bpmn2-swimlane-transform/SwimlaneTransform.mjs';
const elToolsRappid = {
    RecordScrollbar,
    SwimlaneBoundary,
    SwimlaneTransform
};

// - dia:
import { CommandManager } from './packages/joint-command-manager/CommandManager.mjs';
import { Validator } from './packages/joint-validator/Validator.mjs';
const diaRappid = {
    CommandManager,
    Validator
}

// collect all members of joint-plus namespaces:
// - ui:
import { Clipboard } from './packages/joint-clipboard/Clipboard.mjs';
import { ColorPalette } from './packages/joint-color-palette/ColorPalette.mjs';
import { ContextToolbar } from './packages/joint-context-toolbar/ContextToolbar.mjs';
import { Dialog } from './packages/joint-dialog/Dialog.mjs';
import { FlashMessage } from './packages/joint-flash-message/FlashMessage.mjs';
import { FreeTransform } from './packages/joint-free-transform/FreeTransform.mjs';
import { Halo } from './packages/joint-halo/Halo.mjs';
import { Inspector } from './packages/joint-inspector/Inspector.mjs';
import { Keyboard } from './packages/joint-keyboard/Keyboard.mjs';
import { Lightbox } from './packages/joint-lightbox/Lightbox.mjs';
import { Navigator } from './packages/joint-navigator/Navigator.mjs';
import { PaperScroller } from './packages/joint-paper-scroller/PaperScroller.mjs';
import { PathDrawer } from './packages/joint-path-drawer/PathDrawer.mjs';
import { PathEditor } from './packages/joint-path-editor/PathEditor.mjs';
import { Popup } from './packages/joint-popup/Popup.mjs';
import { RadioGroup } from './packages/joint-radio-group/RadioGroup.mjs';
import { SelectBox } from './packages/joint-select-box/SelectBox.mjs';
import { SelectButtonGroup } from './packages/joint-select-button-group/SelectButtonGroup.mjs';
import { Selection } from './packages/joint-selection/Selection.mjs';
import { Snaplines } from './packages/joint-snaplines/Snaplines.mjs';
import { StackLayoutView } from './packages/joint-layout-stack-view/StackLayoutView.mjs';
import { Stencil } from './packages/joint-stencil/Stencil.mjs';
import { TextEditor } from './packages/joint-text-editor/TextEditor.mjs';
import { Toolbar } from './packages/joint-toolbar/Toolbar.mjs';
import { Tooltip } from './packages/joint-tooltip/Tooltip.mjs';
import { TreeLayoutView } from './packages/joint-layout-tree-view/TreeLayoutView.mjs';
import { Widget } from './packages/joint-widget/Widget.mjs';
import { widgets } from './packages/joint-toolbar-widgets/widgets.mjs';

// - graphUtils:
import {
    constructTree,
    shortestPath,
    toAdjacencyList
} from './packages/joint-graph-utils/index.mjs';

// - storage:
import { Local } from './packages/joint-storage-local/Local.mjs';

// - alg:
import { Dijkstra } from './packages/joint-dijkstra/dijkstra.mjs';
import { PriorityQueue } from './packages/joint-priority-queue/PriorityQueue.mjs';

// - format:
import * as formatSVG from './packages/joint-format-svg/svg.mjs';
import * as formatRaster from './packages/joint-format-raster/raster.mjs';
import { toCellsArray } from './packages/joint-format-gexf/gexf.mjs';
import { print } from './packages/joint-print/print.mjs';

import { util } from '@joint/core';

// combine joint namespaces with joint-plus enhancements:
// - layout:
export const layout = util.assign({}, layoutJoint, layoutRappid);

// - elementTools:
export const elementTools = util.assign({}, elToolsJoint, elToolsRappid);

// - shapes.standard:
const standard = util.assign({}, standardJoint, standardRappid);

// - shapes = combined shapes.standard + joint shapes + joint-plus shapes:
export const shapes = {
    standard,
    bpmn2,
    chart,
    measurement
};

// - dia:
export const dia = util.assign({}, diaJoint, diaRappid);

// joint-plus special variable:
export * from './build/versionPlus.mjs';

// joint own namespaces (joint core) = re-export:
export { util };
export {
    setTheme,
    config,
    env,
    anchors,
    linkAnchors,
    connectionPoints,
    connectionStrategies,
    connectors,
    highlighters,
    mvc,
    routers,
    linkTools,
    version,
    Vectorizer,
    V,
    g
} from '@joint/core';

// assemble joint-plus namespaces:
// - ui:
export const ui = {
    Clipboard,
    ColorPalette,
    ContextToolbar,
    Dialog,
    FlashMessage,
    FreeTransform,
    Halo,
    Inspector,
    Keyboard,
    Lightbox,
    Navigator,
    PaperScroller,
    PathDrawer,
    PathEditor,
    Popup,
    RadioGroup,
    SelectBox,
    SelectButtonGroup,
    Selection,
    Snaplines,
    StackLayoutView,
    Stencil,
    TextEditor,
    Toolbar,
    Tooltip,
    TreeLayoutView,
    Widget,
    widgets
};

// - graphUtils:
export const graphUtils = {
    constructTree,
    shortestPath,
    toAdjacencyList
};

// - storage:
export const storage = {
    Local
};

// - alg:
export const alg = {
    Dijkstra,
    PriorityQueue
};

// - format:
export const format = Object.assign({},
    formatSVG,
    formatRaster,
    { gexf: { toCellsArray }},
    { print }
);
