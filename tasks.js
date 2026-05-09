const APP_DB_KEY = 'asrs_app_db';
  const USERS_STORAGE_KEY = 'asrs_users';
  const ACTIVE_USER_STORAGE_KEY = 'asrs_active_user';
  const TASKS_KEY = 'asrs_student_tasks';
  const CHALLENGES_KEY = 'asrs_daily_challenges';
  let taskCounter = 1;

  const DEFAULT_CLASSES = [
    { id: 'c1', name: 'Web Development', section: 'BSIT 3A', year: '2024–2025', sem: '1st Semester', code: 'WEBDEV-3A', color: 'var(--green-mid)', desc: 'Frontend and backend web development fundamentals.' },
    { id: 'c3', name: 'Data Structures', section: 'BSIT 3B', year: '2024–2025', sem: '1st Semester', code: 'DS-3B', color: '#7B2FBE', desc: 'Arrays, trees, graphs, and algorithms.' },
  ];
  const DEFAULT_ASSIGNMENTS = [
    {
      id: 'a1',
      title: 'HTML Portfolio Page',
      classId: 'c1',
      due: '2025-06-30T23:59',
      instructions: 'Build a personal portfolio using only HTML and CSS.',
      maxScore: 100,
      fileType: 'any',
      submissions: []
    },
    {
      id: 'a3',
      title: 'Linked List Implementation',
      classId: 'c3',
      due: '2025-07-05T23:59',
      instructions: 'Implement a doubly linked list in your language of choice.',
      maxScore: 100,
      fileType: 'zip',
      submissions: []
    }
  ];

  function getStoredUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]'); } catch(e) { return []; }
  }
  function getCurrentUser() {
    const activeId = localStorage.getItem(ACTIVE_USER_STORAGE_KEY);
    if (!activeId) return null;
    const user = getStoredUsers().find(u => u.id === activeId) || null;
    if (!user || user.role !== 'student') return null;
    return user;
  }
  function saveUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
  function getAppDb() {
    let db = {};
    try { db = JSON.parse(localStorage.getItem(APP_DB_KEY) || '{}') || {}; } catch(e) { db = {}; }
    if (!Array.isArray(db.classes) || db.classes.length === 0) db.classes = DEFAULT_CLASSES;
    if (!Array.isArray(db.students)) db.students = [];
    if (!Array.isArray(db.assignments)) db.assignments = DEFAULT_ASSIGNMENTS;
    return db;
  }
  function saveAppDb(db) {
    localStorage.setItem(APP_DB_KEY, JSON.stringify(db));
  }
  function normalize(value) {
    return String(value || '').trim().toUpperCase();
  }
  function getTaskStorage() {
    try { return JSON.parse(localStorage.getItem(TASKS_KEY) || '{}'); } catch(e) { return {}; }
  }
  function saveTaskStorage(data) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(data));
  }
  function getChallengeStorage() {
    try { return JSON.parse(localStorage.getItem(CHALLENGES_KEY) || '{}'); } catch(e) { return {}; }
  }
  function saveChallengeStorage(data) {
    localStorage.setItem(CHALLENGES_KEY, JSON.stringify(data));
  }
  function getUserClassContext(user, db) {
    const students = Array.isArray(db.students) ? db.students : [];
    const classes = Array.isArray(db.classes) ? db.classes : [];
    const studentRecord = students.find(s => s.userId === user.id || normalize(s.email) === normalize(user.email));
    const userClassCode = normalize(user.classCode);
    const studentClassCode = normalize(studentRecord?.classCode);
    const classCode = userClassCode || studentClassCode;
    let classId = user.classId || studentRecord?.classId || '';
    if (!classId && classCode) {
      classId = classes.find(c => normalize(c.code) === classCode)?.id || '';
    }
    if (classId && !user.classId) {
      const users = getStoredUsers();
      const idx = users.findIndex(u => u.id === user.id);
      if (idx >= 0) {
        users[idx].classId = classId;
        if (!users[idx].classCode && classCode) users[idx].classCode = classCode;
        saveUsers(users);
      }
    }
    return { classId, classCode };
  }
  function escapeHtml(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  function isFileAllowed(filename, fileType) {
    if (!fileType || fileType === 'any') return true;
    const ext = filename.split('.').pop().toLowerCase();
    const map = { pdf: ['pdf'], image: ['png','jpg','jpeg','gif','webp'], doc: ['doc','docx','pdf'] };
    return (map[fileType] || []).includes(ext);
  }

  function renderTeacherAssignments() {
    const user = getCurrentUser();
    const container = document.getElementById('teacherAssignmentsList');
    if (!user) { container.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i>Please log in as a student.</div>'; return; }
    const db = getAppDb();
    db.assignments = Array.isArray(db.assignments) ? db.assignments : [];
    db.students = Array.isArray(db.students) ? db.students : [];
    const memberships = db.students.filter(s => String(s.userId) === String(user.id) && s.status === 'approved');
    const classIds = new Set(memberships.map(m => String(m.classId)));
    if (user.classId) classIds.add(String(user.classId));
    if (user.classCode) {
      const cc = normalize(user.classCode);
      const resolved = db.classes?.find(c => normalize(c.code) === cc);
      if (resolved?.id) classIds.add(String(resolved.id));
    }
    const relevant = db.assignments.filter(a => classIds.has(String(a.classId)));
    if (!relevant.length) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i>No assignments from your teacher yet.</div>';
      return;
    }
    container.innerHTML = relevant.map(a => {
      const membership = memberships.find(m => String(m.classId) === String(a.classId));
      const fallbackMembershipId = `ls-${user.id}-${String(a.classId)}`;
      const membershipForThisClass = membership || { id: fallbackMembershipId, classId: a.classId, status: 'approved' };
      const sub = membershipForThisClass && Array.isArray(a.submissions)
        ? a.submissions.find(s => String(s.studentId) === String(membershipForThisClass.id))
        : null;
      const dueRaw = a.dueDate || a.due || '';
      const dueStr = dueRaw ? new Date(dueRaw).toLocaleDateString('en-US', {month:'long',day:'numeric',year:'numeric'}) : 'No due date';
      return `<div class="assignment-row">
        <div class="a-icon"><i class="fas fa-file-alt"></i></div>
        <div class="a-info">
          <div class="a-title">${escapeHtml(a.title || 'Untitled Assignment')}</div>
          <div class="a-due"><i class="fas fa-calendar" style="margin-right:.3rem"></i>Due ${dueStr}${a.description || a.instructions ? ' · ' + escapeHtml(a.description || a.instructions) : ''}</div>
        </div>
        ${sub
          ? `<span class="a-submitted"><i class="fas fa-check-circle"></i> Submitted</span>`
          : (membership
              ? `<label class="a-upload-btn"><i class="fas fa-upload"></i> Submit <input type="file" style="display:none" onchange="submitAssignment('${a.id}', this.files[0], '${membership.id}')"/></label>`
              : `<label class="a-upload-btn"><i class="fas fa-upload"></i> Submit <input type="file" style="display:none" onchange="submitAssignment('${a.id}', this.files[0], '${fallbackMembershipId}')"/></label>`
            )
        }
      </div>`;
    }).join('');
  }

  function submitAssignment(assignmentId, file, membershipId) {
    if (!file) return;
    const user = getCurrentUser();
    if (!user) { showToast('Please log in first.'); return; }
    if (!membershipId) { showToast('You are not enrolled in this class.'); return; }
    const db = getAppDb();
    db.assignments = Array.isArray(db.assignments) ? db.assignments : [];
    const assignment = db.assignments.find(a => a.id === assignmentId);
    if (!assignment) { showToast('Assignment not found.'); return; }
    db.students = Array.isArray(db.students) ? db.students : [];
    const classId = assignment.classId || '';
    const existingMembership = db.students.find(s => String(s.id) === String(membershipId));
    if (!existingMembership) {
      const resolvedClass = db.classes?.find(c => String(c.id) === String(classId));
      db.students.push({
        id: membershipId,
        userId: user.id,
        name: user.fullName || 'Student',
        classId,
        classCode: resolvedClass?.code || user.classCode || '',
        email: user.email || '',
        status: 'approved',
        avg: 0,
        quizzesDone: 0,
        assignmentsDone: 0,
        totalPts: 0,
        corImage: user.corImage || '',
        corFileName: user.corFileName || ''
      });
    }
    const fileType = assignment.fileType || 'any';
    if (!isFileAllowed(file.name, fileType)) { showToast('Invalid file type for this assignment.'); return; }
    assignment.submissions = Array.isArray(assignment.submissions) ? assignment.submissions : [];
    const existing = assignment.submissions.find(s => String(s.studentId) === String(membershipId));
    if (existing) {
      existing.file = file.name; existing.score = null; existing.comment = ''; existing.submittedAt = new Date().toISOString();
    } else {
      assignment.submissions.push({ studentId: membershipId, file: file.name, score: null, comment: '', submittedAt: new Date().toISOString() });
    }
    saveAppDb(db);
    renderTeacherAssignments();
    showToast('Assignment submitted successfully! ✅');
  }

  function toggleChallenge(row) {
    row.classList.toggle('done');
    const tag = row.querySelector('.ch-tag');
    const challengeId = row.dataset.challengeId;
    const user = getCurrentUser();
    if (row.classList.contains('done')) {
      row.querySelector('.ch-checkbox').innerHTML = '<i class="fas fa-check" style="font-size:.7rem"></i>';
      if (!tag) { const s = document.createElement('span'); s.className = 'ch-tag'; s.textContent = 'Done ✓'; row.appendChild(s); }
      showToast('Challenge completed! 🎉');
    } else {
      row.querySelector('.ch-checkbox').innerHTML = '';
      if (tag) tag.remove();
    }
    if (user && challengeId) {
      const key = `${user.id}:${getTodayKey()}`;
      const state = getChallengeStorage();
      state[key] = state[key] || {};
      state[key][challengeId] = row.classList.contains('done');
      saveChallengeStorage(state);
    }
  }

  function toggleTask(id) {
    const row = document.getElementById(id);
    if (!row) return;
    row.classList.toggle('done-task');
    const cb = row.querySelector('.t-cb');
    if (row.classList.contains('done-task')) { cb.innerHTML = '<i class="fas fa-check" style="font-size:.7rem;color:#fff"></i>'; showToast('Task marked complete ✓'); }
    else { cb.innerHTML = ''; }
    persistRenderedTasks();
  }

  function deleteTask(id) {
    const row = document.getElementById(id);
    if (!row) return;
    row.style.transform = 'translateX(20px)'; row.style.opacity = '0';
    setTimeout(() => { row.remove(); persistRenderedTasks(); renderEmptyTaskState(); }, 300);
    showToast('Task removed.');
  }

  function toggleAddForm() {
    const f = document.getElementById('addForm');
    f.classList.toggle('open');
    if (f.classList.contains('open')) document.getElementById('taskName').focus();
  }

  function addTask() {
    const name = document.getElementById('taskName').value.trim();
    const date = document.getElementById('taskDate').value;
    const type = document.getElementById('taskType').value;
    if (!name) { showToast('Please enter a task name.'); return; }
    const id = 't' + taskCounter++;
    const labels = { quiz:'Quiz', task:'Task', review:'Review' };
    const badgeCls = { quiz:'badge-quiz', task:'badge-task', review:'badge-review' };
    const formatted = date ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', {month:'long',day:'numeric',year:'numeric'}) : 'No due date';
    const div = document.createElement('div');
    div.className = 'task-row';
    div.id = id;
    div.dataset.type = type;
    div.dataset.due = date || '';
    div.dataset.subject = document.getElementById('taskSubject').value || '';
    div.innerHTML = `<div class="t-cb" onclick="toggleTask('${id}')"></div><div class="t-info"><div class="t-title">${escapeHtml(name)}</div><div class="t-due"><i class="fas fa-calendar" style="margin-right:.3rem"></i>Due ${formatted}</div></div><span class="t-badge ${badgeCls[type]}">${labels[type]}</span><button class="delete-btn" onclick="deleteTask('${id}')"><i class="fas fa-trash"></i></button>`;
    document.getElementById('taskList').appendChild(div);
    document.getElementById('taskName').value = ''; document.getElementById('taskDate').value = '';
    toggleAddForm();
    persistRenderedTasks();
    renderEmptyTaskState();
    showToast('Task added! ✅');
  }

  function showToast(msg) { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000); }

  function persistRenderedTasks() {
    const user = getCurrentUser();
    if (!user) return;
    const rows = [...document.querySelectorAll('#taskList .task-row')];
    const tasks = rows.map((row, index) => {
      const title = row.querySelector('.t-title')?.textContent?.trim() || 'Untitled Task';
      return {
        id: row.id || `t-${Date.now()}-${index}`,
        title,
        dueDate: row.dataset.due || '',
        type: row.dataset.type || 'task',
        subject: row.dataset.subject || '',
        completed: row.classList.contains('done-task')
      };
    });
    const db = getTaskStorage();
    db[user.id] = tasks;
    saveTaskStorage(db);
  }

  function renderTasksFromStorage() {
    const user = getCurrentUser();
    const taskList = document.getElementById('taskList');
    if (!user || !taskList) return;
    const saved = getTaskStorage()[user.id];
    if (!Array.isArray(saved) || !saved.length) {
      persistRenderedTasks();
      return;
    }
    const labels = { quiz: 'Quiz', task: 'Task', review: 'Review' };
    const badgeCls = { quiz: 'badge-quiz', task: 'badge-task', review: 'badge-review' };
    taskList.innerHTML = saved.map((task, index) => {
      const rawId = task.id || `t${index + 1}`;
      const safeId = String(rawId).replace(/[^a-zA-Z0-9_-]/g, '');
      const due = task.dueDate ? new Date(task.dueDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'No due date';
      const doneClass = task.completed ? ' done-task' : '';
      const check = task.completed ? '<i class="fas fa-check" style="font-size:.7rem;color:#fff"></i>' : '';
      return `<div class="task-row${doneClass}" id="${safeId}" data-type="${escapeHtml(task.type || 'task')}" data-due="${escapeHtml(task.dueDate || '')}" data-subject="${escapeHtml(task.subject || '')}">
        <div class="t-cb" onclick="toggleTask('${safeId}')">${check}</div>
        <div class="t-info"><div class="t-title">${escapeHtml(task.title || 'Untitled Task')}</div><div class="t-due"><i class="fas fa-calendar" style="margin-right:.3rem"></i>Due ${due}</div></div>
        <span class="t-badge ${badgeCls[task.type] || 'badge-task'}">${labels[task.type] || 'Task'}</span>
        <button class="delete-btn" onclick="deleteTask('${safeId}')"><i class="fas fa-trash"></i></button>
      </div>`;
    }).join('');
    taskCounter = saved.length + 1;
  }

  function renderEmptyTaskState() {
    const taskList = document.getElementById('taskList');
    if (!taskList) return;
    if (taskList.querySelector('.task-row')) return;
    taskList.innerHTML = '<div class="empty-state"><i class="fas fa-list-check"></i>No tasks yet. Add your first task.</div>';
  }

  function initChallengeState() {
    const user = getCurrentUser();
    if (!user) return;
    const rows = document.querySelectorAll('.challenge-row');
    rows.forEach((row, i) => row.dataset.challengeId = row.dataset.challengeId || `ch-${i + 1}`);
    const key = `${user.id}:${getTodayKey()}`;
    const state = getChallengeStorage()[key] || {};
    rows.forEach(row => {
      const done = !!state[row.dataset.challengeId];
      row.classList.toggle('done', done);
      row.querySelector('.ch-checkbox').innerHTML = done ? '<i class="fas fa-check" style="font-size:.7rem"></i>' : '';
      const tag = row.querySelector('.ch-tag');
      if (done && !tag) {
        const s = document.createElement('span');
        s.className = 'ch-tag';
        s.textContent = 'Done ✓';
        row.appendChild(s);
      }
      if (!done && tag) tag.remove();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderTeacherAssignments();
    renderTasksFromStorage();
    renderEmptyTaskState();
    initChallengeState();
  });
