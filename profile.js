// Avoid name collisions with shared.js globals
  const USERS_STORAGE_KEY = 'asrs_users';
  const ACTIVE_USER_STORAGE_KEY = 'asrs_active_user';
  let activeUser = null;

  function getUsers() { try { return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]'); } catch(e) { return []; } }
  function saveUsers(users) { localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users)); }

  function formatMemberSince(isoDate) {
    if (!isoDate) return 'Member since —';
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return 'Member since —';
    return 'Member since ' + d.toLocaleDateString('en-US', { month:'long', year:'numeric' });
  }

  function bindProfile(user) {
    const fullName = user?.fullName || 'Student';
    const track = user?.learningTrack || 'General Learner';
    const ai = user?.academicInfo || {};
    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=1a4a2e&fontFamily=Georgia&fontSize=40&fontWeight=700&textColor=ffffff`;
    document.getElementById('profile-avatar').src = avatarUrl;
    document.getElementById('profile-avatar').alt = fullName;
    document.getElementById('profile-name').textContent = fullName;
    document.getElementById('profile-role').innerHTML = `<i class="fas fa-user-graduate"></i> Student · ${track}`;
    document.getElementById('profile-join-date').innerHTML = `<i class="fas fa-calendar" style="margin-right:.4rem"></i>${formatMemberSince(user?.createdAt)}`;
    document.getElementById('edit-full-name').value = fullName;
    document.getElementById('edit-email').value = user?.email || '';
    document.getElementById('edit-track').value = track;
    document.getElementById('edit-course').value = ai.course || '';
    document.getElementById('edit-school-year').value = ai.schoolYear || '';
    document.getElementById('edit-year-level').value = ai.yearLevel || '';
    document.getElementById('edit-section').value = ai.section || '';

    document.getElementById('overview-course').textContent = ai.course || '—';
    document.getElementById('overview-school-year').textContent = ai.schoolYear || '—';
    document.getElementById('overview-year-level').textContent = ai.yearLevel ? ('Year ' + ai.yearLevel) : '—';
    document.getElementById('overview-section').textContent = ai.section || '—';
  }

  function loadProfile() {
    const activeId = localStorage.getItem(ACTIVE_USER_STORAGE_KEY);
    const users = getUsers();
    const user = users.find(u => u.id === activeId);
    if (!user || user.role !== 'student') { window.location.href = 'login.html'; return; }
    activeUser = user;
    bindProfile(user);
  }

  function saveProfile() {
    if (!activeUser) return;
    const fullName = document.getElementById('edit-full-name').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const track = document.getElementById('edit-track').value;
    const course = document.getElementById('edit-course').value;
    const schoolYear = document.getElementById('edit-school-year').value;
    const yearLevel = document.getElementById('edit-year-level').value;
    const section = document.getElementById('edit-section').value;
    if (!fullName || !email) { showToast('Name and email are required.'); return; }
    const users = getUsers();
    const conflict = users.find(u => u.id !== activeUser.id && (u.email||'').toLowerCase() === email.toLowerCase());
    if (conflict) { showToast('Email is already used by another account.'); return; }
    const idx = users.findIndex(u => u.id === activeUser.id);
    if (idx < 0) { showToast('Account not found.'); return; }
    users[idx].fullName = fullName;
    users[idx].email = email;
    users[idx].learningTrack = track;
    users[idx].academicInfo = { course, schoolYear, yearLevel, section };
    saveUsers(users);
    activeUser = users[idx];
    bindProfile(activeUser);
    
    if (typeof applyNavIdentity === 'function') applyNavIdentity();
    showToast('Profile saved successfully!');
  }

  function switchTab(name) {
    document.querySelectorAll('.tab-btn').forEach((b, i) => {
      b.classList.toggle('active', ['overview','activity','settings'][i] === name);
    });
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-' + name).classList.add('active');
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  document.addEventListener('DOMContentLoaded', loadProfile);
