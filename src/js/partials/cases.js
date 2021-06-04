document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.js-cases-row')) {
        const row = document.querySelector('.js-cases-row');
        const casesCard = [...row.querySelectorAll('.js-cases-card')];

        function cloneNodes() {
            casesCard.forEach((card) => {
                const clone = card.cloneNode(true)

                clone.dataset.clone = true

                row.appendChild(clone)
            })
        }
        cloneNodes()

        casesCard.forEach((card) => {
            row.appendChild(card)
        })

        cloneNodes()
    }
});