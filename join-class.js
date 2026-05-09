const APP_DB_KEY='asrs_app_db';
const USERS_STORAGE_KEY='asrs_users';
const ACTIVE_USER_STORAGE_KEY='asrs_active_user';

// Fallback seed so join-class can work even if the admin page hasn't persisted yet.
// (admin-dash will also persist these seeds once it loads)
const DEFAULT_CLASSES = [
  { id: 'c1', name: 'Web Development', section: 'BSIT 3A', year: '2024–2025', sem: '1st Semester', code: 'WEBDEV-3A', color: 'var(--green-mid)', desc: 'Frontend and backend web development fundamentals.' },
  { id: 'c3', name: 'Data Structures', section: 'BSIT 3B', year: '2024–2025', sem: '1st Semester', code: 'DS-3B', color: '#7B2FBE', desc: 'Arrays, trees, graphs, and algorithms.' },
];

function getStoredUsers(){try{return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)||'[]');}catch(e){return [];}}
function getCurrentUser(){
  const activeId=localStorage.getItem(ACTIVE_USER_STORAGE_KEY);
  if(!activeId) return null;
  const user=getStoredUsers().find(u=>u.id===activeId)||null;
  if(!user || user.role!=='student') return null;
  return user;
}
function getAppDb(){
  let db = {};
  try { db = JSON.parse(localStorage.getItem(APP_DB_KEY) || '{}') || {}; } catch(e) { db = {}; }
  if(!Array.isArray(db.classes) || !db.classes.length) db.classes = DEFAULT_CLASSES;
  if(!Array.isArray(db.students)) db.students = [];
  return db;
}
function saveAppDb(db){localStorage.setItem(APP_DB_KEY, JSON.stringify(db));}
function setStatus(msg,type=''){const el=document.getElementById('joinStatus');el.className='status'+(type?' '+type:'');el.textContent=msg;}

function renderCurrentClass(){
  const user=getCurrentUser();
  if(!user){setStatus('Please login as a student first.','error');return;}
  const db = getAppDb();
  const memberships = (Array.isArray(db.students)?db.students:[])
    .filter(s => String(s.userId) === String(user.id) && s.status === 'approved');
  if(!memberships.length){ setStatus('You are not enrolled in a class yet.'); return; }
  const codes = memberships
    .map(m => db.classes.find(c => String(c.id) === String(m.classId))?.code || m.classCode)
    .filter(Boolean);
  setStatus('Enrolled in: ' + codes.join(', '),'success');
}

function joinClassByCode(){
  const code=(document.getElementById('classCodeInput').value||'').trim().toUpperCase();
  if(!code){setStatus('Please enter a class code.','error');return;}
  const user=getCurrentUser();
  if(!user){setStatus('Please login as a student first.','error');return;}
  const db=getAppDb();
  db.classes=Array.isArray(db.classes)?db.classes:[];
  db.students=Array.isArray(db.students)?db.students:[];
  const cls=db.classes.find(c=>(c.code||'').toUpperCase()===code);
  if(!cls){setStatus('Class code not found.','error');return;}

  const users=getStoredUsers();
  const idx=users.findIndex(u=>u.id===user.id);
  if(idx>=0){
    users[idx].classCode=cls.code;
    users[idx].classId=cls.id;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
  // Multi-class membership: one student-record per class (so teacher monitor can see each class separately).
  const membershipId = `ls-${user.id}-${cls.id}`;
  let membership = db.students.find(s => String(s.userId) === String(user.id) && String(s.classId) === String(cls.id));
  if(!membership) membership = db.students.find(s => s.id === membershipId);
  if (membership && membership.status === 'approved') {
    setStatus('You are already enrolled in class ' + cls.code + '.','success');
    return;
  }
  if (membership && membership.status === 'pending') {
    setStatus('Join request already sent for ' + cls.code + '. Please wait for teacher approval.','');
    return;
  }
  if(membership){
    membership.classId=cls.id;
    membership.classCode=cls.code;
    membership.status='pending';
    membership.name=membership.name||user.fullName;
    membership.email=membership.email||user.email;
    membership.userId = membership.userId || user.id;
  } else {
    db.students.push({
      id: membershipId,
      userId: user.id,
      name: user.fullName||'Student',
      classId: cls.id,
      classCode: cls.code,
      email: user.email||'',
      status:'pending',
      avg:0,quizzesDone:0,assignmentsDone:0,totalPts:0,
      corImage:user.corImage||'',corFileName:user.corFileName||''
    });
  }
  saveAppDb(db);
  setStatus('Join request sent for '+cls.code+'. Waiting for teacher approval.','success');
}

document.addEventListener('DOMContentLoaded', renderCurrentClass);
