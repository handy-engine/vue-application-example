<template>
  <div>
    <h1>Handy Engine</h1>
    <p>Hello!</p>
    <footer>{{updateTime}}</footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createTime: new Date()
    };
  },
  computed: {
    updateTime() {
      return `${this.createTime.getFullYear()}-${this.createTime.getMonth() +
        1}-${this.createTime.getDate()}`;
    }
  }
};
</script>