const vm = new Vue({
    el: '#app',
    data: {
        topLeft : false,
        topRight : false,
        bottomLeft : false,
        bottomRight : false,
        squareMapping: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        sequence: [],
        tmp: [],
    },
    computed: {
        score() {
            const value = this.sequence.length - 1;
            return (value < 0) ? `Score : 0` : `Score : ${value}`;
        }
    },
    methods: {
        newGame() {
            this.sequence = [];
            this.nextTurn();    
        },
        nextTurn() {
            this.addElemToSequence();
            this.disableAllSquare();
            this.playSequence(this.tmp[0]);
        },
        addElemToSequence() {
            this.sequence.push(this.squareMapping[Math.floor(Math.random() * 4)]);
            this.tmp = this.sequence.slice();
        },
        disableAllSquare() {
            this.topLeft = this.topRight = this.bottomLeft = this.bottomRight = false;
        },
        playSequence(square) {
            setTimeout(() => {
                vm[square] = true;
                setTimeout(() => {
                  vm.disableAllSquare();
                  vm.tmp.shift();
                  if (vm.tmp[0]) {
                    vm.playSequence(vm.tmp[0]);
                  } else {
                    vm.tmp = vm.sequence.slice();
                  }
                }, 250);
              }, 500);
        },
        clickSquare(square) {
            if (square === this.tmp[0]) {
                vm[square] = true;
                setTimeout(() => {
                  vm.disableAllSquare();
                  vm.tmp.shift();
                  if (!vm.tmp[0]) {
                        vm.nextTurn();
                    }
                }, 250);
            } else {
                alert(
                    'Perdu ! \n' +
                    'Score : ' + this.score
                );
            }
        },
    }
});