var Vue = new Vue({
    el: '#app',
    data: {
        players: [],
        view: 'start'
    },
    computed: {
        sorted_players: function(){
            var players = JSON.parse(JSON.stringify(this.players));
            return players.sort(this.sortStandings).reverse();
        },
        totalBids: function(){

            var bidSum = this.players.sum('bid');

            if( bidSum !== parseInt(bidSum, 10) ){
                return false;
            }

            var players = JSON.parse(JSON.stringify(this.players));

            for( var entry in players ){
                var player = players[entry];
                if( isFunction(player) ){
                    break;
                }
                if( player.bid !== parseInt(player.bid, 10) ){
                    console.log(player);
                    return false;
                }
            }

            return this.players.sum('bid');
        }
    },
    methods: {
        setPlayers: function(count){
            for (var i = 0; i < count; i++) {
               this.addPlayer('Player ' + (i + 1));
            }
            this.setView('names');
        },
        addPlayer: function(name){
           this.players.push({
                bid: null,
                bid_error: false,
                failed_bid: null,
                name: name,
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
            player.bid_error = false;
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

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}