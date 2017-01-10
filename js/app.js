var Vue = new Vue({
    el: '#app',
    data: {
        players: [],
        view: 'start'
    },
    computed: {
        sorted_players: function(){
            return this.players.sort(this.sortStandings).reverse();
        },
        totalBids: function(){
            return this.players.sum('bid');
        }
    },
    methods: {
        setPlayers: function(count){
            for (var i = 0; i < count; i++) {
               this.addPlayer();
            }
            this.setView('names');
        },
        addPlayer: function(){
           this.players.push({
                bid: null,
                bid_error: false,
                failed_bid: null,
                name: null,
                score: 0,
            });
        },
        setView: function(value){
            this.view = value;
        },
        madeBid: function(player){
            player.score += parseInt(player.bid) + 10;
            player.bid = null;
            player.failed_bid = null;
        },
        failedBid: function(player, index){
            if( player.bid == player.failed_bid ){
                player.bid_error = true;
                return false;
            }
            player.bid_error = false;
            player.score += parseInt(player.failed_bid);
            player.bid = null;
            player.failed_bid = null;

        },
        newGame: function(){
            this.setView('start');
            this.players = [];
        },
        sortStandings: function(a,b) {
            if (a.score < b.score)
                return -1;
            if (a.score > b.score)
                return 1;
            return 0;
        }
    },
    filters: {
        getInitials: function(name){
            if( name ) {
                var array = name.split( ' ' );
                switch ( array.length ) {
                    case 1:
                        return array[0].charAt(0).toUpperCase();
                        break;
                    default:
                        return array[0].charAt(0).toUpperCase() + array[ array.length -1 ].charAt(0).toUpperCase();
                }
            }
            return '?';
        }
    }
});

Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}