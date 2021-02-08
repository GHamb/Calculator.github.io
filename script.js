// definição de variaveis globais

var contador = 0;

var num_ant;

var adiciona_numero = true; //variavel que diz se é o primeiro numero da operação atual

var opr;

var hist;

var equal;

//

// busca pelos seletores

const tela = $("#atpr");

const historico = $("#anpr");

const Num_btns = document.querySelectorAll("[id*=btn]");

const Op_btns = document.querySelectorAll("[id*=op]");

//

//--------------------------------------- funções --------------------------------------------

// insere numeros na tela

const insercao = (eventos) => Atualiza_tela(eventos.target.textContent)


// Atualiza_tela, ela atualiza as divisões na parte front-end 

const Atualiza_tela = (conteudo) => {
    contador++

    if (adiciona_numero) {
        tela.text(conteudo);
        adiciona_numero = false;
    }
    else {
        tela.append(conteudo);
        if (contador >= 9) {
            $("#span").show();
            setTimeout(() => {
                $("#span").hide()
            }, 1200);
            tela.text("");
            adiciona_numero = true;
            contador = 0;
        }

    }



}
//

// função de cálculo que faz as operações

const calculo = () => {
    if (op_aberta()) {
        const num_at = parseFloat(tela.text())
        adiciona_numero = true;
        switch (opr) {

            case "+":
                Atualiza_tela(hist = (num_ant + num_at));
                $('#anpr').text(hist);
                break

            case "-":
                Atualiza_tela(hist = (num_ant - num_at));
                $('#anpr').text(hist);
                break

            case "*":
                Atualiza_tela(hist = (num_ant * num_at));
                $('#anpr').text(hist);
                break

            case "/":
                Atualiza_tela(hist = Math.round(num_ant / num_at));
                $('#anpr').text(hist);
                break
        }

    }
}
//


// função de callback de seleção de operação

const selecao_op = (evento) => {
    contador = 0
    if (!adiciona_numero && evento.target.textContent != "=" && evento.target.textContent != "+/-") {
        adiciona_numero = true;
        opr = evento.target.textContent
        num_ant = parseFloat(tela.text())
    }
}

//

//função que verifica se a operação está undefined

const op_aberta = () => opr != undefined;

//

//função de callback para ativar botão de igual

const AtivaEq = () => {
    calculo()
    opr = undefined

}

//

// seletor de igual e chamada da função de callback

document.getElementById("equal").addEventListener("click", AtivaEq);

//

// seletor e função de limpeza total

const limpa_tudo = () => {
    limpa_numero_atual();
    adiciona_numero = true;
    num_ant = undefined;
    opr = undefined;
    historico.text('')
    tela.text('0')

}

document.getElementById("clall").addEventListener('click', limpa_tudo)

//

// seletor e função de limpeza de tela

const limpa_numero_atual = () => {
    tela.text("")
    adiciona_numero = true
}
document.getElementById("cl").addEventListener('click', limpa_numero_atual)

//

// seletor e função de inversão de sinal

const sinal_inverso = () => {
    adiciona_numero = true;
    Atualiza_tela(tela.text() * -1);

};


document.getElementById("inv").addEventListener('click', sinal_inverso)
//

//for each para seleção de numeros e operações 

Num_btns.forEach(btn_num =>
    btn_num.addEventListener("click", insercao)
);

Op_btns.forEach(op_btn =>
    op_btn.addEventListener("click", selecao_op)
);

//