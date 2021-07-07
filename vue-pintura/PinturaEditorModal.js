import { openEditor, dispatchEditorEvents } from 'pintura';

export default {
    methods: {
        show() {
            this.editor.show();
        },

        hide() {
            this.editor.hide();
        },
    },

    mounted() {
        // create editor
        this.editor = openEditor(this.$attrs);

        // listen for editor events and propagate to component
        this.unsubs = dispatchEditorEvents(this.editor, (type, value) => {
            this.$emit(`pintura:${type}`, value);
        });

        // observe prop changes
        this.unwatch = this.$watch('$attrs', () => {
            console.log('update', this.$attrs);
            Object.assign(this.editor, this.$attrs);
        });
    },

    beforeDestroy() {
        if (!this.editor) return;
        this.unsubs.forEach((unsub) => unsub());
        this.unsubs = [];
        this.unwatch();
        this.editor = undefined;
    },

    render(h) {
        return h('div', { ref: 'elementRef' });
    },
};
