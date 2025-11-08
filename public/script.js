document.addEventListener('DOMContentLoaded', () => {
    // Booking Modal
    const bookingModal = document.getElementById('booking-modal');
    const closeModal = document.getElementById('close-modal');
    const bookingForm = document.getElementById('booking-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const planInput = document.getElementById('plan');

    const choosePlanButtons = document.querySelectorAll('#pricing .rounded-lg');

    choosePlanButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const planCard = e.target.closest('.flex.flex-col');
            const planName = planCard.querySelector('h3').textContent;
            planInput.value = planName;
            bookingModal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', () => {
        bookingModal.classList.add('hidden');
        confirmationMessage.classList.add('hidden');
        bookingForm.reset();
        bookingForm.style.display = 'block';
    });

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        bookingForm.style.display = 'none';
        confirmationMessage.classList.remove('hidden');
    });

    // AI Demo Section
    const writingSubmit = document.getElementById('writing-submit');
    const writingInput = document.getElementById('writing-input');
    const writingOutput = document.getElementById('writing-output');

    const speakingStart = document.getElementById('speaking-start');
    const speakingOutput = document.getElementById('speaking-output');
    const speakingInput = document.getElementById('speaking-input');
    const speakingSubmit = document.getElementById('speaking-submit');
    const speakingFeedback = document.getElementById('speaking-feedback');

    const readingSubmit = document.getElementById('reading-submit');
    const readingInput = document.getElementById('reading-input');
    const readingOutput = document.getElementById('reading-output');

    writingSubmit.addEventListener('click', async () => {
        const essay = writingInput.value;
        if (essay.trim() === '') {
            writingOutput.innerHTML = '<p class="text-red-500">Please write an essay before submitting.</p>';
            return;
        }

        writingOutput.innerHTML = '<p class="text-gray-500">Getting your score...</p>';

        try {
            const response = await fetch('/.netlify/functions/writing-score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ essay })
            });

            const data = await response.json();
            writingOutput.innerHTML = `<div class="p-4 bg-gray-100 rounded-lg">${data.feedback.replace(/\n/g, '<br>')}</div>`;
        } catch (error) {
            writingOutput.innerHTML = '<p class="text-red-500">An error occurred while getting your score.</p>';
        }
    });

    speakingStart.addEventListener('click', async () => {
        speakingOutput.innerHTML = '<p class="text-gray-500">Starting practice...</p>';

        try {
            const response = await fetch('/.netlify/functions/speaking-practice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            const data = await response.json();
            speakingOutput.innerHTML = `<div class="p-4 bg-gray-100 rounded-lg">${data.question.replace(/\n/g, '<br>')}</div>`;
        } catch (error) {
            speakingOutput.innerHTML = '<p class="text-red-500">An error occurred while starting the practice.</p>';
        }
    });

    speakingSubmit.addEventListener('click', async () => {
        const answer = speakingInput.value;
        const question = speakingOutput.textContent;
        if (answer.trim() === '') {
            speakingFeedback.innerHTML = '<p class="text-red-500">Please write an answer before submitting.</p>';
            return;
        }

        speakingFeedback.innerHTML = '<p class="text-gray-500">Getting your feedback...</p>';

        try {
            const response = await fetch('/.netlify/functions/speaking-practice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answer, question })
            });

            const data = await response.json();
            speakingFeedback.innerHTML = `<div class="p-4 bg-gray-100 rounded-lg">${data.feedback.replace(/\n/g, '<br>')}</div>`;
        } catch (error) {
            speakingFeedback.innerHTML = '<p class="text-red-500">An error occurred while getting your feedback.</p>';
        }
    });

    readingSubmit.addEventListener('click', async () => {
        const answer = readingInput.value;
        if (answer.trim() === '') {
            readingOutput.innerHTML = '<p class="text-red-500">Please write an answer before submitting.</p>';
            return;
        }

        readingOutput.innerHTML = '<p class="text-gray-500">Evaluating your answer...</p>';

        try {
            const response = await fetch('/.netlify/functions/reading-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answer })
            });

            const data = await response.json();
            readingOutput.innerHTML = `<div class="p-4 bg-gray-100 rounded-lg">${data.feedback.replace(/\n/g, '<br>')}</div>`;
        } catch (error) {
            readingOutput.innerHTML = '<p class="text-red-500">An error occurred while evaluating your answer.</p>';
        }
    });
});
