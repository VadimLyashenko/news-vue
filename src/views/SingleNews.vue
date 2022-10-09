<template>
  <header class="header__container header">
    <router-link :to="{ name: 'news'}">Back</router-link>
  </header>
  <main in class="single_news__container">
    <div class="big-preview">
      <div class="big-preview__img">
        <img :src="single_news.img" alt="">
      </div>
      <div class="big-preview__content">
        <div class="big-preview__content-top">
          <i class="big-preview__icon-pen icon-pen"></i><span class="big-preview__author">{{ single_news.name }}</span>
          <i class="big-preview__icon-calendar icon-calendar"></i><span class="big-preview__date">{{ single_news.date }}</span>
        </div>
        <span class="big-preview__headline">{{ single_news.title }}</span>
        <p class="big-preview__description">{{ single_news.body }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  date () {
    return {
      id: null
    }
  },
  mounted () {
    this.id = this.getID()
    this.getSingleNews({
      "id": this.id
    });
  },
  unmounted() {
    this.clearSingleNews()
  },
  computed: {
    ...mapGetters({
      single_news: 'SINGLE_NEWS'
    })
  },
  methods: {
    ...mapActions({
      getSingleNews: 'GET_SINGLE_NEWS',
      clearSingleNews: 'CLEAR_SINGLE_NEWS'
    }),
    getID () {
      return this.$route.params.singe_news.split("-").reverse()[0]
    },
    goToNews () {
      this.router.push({ name: 'user', params: { username: 'erina' } })
    }
  }

}
</script>