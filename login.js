document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'asrs_users';
    const ACTIVE_USER_KEY = 'asrs_active_user';
    const MAX_COR_MB = 2;

    const tabRegister = document.getElementById('tab-register');
    const tabLogin = document.getElementById('tab-login');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const registerMessage = document.getElementById('register-message');
    const loginMessage = document.getElementById('login-message');
    const studentFields = document.getElementById('student-fields');
    const teacherFields = document.getElementById('teacher-fields');
    const corInput = document.getElementById('reg-cor');
    const authTitle = document.getElementById('authTitle');
    const authSub = document.getElementById('authSub');

    function getUsers() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch (err) {
            return [];
        }
    }

    function saveUsers(users) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }

    function ensureSeedAccounts() {
        const users = getUsers();
        const byEmail = new Set(users.map(u => String(u.email || '').toLowerCase()));

        const seeds = [
            {
                id: 'seed-teacher-1',
                role: 'teacher',
                fullName: 'Ms. Perez',
                email: 'teacher@asrs.edu',
                password: 'Teacher123!',
                status: 'active',
                classCode: '',
                classId: '',
                corImage: '',
                corFileName: '',
                school: 'ASRS Academy',
                teacherId: 'T-0001',
                academicInfo: null,
                createdAt: new Date().toISOString()
            },
            {
                id: 'seed-student-1',
                role: 'student',
                fullName: 'Marianne Ocampo',
                email: 'student1@asrs.edu',
                password: 'Student123!',
                status: 'approved',
                // Pre-fill a class so tasks/assignments can show immediately.
                classCode: 'WEBDEV-3A',
                classId: '',
                corImage: '',
                corFileName: 'seed-cor.png',
                school: '',
                teacherId: '',
                academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' },
                createdAt: new Date().toISOString()
            },
            {
                id: 'seed-student-2',
                role: 'student',
                fullName: 'Kurt Magbanua',
                email: 'student2@asrs.edu',
                password: 'Student123!',
                status: 'approved',
                classCode: 'DS-3B',
                classId: '',
                corImage: '',
                corFileName: 'seed-cor.png',
                school: '',
                teacherId: '',
                academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' },
                createdAt: new Date().toISOString()
            }
        ];

        let changed = false;
        for (const seed of seeds) {
            if (byEmail.has(seed.email.toLowerCase())) continue;
            users.push(seed);
            changed = true;
        }
        if (changed) saveUsers(users);
    }

    function setMessage(target, text, type) {
        if (!target) return;
        target.textContent = text;
        target.classList.toggle('success', type === 'success');
    }

    function clearMessages() {
        setMessage(registerMessage, '', '');
        setMessage(loginMessage, '', '');
    }

    function setActiveTab(tab) {
        clearMessages();
        tabRegister.classList.toggle('active', tab === 'register');
        tabLogin.classList.toggle('active', tab === 'login');
        registerForm.classList.toggle('hidden', tab !== 'register');
        loginForm.classList.toggle('hidden', tab !== 'login');
        if (authTitle && authSub) {
            if (tab === 'register') {
                authTitle.textContent = 'Join ASRS';
                authSub.textContent = 'Create your account and start learning today.';
            } else {
                authTitle.textContent = 'Welcome back';
                authSub.textContent = 'Sign in to continue your learning journey.';
            }
        }
    }

    function getSelectedRole() {
        const selected = document.querySelector('input[name="role"]:checked');
        return selected ? selected.value : 'student';
    }

    function updateRoleFields() {
        const role = getSelectedRole();
        const isStudent = role === 'student';
        studentFields.classList.toggle('hidden', !isStudent);
        teacherFields.classList.toggle('hidden', isStudent);
        if (corInput) corInput.required = isStudent;

        // Academic info fields are student-only; prevent teacher form from being blocked by required selects.
        ['reg-course', 'reg-school-year', 'reg-year-level', 'reg-section'].forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.disabled = !isStudent;
            el.required = isStudent;
        });

        const schoolInput = document.getElementById('reg-school');
        const teacherIdInput = document.getElementById('reg-teacher-id');
        if (schoolInput) schoolInput.required = !isStudent;
        if (teacherIdInput) teacherIdInput.required = !isStudent;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    function readFileAsDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Unable to read file.'));
            reader.readAsDataURL(file);
        });
    }

    function normalizeNamePart(value) {
        return String(value || '').trim().replace(/\s+/g, ' ');
    }

    function buildFullName(lastName, firstName, middleName, extensionName) {
        const last = normalizeNamePart(lastName);
        const first = normalizeNamePart(firstName);
        const middle = normalizeNamePart(middleName);
        const ext = normalizeNamePart(extensionName);
        const firstWithMiddle = [first, middle].filter(Boolean).join(' ');
        const tail = [firstWithMiddle, ext].filter(Boolean).join(' ');
        return tail ? `${last}, ${tail}` : last;
    }

    tabRegister.addEventListener('click', () => setActiveTab('register'));
    tabLogin.addEventListener('click', () => setActiveTab('login'));

    document.querySelectorAll('[data-switch]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            setActiveTab(link.dataset.switch);
        });
    });

    document.querySelectorAll('input[name="role"]').forEach(input => {
        input.addEventListener('change', updateRoleFields);
    });

    document.querySelectorAll('.pw-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-toggle-target');
            const input = targetId ? document.getElementById(targetId) : null;
            if (!input) return;
            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            btn.innerHTML = isHidden ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
            btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
        });
    });

    if (corInput) {
        corInput.addEventListener('change', () => {
            const file = corInput.files && corInput.files[0];
            const label = document.getElementById('corLabel');
            if (label) {
                label.textContent = file ? file.name : 'Upload image (JPG/PNG, max 2MB)';
            }
        });
    }

    // Auto-create default accounts on new browsers.
    ensureSeedAccounts();
    updateRoleFields();

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearMessages();

        const role = getSelectedRole();
        const lastName = document.getElementById('reg-last-name').value.trim();
        const firstName = document.getElementById('reg-first-name').value.trim();
        const middleName = document.getElementById('reg-middle-name').value.trim();
        const extensionName = document.getElementById('reg-extension-name').value.trim();
        const fullName = buildFullName(lastName, firstName, middleName, extensionName);
        const course = document.getElementById('reg-course')?.value || '';
        const schoolYear = document.getElementById('reg-school-year')?.value || '';
        const yearLevel = document.getElementById('reg-year-level')?.value || '';
        const section = document.getElementById('reg-section')?.value || '';
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm').value;
        const school = document.getElementById('reg-school')?.value.trim();
        const teacherId = document.getElementById('reg-teacher-id')?.value.trim();
        const corFile = corInput?.files ? corInput.files[0] : null;

        if (!lastName || !firstName || !email || !password || !confirm) {
            setMessage(registerMessage, 'Please fill in all required fields.');
            return;
        }

        if (!isValidEmail(email)) {
            setMessage(registerMessage, 'Please enter a valid email address.');
            return;
        }

        if (password.length < 8) {
            setMessage(registerMessage, 'Password must be at least 8 characters.');
            return;
        }

        if (password !== confirm) {
            setMessage(registerMessage, 'Passwords do not match.');
            return;
        }

        if (role === 'student') {
            if (!course || !schoolYear || !yearLevel || !section) {
                setMessage(registerMessage, 'Please complete your Academic Info (course, school year, year level, section).');
                return;
            }
            if (!corFile) {
                setMessage(registerMessage, 'Please upload your COR image.');
                return;
            }
            if (corFile.size > MAX_COR_MB * 1024 * 1024) {
                setMessage(registerMessage, 'COR image must be 2 MB or less.');
                return;
            }
        }

        if (role === 'teacher' && (!school || !teacherId)) {
            setMessage(registerMessage, 'Please enter school and teacher ID.');
            return;
        }

        const users = getUsers();
        const exists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
        if (exists) {
            setMessage(registerMessage, 'An account with this email already exists.');
            return;
        }

        let corDataUrl = '';
        let corFileName = '';
        if (role === 'student' && corFile) {
            try {
                corDataUrl = await readFileAsDataUrl(corFile);
                corFileName = corFile.name || 'cor-image';
            } catch (err) {
                setMessage(registerMessage, 'Unable to read COR image.');
                return;
            }
        }

        const newUser = {
            id: 'u' + Date.now(),
            role,
            lastName: normalizeNamePart(lastName),
            firstName: normalizeNamePart(firstName),
            middleName: normalizeNamePart(middleName),
            extensionName: normalizeNamePart(extensionName),
            fullName,
            email,
            password,
            status: role === 'student' ? 'approved' : 'active',
            classCode: '',
            corImage: corDataUrl,
            corFileName,
            school: school || '',
            teacherId: teacherId || '',
            academicInfo: role === 'student'
                ? { course, schoolYear, yearLevel, section }
                : null,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);

        registerForm.reset();
        document.querySelector('input[name="role"][value="student"]').checked = true;
        updateRoleFields();
        setActiveTab('login');
        setMessage(loginMessage, 'Account created. Please sign in.', 'success');
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        clearMessages();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            setMessage(loginMessage, 'Please enter your email and password.');
            return;
        }

        const users = getUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

        if (!user) {
            setMessage(loginMessage, 'Invalid email or password.');
            return;
        }

        localStorage.setItem(ACTIVE_USER_KEY, user.id);

        if (user.role === 'teacher') {
            window.location.href = 'admin-dash.html';
        } else {
            window.location.href = 'home.html';
        }
    });
});