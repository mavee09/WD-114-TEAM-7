  const USERS_STORAGE_KEY = 'asrs_users';
  const ACTIVE_USER_STORAGE_KEY = 'asrs_active_user';
  let activeUser = null;
  let selectedTheme = 'dark';

  function getUsers(){
    try { return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]'); }
    catch(e){ return []; }
  }

  function normalizeNamePart(value){
    return String(value || '').trim().replace(/\s+/g, ' ');
  }

  function splitStoredName(user){
    const last = normalizeNamePart(user?.lastName);
    const first = normalizeNamePart(user?.firstName);
    const middle = normalizeNamePart(user?.middleName);
    if (last || first || middle) {
      return { lastName: last, firstName: first, middleName: middle };
    }

    const full = normalizeNamePart(user?.fullName);
    if (!full) return { lastName: '', firstName: '', middleName: '' };
    const commaIdx = full.indexOf(',');
    if (commaIdx >= 0) {
      const ln = normalizeNamePart(full.slice(0, commaIdx));
      const rest = normalizeNamePart(full.slice(commaIdx + 1));
      const parts = rest.split(' ').filter(Boolean);
      return {
        lastName: ln,
        firstName: parts[0] || '',
        middleName: parts.slice(1).join(' ')
      };
    }
    const parts = full.split(' ').filter(Boolean);
    return {
      lastName: parts.length > 1 ? parts[parts.length - 1] : '',
      firstName: parts[0] || '',
      middleName: parts.slice(1, -1).join(' ')
    };
  }

  function buildFullName(lastName, firstName, middleName){
    const ln = normalizeNamePart(lastName);
    const fn = normalizeNamePart(firstName);
    const mn = normalizeNamePart(middleName);
    const firstWithMiddle = [fn, mn].filter(Boolean).join(' ');
    return firstWithMiddle ? `${ln}, ${firstWithMiddle}` : ln;
  }

  function loadAccountSummary(){
    const activeId = localStorage.getItem(ACTIVE_USER_STORAGE_KEY);
    const user = getUsers().find(u => u.id === activeId);
    if(!user || user.role !== 'student'){
      window.location.href = 'login.html';
      return;
    }
    activeUser = user;
    const names = splitStoredName(user);
    document.getElementById('acct-last-name').value = names.lastName;
    document.getElementById('acct-first-name').value = names.firstName;
    document.getElementById('acct-middle-name').value = names.middleName;
    document.getElementById('acct-email').value = user.email || '';
    loadAppearance();
  }

  function saveAccountProfile(){
    if(!activeUser){ showToast('No active user found.'); return; }
    const lastName = document.getElementById('acct-last-name').value.trim();
    const firstName = document.getElementById('acct-first-name').value.trim();
    const middleName = document.getElementById('acct-middle-name').value.trim();
    const fullName = buildFullName(lastName, firstName, middleName);
    const email = document.getElementById('acct-email').value.trim();
    if(!lastName || !firstName || !email){ showToast('Last name, first name, and email are required.'); return; }
    const users = getUsers();
    const conflict = users.find(u => u.id !== activeUser.id && (u.email||'').toLowerCase() === email.toLowerCase());
    if(conflict){ showToast('Email is already used by another account.'); return; }
    const idx = users.findIndex(u => u.id === activeUser.id);
    if(idx < 0){ showToast('Account not found.'); return; }
    users[idx].lastName = normalizeNamePart(lastName);
    users[idx].firstName = normalizeNamePart(firstName);
    users[idx].middleName = normalizeNamePart(middleName);
    users[idx].fullName = fullName;
    users[idx].email = email;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    activeUser = users[idx];
    // Update nav name/avatar too
    if (typeof applyNavIdentity === 'function') applyNavIdentity();
    showToast('Account updated!');
  }

  function showPanel(name, btn){
    document.querySelectorAll('.s-nav-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.settings-panel').forEach(p=>p.classList.remove('active'));
    if(btn) btn.classList.add('active');
    document.getElementById('panel-'+name).classList.add('active');
  }
  function selectTheme(el,name){
    document.querySelectorAll('.theme-opt').forEach(o=>o.classList.remove('selected'));
    el.classList.add('selected');
    selectedTheme = el.dataset.theme || 'dark';
    applyThemePreview(selectedTheme);
    showToast(name+' theme selected!');
  }

  function applyThemePreview(theme){
    document.body.classList.remove('theme-light','theme-forest');
    if(theme === 'light') document.body.classList.add('theme-light');
    if(theme === 'forest') document.body.classList.add('theme-forest');
  }

  function applyAppearance(){
    if(!activeUser){ showToast('No active user found.'); return; }
    const fontSize = document.getElementById('font-size-select').value || 'medium';
    document.body.classList.remove('fs-small','fs-medium','fs-large');
    document.body.classList.add(`fs-${fontSize}`);

    const prefs = JSON.parse(localStorage.getItem('asrs_ui_prefs') || '{}');
    prefs[activeUser.id] = { theme: selectedTheme, fontSize };
    localStorage.setItem('asrs_ui_prefs', JSON.stringify(prefs));
    showToast('Appearance saved!');
  }

  function loadAppearance(){
    if(!activeUser) return;
    const prefs = JSON.parse(localStorage.getItem('asrs_ui_prefs') || '{}');
    const mine = prefs[activeUser.id] || { theme:'dark', fontSize:'medium' };
    selectedTheme = mine.theme || 'dark';
    applyThemePreview(selectedTheme);
    document.body.classList.remove('fs-small','fs-medium','fs-large');
    document.body.classList.add(`fs-${mine.fontSize || 'medium'}`);
    document.getElementById('font-size-select').value = mine.fontSize || 'medium';
    const themeOpt = document.querySelector(`.theme-opt[data-theme="${selectedTheme}"]`);
    document.querySelectorAll('.theme-opt').forEach(o=>o.classList.remove('selected'));
    if(themeOpt) themeOpt.classList.add('selected');
  }

  function changePassword(){
    if(!activeUser) return;
    const current = document.getElementById('current-password').value;
    const next = document.getElementById('new-password').value;
    const confirmPwd = document.getElementById('confirm-password').value;
    if(!current || !next || !confirmPwd){
      showToast('Please complete all password fields.');
      return;
    }
    if(current !== activeUser.password){
      showToast('Current password is incorrect.');
      return;
    }
    if(next.length < 8){
      showToast('New password must be at least 8 characters.');
      return;
    }
    if(next !== confirmPwd){
      showToast('New passwords do not match.');
      return;
    }
    const users = getUsers();
    const idx = users.findIndex(u => u.id === activeUser.id);
    if(idx < 0){
      showToast('Account not found.');
      return;
    }
    users[idx].password = next;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    activeUser = users[idx];
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    showToast('Password changed successfully!');
  }
  function confirmAction(msg){
    if(confirm(msg+'\nThis cannot be undone!')){showToast('Action cancelled for demo.');}
  }
  function showToast(msg){
    const t=document.getElementById('toast');
    t.textContent=msg;t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'),3000);
  }

  document.addEventListener('DOMContentLoaded', loadAccountSummary);
