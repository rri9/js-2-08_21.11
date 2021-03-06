import catalogItem from './CatalogItem'

let catalog = {
    data () {
        return {
            catalogUrl: '/catalog',
            imgCatalog: 'https://placehold.it/200x150',
            items: []
        }
    },
    computed: {
        filteredItems() {
            let regExp = new RegExp(this.$root.$refs.filter.searchText, 'i')
            return this.items.filter(i => regExp.test(i.product_name))
        }
    },
    mounted () {
        this.$parent.getJson (this.catalogUrl)
            .then (data => this.items = data)
    },
    template: `
            <div class="products">
                <div v-show="filteredItems.length === 0">Нет данных</div>
                <catalog-item v-for="product of filteredItems" :key="product.id_product" :item="product" :imgProp="imgCatalog"></catalog-item>
            </div>
    `,
    components: {
        'catalog-item': catalogItem
    }
}

export default catalog