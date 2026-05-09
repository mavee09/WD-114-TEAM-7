// ── Notification data store ──────────────────────────────
const NOTIF_KEY = 'asrs_notifications';

const DEFAULT_NOTIFS = [
  {
    id: 'n1', type: 'quiz', unread: true, time: '2 mins ago',
    title: 'New Quiz Available',
    desc: 'Web Development Quiz 3 is now live! Complete it before the deadline for +10 pts.',
    action: { label: 'Take Quiz', href: 'quizzes.html' }
  },
  {
    id: 'n2', type: 'trophy', unread: true, time: '1 hour ago',
    title: 'Achievement Unlocked! 🏆',
    desc: 'You earned the "Quiz Master" badge for completing 5 quizzes in a row.',
    action: { label: 'View Achievements', href: 'reports.html' }
  },
  {
    id: 'n3', type: 'task', unread: true, time: '3 hours ago',
    title: 'Task Reminder',
    desc: 'Daily challenge resets in 3 hours. You still have 2 challenges remaining!',
    action: { label: 'Go to Tasks', href: 'tasks.html' }
  },
  {
    id: 'n4', type: 'class', unread: false, time: 'Yesterday',
    title: 'Class Joined Successfully',
    desc: 'You have been added to WEBDEV-3A — Web Development. Teacher assignments will now appear in your Tasks.',
    action: null
  },
  {
    id: 'n5', type: 'quiz', unread: false, time: 'Yesterday',
    title: 'Quiz Graded',
    desc: 'Your HCI Quiz 2 has been graded. You scored 7/10 and earned +7 pts.',
    action: { label: 'View Report', href: 'reports.html' }
  },
  {
    id: 'n6', type: 'task', unread: false, time: '2 days ago',
    title: 'Assignment Due Soon',
    desc: 'HCI Project Submission is due in 2 days. Don\'t forget to submit your work!',
    action: { label: 'View Tasks', href: 'tasks.html' }
  },
  {
    id: 'n7', type: 'trophy', unread: false, time: '3 days ago',
    title: '7-Day Streak! 🔥',
    desc: 'Incredible! You\'ve logged in and completed activities 7 days in a row. Keep it up!',
    action: null
  },
  {
    id: 'n8', type: 'class', unread: false, time: '1 week ago',
    title: 'New Assignment Posted',
    desc: 'Your teacher posted a new assignment: "CSS Portfolio Project" due May 15, 2026.',
    action: { label: 'View Assignment', href: 'tasks.html' }
  },
];

function getNotifs() {
  try {
    const stored = JSON.parse(localStorage.getItem(NOTIF_KEY));
    return stored && stored.length ? stored : DEFAULT_NOTIFS;
  } catch(e) { return DEFAULT_NOTIFS; }
}
function saveNotifs(arr) { localStorage.setItem(NOTIF_KEY, JSON.stringify(arr)); }

// ── Icon map ─────────────────────────────────────────────
const ICON_MAP = {
  quiz:    { cls: 'icon-quiz',    fa: 'fas fa-clipboard-check' },
  trophy:  { cls: 'icon-trophy',  fa: 'fas fa-trophy' },
  task:    { cls: 'icon-task',    fa: 'fas fa-tasks' },
  class:   { cls: 'icon-class',   fa: 'fas fa-users' },
  info:    { cls: 'icon-info',    fa: 'fas fa-info-circle' },
  warning: { cls: 'icon-warning', fa: 'fas fa-exclamation-triangle' },
};

let currentFilter = 'all';

function renderNotifs() {
  const list = document.getElementById('notifPageList');
  const notifs = getNotifs();

  const filtered = currentFilter === 'all'
    ? notifs
    : notifs.filter(n => n.type === currentFilter);

  const unread = notifs.filter(n => n.unread).length;
  document.getElementById('unreadCount').textContent = unread;
  // Update nav bell badge
  const badge = document.getElementById('notifBadge');
  if (badge) { badge.textContent = unread; badge.style.display = unread ? '' : 'none'; }

  if (!filtered.length) {
    list.innerHTML = `<div class="empty-notif"><i class="fas fa-bell-slash"></i><p>No notifications here yet.</p></div>`;
    return;
  }

  const unreadItems = filtered.filter(n => n.unread);
  const readItems   = filtered.filter(n => !n.unread);
  let html = '';

  if (unreadItems.length) {
    html += `<div class="notif-section-label">New</div>`;
    html += unreadItems.map(n => renderCard(n)).join('');
  }
  if (readItems.length) {
    html += `<div class="notif-section-label">Earlier</div>`;
    html += readItems.map(n => renderCard(n)).join('');
  }

  list.innerHTML = html;
}

function renderCard(n) {
  const icon = ICON_MAP[n.type] || ICON_MAP.info;
  const actionBtn = n.action
    ? `<button class="action-link" onclick="event.stopPropagation();window.location.href='${n.action.href}'">${n.action.label} <i class="fas fa-arrow-right" style="font-size:.65rem"></i></button>`
    : '';
  return `
    <div class="notif-card ${n.unread ? 'unread' : ''}" id="card-${n.id}" onclick="markCardRead('${n.id}')">
      <div class="notif-card-icon ${icon.cls}"><i class="${icon.fa}"></i></div>
      <div class="notif-card-body">
        <div class="notif-card-title">
          ${n.title}
          ${n.unread ? '<span class="new-pill">NEW</span>' : ''}
        </div>
        <div class="notif-card-desc">${n.desc}</div>
        <div class="notif-card-time"><i class="fas fa-clock" style="font-size:.65rem"></i>${n.time}</div>
        ${n.action || true ? `<div class="notif-card-actions">
          ${actionBtn}
          <button class="action-dismiss" onclick="event.stopPropagation();dismissNotif('${n.id}')">Dismiss</button>
        </div>` : ''}
      </div>
    </div>`;
}

function markCardRead(id) {
  const notifs = getNotifs();
  const n = notifs.find(x => x.id === id);
  if (n) { n.unread = false; saveNotifs(notifs); renderNotifs(); }
}

function dismissNotif(id) {
  let notifs = getNotifs().filter(x => x.id !== id);
  saveNotifs(notifs);
  renderNotifs();
  showToast('Notification dismissed.');
}

function markAllReadPage() {
  const notifs = getNotifs();
  notifs.forEach(n => n.unread = false);
  saveNotifs(notifs);
  renderNotifs();
  showToast('All notifications marked as read ✓');
}

function clearAllRead() {
  const notifs = getNotifs().filter(n => n.unread);
  saveNotifs(notifs);
  renderNotifs();
  showToast('Read notifications cleared.');
}

function filterNotifs(type, btn) {
  currentFilter = type;
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderNotifs();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

document.addEventListener('DOMContentLoaded', renderNotifs);
