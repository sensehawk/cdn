import { appendEditor, dispatchEditorEvents } from 'pintura';

export default {
    mounted() {
        // create editor
        this.editor = appendEditor(this.$refs.elementRef, this.$attrs);

        // listen for editor events and propagate to component
        this.unsubs = dispatchEditorEvents(this.editor, (type, value) => {
            this.$emit(`pintura:${type}`, value);
        });

        // observe prop changes
        this.unwatch = this.$watch('$attrs', () => Object.assign(this.editor, this.$attrs));
    },

    beforeDestroy() {
        if (!this.editor) return;
        this.editor.destroy();
        this.unsubs.forEach((unsub) => unsub());
        this.unsubs = [];
        this.unwatch();
        this.editor = undefined;
    },

    render(h) {
        return h('div', { attrs: { class: 'PinturaRootWrapper' }, ref: 'elementRef' });
    },
};
