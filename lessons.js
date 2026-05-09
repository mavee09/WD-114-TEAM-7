function renderLessonLibrary() {
  const host = document.getElementById('libraryList');
  if (!host) return;

  const subjects = [
    {
      id: 'webdev',
      tag: 'CS',
      name: 'Web Development',
      sub: 'HTML, CSS, JavaScript & more',
      iconClass: 'web',
      icon: 'fa-code',
      progress: 88,
      href: 'lesson-detail.html?course=webdev'
    },
    {
      id: 'hci',
      tag: 'CS',
      name: 'Human–Computer Interaction',
      sub: 'UX principles & interface design',
      iconClass: 'hci',
      icon: 'fa-mouse-pointer',
      progress: 65,
      href: 'lesson-detail.html?course=hci'
    },
    {
      id: 'locked',
      tag: 'THE INTERACTION',
      name: 'Human–Computer Interaction',
      sub: 'Unlock at Level 5',
      iconClass: 'lock',
      icon: 'fa-lock',
      progress: 0,
      locked: true
    }
  ];

  host.innerHTML = subjects.map(s => {
    const pctText = s.locked ? 'Locked' : `${s.progress}%`;
    const fillW = s.locked ? '0%' : `${Math.max(0, Math.min(100, s.progress))}%`;
    const cta = s.locked
      ? `<span class="btn-locked"><i class="fas fa-lock"></i> Locked</span>`
      : `<a class="btn-continue" href="${s.href}">Continue <i class="fas fa-arrow-right"></i></a>`;

    return `
      <div class="lesson-row ${s.locked ? 'locked' : ''}">
        <div class="lesson-icon ${s.iconClass}">
          <i class="fas ${s.icon}"></i>
        </div>
        <div class="lesson-main">
          <span class="lesson-tag">${s.tag}</span>
          <div class="lesson-name">${s.name}</div>
          <div class="lesson-sub">${s.sub}</div>
          <div class="progress-row">
            <div class="bar"><div class="fill" style="width:${fillW}"></div></div>
            <div class="pct">${pctText}</div>
          </div>
        </div>
        <div class="lesson-cta">${cta}</div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderLessonLibrary();

  const moreBtn = document.getElementById('showMoreBtn');
  if (moreBtn) {
    moreBtn.addEventListener('click', () => {
      if (typeof window.showToast === 'function') window.showToast('More lessons coming soon!');
      else {
        const t = document.getElementById('toast');
        if (!t) return;
        t.textContent = 'More lessons coming soon!';
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 2400);
      }
    });
  }
});

