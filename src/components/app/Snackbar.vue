<template>
  <v-snackbar
    v-model="visibility"
    top
    right
  >
    {{ text }}

    <v-btn
      color="primary"
      text
      dark
      @click="visibility = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    name: "Snackbar",
    props: ['text'],
    computed: {
      visibility: {
        get() {
          return this.text.length !== 0;
        },
        set(val) {
          return val;
        }
      }
    }
  }
</script>
