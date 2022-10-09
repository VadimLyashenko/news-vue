<template>
  <header class="header__container header">
    <button @click="updateNews">Update</button>
  </header>
  <main in class="news__container news" >
    <div class="preview" v-for="item in news" :key="item.id">
      <div class="preview__img">
        <img :src="item.img" alt="">
      </div>
      <div class="preview__content">
        <div class="preview__content-top">
          <span class="preview__author icon-pen">{{ item.name }}</span>
          <span class="preview__date icon-calendar">{{ item.date }}</span>
        </div>
        <router-link :to="{ name: 'single-news', params: { singe_news: item.url + '-' + item.id}}" class="preview__headline">{{ item.title }}</router-link>
        <p class="preview__description" v-snip="{ lines: 2 }">{{ item.body }}</p>
        <p class="preview__description">Рейтинг: {{ item.rating }}</p>
        <router-link :to="{ name: 'single-news', params: { singe_news: item.url + '-' + item.id}}" class="preview__link">Read More</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      page: 1
    }
  },
  mounted () {
    this.getNews({
      "orderBy": "date",
      "order":"desc",
      "p": 1,
      "l": 20
    });
    this.getNextNews();
  },
  unmounted () {
      this.clearNews();
  },
  computed: {
    ...mapGetters ({
      news: 'NEWS'
    })
  },
  methods: {
    ...mapActions({
      getNews: 'GET_NEWS',
      clearNews: 'CLEAR_NEWS',
    }),
    getNextNews() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.page += 1;
          this.getNews({
            "orderBy": "date",
            "order":"desc",
            "p": this.page,
            "l": 20
          });
        }
      }
    },
    updateNews() {
      this.page = 1;
      this.clearNews();
      this.getNews({
        "orderBy": "date",
        "order":"desc",
        "p": 1,
        "l": 20
      });
    }
  }
}
</script>