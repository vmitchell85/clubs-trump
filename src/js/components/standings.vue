<template>
  <div class="standings">
      <div class="card">
          <div class="card-header">
              <div class="card-header-title">Standings</div>
          </div>
          <div class="card-content">
              <div class="flex fdc">
                  <div class="player" v-for="(player, index) in sorted_players" :key="player.name">
                      <div class="frame">
                          <div class="blk sm-blk2">
                              {{index + 1}}
                          </div>
                          <div class="blk sm-blk10">
                              {{player.name}}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
      players: Array
  },
  computed: {
      sorted_players() {
          return [...this.players].sort((a,b) => b.score - a.score);
      }
  }
}
</script>
