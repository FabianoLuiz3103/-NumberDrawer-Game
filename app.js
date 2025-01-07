let btnReiniciar = document.getElementById('btn-reiniciar');
let numerosGerados = [];
let resultado = document.getElementById('resultado');

function sortear(){


    let quantidade = parseInt(document.getElementById('quantidade').value);
    let de = parseInt(document.getElementById('de').value);
    let ate = parseInt(document.getElementById('ate').value);

    if (isNaN(quantidade) || isNaN(de) || isNaN(ate)) {
        resultado.innerHTML = `<label class="texto__paragrafo_erro">ERRO! Todos os campos devem ser preenchidos com números válidos!</label>`;
        return;
    }

    if(isDeAteInvalid(de, ate)){
        erroContainer('de');
        erroContainer('ate');
        resultado.innerHTML = `<label class="texto__paragrafo_erro">ERRO! O NÚMERO INICIAL NÃO PODE SER MAIOR QUE O FINAL!</label>`
    } else if(isQuantidadeInvalid(quantidade, de, ate)){
        erroContainer('quantidade')
         resultado.innerHTML = `<label class="texto__paragrafo_erro">ERRO! A QUANTIDADE DE NÚMEROS NÃO PODE SER MAIOR QUE O INTERVALO (INI-FIM)</label>`
    }
    else {
        normalContainer('quantidade');
        normalContainer('de');
        normalContainer('ate');
        exibirResultado(gerarNumeros(quantidade, de, ate));
        alterarStatusBotao();
    }
}


function isDeAteInvalid(ini, fim) {
    return ini > fim;
}

function isQuantidadeInvalid(qtd, ini, fim) {
    return qtd > fim - ini + 1;
}


function normalContainer(tag){
    document.getElementById(tag).classList.remove('container__input_error');
    document.getElementById(tag).classList.add('container__input');
}

function erroContainer(tag){
    document.getElementById(tag).classList.remove('container__input');
    document.getElementById(tag).classList.add('container__input_error')
}


function alterarStatusBotao(){

    btnReiniciar.removeAttribute('disabled');

}

function gerarNumeros(qtd, ini, fim){


    let numeroSorteado;
    for(let i = 0; i < qtd; i++){
        numeroSorteado = Math.floor(Math.random() * (fim - ini + 1)) + ini;
        while(numerosGerados.includes(numeroSorteado)){
            numeroSorteado = Math.floor(Math.random() * (fim - ini + 1)) + ini;
        }
        numerosGerados.push(numeroSorteado);
    }
    return numerosGerados.sort(function(a,b){
        return (a-b);
    });
}


function exibirResultado(numeros){
    
    let textoResultado = numeros == null ? 'nenhum até agora' : numeros.toString()
    resultado.innerHTML = `<label class="texto__paragrafo">Números sorteados:  ${textoResultado}</label>`

}

function limparCampos(){
    document.getElementById('quantidade').value = null;
    document.getElementById('de').value = null;
    document.getElementById('ate').value = null;
}

function reiniciar(){

    limparCampos();
   btnReiniciar.setAttribute('disabled', true);
   numerosGerados = [];
   resultado.innerHTML = `<label class="texto__paragrafo">Números sorteados:  nenhum até agora</label>`
}

