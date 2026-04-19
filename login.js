document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Hide all forms
            forms.forEach(f => f.classList.add('hidden'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Show the corresponding form based on ID
            if (tab.id === 'tab-register') {
                document.getElementById('register-form').classList.remove('hidden');
            } else if (tab.id === 'tab-student') {
                document.getElementById('student-form').classList.remove('hidden');
            } else if (tab.id === 'tab-admin') {
                document.getElementById('admin-form').classList.remove('hidden');
            }
        });
    });
});
