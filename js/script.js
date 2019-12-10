var tipoSimbolo = -1;
var dificuldade = 0;

function escolhaDificuldade(valorDificuldade) {
    dificuldade = valorDificuldade;

    if (valorDificuldade == 1) {
        alert("DIFCULDADE FÁCIL SELECIONADA, BOA SORTE!");
    } else if (valorDificuldade == 2) {
        alert("DIFCULDADE MÉDIA SELECIONADA, BOA SORTE!");
    } else {
        alert("DIFCULDADE DIFÍCIL SELECIONADA, BOA SORTE! (SÉRIO VOCÊ VAI PRECISAR)");
    }

    tipoSimbolo = 0;

    var i;
    for (i = 1; i <= 9; i++) {
        document.getElementById("q" + i).innerHTML = "";
    }
}

function jogada(quadrado) {
    if (tipoSimbolo == -1) {
        alert("SELECIONE UMA DIFICULDADE");
    } else {
        let idDiv = "q" + quadrado;
        var elementoQuadrado = document.getElementById(idDiv);

        if (!(elementoQuadrado.innerHTML == "x" || elementoQuadrado.innerHTML == "o")) {
            let simbolo = "";
            if (tipoSimbolo == 0) {
                simbolo = "x";
                tipoSimbolo = 1;
            } else if (tipoSimbolo == 1) {
                simbolo = "o";
                tipoSimbolo = 0;
            }

            elementoQuadrado.innerHTML = simbolo;
            verificaVencedor();
        }
    }


}

function verificaVencedor() {
    var q = new Array(10);

    var i;
    var mensagem = "";
    for (i = 1; i <= 9; i++) {
        q[i] = document.getElementById("q" + i).innerHTML;
        mensagem = mensagem + q[i];
    }

    alert(mensagem);
}