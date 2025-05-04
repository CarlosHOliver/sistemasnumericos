let currentSlideIndex = 0;
let slides = [];
let slideCounterElement;
let prevBtn;
let nextBtn;
let fullscreenBtn; // Variável para o botão de tela cheia
let presentationContainer; // Variável para o container da apresentação

document.addEventListener("DOMContentLoaded", () => {
    slides = document.querySelectorAll(".slide");
    slideCounterElement = document.getElementById("slideCounter");
    prevBtn = document.getElementById("prevBtn");
    nextBtn = document.getElementById("nextBtn");
    fullscreenBtn = document.getElementById("fullscreenBtn"); // Pega o botão de tela cheia
    presentationContainer = document.querySelector(".presentation-container"); // Pega o container

    if (slides.length > 0) {
        showSlide(currentSlideIndex);
        updateNavigationControls();
    } else {
        console.error("Nenhum slide encontrado.");
        if(slideCounterElement) slideCounterElement.textContent = "Erro: Slides não encontrados";
        if(prevBtn) prevBtn.disabled = true;
        if(nextBtn) nextBtn.disabled = true;
        if(fullscreenBtn) fullscreenBtn.disabled = true; // Desabilita tela cheia se não houver slides
        return; // Sai se não houver slides
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            changeSlide(-1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            changeSlide(1);
        });
    }

    // Adiciona navegação pelo teclado (Setas Esquerda/Direita)
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            changeSlide(-1);
        } else if (event.key === "ArrowRight") {
            changeSlide(1);
        } else if (event.key === "f" || event.key === "F") {
            // Adiciona atalho F para tela cheia
            toggleFullScreen();
        }
    });

    // Funcionalidade do botão de Tela Cheia
    if (fullscreenBtn && presentationContainer) {
        fullscreenBtn.addEventListener("click", toggleFullScreen);
    }

    // Atualiza o botão de tela cheia se o estado mudar (ex: usuário pressiona ESC)
    document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
            fullscreenBtn.textContent = "Sair Tela Cheia";
        } else {
            fullscreenBtn.textContent = "Tela Cheia";
        }
    });
});

// Variáveis globais para os listeners do conversor
let decimalListener, binarioListener, octalListener, hexadecimalListener;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) {
            slide.classList.add("active");
            // Inicializa o gráfico apenas se o slide do gráfico estiver ativo
            if (slide.id === "slide13") {
                inicializarGrafico();
            }
            // Adiciona listeners do conversor apenas se o slide do conversor estiver ativo
            if (slide.id === "slide18") {
                inicializarConversor();
            } else {
                // Remove listeners se não for o slide do conversor para otimizar
                removerListenersConversor();
            }
        }
    });
    currentSlideIndex = index;
    updateNavigationControls();
}

function changeSlide(direction) {
    const newIndex = currentSlideIndex + direction;
    if (newIndex >= 0 && newIndex < slides.length) {
        showSlide(newIndex);
    }
}

function updateNavigationControls() {
    if (!slideCounterElement || !prevBtn || !nextBtn || slides.length === 0) return;

    slideCounterElement.textContent = `Slide ${currentSlideIndex + 1} / ${slides.length}`;
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === slides.length - 1;
}

// Função para alternar Tela Cheia
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        presentationContainer.requestFullscreen().catch(err => {
            alert(`Erro ao tentar entrar em tela cheia: ${err.message} (${err.name})`);
        });
        // O texto do botão será atualizado pelo listener 'fullscreenchange'
    } else {
        document.exitFullscreen();
        // O texto do botão será atualizado pelo listener 'fullscreenchange'
    }
}

// Função para toggle de resposta
function toggleResposta(respostaId) {
    const respostaDiv = document.getElementById(respostaId);
    if (respostaDiv) {
        if (respostaDiv.style.display === "none" || respostaDiv.style.display === "") {
            respostaDiv.style.display = "block";
        } else {
            respostaDiv.style.display = "none";
        }
    }
}

// Função para inicializar o gráfico (será chamada quando o slide do gráfico estiver ativo)
function inicializarGrafico() {
    const ctx = document.getElementById("digitGrowthChart");
    if (!ctx) return; // Sai se o canvas não existir
    // Tenta obter a biblioteca Chart.js (assumindo que está carregada globalmente)
    if (typeof Chart === 'undefined') {
        console.error('Chart.js não está carregado.');
        return;
    }
    // Destroi gráfico anterior se existir para evitar sobreposição
    let chartStatus = Chart.getChart(ctx);
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    new Chart(ctx, {
        type: "line",
        data: {
            labels: Array.from({length: 17}, (_, i) => i.toString()), // Valores decimais 0 a 16
            datasets: [
                {
                    label: "Binário (Base 2)",
                    data: [1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5], // Número de dígitos
                    borderColor: "#81C3D7", // Azul Mais Claro
                    backgroundColor: "rgba(129, 195, 215, 0.2)",
                    tension: 0.1,
                    fill: false,
                    pointRadius: 5, // Make points slightly larger
                    pointHoverRadius: 7 // Enlarge points on hover
                },
                {
                    label: "Octal (Base 8)",
                    data: [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                    borderColor: "#3A7CA5", // Azul Claro
                    backgroundColor: "rgba(58, 124, 165, 0.2)",
                    tension: 0.1,
                    fill: false,
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: "Decimal (Base 10)",
                    data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2],
                    borderColor: "#2F6690", // Azul Médio
                    backgroundColor: "rgba(47, 102, 144, 0.2)",
                    tension: 0.1,
                    fill: false,
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: "Hexadecimal (Base 16)",
                    data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
                    borderColor: "#16425B", // Azul Escuro
                    backgroundColor: "rgba(22, 66, 91, 0.2)",
                    tension: 0.1,
                    fill: false,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { // Enable interactions
                mode: "index",
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: "Crescimento do Número de Dígitos por Sistema Numérico",
                    color: "#16425B",
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: true, // Ensure legend is visible
                    position: "top", // Position the legend
                    labels: {
                        color: "#16425B", // Legend text color
                        usePointStyle: true, // Use point style (circles) instead of lines in legend
                        padding: 20 // Add padding to legend items
                    },
                    onHover: (event, legendItem, legend) => { // Add hover effect
                      const chart = legend.chart;
                      chart.canvas.style.cursor = "pointer";
                    },
                    onLeave: (event, legendItem, legend) => { // Remove hover effect
                      const chart = legend.chart;
                      chart.canvas.style.cursor = "default";
                    }
                    // onClick is handled by default to toggle dataset visibility
                },
                tooltip: { // Enhance tooltips
                    enabled: true,
                    mode: "index", // Show tooltips for all datasets at the same index
                    intersect: false, // Tooltips appear even if not directly hovering over point
                    backgroundColor: "rgba(22, 66, 91, 0.9)", // Dark blue background
                    titleColor: "#D9DCD6", // Light title
                    bodyColor: "#FFFFFF", // White body text
                    borderColor: "#81C3D7", // Light blue border
                    borderWidth: 1,
                    padding: 10,
                    callbacks: { // Customize tooltip content
                        title: function(tooltipItems) {
                            return "Valor Decimal: " + tooltipItems[0].label;
                        },
                        label: function(tooltipItem) {
                            let label = tooltipItem.dataset.label || "";
                            if (label) {
                                label += ": ";
                            }
                            if (tooltipItem.parsed.y !== null) {
                                label += tooltipItem.parsed.y + " dígito(s)";
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Valor Decimal Equivalente",
                        color: "#2F6690"
                    },
                    ticks: {
                        color: "#3A7CA5"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Número de Dígitos Necessários",
                        color: "#2F6690"
                    },
                    ticks: {
                        color: "#3A7CA5",
                        stepSize: 1 // Garante que o eixo Y mostre apenas inteiros
                    },
                    beginAtZero: true
                }
            }
        }
    });
}
