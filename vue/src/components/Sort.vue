<template>
    <div class="thead-link" :class="search.sort == field ? search.sort_by : ''" @click="sort()">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: ['field', 'search'],
    emits: ['sort'],
    computed: {},
    methods: {
        sort: function () {
            if(this.search.sort == this.field) {
                switch (this.search.sort_by) {
                    case null:
                        this.search.sort_by = 'asc'
                        break;
                    case 'asc':
                        this.search.sort_by = 'desc'
                        break;
                    default:
                        this.search.sort = null
                        this.search.sort_by = null
                        break;
                }
            } else {
                this.search.sort_by = 'asc'
            }
            this.search.sort = this.field
            if(this.search.sort_by == null) {
                this.search.sort = null
            }
            this.$emit('sort');
        }
    }
}
</script>