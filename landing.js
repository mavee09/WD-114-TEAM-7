document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    document.querySelectorAll('.qp-opt:not(.right), .mockup-opt:not(.correct)').forEach((opt) => {
        opt.addEventListener('click', () => {
            const originalStyles = opt.style.cssText;
            opt.style.background = 'rgba(200,60,60,0.08)';
            opt.style.borderColor = 'rgba(200,60,60,0.35)';
            opt.style.color = '#c03c3c';
            setTimeout(() => {
                opt.style.cssText = originalStyles;
            }, 800);
        });
    });
});
