<template>
    <div class="clubs-trump mh3">
        <div class="frame">
            <div class="blk">
                <standings :players="players"></standings>
            </div>
            <div class="blk">asdf</div>
            <div class="blk">asdf</div>
            <div class="blk">fdas</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                players: [{
                    name: "Player 1",
                    score: 50,
                    history: [],
                    current_bid: null
                },{
                    name: "Player 2",
                    score: 100,
                    history: [],
                    current_bid: null
                },{
                    name: "Player 3",
                    score: 10,
                    history: [],
                    current_bid: null
                }]
            }
        }
    }
</script>
