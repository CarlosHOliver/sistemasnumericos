// Funções do conversor
let decimalInput, binarioInput, octalInput, hexadecimalInput, erroDiv;

// Funções para adicionar/remover listeners
const listenerDecimal = () => converter(10);
const listenerBinario = () => converter(2);
const listenerOctal = () => converter(8);
const listenerHexadecimal = () => converter(16);

function inicializarConversor() {
    decimalInput = document.getElementById("decimalInput");
    binarioInput = document.getElementById("binarioInput");
    octalInput = document.getElementById("octalInput");
    hexadecimalInput = document.getElementById("hexadecimalInput");
    erroDiv = document.getElementById("erroConversor");

    if (decimalInput && binarioInput && octalInput && hexadecimalInput) {
        // Adiciona listeners
        decimalInput.addEventListener("input", listenerDecimal);
        binarioInput.addEventListener("input", listenerBinario);
        octalInput.addEventListener("input", listenerOctal);
        hexadecimalInput.addEventListener("input", listenerHexadecimal);
        console.log("Listeners do conversor adicionados.");
    } else {
        console.error("Elementos do conversor não encontrados para adicionar listeners.");
    }
}

function removerListenersConversor() {
    if (decimalInput && binarioInput && octalInput && hexadecimalInput) {
        // Remove listeners
        decimalInput.removeEventListener("input", listenerDecimal);
        binarioInput.removeEventListener("input", listenerBinario);
        octalInput.removeEventListener("input", listenerOctal);
        hexadecimalInput.removeEventListener("input", listenerHexadecimal);
        console.log("Listeners do conversor removidos.");
    }
    // Não é necessário zerar as variáveis globais aqui, pois serão reatribuídas em inicializarConversor
}

function converter(baseOrigem) {
    if (!decimalInput || !binarioInput || !octalInput || !hexadecimalInput || !erroDiv) {
        console.error("Elementos do conversor não estão inicializados.");
        return; // Sai se os elementos não foram encontrados/inicializados
    }

    erroDiv.style.display = "none"; // Esconde mensagens de erro anteriores
    let valorDecimal = 0;
    let inputValido = true;
    let valorInput = "";

    try {
        switch (baseOrigem) {
            case 10:
                valorInput = decimalInput.value.trim();
                if (valorInput === "") { inputValido = false; break; }
                if (!/^[0-9]+$/.test(valorInput)) throw new Error("Número decimal inválido.");
                valorDecimal = parseInt(valorInput, 10);
                break;
            case 2:
                valorInput = binarioInput.value.trim();
                if (valorInput === "") { inputValido = false; break; }
                if (!/^[01]+$/.test(valorInput)) throw new Error("Número binário inválido.");
                valorDecimal = parseInt(valorInput, 2);
                break;
            case 8:
                valorInput = octalInput.value.trim();
                if (valorInput === "") { inputValido = false; break; }
                if (!/^[0-7]+$/.test(valorInput)) throw new Error("Número octal inválido.");
                valorDecimal = parseInt(valorInput, 8);
                break;
            case 16:
                valorInput = hexadecimalInput.value.trim().toUpperCase();
                if (valorInput === "") { inputValido = false; break; }
                if (!/^[0-9A-F]+$/.test(valorInput)) throw new Error("Número hexadecimal inválido.");
                valorDecimal = parseInt(valorInput, 16);
                break;
            default:
                inputValido = false;
        }

        if (isNaN(valorDecimal) && inputValido) {
             throw new Error("Valor inválido ou muito grande.");
        }

        if (inputValido) {
            // Atualiza apenas os campos que NÃO foram a origem da entrada
            if (baseOrigem !== 10) decimalInput.value = valorDecimal.toString(10);
            if (baseOrigem !== 2) binarioInput.value = valorDecimal.toString(2);
            if (baseOrigem !== 8) octalInput.value = valorDecimal.toString(8);
            if (baseOrigem !== 16) hexadecimalInput.value = valorDecimal.toString(16).toUpperCase();
        } else {
            // Limpa todos os campos se a entrada estiver vazia no campo de origem
            decimalInput.value = "";
            binarioInput.value = "";
            octalInput.value = "";
            hexadecimalInput.value = "";
        }

    } catch (error) {
        erroDiv.textContent = `Erro: ${error.message}`;
        erroDiv.style.display = "block";
        // Limpa os outros campos em caso de erro, mantendo o campo inválido
        if (baseOrigem !== 10) decimalInput.value = "";
        if (baseOrigem !== 2) binarioInput.value = "";
        if (baseOrigem !== 8) octalInput.value = "";
        if (baseOrigem !== 16) hexadecimalInput.value = "";
    }
}
