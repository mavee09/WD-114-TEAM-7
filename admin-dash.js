// ===== DATA STORE =====
function makeCorSvgDataUrl({ name = 'Student', course = 'BSIT', schoolYear = '2024–2025', yearLevel = '3', section = 'A' } = {}) {
  const safeName = String(name || 'Student').slice(0, 40);
  const meta = `${course} • ${schoolYear} • Y${yearLevel}${section ? `-${section}` : ''}`;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#f7f3ec"/>
          <stop offset="1" stop-color="#ede8df"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#g)"/>
      <rect x="70" y="70" width="1060" height="660" rx="22" fill="#ffffff" stroke="rgba(26,74,46,0.18)" stroke-width="3"/>
      <text x="110" y="150" font-family="DM Sans, Arial" font-size="28" fill="#122e1e" font-weight="700">ASRS • Certificate of Registration</text>
      <text x="110" y="210" font-family="DM Sans, Arial" font-size="22" fill="#2c6e49" font-weight="700">${safeName}</text>
      <text x="110" y="245" font-family="DM Sans, Arial" font-size="16" fill="#5f5f6b">${meta}</text>
      <rect x="110" y="290" width="980" height="1" fill="rgba(26,74,46,0.12)"/>
      <text x="110" y="345" font-family="DM Sans, Arial" font-size="16" fill="#1c1c1e">This is a demo COR image (hardcoded) for testing the student view.</text>
      <text x="110" y="385" font-family="DM Sans, Arial" font-size="14" fill="#8a8a96">Upload-based COR is stored in localStorage for registered students.</text>
      <rect x="110" y="440" width="980" height="240" rx="16" fill="#f7f3ec" stroke="rgba(26,74,46,0.12)"/>
      <text x="140" y="500" font-family="JetBrains Mono, monospace" font-size="14" fill="#2c6e49">COURSE</text>
      <text x="140" y="530" font-family="DM Sans, Arial" font-size="18" fill="#1c1c1e">${course}</text>
      <text x="420" y="500" font-family="JetBrains Mono, monospace" font-size="14" fill="#2c6e49">SCHOOL YEAR</text>
      <text x="420" y="530" font-family="DM Sans, Arial" font-size="18" fill="#1c1c1e">${schoolYear}</text>
      <text x="740" y="500" font-family="JetBrains Mono, monospace" font-size="14" fill="#2c6e49">YEAR/SECTION</text>
      <text x="740" y="530" font-family="DM Sans, Arial" font-size="18" fill="#1c1c1e">Year ${yearLevel} • ${section}</text>
    </svg>
  `.trim();
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const db = {
  teacher: null,
  classes: [
    { id: 'c1', name: 'Web Development', section: 'BSIT 3A', year: '2024–2025', sem: '1st Semester', code: 'WEBDEV-3A', color: 'var(--green-mid)', desc: 'Frontend and backend web development fundamentals.' },
    { id: 'c3', name: 'Discrete Structures', section: 'BSIT 3B', year: '2024–2025', sem: '1st Semester', code: 'DS-3B', color: '#7B2FBE', desc: 'Logic, sets, relations, and graph foundations for computing.' },
  ],
  students: [
    { id: 's1', name: 'Marianne Ocampo', classId: 'c1', email: 'marianne@student.edu', status: 'approved', avg: 88, quizzesDone: 6, assignmentsDone: 4, totalPts: 520, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }, corImage: makeCorSvgDataUrl({ name: 'Marianne Ocampo', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }), corFileName: 'cor-marianne.svg' },
    { id: 's2', name: 'Kurt Magbanua', classId: 'c1', email: 'kurt@student.edu', status: 'approved', avg: 75, quizzesDone: 5, assignmentsDone: 3, totalPts: 440, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }, corImage: makeCorSvgDataUrl({ name: 'Kurt Magbanua', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }), corFileName: 'cor-kurt.svg' },
    { id: 's3', name: 'Aviv Perez', classId: 'c1', email: 'aviv@student.edu', status: 'approved', avg: 92, quizzesDone: 7, assignmentsDone: 5, totalPts: 610, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }, corImage: makeCorSvgDataUrl({ name: 'Aviv Perez', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }), corFileName: 'cor-aviv.svg' },
    { id: 's4', name: 'Waj Sanchez', classId: 'c1', email: 'waj@student.edu', status: 'approved', avg: 50, quizzesDone: 4, assignmentsDone: 2, totalPts: 300, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }, corImage: makeCorSvgDataUrl({ name: 'Waj Sanchez', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }), corFileName: 'cor-waj.svg' },
    { id: 's5', name: 'Christiaan Jala', classId: 'c3', email: 'tintan@student.edu', status: 'approved', avg: 95, quizzesDone: 8, assignmentsDone: 5, totalPts: 640, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }, corImage: makeCorSvgDataUrl({ name: 'Christiaan Jala', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }), corFileName: 'cor-christiaan.svg' },
    { id: 's6', name: 'Jessa Alvarez', classId: 'c1', email: 'jessa@student.edu', status: 'pending', avg: 0, quizzesDone: 0, assignmentsDone: 0, totalPts: 0, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }, corImage: makeCorSvgDataUrl({ name: 'Jessa Alvarez', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }), corFileName: 'cor-jessa.svg' },
    { id: 's7', name: 'Patrick Climaco', classId: 'c3', email: 'pat@student.edu', status: 'pending', avg: 0, quizzesDone: 0, assignmentsDone: 0, totalPts: 0, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }, corImage: makeCorSvgDataUrl({ name: 'Patrick Climaco', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }), corFileName: 'cor-patrick.svg' },
    { id: 's8', name: 'Aaron Perez', classId: 'c3', email: 'aaron@student.edu', status: 'pending', avg: 0, quizzesDone: 0, assignmentsDone: 0, totalPts: 0, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }, corImage: makeCorSvgDataUrl({ name: 'Aaron Perez', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }), corFileName: 'cor-aaron.svg' },
    // Extra hardcoded records for testing approve/reject/view/edit/delete.
    { id: 's9', name: 'Luna Santos', classId: 'c1', email: 'luna@student.edu', status: 'pending', avg: 0, quizzesDone: 0, assignmentsDone: 0, totalPts: 0, academicInfo: { course: 'BSCS', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }, corImage: makeCorSvgDataUrl({ name: 'Luna Santos', course: 'BSCS', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }), corFileName: 'cor-luna.svg' },
    { id: 's10', name: 'Paolo Reyes', classId: 'c3', email: 'paolo@student.edu', status: 'pending', avg: 0, quizzesDone: 0, assignmentsDone: 0, totalPts: 0, academicInfo: { course: 'BSCS', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }, corImage: makeCorSvgDataUrl({ name: 'Paolo Reyes', course: 'BSCS', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }), corFileName: 'cor-paolo.svg' },
    { id: 's11', name: 'Aira Dela Cruz', classId: 'c1', email: 'aira@student.edu', status: 'approved', avg: 81, quizzesDone: 3, assignmentsDone: 2, totalPts: 210, academicInfo: { course: 'BSEMC', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }, corImage: makeCorSvgDataUrl({ name: 'Aira Dela Cruz', course: 'BSEMC', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }), corFileName: 'cor-aira.svg' },
    // Multi-class memberships (same student in Web Development + Discrete Structures).
    { id: 's12', userId: 'seed-student-1', name: 'Marianne Ocampo', classId: 'c3', email: 'marianne@student.edu', status: 'approved', avg: 90, quizzesDone: 7, assignmentsDone: 5, totalPts: 560, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }, corImage: makeCorSvgDataUrl({ name: 'Marianne Ocampo', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }), corFileName: 'cor-marianne.svg' },
    { id: 's13', userId: 'seed-student-2', name: 'Kurt Magbanua', classId: 'c3', email: 'kurt@student.edu', status: 'approved', avg: 78, quizzesDone: 6, assignmentsDone: 4, totalPts: 470, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }, corImage: makeCorSvgDataUrl({ name: 'Kurt Magbanua', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }), corFileName: 'cor-kurt.svg' },
  ],
  quizzes: [
    { id: 'q1', title: 'HTML Basics', classId: 'c1', type: 'multiple-choice', due: '2025-06-20T23:59', points: 50, timeLimit: 30, questions: 5, submissions: ['s1','s2'] },
    { id: 'q2', title: 'CSS Fundamentals', classId: 'c1', type: 'fill-blank', due: '2025-06-25T23:59', points: 40, timeLimit: 20, questions: 4, submissions: ['s1'] },
  ],
  assignments: [
    { id: 'a1', title: 'HTML Portfolio Page', classId: 'c1', due: '2025-06-30T23:59', instructions: 'Build a personal portfolio using only HTML and CSS.', maxScore: 100, fileType: 'any', submissions: [{ studentId: 's1', file: 'ana_portfolio.zip', score: 92, comment: 'Excellent work!' }, { studentId: 's2', file: 'carlo_portfolio.zip', score: null, comment: '' }] },
    { id: 'a3', title: 'Linked List Implementation', classId: 'c3', due: '2025-07-05T23:59', instructions: 'Implement a doubly linked list in your language of choice.', maxScore: 100, fileType: 'zip', submissions: [] },
  ],
  currentQuizType: 'multiple-choice',
  questionCount: 0,
};

const avatarColors = ['#2D6A4F','#3F619D','#E63946','#7B2FBE','#FF6B35','#1B7A68'];
const HARD_CODED_STUDENTS = [
  { id: 's1', name: 'Marianne Ocampo', classId: 'c1', email: 'marianne@student.edu', status: 'approved', avg: 88, quizzesDone: 6, assignmentsDone: 4, totalPts: 520, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }, corImage: makeCorSvgDataUrl({ name: 'Marianne Ocampo', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }), corFileName: 'cor-marianne.svg' },
  { id: 's2', name: 'Kurt Magbanua', classId: 'c1', email: 'kurt@student.edu', status: 'approved', avg: 75, quizzesDone: 5, assignmentsDone: 3, totalPts: 440, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }, corImage: makeCorSvgDataUrl({ name: 'Kurt Magbanua', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }), corFileName: 'cor-kurt.svg' },
  { id: 's3', name: 'Aviv Perez', classId: 'c1', email: 'aviv@student.edu', status: 'approved', avg: 92, quizzesDone: 7, assignmentsDone: 5, totalPts: 610, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }, corImage: makeCorSvgDataUrl({ name: 'Aviv Perez', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }), corFileName: 'cor-aviv.svg' },
  { id: 's4', name: 'Waj Sanchez', classId: 'c1', email: 'waj@student.edu', status: 'approved', avg: 50, quizzesDone: 4, assignmentsDone: 2, totalPts: 300, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }, corImage: makeCorSvgDataUrl({ name: 'Waj Sanchez', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }), corFileName: 'cor-waj.svg' },
  { id: 's5', name: 'Christiaan Jala', classId: 'c3', email: 'tintan@student.edu', status: 'approved', avg: 95, quizzesDone: 8, assignmentsDone: 5, totalPts: 640, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }, corImage: makeCorSvgDataUrl({ name: 'Christiaan Jala', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }), corFileName: 'cor-christiaan.svg' },
  { id: 's6', name: 'Jessa Alvarez', classId: 'c1', email: 'jessa@student.edu', status: 'pending', avg: 0, quizzesDone: 0, assignmentsDone: 0, totalPts: 0, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }, corImage: makeCorSvgDataUrl({ name: 'Jessa Alvarez', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }), corFileName: 'cor-jessa.svg' },
  { id: 's7', name: 'Patrick Climaco', classId: 'c3', email: 'pat@student.edu', status: 'pending', avg: 0, quizzesDone: 0, assignmentsDone: 0, totalPts: 0, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }, corImage: makeCorSvgDataUrl({ name: 'Patrick Climaco', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }), corFileName: 'cor-patrick.svg' },
  { id: 's8', name: 'Aaron Perez', classId: 'c3', email: 'aaron@student.edu', status: 'pending', avg: 0, quizzesDone: 0, assignmentsDone: 0, totalPts: 0, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }, corImage: makeCorSvgDataUrl({ name: 'Aaron Perez', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }), corFileName: 'cor-aaron.svg' },
  { id: 's9', name: 'Luna Santos', classId: 'c1', email: 'luna@student.edu', status: 'pending', avg: 0, quizzesDone: 0, assignmentsDone: 0, totalPts: 0, academicInfo: { course: 'BSCS', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }, corImage: makeCorSvgDataUrl({ name: 'Luna Santos', course: 'BSCS', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }), corFileName: 'cor-luna.svg' },
  { id: 's10', name: 'Paolo Reyes', classId: 'c3', email: 'paolo@student.edu', status: 'pending', avg: 0, quizzesDone: 0, assignmentsDone: 0, totalPts: 0, academicInfo: { course: 'BSCS', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }, corImage: makeCorSvgDataUrl({ name: 'Paolo Reyes', course: 'BSCS', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }), corFileName: 'cor-paolo.svg' },
  { id: 's11', name: 'Aira Dela Cruz', classId: 'c1', email: 'aira@student.edu', status: 'approved', avg: 81, quizzesDone: 3, assignmentsDone: 2, totalPts: 210, academicInfo: { course: 'BSEMC', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }, corImage: makeCorSvgDataUrl({ name: 'Aira Dela Cruz', course: 'BSEMC', schoolYear: '2024–2025', yearLevel: '3', section: 'A' }), corFileName: 'cor-aira.svg' },
  { id: 's12', userId: 'seed-student-1', name: 'Marianne Ocampo', classId: 'c3', email: 'marianne@student.edu', status: 'approved', avg: 90, quizzesDone: 7, assignmentsDone: 5, totalPts: 560, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }, corImage: makeCorSvgDataUrl({ name: 'Marianne Ocampo', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }), corFileName: 'cor-marianne.svg' },
  { id: 's13', userId: 'seed-student-2', name: 'Kurt Magbanua', classId: 'c3', email: 'kurt@student.edu', status: 'approved', avg: 78, quizzesDone: 6, assignmentsDone: 4, totalPts: 470, academicInfo: { course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }, corImage: makeCorSvgDataUrl({ name: 'Kurt Magbanua', course: 'BSIT', schoolYear: '2024–2025', yearLevel: '3', section: 'B' }), corFileName: 'cor-kurt.svg' },
];

const STORAGE_KEY = 'asrs_users';
const ACTIVE_USER_KEY = 'asrs_active_user';
const APP_DB_KEY = 'asrs_app_db';
let localStudentsImported = false;
const PAGE_SIZE = { classes: 6, students: 8, quizzes: 5, assignments: 5 };
const paginationState = { classes: 1, students: 1, quizzes: 1, assignments: 1 };

function loadPersistedDb() {
  try {
    const raw = localStorage.getItem(APP_DB_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.classes)) db.classes = parsed.classes;
    if (Array.isArray(parsed.students)) db.students = parsed.students;
    if (Array.isArray(parsed.quizzes)) db.quizzes = parsed.quizzes;
    if (Array.isArray(parsed.assignments)) db.assignments = parsed.assignments;
  } catch (err) {
    // Ignore malformed stored data and keep defaults.
  }
}

function ensureHardcodedStudents() {
  if (!Array.isArray(db.students)) db.students = [];
  const byId = new Map(db.students.map(student => [String(student.id), student]));
  let changed = false;

  HARD_CODED_STUDENTS.forEach((seed) => {
    const key = String(seed.id);
    const existing = byId.get(key);
    if (!existing) {
      db.students.push({ ...seed });
      changed = true;
      return;
    }

    // Backfill newly added hardcoded fields (academic info + default COR)
    // for repos that already had these students persisted before this update.
    if (!existing.academicInfo && seed.academicInfo) {
      existing.academicInfo = { ...seed.academicInfo };
      changed = true;
    }
    if (!existing.corImage && seed.corImage) {
      existing.corImage = seed.corImage;
      changed = true;
    }
    if (!existing.corFileName && seed.corFileName) {
      existing.corFileName = seed.corFileName;
      changed = true;
    }
  });

  if (changed) {
    persistDb();
  }
}

function clampPage(page, totalPages) {
  if (totalPages <= 0) return 1;
  return Math.min(Math.max(page, 1), totalPages);
}

function getPaginatedItems(items, key) {
  const size = PAGE_SIZE[key] || 10;
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / size));
  const current = clampPage(paginationState[key] || 1, totalPages);
  paginationState[key] = current;
  const start = (current - 1) * size;
  return {
    pageItems: items.slice(start, start + size),
    totalItems,
    totalPages,
    current
  };
}

function rerenderPaginatedSection(key) {
  if (key === 'classes') renderClasses();
  if (key === 'students') renderStudentTable();
  if (key === 'quizzes') renderQuizzes();
  if (key === 'assignments') renderAssignments();
}

function renderPagination(targetEl, key, totalItems, totalPages, current) {
  if (!targetEl) return;
  if (totalItems <= 0) {
    targetEl.innerHTML = '';
    return;
  }
  targetEl.innerHTML = `
    <div class="pagination-wrap">
      <div class="pagination-meta">Page ${current} of ${totalPages} · ${totalItems} total</div>
      <div class="pagination-controls">
        <button class="pagination-btn" ${current <= 1 ? 'disabled' : ''} onclick="changePage('${key}', -1)">Previous</button>
        <button class="pagination-btn" ${current >= totalPages ? 'disabled' : ''} onclick="changePage('${key}', 1)">Next</button>
      </div>
    </div>
  `;
}

function ensurePaginationHost(hostId, parentEl) {
  let el = document.getElementById(hostId);
  if (!el && parentEl) {
    el = document.createElement('div');
    el.id = hostId;
    parentEl.appendChild(el);
  }
  return el;
}

function changePage(key, delta) {
  const next = (paginationState[key] || 1) + delta;
  paginationState[key] = Math.max(1, next);
  rerenderPaginatedSection(key);
}

function persistDb() {
  localStorage.setItem(APP_DB_KEY, JSON.stringify({
    classes: db.classes,
    students: db.students,
    quizzes: db.quizzes,
    assignments: db.assignments
  }));
}

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (err) {
    return [];
  }
}

function getActiveUser() {
  const activeId = localStorage.getItem(ACTIVE_USER_KEY);
  if (!activeId) return null;
  return getStoredUsers().find(u => u.id === activeId) || null;
}

function saveStoredUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function updateStoredUserStatus(userId, status) {
  if (!userId) return;
  const users = getStoredUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx >= 0) {
    users[idx].status = status;
    saveStoredUsers(users);
  }
}

function resolveClassIdFromCode(code) {
  if (!code) return null;
  const normalized = code.trim().toUpperCase();
  const cls = db.classes.find(c => c.code.toUpperCase() === normalized);
  return cls ? cls.id : null;
}

function importRegisteredStudents() {
  if (localStudentsImported) return;
  let changed = false;
  const users = getStoredUsers().filter(u => u.role === 'student' && u.status !== 'rejected' && u.classCode && u.classCode.trim());
  users.forEach(u => {
    const resolvedClassId = resolveClassIdFromCode(u.classCode);
    if (!resolvedClassId) return;
    // If the student already has membership records in db.students (created via join-class),
    // don't overwrite classId/classCode by the single user.classCode value.
    if (db.students.some(s => String(s.userId) === String(u.id))) return;
    const existing = db.students.find(s => s.email.toLowerCase() === u.email.toLowerCase());
    if (existing) {
      const before = JSON.stringify(existing);
      existing.userId = existing.userId || u.id;
      existing.corImage = existing.corImage || u.corImage;
      existing.corFileName = existing.corFileName || u.corFileName;
      existing.classCode = existing.classCode || u.classCode;
      existing.status = existing.status || 'pending';
      existing.classId = resolvedClassId;
      if (before !== JSON.stringify(existing)) changed = true;
      return;
    }
    db.students.push({
      id: 'ls-' + u.id,
      userId: u.id,
      name: u.fullName,
      classId: resolvedClassId,
      classCode: u.classCode || '',
      email: u.email,
      status: 'pending',
      avg: 0,
      quizzesDone: 0,
      assignmentsDone: 0,
      totalPts: 0,
      corImage: u.corImage || '',
      corFileName: u.corFileName || ''
    });
    changed = true;
  });
  localStudentsImported = true;
  if (changed) persistDb();
}

// ===== AUTH =====
function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t,i) => t.classList.toggle('active', (i===0 && tab==='login') || (i===1 && tab==='register')));
  document.getElementById('tab-login').style.display = tab==='login' ? 'block' : 'none';
  document.getElementById('tab-register').style.display = tab==='register' ? 'block' : 'none';
}

function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-password').value;
  const err = document.getElementById('login-error');
  if (!email || !pass) { err.classList.add('show'); return; }
  const name = email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
  db.teacher = { name, email };
  err.classList.remove('show');
  launchApp();
}

function handleRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-password').value;
  const school = document.getElementById('reg-school').value.trim();
  const err = document.getElementById('reg-error');
  if (!name||!email||!pass||!school) { err.classList.add('show'); err.textContent='Please fill in all fields.'; return; }
  db.teacher = { name, email };
  err.classList.remove('show');
  launchApp();
}

function tryAutoLogin() {
  const user = getActiveUser();
  if (user && user.role === 'teacher') {
    db.teacher = { name: user.fullName, email: user.email };
    launchApp();
    return;
  }
  window.location.href = 'login.html';
}

function computeInitials(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  const initials = parts.map(w => w[0]).join('').substring(0, 2).toUpperCase();
  return initials || 'T';
}

function applyTeacherIdentityUI() {
  const name = db.teacher?.name || 'Teacher';
  const initials = computeInitials(name);
  const sidebarAvatar = document.getElementById('sidebar-avatar');
  const topbarAvatar = document.getElementById('topbar-avatar');
  const sidebarName = document.getElementById('sidebar-name');
  const dashName = document.getElementById('dash-name');
  if (sidebarAvatar) sidebarAvatar.textContent = initials;
  if (topbarAvatar) topbarAvatar.textContent = initials;
  if (sidebarName) sidebarName.textContent = name;
  if (dashName) dashName.textContent = String(name).split(' ')[0] || 'Teacher';
}

function launchApp() {
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('app').classList.add('visible');
  applyTeacherIdentityUI();
  importRegisteredStudents();
  populateClassSelects();
  renderAll();
}

function handleLogout() {
  localStorage.removeItem(ACTIVE_USER_KEY);
  db.teacher = null;
  window.location.href = 'login.html';
}

// ===== NAVIGATION =====
function navigate(page, el) {
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  if(el) el.classList.add('active');
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  const titles = { dashboard:'Dashboard', classes:'My Classes', students:'Students', notifications:'Notifications', profile:'My Profile', quizzes:'Quizzes', assignments:'Assignments', rankings:'Rankings & Scores' };
  document.getElementById('topbar-title').textContent = titles[page] || page;
  if(page==='students') renderStudentTable();
  if(page==='notifications') renderNotifications();
  if(page==='rankings') renderRankings();
  if(page==='classes') renderClasses();
  if(page==='profile') renderTeacherProfile();
  if(page==='quizzes') renderQuizzes();
  if(page==='assignments') renderAssignments();
}

function openTeacherProfileFromHeader() {
  try { document.activeElement && document.activeElement.blur && document.activeElement.blur(); } catch (e) {}
  navigate('profile', null);
}

// ===== RENDER ALL =====
function renderAll() {
  renderDashboard();
  renderClasses();
  renderNotifications();
  renderQuizzes();
  renderAssignments();
  renderStudentTable();
  renderRankings();
  renderTeacherProfile();
}

function renderTeacherProfile() {
  const user = getActiveUser();
  if (!user || user.role !== 'teacher') return;

  const nameEl = document.getElementById('tprof-name');
  const emailEl = document.getElementById('tprof-email');
  const schoolEl = document.getElementById('tprof-school');
  const tidEl = document.getElementById('tprof-teacherid');
  if (!nameEl || !emailEl || !schoolEl || !tidEl) return;

  nameEl.value = user.fullName || '';
  emailEl.value = user.email || '';
  schoolEl.value = user.school || '';
  tidEl.value = user.teacherId || '';
}

function saveTeacherProfile() {
  const user = getActiveUser();
  if (!user || user.role !== 'teacher') { showToast('Please sign in as a teacher.'); return; }

  const name = (document.getElementById('tprof-name')?.value || '').trim();
  const school = (document.getElementById('tprof-school')?.value || '').trim();
  const teacherId = (document.getElementById('tprof-teacherid')?.value || '').trim();
  if (!name) { showToast('Name is required.'); return; }

  const users = getStoredUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx < 0) { showToast('Account not found.'); return; }

  users[idx].fullName = name;
  users[idx].school = school;
  users[idx].teacherId = teacherId;
  saveStoredUsers(users);

  db.teacher = { name, email: users[idx].email };
  applyTeacherIdentityUI();
  showToast('Profile updated.');
}

function changeTeacherPassword() {
  const user = getActiveUser();
  if (!user || user.role !== 'teacher') { showToast('Please sign in as a teacher.'); return; }

  const current = document.getElementById('tprof-current-pass')?.value || '';
  const next = document.getElementById('tprof-new-pass')?.value || '';
  const confirmPwd = document.getElementById('tprof-confirm-pass')?.value || '';

  if (!current || !next || !confirmPwd) { showToast('Please complete all password fields.'); return; }
  if (next.length < 8) { showToast('New password must be at least 8 characters.'); return; }
  if (next !== confirmPwd) { showToast('New passwords do not match.'); return; }

  const users = getStoredUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx < 0) { showToast('Account not found.'); return; }
  if (users[idx].password !== current) { showToast('Current password is incorrect.'); return; }

  users[idx].password = next;
  saveStoredUsers(users);

  const cEl = document.getElementById('tprof-current-pass');
  const nEl = document.getElementById('tprof-new-pass');
  const cfEl = document.getElementById('tprof-confirm-pass');
  if (cEl) cEl.value = '';
  if (nEl) nEl.value = '';
  if (cfEl) cfEl.value = '';

  showToast('Password updated.');
}

// ===== DASHBOARD =====
function renderDashboard() {
  const activities = [
    { icon:'📝', text:'Marianne Ocampo submitted <b>HTML Portfolio Page</b>', time:'2 hrs ago', color:'var(--green-pale)' },
    { icon:'✅', text:'Kurt Magbanua completed <b>HTML Basics Quiz</b>', time:'4 hrs ago', color:'var(--gold-light)' },
    { icon:'📤', text:'Aviv Perez submitted <b>HTML Portfolio Page</b>', time:'Yesterday', color:'var(--blue-light)' },
    { icon:'🔔', text:'Christian Jala requested to join <b>Web Development</b>', time:'2 days ago', color:'var(--red-light)' },
  ];
  document.getElementById('recent-activity').innerHTML = activities.map(a=>`
    <div style="display:flex;align-items:flex-start;gap:12px;padding:11px 0;border-bottom:1px solid var(--border);">
      <div style="width:36px;height:36px;border-radius:10px;background:${a.color};display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">${a.icon}</div>
      <div style="flex:1;">
        <div style="font-size:13.5px;color:var(--text-dark);">${a.text}</div>
        <div style="font-size:11.5px;color:var(--text-soft);margin-top:3px;">${a.time}</div>
      </div>
    </div>
  `).join('');

  const pending = db.students.filter(s=>s.status==='pending');
  document.getElementById('pending-badge').textContent = pending.length;
  document.getElementById('pending-list').innerHTML = pending.length ? pending.map(s=>`
    <div class="approval-card">
      <div class="student-avatar-sm" style="background:${avatarColors[s.id.charCodeAt(1)%avatarColors.length]};color:#fff;font-family:'DM Sans',sans-serif;font-weight:800;">${s.name[0]}</div>
      <div class="approval-info">
        <div class="approval-name">${s.name}</div>
        <div class="approval-meta">Wants to join <b>${getClassName(s.classId)}</b></div>
      </div>
      <div class="approval-actions">
        <button class="btn-approve" onclick="approveStudent('${s.id}')">✓ Approve</button>
        <button class="btn-reject" onclick="rejectStudent('${s.id}')">✕</button>
      </div>
    </div>
  `).join('') : '<div class="empty-state" style="padding:24px;"><div style="font-size:32px;">🎉</div><div style="font-size:14px;color:var(--text-soft);margin-top:8px;">No pending approvals!</div></div>';

  const classNames = db.classes.map(c=>c.name.split(' ')[0]);
  const avgs = db.classes.map(c=>{
    const sts = db.students.filter(s=>s.classId===c.id && s.status==='approved');
    return sts.length ? Math.round(sts.reduce((a,s)=>a+s.avg,0)/sts.length) : 0;
  });
  const maxVal = Math.max(...avgs, 1);
  document.getElementById('perf-chart').innerHTML = avgs.map((v,i)=>`
    <div class="bar-col">
      <div class="bar-val">${v}%</div>
      <div class="bar" style="height:${(v/maxVal)*80}px;background:linear-gradient(180deg,var(--green-light),var(--green-mid));"></div>
      <div class="bar-lbl">${classNames[i]}</div>
    </div>
  `).join('');

  const now = new Date();
  const soon = [...db.quizzes, ...db.assignments].filter(i=>{
    const d = new Date(i.due);
    const diff = (d-now)/(1000*3600*24);
    return diff>=0 && diff<=7;
  }).sort((a,b)=>new Date(a.due)-new Date(b.due));
  document.getElementById('due-soon-list').innerHTML = soon.slice(0,5).map(i=>{
    const d = new Date(i.due);
    const diff = Math.ceil((d-now)/(1000*3600*24));
    const type = i.questions !== undefined ? 'Quiz':'Assignment';
    const chipClass = diff<=1?'due-late':diff<=3?'due-soon':'due-ok';
    return `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);">
        <div style="font-size:20px;">${type==='Quiz'?'📝':'📋'}</div>
        <div style="flex:1;">
          <div style="font-size:13.5px;font-weight:600;color:var(--text-dark);">${i.title}</div>
          <div style="font-size:12px;color:var(--text-soft);">${getClassName(i.classId)}</div>
        </div>
        <span class="due-chip ${chipClass}">${diff===0?'Today':diff===1?'Tomorrow':'In '+diff+'d'}</span>
      </div>
    `;
  }).join('') || '<div style="text-align:center;padding:24px;color:var(--text-soft);font-size:13px;">No upcoming due dates</div>';
}

function renderNotifications() {
  const listEl = document.getElementById('notifications-list');
  if (!listEl) return;
  const now = new Date();
  const pending = db.students.filter(s => s.status === 'pending');
  const dueSoon = [...db.quizzes, ...db.assignments]
    .filter(item => {
      const dueDate = new Date(item.due);
      const diff = (dueDate - now) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 5;
    })
    .sort((a,b)=>new Date(a.due)-new Date(b.due));
  const latestSubmissions = db.assignments.flatMap(a =>
    (a.submissions || []).map(sub => ({ ...sub, assignmentTitle: a.title }))
  ).slice(-5).reverse();

  const cards = [];
  pending.forEach(s => cards.push({
    icon: '⏳',
    title: 'Pending student approval',
    desc: `${s.name} is waiting to be reviewed for ${getClassName(s.classId)}.`,
    tone: 'var(--gold-light)'
  }));
  dueSoon.forEach(i => cards.push({
    icon: i.questions !== undefined ? '📝' : '📋',
    title: 'Upcoming deadline',
    desc: `${i.title} is due on ${formatDate(i.due)} (${getClassName(i.classId)}).`,
    tone: 'var(--blue-light)'
  }));
  latestSubmissions.forEach(sub => {
    const student = db.students.find(s => s.id === sub.studentId);
    cards.push({
      icon: '📤',
      title: 'New assignment submission',
      desc: `${student?.name || 'A student'} submitted "${sub.file}" for ${sub.assignmentTitle}.`,
      tone: 'var(--green-pale)'
    });
  });

  if (!cards.length) {
    listEl.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🔔</div><h4>No notifications</h4><p>You're all caught up.</p></div>`;
    return;
  }

  listEl.innerHTML = cards.map(c => `
    <div class="card" style="margin-bottom:12px;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:40px;height:40px;border-radius:10px;background:${c.tone};display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">${c.icon}</div>
        <div>
          <div style="font-size:14px;font-weight:700;color:var(--text-dark);">${c.title}</div>
          <div style="font-size:12.5px;color:var(--text-soft);margin-top:3px;">${c.desc}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== CLASSES =====
function renderClasses() {
  const page = getPaginatedItems(db.classes, 'classes');
  document.getElementById('classes-grid').innerHTML = page.pageItems.map(c=>{
    const sts = db.students.filter(s=>s.classId===c.id);
    const approved = sts.filter(s=>s.status==='approved').length;
    const pending = sts.filter(s=>s.status==='pending').length;
    return `
      <div class="class-card">
        <div class="class-card-banner" style="background:${c.color};"></div>
        <div class="class-card-body">
          <div class="class-card-code">🔑 ${c.code}</div>
          <div class="class-card-name">${c.name}</div>
          <div class="class-card-section">${c.section} · ${c.sem}</div>
          <div class="class-card-stats">
            <div class="class-stat"><div class="class-stat-num">${approved}</div><div class="class-stat-lbl">Students</div></div>
            <div class="class-stat"><div class="class-stat-num">${db.quizzes.filter(q=>q.classId===c.id).length}</div><div class="class-stat-lbl">Quizzes</div></div>
            <div class="class-stat"><div class="class-stat-num">${db.assignments.filter(a=>a.classId===c.id).length}</div><div class="class-stat-lbl">Assignments</div></div>
            ${pending>0?`<div class="class-stat"><div class="class-stat-num" style="color:var(--red);">${pending}</div><div class="class-stat-lbl" style="color:var(--red);">Pending</div></div>`:''}
          </div>
          <div class="class-card-actions">
            <button class="btn-sm btn-outline" style="font-size:12px;padding:7px 12px;" onclick="openClassStudentsModal('${c.id}')">👥 Students</button>
            <button class="btn-sm btn-outline" style="font-size:12px;padding:7px 12px;" onclick="openEditClassModal('${c.id}')">✏ Edit</button>
            <button class="btn-sm btn-red" style="font-size:12px;padding:7px 12px;" onclick="deleteClass('${c.id}')">Delete</button>
            <button class="btn-sm" style="background:${c.color};color:#fff;font-size:12px;padding:7px 12px;" onclick="copyCode('${c.code}')">📋 Copy Code</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  const pager = ensurePaginationHost('classes-pagination', document.getElementById('page-classes'));
  renderPagination(pager, 'classes', page.totalItems, page.totalPages, page.current);
}

function openClassStudentsModal(cid) {
  const cls = db.classes.find(c => c.id === cid);
  if (!cls) return;
  const enrolled = db.students.filter(s => s.classId === cid && s.status === 'approved');
  document.getElementById('class-students-title').textContent = `👥 ${cls.name} (${cls.section})`;
  document.getElementById('class-students-body').innerHTML = enrolled.length ? `
    <div style="display:grid;gap:10px;">
      ${enrolled.map(s => `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--border);border-radius:10px;background:var(--cream);">
          <div class="student-avatar-sm" style="width:34px;height:34px;background:${avatarColors[s.id.charCodeAt(1)%avatarColors.length]};color:#fff;font-family:'DM Sans',sans-serif;font-weight:800;font-size:13px;border-radius:50%;display:flex;align-items:center;justify-content:center;">${s.name[0]}</div>
          <div style="flex:1;">
            <div style="font-weight:700;color:var(--text-dark);font-size:13.5px;">${s.name}</div>
            <div style="font-size:12px;color:var(--text-soft);">${s.email}</div>
          </div>
          <span class="status-pill status-done">✓ Enrolled</span>
        </div>
      `).join('')}
    </div>
  ` : `<div class="empty-state" style="padding:24px;"><div class="empty-state-icon">👥</div><h4>No enrolled students</h4><p>Students will appear here after joining this class code.</p></div>`;
  openModal('modal-class-students');
}

function copyCode(code) {
  navigator.clipboard?.writeText(code).catch(()=>{});
  showToast('Class code "'+code+'" copied!');
}

function filterByClass(cid) {
  document.getElementById('student-filter-class').value = cid;
  renderStudentTable();
}

// ===== STUDENTS =====
function renderStudentTable() {
  const cf = document.getElementById('student-filter-class').value;
  const sf = document.getElementById('student-filter-status').value;
  const filtered = db.students.filter(s=>{
    const classOk = cf==='all' || s.classId===cf;
    const statusOk = sf==='all' || s.status===sf;
    return classOk && statusOk;
  });
  const page = getPaginatedItems(filtered, 'students');
  document.getElementById('student-tbody').innerHTML = filtered.length ? page.pageItems.map(s=>`
    <tr>
      <td><div class="student-name-cell">
        <div class="student-avatar-sm" style="background:${avatarColors[s.id.charCodeAt(1)%avatarColors.length]};color:#fff;font-family:'DM Sans',sans-serif;font-weight:800;">${s.name[0]}</div>
        <div><div style="font-weight:600;">${s.name}</div><div style="font-size:11.5px;color:var(--text-soft);">${s.email}</div></div>
      </div></td>
      <td><span style="font-size:12px;font-weight:600;color:var(--green-deep);">${getClassName(s.classId)}</span></td>
      <td><span style="font-weight:700;color:${s.avg>=75?'var(--green-mid)':s.avg>=50?'#8a6000':'var(--red)'};">${s.avg>0?s.avg+'%':'—'}</span></td>
      <td><div style="display:flex;align-items:center;gap:8px;"><div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${s.avg}%;"></div></div><span style="font-size:12px;color:var(--text-soft);">${s.avg}%</span></div></td>
      <td><span style="font-weight:600;">${s.quizzesDone}</span></td>
      <td><span class="status-pill ${s.status==='approved'?'status-done':'status-pending'}">${s.status==='approved'?'✓ Enrolled':'⏳ Pending'}</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn-view" onclick="openStudentProfile('${s.id}')">View</button>
          <button class="btn-view" onclick="openEditStudentModal('${s.id}')">Edit</button>
          <button class="btn-sm btn-red" style="font-size:12px;padding:7px 10px;" onclick="deleteStudentRecord('${s.id}')">Delete</button>
          ${s.status==='pending'?`
            <button class="btn-approve" onclick="approveStudent('${s.id}')">Approve</button>
            <button class="btn-reject" onclick="rejectStudent('${s.id}')">Reject</button>
          `:`<span style="font-size:12px;color:var(--text-soft);">Active</span>`}
        </div>
      </td>
    </tr>
  `).join('') : `<tr><td colspan="7"><div class="empty-state"><div class="empty-state-icon">🔍</div><h4>No students found</h4><p>Adjust your filters</p></div></td></tr>`;
  const studentsCard = document.querySelector('#page-students .card');
  const pager = ensurePaginationHost('students-pagination', studentsCard);
  renderPagination(pager, 'students', page.totalItems, page.totalPages, page.current);
}

function approveStudent(id) {
  const s = db.students.find(s=>s.id===id);
  if(s) {
    s.status='approved';
    updateStoredUserStatus(s.userId, 'approved');
    persistDb();
    renderAll();
    showToast(s.name+' approved!');
  }
}

function rejectStudent(id) {
  const idx = db.students.findIndex(s=>s.id===id);
  const name = db.students[idx]?.name;
  if(idx>=0) {
    const userId = db.students[idx].userId;
    updateStoredUserStatus(userId, 'rejected');
    db.students.splice(idx,1);
    persistDb();
    renderAll();
    showToast(name+' removed from request.');
  }
}

function openCreateStudentModal() {
  document.getElementById('student-form-title').textContent = 'Add Student';
  document.getElementById('student-form-id').value = '';
  document.getElementById('student-form-name').value = '';
  document.getElementById('student-form-email').value = '';
  document.getElementById('student-form-status').value = 'approved';
  populateStudentClassSelect();
  openModal('modal-student-form');
}

function openEditStudentModal(studentId) {
  const s = db.students.find(st => st.id === studentId);
  if (!s) return;
  document.getElementById('student-form-title').textContent = 'Edit Student';
  document.getElementById('student-form-id').value = s.id;
  document.getElementById('student-form-name').value = s.name || '';
  document.getElementById('student-form-email').value = s.email || '';
  document.getElementById('student-form-status').value = s.status || 'approved';
  populateStudentClassSelect();
  document.getElementById('student-form-class').value = s.classId || '';
  openModal('modal-student-form');
}

function populateStudentClassSelect() {
  const el = document.getElementById('student-form-class');
  if (!el) return;
  el.innerHTML = db.classes.map(c => `<option value="${c.id}">${c.name} (${c.section})</option>`).join('');
}

function saveStudentForm() {
  const id = document.getElementById('student-form-id').value;
  const name = document.getElementById('student-form-name').value.trim();
  const email = document.getElementById('student-form-email').value.trim();
  const classId = document.getElementById('student-form-class').value;
  const status = document.getElementById('student-form-status').value;
  if (!name || !email || !classId) {
    showToast('Please complete student details.');
    return;
  }
  const cls = db.classes.find(c => c.id === classId);
  const classCode = cls?.code || '';
  if (id) {
    const s = db.students.find(st => st.id === id);
    if (!s) return;
    s.name = name;
    s.email = email;
    s.classId = classId;
    s.classCode = classCode;
    s.status = status;
  } else {
    db.students.push({
      id: 's' + Date.now(),
      userId: '',
      name,
      classId,
      classCode,
      email,
      status,
      avg: 0,
      quizzesDone: 0,
      assignmentsDone: 0,
      totalPts: 0,
      corImage: '',
      corFileName: ''
    });
  }
  persistDb();
  closeModal('modal-student-form');
  renderAll();
  showToast('Student saved.');
}

function deleteStudentRecord(studentId) {
  const s = db.students.find(st => st.id === studentId);
  if (!s) return;
  if (!confirm(`Delete student ${s.name}?`)) return;
  db.students = db.students.filter(st => st.id !== studentId);
  db.assignments.forEach(a => {
    a.submissions = (a.submissions || []).filter(sub => sub.studentId !== studentId);
  });
  db.quizzes.forEach(q => {
    q.submissions = (q.submissions || []).filter(sub => sub !== studentId);
  });
  persistDb();
  renderAll();
  showToast('Student deleted.');
}

function openEditClassModal(classId) {
  const c = db.classes.find(cls => cls.id === classId);
  if (!c) return;
  document.getElementById('edit-cls-id').value = c.id;
  document.getElementById('edit-cls-name').value = c.name || '';
  document.getElementById('edit-cls-section').value = c.section || '';
  document.getElementById('edit-cls-year').value = c.year || '';
  document.getElementById('edit-cls-sem').value = c.sem || '1st Semester';
  document.getElementById('edit-cls-desc').value = c.desc || '';
  document.getElementById('edit-cls-color').value = c.color || 'var(--green-mid)';
  openModal('modal-edit-class');
}

function saveClassChanges() {
  const classId = document.getElementById('edit-cls-id').value;
  const c = db.classes.find(cls => cls.id === classId);
  if (!c) return;
  const name = document.getElementById('edit-cls-name').value.trim();
  const section = document.getElementById('edit-cls-section').value.trim();
  if (!name || !section) {
    showToast('Class name and section are required.');
    return;
  }
  c.name = name;
  c.section = section;
  c.year = document.getElementById('edit-cls-year').value.trim();
  c.sem = document.getElementById('edit-cls-sem').value;
  c.desc = document.getElementById('edit-cls-desc').value.trim();
  c.color = document.getElementById('edit-cls-color').value;
  persistDb();
  closeModal('modal-edit-class');
  populateClassSelects();
  renderAll();
  showToast('Class updated.');
}

function deleteClass(classId) {
  const c = db.classes.find(cls => cls.id === classId);
  if (!c) return;
  if (!confirm(`Delete class ${c.name}? This also removes linked students, quizzes, and assignments.`)) return;
  db.classes = db.classes.filter(cls => cls.id !== classId);
  const removedStudentIds = db.students.filter(s => s.classId === classId).map(s => s.id);
  db.students = db.students.filter(s => s.classId !== classId);
  db.quizzes = db.quizzes.filter(q => q.classId !== classId);
  db.assignments = db.assignments.filter(a => a.classId !== classId);
  const users = getStoredUsers();
  let usersChanged = false;
  users.forEach(u => {
    if ((u.classCode || '').toUpperCase() === (c.code || '').toUpperCase()) {
      u.classCode = '';
      usersChanged = true;
    }
  });
  if (usersChanged) saveStoredUsers(users);
  // Ensure no lingering submissions from removed students.
  if (removedStudentIds.length) {
    db.assignments.forEach(a => {
      a.submissions = (a.submissions || []).filter(sub => !removedStudentIds.includes(sub.studentId));
    });
    db.quizzes.forEach(q => {
      q.submissions = (q.submissions || []).filter(sub => !removedStudentIds.includes(sub));
    });
  }
  persistDb();
  populateClassSelects();
  renderAll();
  showToast('Class deleted.');
}

function openStudentProfile(id) {
  const s = db.students.find(st => st.id === id);
  if (!s) return;
  const user = (getStoredUsers() || []).find(u => String(u.id) === String(s.userId)) || null;
  const hardcodedSeed = HARD_CODED_STUDENTS.find(seed => String(seed.id) === String(s.id)) || null;
  const ai = s.academicInfo || user?.academicInfo || hardcodedSeed?.academicInfo || null;
  const effectiveCorImage = s.corImage || user?.corImage || hardcodedSeed?.corImage || '';
  const effectiveCorFileName = s.corFileName || user?.corFileName || hardcodedSeed?.corFileName || '';

  // Self-heal old persisted records missing newly added fields.
  let healed = false;
  if (!s.academicInfo && ai) { s.academicInfo = { ...ai }; healed = true; }
  if (!s.corImage && effectiveCorImage) { s.corImage = effectiveCorImage; healed = true; }
  if (!s.corFileName && effectiveCorFileName) { s.corFileName = effectiveCorFileName; healed = true; }
  if (healed) persistDb();

  const className = getClassName(s.classId);
  const statusLabel = s.status === 'approved' ? 'Enrolled' : 'Pending';
  const statusClass = s.status === 'approved' ? 'status-done' : 'status-pending';
  const avatarSeed = (s.email || s.name || 'S').charCodeAt(0);
  const avatarColor = avatarColors[Math.abs(avatarSeed) % avatarColors.length];
  const classCode = s.classCode || db.classes.find(c => c.id === s.classId)?.code || 'N/A';
  const corContent = effectiveCorImage
    ? `<img src="${effectiveCorImage}" alt="COR for ${s.name}">`
    : `<div>No COR image uploaded.</div>`;
  const actions = s.status === 'pending'
    ? `<div class="profile-actions">
         <button class="btn-approve" onclick="approveStudent('${s.id}');closeModal('modal-student-profile')">Approve</button>
         <button class="btn-reject" onclick="rejectStudent('${s.id}');closeModal('modal-student-profile')">Reject</button>
       </div>`
    : '';

  document.getElementById('student-profile-title').textContent = s.name;
  document.getElementById('student-profile-body').innerHTML = `
    <div class="student-profile">
      <div class="profile-card">
        <div class="profile-header">
          <div class="profile-avatar-lg" style="background:${avatarColor};">${s.name[0]}</div>
          <div>
            <div class="profile-name">${s.name}</div>
            <div class="profile-email">${s.email}</div>
          </div>
        </div>
        <div class="profile-meta">
          <div><span>Class</span>${className}</div>
          <div><span>Class Code</span>${classCode}</div>
          <div><span>Course</span>${ai?.course || '—'}</div>
          <div><span>School Year</span>${ai?.schoolYear || '—'}</div>
          <div><span>Year Level</span>${ai?.yearLevel ? ('Year ' + ai.yearLevel) : '—'}</div>
          <div><span>Section</span>${ai?.section || '—'}</div>
          <div><span>Status</span><span class="status-pill ${statusClass}">${statusLabel}</span></div>
          <div><span>Avg Score</span>${s.avg ? s.avg + '%' : '—'}</div>
          <div><span>Quizzes Done</span>${s.quizzesDone}</div>
        </div>
        ${actions}
      </div>
      <div class="profile-card">
        <div style="font-size:13px;font-weight:700;color:var(--text-dark);margin-bottom:10px;">Certificate of Registration</div>
        <div class="cor-preview">${corContent}</div>
        ${effectiveCorFileName ? `<div style="font-size:12px;color:var(--text-soft);margin-top:8px;">File: ${effectiveCorFileName}</div>` : ''}
      </div>
    </div>
  `;
  openModal('modal-student-profile');
}

// ===== QUIZZES =====
function renderQuizzes() {
  const typeLabel = { 'multiple-choice':'Multiple Choice','identification':'Identification','true-false':'True or False','fill-blank':'Fill in the Blank' };
  const typeColor = { 'multiple-choice':'var(--green-mid)','identification':'var(--blue)','true-false':'#7B2FBE','fill-blank':'var(--gold)' };
  const page = getPaginatedItems(db.quizzes, 'quizzes');
  document.getElementById('quizzes-list').innerHTML = db.quizzes.length ? page.pageItems.map(q=>{
    const cls = db.classes.find(c=>c.id===q.classId);
    const classStudents = db.students.filter(s=>s.classId===q.classId && s.status==='approved');
    const done = q.submissions.length;
    const total = classStudents.length;
    const pct = total>0?Math.round((done/total)*100):0;
    const due = new Date(q.due);
    const now = new Date();
    const isOverdue = due<now;
    return `
      <div class="card" style="margin-bottom:14px;">
        <div style="display:flex;align-items:flex-start;gap:16px;">
          <div style="width:46px;height:46px;border-radius:12px;background:${typeColor[q.type]}22;color:${typeColor[q.type]};display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">📝</div>
          <div style="flex:1;">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">
              <div>
                <div style="font-size:16px;font-weight:700;color:var(--text-dark);">${q.title}</div>
                <div style="font-size:12.5px;color:var(--text-soft);margin-top:3px;">
                  ${cls?.name||'Unknown'} · <span style="color:${typeColor[q.type]};font-weight:600;">${typeLabel[q.type]}</span> · ${q.questions} items · ${q.points} pts · ${q.timeLimit} min
                </div>
              </div>
              <span class="due-chip ${isOverdue?'due-late':'due-ok'}" style="white-space:nowrap;">${isOverdue?'⚠ Overdue':'📅 Due '+formatDate(q.due)}</span>
            </div>
            <div style="margin-top:12px;display:flex;align-items:center;gap:14px;">
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                  <span style="font-size:12px;color:var(--text-soft);font-weight:600;">Completion</span>
                  <span style="font-size:12px;font-weight:700;color:${pct>=75?'var(--green-mid)':pct>=50?'#8a6000':'var(--red)'};">${done}/${total} (${pct}%)</span>
                </div>
                <div style="height:7px;background:var(--cream);border-radius:99px;overflow:hidden;"><div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--green-light),var(--green-mid));border-radius:99px;transition:width .6s;"></div></div>
              </div>
              <button class="btn-sm btn-outline" onclick="openQuizMonitor('${q.id}')">👁 Monitor</button>
              <button class="btn-sm btn-red" style="font-size:12px;padding:7px 12px;" onclick="deleteQuiz('${q.id}')">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('') : `<div class="empty-state"><div class="empty-state-icon">📝</div><h4>No quizzes yet</h4><p>Create your first quiz for students</p></div>`;
  const pager = ensurePaginationHost('quizzes-pagination', document.getElementById('page-quizzes'));
  renderPagination(pager, 'quizzes', page.totalItems, page.totalPages, page.current);
}

function deleteQuiz(id) {
  db.quizzes = db.quizzes.filter(q=>q.id!==id);
  persistDb();
  renderQuizzes();
  showToast('Quiz deleted.');
}

function openQuizMonitor(qid) {
  const q = db.quizzes.find(x=>x.id===qid);
  const classStudents = db.students.filter(s=>s.classId===q.classId && s.status==='approved');
  document.getElementById('quiz-monitor-title').textContent = '📊 ' + q.title;
  document.getElementById('quiz-monitor-body').innerHTML = `
    <div style="margin-bottom:16px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
      <div style="background:var(--green-pale);border-radius:10px;padding:12px 16px;text-align:center;">
        <div style="font-size:22px;font-weight:800;color:var(--green-mid);font-family:'DM Sans',sans-serif;">${q.submissions.length}</div>
        <div style="font-size:12px;color:var(--green-mid);font-weight:600;">Submitted</div>
      </div>
      <div style="background:var(--gold-light);border-radius:10px;padding:12px 16px;text-align:center;">
        <div style="font-size:22px;font-weight:800;color:#8a6000;font-family:'DM Sans',sans-serif;">${classStudents.length-q.submissions.length}</div>
        <div style="font-size:12px;color:#8a6000;font-weight:600;">Not Yet</div>
      </div>
      <div style="background:var(--blue-light);border-radius:10px;padding:12px 16px;text-align:center;">
        <div style="font-size:22px;font-weight:800;color:var(--blue);font-family:'DM Sans',sans-serif;">${classStudents.length}</div>
        <div style="font-size:12px;color:var(--blue);font-weight:600;">Total Students</div>
      </div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:13.5px;">
      <thead><tr>
        <th style="padding:10px 14px;background:var(--cream);color:var(--text-soft);font-size:11px;text-transform:uppercase;letter-spacing:.8px;text-align:left;border-bottom:1px solid var(--border);">Student</th>
        <th style="padding:10px 14px;background:var(--cream);color:var(--text-soft);font-size:11px;text-transform:uppercase;letter-spacing:.8px;text-align:left;border-bottom:1px solid var(--border);">Status</th>
        <th style="padding:10px 14px;background:var(--cream);color:var(--text-soft);font-size:11px;text-transform:uppercase;letter-spacing:.8px;text-align:left;border-bottom:1px solid var(--border);">Score</th>
      </tr></thead>
      <tbody>
        ${classStudents.map(s=>{
          const done = q.submissions.includes(s.id);
          const score = done ? Math.round(60+Math.random()*40) : null;
          return `<tr style="border-bottom:1px solid var(--border);">
            <td style="padding:12px 14px;"><div style="display:flex;align-items:center;gap:10px;"><div style="width:30px;height:30px;border-radius:50%;background:${avatarColors[s.id.charCodeAt(1)%avatarColors.length]};color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;font-family:'DM Sans',sans-serif;">${s.name[0]}</div>${s.name}</div></td>
            <td style="padding:12px 14px;"><span class="status-pill ${done?'status-done':'status-pending'}">${done?'✓ Done':'⏳ Pending'}</span></td>
            <td style="padding:12px 14px;font-weight:700;color:${done?(score>=75?'var(--green-mid)':'var(--red)'):'var(--text-soft)'};">${done?score+' / '+q.points:'—'}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  `;
  openModal('modal-quiz-monitor');
}

// ===== ASSIGNMENTS =====
function renderAssignments() {
  const page = getPaginatedItems(db.assignments, 'assignments');
  document.getElementById('assignments-list').innerHTML = db.assignments.length ? page.pageItems.map(a=>{
    const cls = db.classes.find(c=>c.id===a.classId);
    const classStudents = db.students.filter(s=>s.classId===a.classId && s.status==='approved');
    const done = a.submissions.length;
    const total = classStudents.length;
    const pct = total>0?Math.round((done/total)*100):0;
    const due = new Date(a.due);
    const isOverdue = due < new Date();
    return `
      <div class="assignment-card">
        <div class="assignment-icon" style="background:var(--blue-light);">📋</div>
        <div style="flex:1;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">
            <div>
              <div class="asgn-title">${a.title}</div>
              <div class="asgn-meta">${cls?.name||'Unknown'} · Max Score: ${a.maxScore} pts · <span style="font-size:12px;">${a.fileType==='any'?'Any file':a.fileType.toUpperCase()}</span></div>
            </div>
            <span class="due-chip ${isOverdue?'due-late':'due-ok'}" style="white-space:nowrap;">${isOverdue?'⚠ Overdue':'📅 Due '+formatDate(a.due)}</span>
          </div>
          <div style="margin-top:10px;display:flex;align-items:center;gap:14px;">
            <div style="flex:1;">
              <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                <span style="font-size:12px;color:var(--text-soft);font-weight:600;">Submissions</span>
                <span style="font-size:12px;font-weight:700;">${done}/${total}</span>
              </div>
              <div style="height:7px;background:var(--cream);border-radius:99px;overflow:hidden;"><div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--blue),#5a85c8);border-radius:99px;transition:width .6s;"></div></div>
            </div>
            <button class="btn-sm btn-blue" style="font-size:12px;padding:7px 14px;" onclick="openAsgnMonitor('${a.id}')">👁 View Submissions</button>
            <button class="btn-sm btn-red" style="font-size:12px;padding:7px 12px;" onclick="deleteAssignment('${a.id}')">Delete</button>
          </div>
        </div>
      </div>
    `;
  }).join('') : `<div class="empty-state"><div class="empty-state-icon">📋</div><h4>No assignments yet</h4><p>Create assignments for your students</p></div>`;
  const pager = ensurePaginationHost('assignments-pagination', document.getElementById('page-assignments'));
  renderPagination(pager, 'assignments', page.totalItems, page.totalPages, page.current);
}

function deleteAssignment(id) {
  db.assignments = db.assignments.filter(a=>a.id!==id);
  persistDb();
  renderAssignments();
  showToast('Assignment deleted.');
}

function openAsgnMonitor(aid) {
  const a = db.assignments.find(x=>x.id===aid);
  const classStudents = db.students.filter(s=>s.classId===a.classId && s.status==='approved');
  document.getElementById('asgn-monitor-title').textContent = '📋 ' + a.title;
  document.getElementById('asgn-monitor-body').innerHTML = `
    <p style="font-size:13.5px;color:var(--text-soft);margin-bottom:16px;">${a.instructions}</p>
    <table style="width:100%;border-collapse:collapse;font-size:13.5px;">
      <thead><tr>
        <th style="padding:10px 14px;background:var(--cream);text-align:left;font-size:11px;color:var(--text-soft);font-weight:700;text-transform:uppercase;letter-spacing:.8px;border-bottom:1px solid var(--border);">Student</th>
        <th style="padding:10px 14px;background:var(--cream);text-align:left;font-size:11px;color:var(--text-soft);font-weight:700;text-transform:uppercase;letter-spacing:.8px;border-bottom:1px solid var(--border);">File</th>
        <th style="padding:10px 14px;background:var(--cream);text-align:left;font-size:11px;color:var(--text-soft);font-weight:700;text-transform:uppercase;letter-spacing:.8px;border-bottom:1px solid var(--border);">Score / ${a.maxScore}</th>
        <th style="padding:10px 14px;background:var(--cream);text-align:left;font-size:11px;color:var(--text-soft);font-weight:700;text-transform:uppercase;letter-spacing:.8px;border-bottom:1px solid var(--border);">Comment</th>
        <th style="padding:10px 14px;background:var(--cream);text-align:left;font-size:11px;color:var(--text-soft);font-weight:700;text-transform:uppercase;letter-spacing:.8px;border-bottom:1px solid var(--border);">Action</th>
      </tr></thead>
      <tbody>
        ${classStudents.map(s=>{
          const sub = a.submissions.find(x=>x.studentId===s.id);
          return `<tr style="border-bottom:1px solid var(--border);">
            <td style="padding:12px 14px;"><div style="display:flex;align-items:center;gap:10px;"><div style="width:30px;height:30px;border-radius:50%;background:${avatarColors[s.id.charCodeAt(1)%avatarColors.length]};color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;font-family:'DM Sans',sans-serif;">${s.name[0]}</div>${s.name}</div></td>
            <td style="padding:12px 14px;">${sub?`<span style="font-size:12px;color:var(--blue);font-weight:600;">📎 ${sub.file}</span>`:'<span style="color:var(--text-soft);font-size:12px;">Not submitted</span>'}</td>
            <td style="padding:12px 14px;">${sub?`<input type="number" value="${sub.score||''}" min="0" max="${a.maxScore}" style="width:70px;padding:5px 8px;border:1.5px solid var(--border);border-radius:6px;font-size:13px;" onchange="updateScore('${aid}','${s.id}',this.value)">`:'—'}</td>
            <td style="padding:12px 14px;">${sub?`<input type="text" value="${sub.comment||''}" placeholder="Add comment..." style="padding:5px 10px;border:1.5px solid var(--border);border-radius:6px;font-size:12.5px;width:140px;" onchange="updateComment('${aid}','${s.id}',this.value)">`:'—'}</td>
            <td style="padding:12px 14px;">${sub?`<span class="status-pill status-done">✓ Submitted</span>`:`<span class="status-pill status-missing">Missing</span>`}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  `;
  openModal('modal-asgn-monitor');
}

function updateScore(aid, sid, val) {
  const a = db.assignments.find(x=>x.id===aid);
  const sub = a?.submissions.find(x=>x.studentId===sid);
  if(sub) {
    sub.score = parseInt(val)||null;
    persistDb();
    showToast('Score updated!');
  }
}

function updateComment(aid, sid, val) {
  const a = db.assignments.find(x=>x.id===aid);
  const sub = a?.submissions.find(x=>x.studentId===sid);
  if(sub) {
    sub.comment = val;
    persistDb();
  }
}

// ===== RANKINGS =====
function renderRankings() {
  const cf = document.getElementById('rank-filter').value;
  const sts = db.students.filter(s=>s.status==='approved' && (cf==='all'||s.classId===cf));
  const sorted = [...sts].sort((a,b)=>b.totalPts-a.totalPts);

  document.getElementById('rankings-table').innerHTML = sorted.slice(0,10).map((s,i)=>{
    const medals = ['🥇','🥈','🥉'];
    return `
      <div style="display:flex;align-items:center;gap:14px;padding:11px 0;border-bottom:1px solid var(--border);">
        <div style="font-size:20px;width:28px;text-align:center;">${medals[i]||'#'+(i+1)}</div>
        <div class="student-avatar-sm" style="width:36px;height:36px;background:${avatarColors[s.id.charCodeAt(1)%avatarColors.length]};color:#fff;font-family:'DM Sans',sans-serif;font-weight:800;font-size:14px;border-radius:50%;display:flex;align-items:center;justify-content:center;">${s.name[0]}</div>
        <div style="flex:1;"><div style="font-size:14px;font-weight:700;">${s.name}</div><div style="font-size:12px;color:var(--text-soft);">${getClassName(s.classId)}</div></div>
        <div style="text-align:right;"><div style="font-family:'DM Sans',sans-serif;font-size:18px;font-weight:800;color:var(--green-deep);">${s.totalPts}</div><div style="font-size:11px;color:var(--text-soft);">pts</div></div>
      </div>
    `;
  }).join('') || '<div class="empty-state" style="padding:24px;font-size:13.5px;color:var(--text-soft);">No data yet</div>';

  const ranges = [{'label':'0–20','min':0,'max':20},{'label':'21–40','min':21,'max':40},{'label':'41–60','min':41,'max':60},{'label':'61–80','min':61,'max':80},{'label':'81–100','min':81,'max':100}];
  const counts = ranges.map(r=>sts.filter(s=>s.avg>=r.min&&s.avg<=r.max).length);
  const maxC = Math.max(...counts,1);
  document.getElementById('score-dist-chart').innerHTML = counts.map((c,i)=>`
    <div class="bar-col">
      <div class="bar-val">${c}</div>
      <div class="bar" style="height:${(c/maxC)*110}px;background:${i>=3?'linear-gradient(180deg,var(--green-light),var(--green-mid))':'linear-gradient(180deg,#FFD166,var(--gold))'};">
      </div>
      <div class="bar-lbl">${ranges[i].label}</div>
    </div>
  `).join('');

  document.getElementById('rank-tbody').innerHTML = sorted.map((s,i)=>`
    <tr>
      <td><span class="rank-badge ${i===0?'rank-1':i===1?'rank-2':i===2?'rank-3':'rank-other'}">${i===0?'🥇':i===1?'🥈':i===2?'🥉':'#'+(i+1)}</span></td>
      <td><div class="student-name-cell"><div class="student-avatar-sm" style="width:30px;height:30px;background:${avatarColors[s.id.charCodeAt(1)%avatarColors.length]};color:#fff;font-family:'DM Sans',sans-serif;font-weight:800;font-size:12px;border-radius:50%;display:flex;align-items:center;justify-content:center;">${s.name[0]}</div>${s.name}</div></td>
      <td>${getClassName(s.classId)}</td>
      <td><b style="color:var(--green-deep);">${s.totalPts}</b></td>
      <td>${s.quizzesDone}</td>
      <td>${s.assignmentsDone}</td>
      <td><span style="font-weight:700;color:${s.avg>=75?'var(--green-mid)':s.avg>=50?'#8a6000':'var(--red)'};">${s.avg}%</span></td>
    </tr>
  `).join('') || `<tr><td colspan="7"><div class="empty-state">No student data</div></td></tr>`;
}

// ===== QUIZ BUILDER =====
function selectQuizType(el, type) {
  document.querySelectorAll('.quiz-type-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  db.currentQuizType = type;
  const container = document.getElementById('questions-container');
  const count = container.querySelectorAll('.question-block').length;
  container.innerHTML = '';
  db.questionCount = 0;
  for(let i=0;i<count;i++) addQuestion();
}

function addQuestion() {
  db.questionCount++;
  const n = db.questionCount;
  const type = db.currentQuizType;
  let choicesHtml = '';
  if(type==='multiple-choice') {
    choicesHtml = `<div class="choices-list">${['A','B','C','D'].map((l,i)=>`
      <div class="choice-row">
        <input type="radio" name="correct-${n}" class="choice-radio" value="${i}" title="Mark as correct">
        <input type="text" class="choice-input" placeholder="Option ${l}">
        ${i>1?`<button class="btn-icon" onclick="removeChoice(this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>`:''}
      </div>`).join('')}
      <button class="btn-sm btn-outline" style="font-size:12px;padding:6px 12px;margin-top:6px;width:fit-content;" onclick="addChoice(this,${n})">+ Add Option</button>
    </div>`;
  } else if(type==='true-false') {
    choicesHtml = `<div class="choices-list">
      <div class="choice-row"><input type="radio" name="correct-${n}" class="choice-radio" value="true"><span style="font-size:14px;font-weight:600;color:var(--green-mid);">✓ True</span></div>
      <div class="choice-row"><input type="radio" name="correct-${n}" class="choice-radio" value="false"><span style="font-size:14px;font-weight:600;color:var(--red);">✗ False</span></div>
    </div>`;
  } else if(type==='identification'||type==='fill-blank') {
    choicesHtml = `<div style="margin-top:10px;"><label class="form-label" style="font-size:12px;">Correct Answer</label><input type="text" class="choice-input" placeholder="Enter expected answer..." style="width:100%;padding:9px 12px;"></div>`;
  }

  const div = document.createElement('div');
  div.className = 'question-block';
  div.innerHTML = `
    <div class="question-header">
      <span class="question-num">Question ${n}</span>
      <button class="btn-icon" onclick="this.closest('.question-block').remove();renumberQuestions();">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
      </button>
    </div>
    <textarea class="question-input" rows="2" placeholder="Enter your question here..."></textarea>
    ${choicesHtml}
  `;
  document.getElementById('questions-container').appendChild(div);
}

function addChoice(btn, qn) {
  const choicesList = btn.closest('.choices-list');
  const count = choicesList.querySelectorAll('.choice-row').length;
  const letter = String.fromCharCode(65+count);
  const row = document.createElement('div');
  row.className = 'choice-row';
  row.innerHTML = `<input type="radio" name="correct-${qn}" class="choice-radio"><input type="text" class="choice-input" placeholder="Option ${letter}"><button class="btn-icon" onclick="removeChoice(this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>`;
  choicesList.insertBefore(row, btn);
}

function removeChoice(btn) { btn.closest('.choice-row').remove(); }

function renumberQuestions() {
  document.querySelectorAll('.question-block').forEach((b,i)=>{ const el=b.querySelector('.question-num'); if(el) el.textContent='Question '+(i+1); });
}

function createQuiz() {
  const title = document.getElementById('quiz-title').value.trim();
  const classId = document.getElementById('quiz-class').value;
  const due = document.getElementById('quiz-due').value;
  const time = document.getElementById('quiz-time').value;
  const points = document.getElementById('quiz-points').value;
  if(!title||!classId||!due) { showToast('Please fill in required fields.'); return; }
  const questions = document.querySelectorAll('#questions-container .question-block').length;
  db.quizzes.push({
    id: 'q'+Date.now(), title, classId, type: db.currentQuizType, due, points: parseInt(points)||100,
    timeLimit: parseInt(time)||30, questions: questions||1, submissions: []
  });
  persistDb();
  closeModal('modal-create-quiz');
  document.getElementById('quiz-title').value='';
  document.getElementById('quiz-due').value='';
  document.getElementById('questions-container').innerHTML='';
  db.questionCount=0;
  renderQuizzes();
  showToast('Quiz "'+title+'" published! 🎉');
}

function createAssignment() {
  const title = document.getElementById('asgn-title').value.trim();
  const classId = document.getElementById('asgn-class').value;
  const due = document.getElementById('asgn-due').value;
  const instructions = document.getElementById('asgn-instructions').value.trim();
  const maxScore = document.getElementById('asgn-score').value;
  const fileType = document.getElementById('asgn-files').value;
  if(!title||!classId||!due) { showToast('Please fill in required fields.'); return; }
  db.assignments.push({ id:'a'+Date.now(), title, classId, due, instructions, maxScore: parseInt(maxScore)||100, fileType, submissions:[] });
  persistDb();
  closeModal('modal-create-assignment');
  document.getElementById('asgn-title').value='';
  document.getElementById('asgn-due').value='';
  document.getElementById('asgn-instructions').value='';
  renderAssignments();
  showToast('Assignment "'+title+'" published! 📋');
}

function createClass() {
  const name = document.getElementById('cls-name').value.trim();
  const section = document.getElementById('cls-section').value.trim();
  const year = document.getElementById('cls-year').value.trim();
  const sem = document.getElementById('cls-sem').value;
  const desc = document.getElementById('cls-desc').value.trim();
  const color = document.getElementById('cls-color').value;
  if(!name||!section) { showToast('Please fill in class name and section.'); return; }
  const code = (name.substring(0,3).toUpperCase().replace(/\s/,'') + '-' + section.replace(/\s/g,'').substring(0,3).toUpperCase() + '-' + Math.floor(100+Math.random()*900));
  const cls = { id:'c'+Date.now(), name, section, year, sem, code, color, desc };
  db.classes.push(cls);
  persistDb();
  closeModal('modal-create-class');
  ['cls-name','cls-section','cls-year','cls-desc'].forEach(id=>{document.getElementById(id).value='';});
  populateClassSelects();
  renderClasses();
  renderAll();
  showToast('Class "'+name+'" created! Code: '+code);
}

// ===== HELPERS =====
function getClassName(cid) {
  if (!cid) return 'Unassigned';
  return db.classes.find(c=>c.id===cid)?.name || 'Unknown';
}

function formatDate(dt) {
  const d = new Date(dt);
  return d.toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'});
}

function populateClassSelects() {
  const opts = db.classes.map(c=>`<option value="${c.id}">${c.name} (${c.section})</option>`).join('');
  ['quiz-class','asgn-class'].forEach(id=>{ const el=document.getElementById(id); if(el) el.innerHTML=opts; });
  const sFilter = document.getElementById('student-filter-class');
  if(sFilter) {
    sFilter.innerHTML = '<option value="all">All Classes</option>' + db.classes.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  }
  const rFilter = document.getElementById('rank-filter');
  if(rFilter) {
    rFilter.innerHTML = '<option value="all">All Classes</option>' + db.classes.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  }
}

// ===== MODAL =====
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function handleOverlayClick(e, id) { if(e.target.classList.contains('modal-overlay')) closeModal(id); }

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 3500);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  const hadStored = !!localStorage.getItem(APP_DB_KEY);
  loadPersistedDb();
  ensureHardcodedStudents();
  // If nothing was persisted yet, save the built-in seed so other pages
  // (like join-class + tasks) can find class/assignment data.
  if (!hadStored) persistDb();
  tryAutoLogin();
});

window.addEventListener('keydown', e=>{ if(e.key==='Escape') document.querySelectorAll('.modal-overlay.open').forEach(m=>m.classList.remove('open')); });