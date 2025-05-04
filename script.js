
document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de Crescimento de Dígitos
    const ctx = document.getElementById('digitGrowthChart')?.getContext('2d');
    if (ctx) {
        const digitGrowthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'], // Valores Decimais
                datasets: [
                    {
                        label: 'Binário (Base 2)',
                        data: [1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5], // Número de dígitos binários
                        borderColor: '#81C3D7', // Cor da paleta
                        tension: 0.1
                    },
                    {
                        label: 'Octal (Base 8)',
                        data: [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2], // Número de dígitos octais
                        borderColor: '#3A7CA5', // Cor da paleta
                        tension: 0.1
                    },
                    {
                        label: 'Decimal (Base 10)',
                        data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2], // Número de dígitos decimais
                        borderColor: '#16425B', // Cor da paleta
                        tension: 0.1
                    },
                    {
                        label: 'Hexadecimal (Base 16)',
                        data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2], // Número de dígitos hexadecimais
                        borderColor: '#2F6690', // Cor da paleta
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Número de Dígitos Necessários'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Valor Decimal Equivalente'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Crescimento do Número de Dígitos por Sistema Numérico'
                    }
                }
            }
        });
    }

    // Funcionalidade do Conversor
    window.converter = function(baseOrigem) {
        const decimalInput = document.getElementById('decimalInput');
        const binarioInput = document.getElementById('binarioInput');
        const octalInput = document.getElementById('octalInput');
        const hexadecimalInput = document.getElementById('hexadecimalInput');
        const erroConversor = document.getElementById('erroConversor');
        erroConversor.style.display = 'none'; // Oculta msg de erro

        let valor = '';
        let valorDecimal = NaN;

        try {
            if (baseOrigem === 10) {
                valor = decimalInput.value.trim();
                if (valor === '') { resetCampos(10); return; }
                if (!/^[0-9]+$/.test(valor)) throw new Error('Valor decimal inválido.');
                valorDecimal = parseInt(valor, 10);
            } else if (baseOrigem === 2) {
                valor = binarioInput.value.trim();
                if (valor === '') { resetCampos(2); return; }
                if (!/^[01]+$/.test(valor)) throw new Error('Valor binário inválido.');
                valorDecimal = parseInt(valor, 2);
            } else if (baseOrigem === 8) {
                valor = octalInput.value.trim();
                if (valor === '') { resetCampos(8); return; }
                if (!/^[0-7]+$/.test(valor)) throw new Error('Valor octal inválido.');
                valorDecimal = parseInt(valor, 8);
            } else if (baseOrigem === 16) {
                valor = hexadecimalInput.value.trim().toUpperCase();
                if (valor === '') { resetCampos(16); return; }
                if (!/^[0-9A-F]+$/.test(valor)) throw new Error('Valor hexadecimal inválido.');
                valorDecimal = parseInt(valor, 16);
            }

            if (isNaN(valorDecimal)) {
                 throw new Error('Entrada inválida para a base selecionada.');
            }

            if (baseOrigem !== 10) decimalInput.value = valorDecimal.toString(10);
            if (baseOrigem !== 2) binarioInput.value = valorDecimal.toString(2);
            if (baseOrigem !== 8) octalInput.value = valorDecimal.toString(8);
            if (baseOrigem !== 16) hexadecimalInput.value = valorDecimal.toString(16).toUpperCase();

        } catch (e) {
            erroConversor.textContent = e.message;
            erroConversor.style.display = 'block';
            // Limpa os outros campos se a entrada for inválida
            resetCampos(baseOrigem, true);
        }
    }

    function resetCampos(baseOrigem, erro = false) {
        const inputs = {
            10: document.getElementById('decimalInput'),
            2: document.getElementById('binarioInput'),
            8: document.getElementById('octalInput'),
            16: document.getElementById('hexadecimalInput')
        };
        for (const base in inputs) {
            if (parseInt(base) !== baseOrigem) {
                inputs[base].value = '';
            }
        }
         // Se não for erro e o campo de origem estiver vazio, limpa tudo
        if (!erro && inputs[baseOrigem].value === ''){
             for (const base in inputs) {
                inputs[base].value = '';
            }
        }
    }

    // Funcionalidade para mostrar/ocultar respostas dos exercícios
    window.toggleResposta = function(idResposta) {
        const respostaDiv = document.getElementById(idResposta);
        if (respostaDiv) {
            respostaDiv.style.display = respostaDiv.style.display === 'none' ? 'block' : 'none';
        }
    }

});
