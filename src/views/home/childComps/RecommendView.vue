<template>
  <div class="recommend">
    <div v-for="item in recommends.list" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Object,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 14px;

    padding: 10px 0 20px;
    border-bottom: 8px solid #EEEEEE;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    /*width: 80px;*/
    /*height: 80px;*/
    width: 80%;
    margin-bottom: 5px;
  }
</style>
