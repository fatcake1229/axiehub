<template>
  <div>
    <v-alert
      v-model="alert"
      dismissible
      :color="color"
      border="left"
      elevation="2"
      colored-border
      :icon="icon"
      class="glasseffect"
    >
      You've got <strong v-if="highlight != ''">{{highlight}}</strong> pending axies.
    </v-alert>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        alert: true,
      }
    },
    props:[
        'icon',
        'title',
        'message',
        'highlight',
        'color'
    ]
  }
</script>


<style lang="scss" scoped>
    .glasseffect{
        backdrop-filter: blur(17px) saturate(132%);
        -webkit-backdrop-filter: blur(17px) saturate(132%);
        background-color: rgba(40, 43, 57, 0.76);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.125);

    }
</style>