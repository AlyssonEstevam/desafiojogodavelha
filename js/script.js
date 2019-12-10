//Variável que define se o simbolo a se colocar será 'X' ou 'O'.
var tipoSimbolo = -1;
var dificuldade = -1;

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
    if (tipoSimbolo == -1) {
        alert("SELECIONE UMA DIFICULDADE");
    } else {
        let idDiv = "q" + quadrado;
        var elementoQuadrado = document.getElementById(idDiv);

        //Se o quadrado estiver disponível, selecioa o símbolo adequado e o coloca no espaço clicado.
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

            colorirTabuleiro(verificaVencedor());
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
    var mensagem = "";
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