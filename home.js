/* ── NOTIFICATION PANEL ── */
const STORAGE_KEY = 'asrs_users';
const ACTIVE_USER_KEY = 'asrs_active_user';
let notifOpen = false;
let userOpen  = false;

function getActiveStudent() {
  const activeId = localStorage.getItem(ACTIVE_USER_KEY);
  if (!activeId) return null;
  try {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const user = users.find(u => u.id === activeId);
    return user && user.role === 'student' ? user : null;
  } catch (err) {
    return null;
  }
}

function applyStudentIdentityUI() {
  const user = getActiveStudent();
  if (!user) return;
  const firstName = (user.fullName || 'Student').trim().split(/\s+/)[0];
  const displayName = user.fullName || 'Student';
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=1a4a2e&fontFamily=Georgia&fontSize=40&fontWeight=700&textColor=ffffff`;

  const avatarEl = document.querySelector('.user-avatar');
  if (avatarEl) {
    avatarEl.src = avatarUrl;
    avatarEl.alt = displayName;
  }
  const userNameEl = document.querySelector('.user-name');
  if (userNameEl) userNameEl.textContent = displayName;

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.innerHTML = `${displayName} <span class="wave">👋</span>`;
  }

  const notifTitle = document.querySelector('.notif-item .notif-title');
  if (notifTitle && notifTitle.textContent.includes('Ms. Perez')) {
    notifTitle.textContent = `${firstName} has new resources`;
  }
}

function toggleNotifications() {
  notifOpen = !notifOpen;
  const dropdown = document.getElementById('notifDropdown');
  dropdown.classList.toggle('open', notifOpen);
  // close user menu if open
  if (notifOpen && userOpen) toggleUserMenu();
}

function toggleUserMenu() {
  userOpen = !userOpen;
  const dropdown = document.getElementById('userDropdown');
  dropdown.classList.toggle('open', userOpen);
  if (userOpen && notifOpen) toggleNotifications();
}

function closeMenus() {
  notifOpen = false;
  userOpen  = false;
  document.getElementById('notifDropdown').classList.remove('open');
  document.getElementById('userDropdown').classList.remove('open');
}

// Close dropdowns on outside click
document.addEventListener('click', (e) => {
  const notifWrapper = document.getElementById('notifWrapper');
  const userMenu     = document.getElementById('userMenu');
  if (!notifWrapper?.contains(e.target)) {
    notifOpen = false;
    document.getElementById('notifDropdown')?.classList.remove('open');
  }
  if (!userMenu?.contains(e.target)) {
    userOpen = false;
    document.getElementById('userDropdown')?.classList.remove('open');
  }
});

/* ── MARK NOTIFICATION READ ── */
function markRead(item) {
  if (!item.classList.contains('unread')) return;
  item.classList.remove('unread');
  const dot = item.querySelector('.unread-dot');
  if (dot) dot.style.display = 'none';
  updateBadge();
}

function markAllRead() {
  document.querySelectorAll('.notif-item.unread').forEach(item => {
    item.classList.remove('unread');
    const dot = item.querySelector('.unread-dot');
    if (dot) dot.style.display = 'none';
  });
  updateBadge();
  showToast('All notifications marked as read ✓');
}

function updateBadge() {
  const count = document.querySelectorAll('.notif-item.unread').length;
  const badge = document.getElementById('notifBadge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count === 0 ? 'none' : 'grid';
  }
}

/* ── STUDY TIPS ROTATOR ── */
const tips = [
  '"Spaced repetition is the most efficient learning technique. Review material at increasing intervals."',
  '"The Feynman Technique: Explain a concept in simple terms to truly understand it."',
  '"Active recall beats passive reading. Quiz yourself instead of re-reading notes."',
  '"Pomodoro method: 25 minutes of focused work, then a 5-minute break."',
  '"Teaching someone else is the fastest way to master a subject yourself."',
  '"Sleep consolidates memory. Always rest well before a major exam."',
  '"Break large topics into small chunks — progress feels better and sticks longer."',
];
let tipIndex = 0;

function nextTip() {
  tipIndex = (tipIndex + 1) % tips.length;
  const tipEl = document.getElementById('tipText');
  if (!tipEl) return;
  tipEl.style.opacity = '0';
  tipEl.style.transform = 'translateY(6px)';
  setTimeout(() => {
    tipEl.textContent = tips[tipIndex];
    tipEl.style.transition = 'opacity .3s, transform .3s';
    tipEl.style.opacity = '1';
    tipEl.style.transform = 'translateY(0)';
  }, 220);
}

/* ── DAILY CHALLENGE CLICK ── */
function startChallenge(item, type) {
  const messages = {
    quiz:   'Opening quizzes… 📋',
    game:   'Loading mini-games… 🎮',
    lesson: 'Opening lesson library… 📚',
  };
  const routes = {
    quiz:   'quizzes.html',
    game:   'minigames.html',
    lesson: 'lessons.html',
  };

  if (item.classList.contains('done')) {
    showToast('Already completed! Great work 🏆');
    return;
  }

  item.classList.add('done');
  showToast(messages[type] || 'Loading…');

  setTimeout(() => {
    window.location.href = routes[type] || '#';
  }, 900);
}

/* ── TOAST HELPER ── */
function showToast(message, duration = 2800) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ── ANIMATE PROGRESS BARS ON SCROLL ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.mini-fill, .subj-fill, .lp-fill, .progress-fill').forEach(bar => {
  bar.style.animationPlayState = 'paused';
  observer.observe(bar);
});

/* ── GREETING TIME ── */
(function setGreeting() {
  const hour = new Date().getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else if (hour >= 17) greeting = 'Good evening';
  const el = document.querySelector('.greeting-label');
  if (el) el.textContent = greeting + ',';
})();

/* ── KEYBOARD SHORTCUTS ── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenus();
});

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  applyStudentIdentityUI();
  // Animate hero stats on load
  const stats = document.querySelectorAll('.stat-num');
  stats.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    setTimeout(() => {
      el.style.transition = 'opacity .4s, transform .4s';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300 + i * 100);
  });

  // Stagger card entrance
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    setTimeout(() => {
      card.style.transition = 'opacity .4s ease, transform .4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + i * 60);
  });

  // Welcome toast
  const student = getActiveStudent();
  const welcomeName = student?.fullName ? student.fullName.split(/\s+/)[0] : 'Student';
  setTimeout(() => showToast(`Welcome back, ${welcomeName}! 🎓`, 3000), 800);
});