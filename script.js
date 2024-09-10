document.addEventListener('DOMContentLoaded', () => {
    const numbers = document.querySelectorAll('.number');

    const animateNumber = (numberElement, target) => {
        let current = 0; // Start from 0
        const duration = 3000; // Duration of the animation in milliseconds
        const steps = 100; // Number of steps in the animation
        const stepDuration = duration / steps; // Duration of each step

        const increment = Math.ceil(target / steps); // Increment for each step

        const updateNumber = () => {
            current = Math.min(current + increment, target); // Ensure we don't exceed the target
            numberElement.innerText = current.toLocaleString() + '+'; // Add comma and + sign

            if (current < target) {
                setTimeout(updateNumber, stepDuration); // Continue updating
            } else {
                numberElement.innerText = target.toLocaleString() + '+'; // Final value with + sign
            }
        };

        updateNumber(); // Start the animation
    };

    // Intersection Observer callback
    const handleIntersect = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const target = +numberElement.getAttribute('data-number');
                animateNumber(numberElement, target);

                // Unobserve the element after animation starts to prevent re-animation
                observer.unobserve(numberElement);
            }
        });
    };

    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(handleIntersect, {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    // Observe each number element
    numbers.forEach(number => {
        observer.observe(number);
    });
});
