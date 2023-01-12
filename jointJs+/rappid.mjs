import {
    standard as standardJoint,
    uml,
    pn,
    fsa,
    erd,
    logic,
    chess,
    org,
    devs,
    basic
} from 'jointjs/src/shapes/index.mjs';
import { standard as standardRappid, bpmn, bpmn2, chart, measurement } from './plugins/shapes/index.mjs';

import * as layoutJoint from 'jointjs/src/layout/index.mjs';
import * as layoutRappid from './plugins/layout/index.mjs';
import * as elToolsJoint from 'jointjs/src/elementTools/index.mjs';
import * as elToolsRappid from './plugins/elementTools/index.mjs';
import * as ui from './plugins/ui/index.mjs';
import * as graphUtils from './plugins/graphUtils/index.mjs';
import * as storage from './plugins/storage/index.mjs';
import * as alg from './plugins/alg/index.mjs';
import * as format from './plugins/format/index.mjs';
import { util } from 'jointjs/src/core.mjs';

import { dia as diaJoint } from 'jointjs/src/core.mjs';
import * as diaRappid from './plugins/dia/index.mjs';

export const layout = util.assign({}, layoutJoint, layoutRappid);
export const elementTools = util.assign({}, elToolsJoint, elToolsRappid);
const standard = util.assign({}, standardJoint, standardRappid);
export const shapes = { standard, uml, pn, fsa, erd, logic, chess, org, devs, basic, bpmn, bpmn2, chart, measurement };
export const dia = util.assign({}, diaJoint, diaRappid);
export * from './build/versionRappid.mjs';

// joint core
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
} from 'jointjs/src/core.mjs';

export { ui, storage, alg, format, util, graphUtils }
