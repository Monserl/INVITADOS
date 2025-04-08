document.addEventListener('DOMContentLoaded', function() {
    const invitados = [
        "Ana", "Andrés", "Antonio", "Beatriz", "Carlos", "Carmen", 
        "Daniel", "David", "Diego", "Elena", "Fernando", "Federico", "Francisco", 
        "Gabriela", "Guillermo", "Juan", "Laura", "Luis", "Manuel", "María", 
        "Patricia", "Pedro", "Raúl", "Roberto", "Sofía", "Sara", "Violeta", "Zenaida"
    ];

    let allPairs = [];
    let currentPairIndex = 0;

    // lista invitados alfabeticamente
    displayGuests(invitados, 'guest-list');

    // botones
    document.getElementById('find-all').addEventListener('click', function() {
        allPairs = encontrarTodosLosPares(invitados);
        currentPairIndex = 0;
        
        if (allPairs.length > 0) {
            displayCurrentPair();
            updateNavigationButtons();
        } else {
            displayNoPairs();
        }
    });

    document.getElementById('next-pair').addEventListener('click', function() {
        if (currentPairIndex < allPairs.length - 1) {
            currentPairIndex++;
            displayCurrentPair();
            updateNavigationButtons();
        }
    });

    document.getElementById('prev-pair').addEventListener('click', function() {
        if (currentPairIndex > 0) {
            currentPairIndex--;
            displayCurrentPair();
            updateNavigationButtons();
        }
    });

    // encontrar todos los pares
    function encontrarTodosLosPares(arr) {
        const pairs = [];
        let inicio = 0;
        let siguiente = 1;

        while (siguiente < arr.length) {
            const primeraLetraInicio = arr[inicio][0].toUpperCase();
            const primeraLetraSiguiente = arr[siguiente][0].toUpperCase();

            if (primeraLetraInicio === primeraLetraSiguiente) {
                pairs.push({
                    pareja: [arr[inicio], arr[siguiente]],
                    posiciones: [inicio, siguiente],
                    letra: primeraLetraInicio
                });
            }

            inicio++;
            siguiente++;
        }

        return pairs;
    }

    // mostrar el par actual
    function displayCurrentPair() {
        const container = document.getElementById('result');
        const pair = allPairs[currentPairIndex];
        
        container.innerHTML = `
            <div class="result-content">
                <p>Par ${currentPairIndex + 1} de ${allPairs.length}:</p>
                <div class="pair-found">
                    <div class="pair-tag">${pair.pareja[0]}</div>
                    <div class="pair-tag">${pair.pareja[1]}</div>
                </div>
                <p>Letra inicial: <strong>${pair.letra}</strong></p>
                <p>Posiciones: ${pair.posiciones[0] + 1} y ${pair.posiciones[1] + 1}</p>
            </div>
        `;

        // lista principal
        highlightGuests(pair.posiciones);
    }

    function displayNoPairs() {
        document.getElementById('result').innerHTML = `
            <p class="no-pair">No se encontraron pares consecutivos con la misma letra inicial</p>
        `;
    }

    function highlightGuests(positions) {
        
        document.querySelectorAll('.guest-tag.highlight').forEach(tag => {
            tag.classList.remove('highlight');
        });

        positions.forEach(pos => {
            document.querySelector(`.guest-tag[data-index="${pos}"]`).classList.add('highlight');
        });
    }

    function updateNavigationButtons() {
        document.getElementById('prev-pair').disabled = currentPairIndex === 0;
        document.getElementById('next-pair').disabled = currentPairIndex === allPairs.length - 1;
    }

    function displayGuests(guests, elementId) {
        const container = document.getElementById(elementId);
        container.innerHTML = '';

        guests.forEach((guest, index) => {
            const tag = document.createElement('div');
            tag.className = 'guest-tag';
            tag.textContent = guest;
            tag.dataset.index = index;
            container.appendChild(tag);
        });
    }
});