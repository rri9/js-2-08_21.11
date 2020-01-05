import cartItem from "./cartItem";
import cartEmpty from "./cartEmpty";
import search from "./search";

let cart = {
  data: function() {
    return {
      urlBasketData: "./getBasket.json",
      urlBasketChange: "./changeItemsInCart.json",
      imageCart: "https://placehold.it/100x80",
      isVisible: false,
      vItems: [],
      amount: 0,
      countGoods: 0,
    };
  },
  methods: {
    toggleCartVisibility() {
      this.isVisible = !this.isVisible;
    },
    fetchDataToCart() {
      this.$root.getJson(this.urlBasketData).then(data => {
        this.vItems = data.contents;
        this.amount = data.amount;
        this.countGoods = data.countGoods;
      });
    },
    changeItemsInCart(event) {
      this.$root.postReq(this.urlBasketChange, event.target).then(
        data => {
          if (data.result == 1) {
            this.vItems = data.cart.contents;
            this.amount = data.cart.amount;
            this.countGoods = data.cart.countGoods;
          } else if (data.result == 0) {
            console.log(`Error ${event.target.id}: ${data.error}`);
          }
        },
        error => console.log(`${event.target.id} error= ${error}`)
      );
    },
    getItemInCartById(id) {
      let find = this.vItems.find(item => +item.id === id);
      return find;
    },
  },
  mounted() {
    this.fetchDataToCart();
  },
  template: `
  <div class="cart">
    <search></search>
    <button class="btn-cart" type="button" @click="toggleCartVisibility">Корзина</button>
    <div class="cart-block" v-show="this.isVisible">
        <template v-if="vItems.length > 0">
          <cart-item class="cart-item" v-for="item in vItems" :item="item" :img="imageCart" :key="item.id">
          </cart-item>
          <div class=cart-block__total>
            Total: {{this.amount}} руб. за {{this.countGoods}} товара/ов
          </div>
        </template>
        <cart-empty v-else>Cart is empty</cart-empty>
    </div>
  </div>
  `,
  components: {
    "cart-item": cartItem,
    "cart-empty": cartEmpty,
    search,
  },
};

export default cart;