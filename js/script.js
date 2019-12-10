//Variável que define se o simbolo a se colocar será 'X' ou 'O'.
var tipoSimbolo = 0;
var dificuldade = 0;

/*
Função chamada pelos botões de escolha de dificuldade
Realiza a alteração da dificuldade e o RESET do jogo
O parâmetro passado diz respeito a dificuldade selecionada, sendo:
    -> 0: Modo 2 Jogadores
    -> 1: Fácil
    -> 2: Média
    -> 3: Difícil
*/
function escolhaDificuldade(valorDificuldade) {
    dificuldade = valorDificuldade;

    if (valorDificuldade == 1) {
        alert("DIFCULDADE FÁCIL SELECIONADA, BOA SORTE!");
    } else if (valorDificuldade == 2) {
        alert("DIFCULDADE MÉDIA SELECIONADA, BOA SORTE!");
    } else if (valorDificuldade == 3) {
        alert("DIFCULDADE DIFÍCIL SELECIONADA, BOA SORTE! (SÉRIO VOCÊ VAI PRECISAR)");
    } else {
        alert("MODO 2 JOGADORES SELECIONADO!");
    }

    //Variável que define se o simbolo a se colocar será 'X' ou 'O'.
    tipoSimbolo = 0;

    colorirTabuleiro(10);

    var i;
    for (i = 1; i <= 9; i++) {
        document.getElementById("q" + i).innerHTML = "";
    }
}

/*
Função chamada pelas divs do tabuleiro do jogo, essa função adiciona ao tabuleiro o
símbolo correspondente ao jogador e chama a função de verificação de término de jogo.
O parâmetro passado informa qual quadrado foi selecionado para ser modificado.
*/
function jogada(quadrado) {
    var flag = 1;

    if (tipoSimbolo == -1) {
        alert("SELECIONE UMA DIFICULDADE");
    } else if (dificuldade == 0) {
        flag = realizaJogada(quadrado);
    } else {
        flag = realizaJogada(quadrado);
        if (tipoSimbolo != -1 && flag == 1) {
            jogadaBot();
        }
    }
}

/*
Função responsável por verificar o término da partida e retornar qual foi o critério vencedor, ou
se deu empate retornando que deu velha.
Os valores da variável de retorno seguem o seguinte padrão:
    -> 0: O jogo pode prosseguir
    -> 1: Vencedor na linha 1
    -> 2: Vencedor na linha 2
    -> 3: Vencedor na linha 3
    -> 4: Vencedor na Coluna 1
    -> 5: Vencedor na coluna 2
    -> 6: Vencedor na coluna 3
    -> 7: Vencedor na diagonal principal
    -> 8: Vencedor na diagonal secundária
    -> 9: O jogo deu empate (Velha)
*/
function verificaVencedor() {
    var q = new Array(10);

    var i;
    for (i = 1; i <= 9; i++) {
        q[i] = document.getElementById("q" + i).innerHTML;
    }

    var flag = 0,
        cont = 0,
        resultado = 0;
    var simboloSelecionado = "";

    //Verifica as 3 linhas e retorna o resultado de acordo com a regra descrita no cabeçalho da função.
    for (i = 1; i <= 9; i++) {
        if (i == 1 || i == 4 || i == 7) {
            if (q[i] == "x" || q[i] == "o") {
                simboloSelecionado = q[i];
            } else {
                simboloSelecionado = "*";
            }
            cont = 1;
            resultado++;
        } else {
            if (q[i] == simboloSelecionado) {
                cont++;
            } else {
                cont = 0;
            }
        }

        if (cont == 3) {
            flag = 1;
            break;
        }
    }

    if (flag == 1) {
        return resultado;
    }

    cont = 0, flag = 0;
    //Verifica as 3 colunas e retorna o resultado de acordo com a regra descrita no cabeçalho da função.
    for (i = 1; i <= 9; i += 3) {
        if (i == 1 || i == 2 || i == 3) {
            if (q[i] == "x" || q[i] == "o") {
                simboloSelecionado = q[i];
            } else {
                simboloSelecionado = "*";
            }
            cont = 1;
            resultado++;
        } else {
            if (q[i] == simboloSelecionado) {
                cont++;
            } else {
                cont = 0;
            }

            if (i == 7) {
                i = -1;
            } else if (i == 8) {
                i = 0;
            }
        }

        if (cont == 3) {
            flag = 1;
            break;
        }
    }

    if (flag == 1) {
        return resultado;
    }

    //Verifica a diagonal principal e retorna o resultado de acordo com a regra descrita no cabeçalho da função.
    resultado = 7;
    if (q[1] == q[5] && q[5] == q[9] && (q[9] == "x" || q[9] == "o")) {
        return resultado;
    }

    //Verifica a diagonal secundária e retorna o resultado de acordo com a regra descrita no cabeçalho da função.
    resultado = 8;
    if (q[3] == q[5] && q[5] == q[7] && (q[7] == "x" || q[7] == "o")) {
        return resultado;
    }

    //Verifica se deu velha, senão retorna 0
    resultado = 9;
    flag = 0;
    for (i = 1; i <= 9; i++) {
        if (!(q[i] == "x" || q[i] == "o")) {
            flag = 1;
            break;
        }
    }

    if (flag == 1) {
        return 0;
    } else {
        return resultado;
    }
}

function colorirTabuleiro(resultado) {
    switch (resultado) {
        case 0:
            break;
        case 1:
            tipoSimbolo = -1;
            document.getElementById("divQ1").style.background = "green";
            document.getElementById("divQ2").style.background = "green";
            document.getElementById("divQ3").style.background = "green";
            document.getElementById("titulo").style.color = "green";
            document.getElementById("titulo").innerHTML = "JOGADOR " + document.getElementById("divQ1").innerHTML + " VENCEU";
            break;
        case 2:
            tipoSimbolo = -1;
            document.getElementById("divQ4").style.background = "green";
            document.getElementById("divQ5").style.background = "green";
            document.getElementById("divQ6").style.background = "green";
            document.getElementById("titulo").style.color = "green";
            document.getElementById("titulo").innerHTML = "JOGADOR " + document.getElementById("divQ4").innerHTML + " VENCEU";
            break;
        case 3:
            tipoSimbolo = -1;
            document.getElementById("divQ7").style.background = "green";
            document.getElementById("divQ8").style.background = "green";
            document.getElementById("divQ9").style.background = "green";
            document.getElementById("titulo").style.color = "green";
            document.getElementById("titulo").innerHTML = "JOGADOR " + document.getElementById("divQ7").innerHTML + " VENCEU";
            break;
        case 4:
            tipoSimbolo = -1;
            document.getElementById("divQ1").style.background = "green";
            document.getElementById("divQ4").style.background = "green";
            document.getElementById("divQ7").style.background = "green";
            document.getElementById("titulo").style.color = "green";
            document.getElementById("titulo").innerHTML = "JOGADOR " + document.getElementById("divQ1").innerHTML + " VENCEU";
            break;
        case 5:
            tipoSimbolo = -1;
            document.getElementById("divQ2").style.background = "green";
            document.getElementById("divQ5").style.background = "green";
            document.getElementById("divQ8").style.background = "green";
            document.getElementById("titulo").style.color = "green";
            document.getElementById("titulo").innerHTML = "JOGADOR " + document.getElementById("divQ2").innerHTML + " VENCEU";
            break;
        case 6:
            tipoSimbolo = -1;
            document.getElementById("divQ3").style.background = "green";
            document.getElementById("divQ6").style.background = "green";
            document.getElementById("divQ9").style.background = "green";
            document.getElementById("titulo").style.color = "green";
            document.getElementById("titulo").innerHTML = "JOGADOR " + document.getElementById("divQ3").innerHTML + " VENCEU";
            break;
        case 7:
            tipoSimbolo = -1;
            document.getElementById("divQ1").style.background = "green";
            document.getElementById("divQ5").style.background = "green";
            document.getElementById("divQ9").style.background = "green";
            document.getElementById("titulo").style.color = "green";
            document.getElementById("titulo").innerHTML = "JOGADOR " + document.getElementById("divQ1").innerHTML + " VENCEU";
            break;
        case 8:
            tipoSimbolo = -1;
            document.getElementById("divQ3").style.background = "green";
            document.getElementById("divQ5").style.background = "green";
            document.getElementById("divQ7").style.background = "green";
            document.getElementById("titulo").style.color = "green";
            document.getElementById("titulo").innerHTML = "JOGADOR " + document.getElementById("divQ3").innerHTML + " VENCEU";
            break;
        case 9:
            tipoSimbolo = -1;
            document.getElementById("divQ1").style.background = "red";
            document.getElementById("divQ2").style.background = "red";
            document.getElementById("divQ3").style.background = "red";
            document.getElementById("divQ4").style.background = "red";
            document.getElementById("divQ5").style.background = "red";
            document.getElementById("divQ6").style.background = "red";
            document.getElementById("divQ7").style.background = "red";
            document.getElementById("divQ8").style.background = "red";
            document.getElementById("divQ9").style.background = "red";
            document.getElementById("titulo").style.color = "red";
            document.getElementById("titulo").innerHTML = "DEU VELHA";
            break;
        case 10:
            document.getElementById("divQ1").style.background = "white";
            document.getElementById("divQ2").style.background = "white";
            document.getElementById("divQ3").style.background = "white";
            document.getElementById("divQ4").style.background = "white";
            document.getElementById("divQ5").style.background = "white";
            document.getElementById("divQ6").style.background = "white";
            document.getElementById("divQ7").style.background = "white";
            document.getElementById("divQ8").style.background = "white";
            document.getElementById("divQ9").style.background = "white";
            document.getElementById("titulo").style.color = "black";
            document.getElementById("titulo").innerHTML = "# JOGO DA VELHA #";
            break;
    }
}

function realizaJogada(quadrado) {
    var idDiv = "q" + quadrado;
    var elementoQuadrado = document.getElementById(idDiv);

    //Se o quadrado estiver disponível, seleciona o símbolo adequado e o coloca no espaço clicado.
    if (!(elementoQuadrado.innerHTML == "x" || elementoQuadrado.innerHTML == "o")) {
        var simbolo;
        if (tipoSimbolo == 0) {
            simbolo = "x";
            tipoSimbolo = 1;
        } else if (tipoSimbolo == 1) {
            simbolo = "o";
            tipoSimbolo = 0;
        }

        elementoQuadrado.innerHTML = simbolo;

        var resultado = verificaVencedor();
        colorirTabuleiro(resultado);

        return 1;
    } else {
        return 0;
    }
}

function jogadaBot() {
    if (dificuldade == 1) {
        var i;
        for (i = 1; i <= 9; i++) {
            if (!(document.getElementById("q" + i).innerHTML == "x" || document.getElementById("q" + i).innerHTML == "o")) {
                var simbolo;
                if (tipoSimbolo == 0) {
                    simbolo = "x";
                    tipoSimbolo = 1;
                } else if (tipoSimbolo == 1) {
                    simbolo = "o";
                    tipoSimbolo = 0;
                }

                document.getElementById("q" + i).innerHTML = simbolo;
                break;
            }
        }
    } else if (dificuldade == 2) {
        if (!verificaCondicaoDeVitoria()) {
            var i;
            for (i = 1; i <= 9; i++) {
                if (!(document.getElementById("q" + i).innerHTML == "x" || document.getElementById("q" + i).innerHTML == "o")) {
                    var simbolo;
                    if (tipoSimbolo == 0) {
                        simbolo = "x";
                        tipoSimbolo = 1;
                    } else if (tipoSimbolo == 1) {
                        simbolo = "o";
                        tipoSimbolo = 0;
                    }

                    document.getElementById("q" + i).innerHTML = simbolo;
                    break;
                }
            }
        }
    }

    var resultado = verificaVencedor();
    colorirTabuleiro(resultado);
}

function verificaCondicaoDeVitoria() {
    var q = new Array(10);

    var i;
    for (i = 1; i <= 9; i++) {
        q[i] = document.getElementById("q" + i).innerHTML;
    }

    var idDiv;
    if (((q[2] == q[3] && q[2] == "x") || (q[4] == q[7] && q[4] == "x") || (q[5] == q[9] && q[5] == "x")) && !(q[1] == "o" || q[1] == "x")) {
        idDiv = "q1";
    } else if (((q[5] == q[8] && q[5] == "x") || (q[1] == q[3] && q[1] == "x")) && !(q[2] == "o" || q[2] == "x")) {
        idDiv = "q2";
    } else if (((q[1] == q[2] && q[1] == "x") || (q[5] == q[7] && q[5] == "x") || (q[6] == q[9] && q[6] == "x")) && !(q[3] == "o" || q[3] == "x")) {
        idDiv = "q3";
    } else if (((q[1] == q[7] && q[1] == "x") || (q[5] == q[6] && q[5] == "x")) && !(q[4] == "o" || q[4] == "x")) {
        idDiv = "q4";
    } else if (((q[1] == q[9] && q[1] == "x") || (q[2] == q[8] && q[2] == "x") || (q[3] == q[7] && q[3] == "x") || (q[4] == q[6] && q[4] == "x")) && !(q[5] == "o" || q[5] == "x")) {
        idDiv = "q5";
    } else if (((q[3] == q[9] && q[3] == "x") || (q[4] == q[5] && q[4] == "x")) && !(q[6] == "o" || q[6] == "x")) {
        idDiv = "q6";
    } else if (((q[3] == q[5] && q[3] == "x") || (q[1] == q[4] && q[1] == "x") || (q[8] == q[9] && q[8] == "x")) && !(q[7] == "o" || q[7] == "x")) {
        idDiv = "q7";
    } else if (((q[7] == q[9] && q[7] == "x") || (q[2] == q[5] && q[2] == "x")) && !(q[8] == "o" || q[8] == "x")) {
        idDiv = "q8";
    } else if (((q[3] == q[6] && q[3] == "x") || (q[1] == q[5] && q[1] == "x") || (q[7] == q[8] && q[7] == "x")) && !(q[9] == "o" || q[9] == "x")) {
        idDiv = "q9";
    } else {
        return 0;
    }

    document.getElementById(idDiv).innerHTML = "o";
    tipoSimbolo = 0;
    return 1;
}