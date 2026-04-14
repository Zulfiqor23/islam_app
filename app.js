// =============================================
// ISLOMIY KUNDALIK — PWA app.js
// =============================================

const SUPABASE_URL = 'https://eezjwzgvfhqtemwkvryl.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlemp3emd2ZmhxdGVtd2t2cnlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxODIyMDQsImV4cCI6MjA5MTc1ODIwNH0.ZvC_8a-M4obKChMXUXIoqOaeSKzSFtTEkqcXGOK9Rf4';
const VAPID_PUBLIC = 'BPDMN2SsoC_0EDu4-BFGmvMGPIXFwACZ75_V0TuQcTVSHA933gHz49okl12tJRJP_VX1o8OVo2aPRLMzsYQSjRU';

// ---- Supabase fetch helper ----
async function sbFetch(path, opts = {}) {
  const r = await fetch(`${SUPABASE_URL}${path}`, {
    ...opts,
    headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}`, 'Content-Type': 'application/json', ...opts.headers }
  });
  return r.json();
}

// =============================================
// DEFAULT DATA
// =============================================
const DEFAULT_TASKS = [
  {
    id: 'fotiha', title: 'Fotiha Surasi', badge: '1 marta', target: 1, isDefault: true,
    arabic: 'بِسۡمِ اللهِ الرَّحۡمٰنِ الرَّحِيۡمِ ۞ اَلۡحَمۡدُ لِلّٰهِ رَبِّ الۡعٰلَمِيۡنَ ۙ الرَّحۡمٰنِ الرَّحِيۡمِ مٰلِكِ يَوۡمِ الدِّيۡنِ اِيَّاكَ نَعۡبُدُ وَاِيَّاكَ نَسۡتَعِيۡنُ اِهۡدِنَا الصِّرَاطَ الۡمُسۡتَقِيۡمَ صِرَاطَ الَّذِيۡنَ اَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ الۡمَغۡضُوۡبِ عَلَيۡهِمۡ وَلَا الضَّآلِّيۡنَ',
    reading: 'Bismillahir Rahmanir Rahim. Alhamdu lillahi Rabbil alamin, Ar-Rahmanir-Rahim, Maliki yavmiddin. Iyyaka na\'budu va iyyaka nasta\'in. Ihdinas-siratol-mustaqim. Siratol-lazina an\'amta alayhim, ghayril maghdubi alayhim va lad-dollin.',
    meaning: 'Meҳрибон ва раҳмли Аллоҳнинг номи билан. Барча ҳамдлар оламлар Роббиси — Аллоҳга хосдир. У меҳрибон ва раҳмлидир. Жазо кунининг соҳибидир. Биз Сенгагина ибодат этамиз ва Сендангина ёрдам сўраймиз. Бизни тўғри йўлга ҳидоят қил.', accent: '#1C5C3E'
  },
  {
    id: 'baqara-start', title: 'Baqara — Avval (1-5)', badge: '1 marta', target: 1, isDefault: true,
    arabic: 'الٓمّٓ ذٰلِكَ الۡكِتٰبُ لَا رَيۡبَ فِيۡهِ هُدًى لِّلۡمُتَّقِيۡنَ الَّذِيۡنَ يُؤۡمِنُوۡنَ بِالۡغَيۡبِ وَيُقِيۡمُوۡنَ الصَّلٰوةَ وَمِمَّا رَزَقۡنٰهُمۡ يُنۡفِقُوۡنَ',
    reading: 'Alif. Lam. Mim. Zalikal kitabu la rayba fih, hudal lil-muttaqin. Allazina yu\'minuna bil-ghaybi va yuqimunas-salata va mimma razaqnahum yunfiqun.',
    meaning: 'Алиф. Лом. Мим. Ушбу Китобда шубҳа йўқ — у тақводорлар учун ҳидоятдир. Улар ғайбга иймон келтирадиган, намозни тўла адо этадиган кишилардир.', accent: '#2563EB'
  },
  {
    id: 'oyatul-kursi', title: 'Oyatal Kursiy', badge: '1 marta', target: 1, isDefault: true,
    arabic: 'اَللّٰهُ لَاۤ اِلٰهَ اِلَّا هُوَۚ اَلۡحَـىُّ الۡقَيُّوۡمُ لَا تَاۡخُذُهٗ سِنَةٌ وَّلَا نَوۡمٌ لَّهٗ مَا فِى السَّمٰوٰتِ وَمَا فِى الۡاَرۡضِ وَسِعَ كُرۡسِيُّهُ السَّمٰوٰتِ وَالۡاَرۡضَ وَهُوَ الۡعَلِىُّ الۡعَظِيۡمُ',
    reading: 'Allahu la ilaha illa huw, al-hayyul-qayyum. La ta\'khuzuhu sinatun va la nawm. Lahu ma fis-samavati va ma fil-ard. Vasi\'a kursiyyuhus-samavati val-ard, va la ya\'uduhu hifzuhuma, va huval-\'aliyyul-\'azim.',
    meaning: 'Аллоҳ — Ундан бошқа илоҳ йўқ. У тирик ва мангу Бордир. Уни уйқу ҳам, мудроқ ҳам босмайди. Унинг Курсиси осмонлар ва Ерни ўз ичига олади.', accent: '#6B21A8'
  },
  {
    id: 'baqara-end', title: 'Baqara — Oxirgi 2 oyat', badge: '1 marta', target: 1, isDefault: true,
    arabic: 'اٰمَنَ الرَّسُوۡلُ بِمَآ اُنۡزِلَ اِلَيۡهِ مِنۡ رَّبِّهٖ وَالۡمُؤۡمِنُوۡنَ كُلٌّ اٰمَنَ بِاللّٰهِ وَمَلٰٓٮِٕكَتِهٖ وَكُتُبِهٖ وَرُسُلِهٖ وَقَالُوۡا سَمِعۡنَا وَاَطَعۡنَا غُفۡرَانَكَ رَبَّنَا وَاِلَيۡكَ الۡمَصِيۡرُ',
    reading: 'Amanar-rasulu bima unzila ilayhi mir-rabbihi val-mu\'minun. Kullun amana billahi va malaaikatihi va kutubihi va rusulihi. Va qalu sami\'na va ata\'na, ghufranaka rabbana va ilaykal-masir.',
    meaning: 'Расул Роббисидан Ўзига нозил қилинган нарсага иймон келтирди, мўминлар ҳам. Ҳаммалари Аллоҳга, Унинг фаришталарига, Унинг Китобларига ва Расулларига иймон келтирдилар.', accent: '#C5A028'
  },
  {
    id: '4qul', title: '"4 Qul" Suralari', badge: '11 martadan', target: 11, is4qul: true, isDefault: true, accent: '#DC2626',
    surasText: [
      { name: 'Kofirun (109)', arabic: 'قُلۡ يٰۤاَيُّهَا الۡكٰفِرُوۡنَۙ لَاۤ اَعۡبُدُ مَا تَعۡبُدُوۡنَ وَلَاۤ اَنۡتُمۡ عٰبِدُوۡنَ مَاۤ اَعۡبُدُ', reading: "Qul ya ayyuhal-kafirun. La a'budu ma ta'budun. Va la antum abiduna ma a'bud. Lakum dinukum va liya din.", meaning: "Айт: «Эй кофирлар! Мен сизлар ибодат қилоётган нарсаларга ибодат қилмайман. Сизларнинг динингиз ўзингизга, менинг диним ўзимга»." },
      { name: 'Ixlos (112)', arabic: 'قُلۡ هُوَ اللّٰهُ اَحَدٌ اَللّٰهُ الصَّمَدُ لَمۡ يَلِدۡ وَلَمۡ يُوۡلَدۡ وَلَمۡ يَكُنۡ لَّهٗ كُفُوًا اَحَدٌ', reading: "Qul huval-lahu ahad. Allahus-samad. Lam yalid, va lam yulad. Va lam yakun lahu kufuvan ahad.", meaning: "Айт: «У Аллоҳ Ягонадир. Аллоҳ Самаддир. У туғмаган ва туғилмаган. Унга тенг бирор зот йўқ»." },
      { name: 'Falaq (113)', arabic: 'قُلۡ اَعُوۡذُ بِرَبِّ الۡفَلَقِ مِنۡ شَرِّ مَا خَلَقَ وَمِنۡ شَرِّ غَاسِقٍ اِذَا وَقَبَ وَمِنۡ شَرِّ النَّفّٰثٰتِ فِى الۡعُقَدِ وَمِنۡ شَرِّ حَاسِدٍ اِذَا حَسَدَ', reading: "Qul a'uzu bi rabbil-falaq. Min sharri ma khalaq. Va min sharri ghasiqin iza vaqab. Va min sharrin-naffasati fil-uqad. Va min sharri hasidin iza hasad.", meaning: "Айт: «Тонг Роббисига паноҳ сўрайман. У яратган нарсаларнинг шаридан. Тугунларга дам солувчи аёлларнинг шаридан. Ҳасадгўйнинг шаридан»." },
      { name: 'Nas (114)', arabic: 'قُلۡ اَعُوۡذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ اِلٰهِ النَّاسِ مِنۡ شَرِّ الۡوَسۡوَاسِ الۡخَنَّاسِ الَّذِىۡ يُوَسۡوِسُ فِىۡ صُدُوۡرِ النَّاسِ مِنَ الۡجِنَّةِ وَالنَّاسِ', reading: "Qul a'uzu bi rabbin-nas. Malikin-nas. Ilahin-nas. Min sharril-vasvasisil-khannas. Allazi yuvasvisu fi sudurin-nas. Minal-jinnati van-nas.", meaning: "Айт: «Одамлар Роббисига паноҳ сўрайман. Одамлар Подшоҳига. Одамлар Илоҳига. Васвасачи шаридан. Жин ва одамлардан»." }
    ]
  },
  {
    id: 'salovot', title: 'Salovot', badge: 'Ko\'p marta', target: 1, isDefault: true,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    reading: "Allohumma solli ala Muhammadin va ala ali Muhammad, kama solayta ala Ibrohima va ala ali Ibrohim, innaka Hamiydum-Majiyid. Allohumma barik ala Muhammadin va ala ali Muhammad, kama barakta ala Ibrohima va ala ali Ibrohim, innaka Hamiydum-Majiyid.",
    meaning: 'Эй Аллоҳ, Иброҳим ва Иброҳим аëлига саловот айтганинг каби Муҳаммад ва Муҳаммад аëлига ҳам саловот айт. Аллоҳ уларга барака берсин.', accent: '#1C5C3E'
  },
  {
    id: 'duo', title: 'Umumiy Duo', badge: '1 marta', target: 1, isDefault: true,
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    reading: "Robbana atina fid-dunya hasanatan va fil-akhirati hasanatan va qina azaban-nar.",
    meaning: 'Роббимиз, бизга дунëда ҳам, охиратда ҳам яхшилик бер ва бизни дўзах азобидан сақла!', accent: '#2563EB'
  }
];

const DEFAULT_DUAS = {
  uygunish: {
    label: '🌅 Uyg\'onish', items: [
      { id: 'uy1', isDefault: true, title: 'Uyg\'onish duosi', arabic: 'اَلۡحَمۡدُ لِلّٰهِ الَّذِيٓ اَحۡيَانَا بَعۡدَ مَآ اَمَاتَنَا وَاِلَيۡهِ النُّشُوۡرُ', reading: 'Alhamdu-lillahil-lazi axyana ba\'da maa amatana va ilayhin nushur.', meaning: 'Бизни ўлдиргандан кейин тирилтирган Аллоҳга ҳамд бўлсин ва Биз Унга қайтгувчимиз.' }
    ]
  },
  hojatxona: {
    label: '🚽 Hojatxona', items: [
      { id: 'hj1', isDefault: true, title: 'Kirishda', arabic: 'بِسْمِ اللهِ، اللّٰهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ', reading: "Bismillahi Allohumma inniy a'uuzu bika minal xubsi val xobaais.", meaning: 'Аллоҳнинг исми билан. Аллоҳим, Сендан эркак ва аёл шайтонлардан паноҳ сўрайман.' },
      { id: 'hj2', isDefault: true, title: 'Chiqqanda', arabic: 'غُفْرَانَكَ', reading: '3 marta "G\'ufronaka" — "Alhamdu-lillahil-lazi azhaba annil aza va afaanii"', meaning: 'Мағфиратингни сўрайман. Мендан азиятни кетказган ва офият берган Аллоҳга ҳамд бўлсин.' }
    ]
  },
  kecha: {
    label: '🌙 Uxlash oldidan', items: [
      { id: 'kc1', isDefault: true, title: 'Uxlash duosi', arabic: 'بِسْمِكَ اللّٰهُمَّ أَحْيَا وَأَمُوْتُ', reading: 'Bismika Allohumma axya va amutu.', meaning: 'Эй Роббим, Сенинг исминг билан тириламан ва ўламан.' }
    ]
  },
  special: {
    label: '✨ Maxsus Duolar', items: [
      { id: 'sp1', isDefault: true, title: 'Sayyidul Istig\'for', arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ', reading: "Allohumma anta Rabbiy, laa ilaaha illa anta xolaqtaniy va ana abduka va ana ala ahdika va va'dika mastata'tu, a'uzu bika min sharri maa sona'tu. Abu'u laka bini'matika alayya va abu'u bizanbiy fag'fir liy fa innahu laa yag'firuuz zunuuba illa anta.", meaning: 'Ё Аллоҳ, Сен Раббимсан, Сендан бошқа илоҳ йўқ. Мени Сен яратдинг. Мен банданг. Қилган гуноҳларимнинг ёмонлигидан паноҳ тилайман.' },
      { id: 'sp2', isDefault: true, title: 'Himoya (3 marta)', arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', reading: "Bismillahil-laziy laa yazurru ma'asmihii shay'un fil-ardzi va la fis-samaai va huwas-samii'ul-'aliim.", meaning: 'Исми билан ҳеч нарса зиён бера олмайдиган Аллоҳнинг номи билан. Ҳар тонг ва кечда 3 марта ўқиган кишига зиён етмайди.' }
    ]
  }
};

// =============================================
// STATE & STORAGE
// =============================================
let deviceId = localStorage.getItem('mlk_device_id');
if (!deviceId) {
  deviceId = crypto.randomUUID();
  localStorage.setItem('mlk_device_id', deviceId);
}

let profile = JSON.parse(localStorage.getItem('mlk_profile') || '{"name":"","utcOffset":5}');
let tasks = JSON.parse(localStorage.getItem('mlk_tasks') || 'null') || DEFAULT_TASKS;
let duas = JSON.parse(localStorage.getItem('mlk_duas') || 'null') || DEFAULT_DUAS;
let settings = JSON.parse(localStorage.getItem('mlk_settings') || '{}');
let counters = {};

function saveTasks() {
  localStorage.setItem('mlk_tasks', JSON.stringify(tasks));
  syncToCloud({ tasks });
}
function saveDuas() {
  localStorage.setItem('mlk_duas', JSON.stringify(duas));
  syncToCloud({ duas });
}
function saveProfile() {
  localStorage.setItem('mlk_profile', JSON.stringify(profile));
}
function saveGoalsFn() {
  localStorage.setItem('mlk_goals', JSON.stringify(window._goals || []));
}
function saveSettingsLocal() { localStorage.setItem('mlk_settings', JSON.stringify(settings)); }

// Debounce sync to avoid too many requests
let _syncTimer = null;
function syncToCloud(data) {
  clearTimeout(_syncTimer);
  _syncTimer = setTimeout(async () => {
    try {
      await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId, ...data })
      });
    } catch(e) { /* offline — ok, will sync next time */ }
  }, 1500);
}

async function restoreFromCloud() {
  try {
    const r = await fetch('/api/sync?deviceId=' + encodeURIComponent(deviceId));
    if (!r.ok) return false;
    const { data } = await r.json();
    if (!data) return false;

    // Restore profile
    if (data.name) {
      profile = { name: data.name, utcOffset: data.utc_offset ?? 5 };
      localStorage.setItem('mlk_profile', JSON.stringify(profile));
    }
    // Restore goals
    if (Array.isArray(data.goals) && data.goals.length) {
      localStorage.setItem('mlk_goals', JSON.stringify(data.goals));
    }
    // Restore duas
    if (data.duas && Object.keys(data.duas).length) {
      localStorage.setItem('mlk_duas', JSON.stringify(data.duas));
    }
    // Restore tasks
    if (Array.isArray(data.tasks) && data.tasks.length) {
      localStorage.setItem('mlk_tasks', JSON.stringify(data.tasks));
    }
    // Restore prayer times
    const t = {};
    ['bomdod','peshin','asr','shom','xufton'].forEach(k => { if (data[k]) t[k] = data[k]; });
    if (data.juma_time) t.juma = data.juma_time;
    if (data.work_start) t['work-start'] = data.work_start;
    if (data.work_end) t['work-end'] = data.work_end;
    if (Object.keys(t).length) {
      settings.times = t;
      localStorage.setItem('mlk_settings', JSON.stringify(settings));
    }
    return true;
  } catch(e) {
    return false;
  }
}

// =============================================
// DOM READY
// =============================================
document.addEventListener('DOMContentLoaded', () => {

  // Service Worker registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  }

  // Check first time
  if (!profile.name) {
    // Maybe localStorage was cleared — try cloud restore
    restoreFromCloud().then(restored => {
      if (restored) {
        profile = JSON.parse(localStorage.getItem('mlk_profile') || '{"name":"","utcOffset":5}');
      }
      if (profile.name) {
        document.getElementById('onboarding').classList.add('hidden');
        showApp();
      } else {
        document.getElementById('onboarding').classList.remove('hidden');
      }
    });
  } else {
    // Still try background sync to refresh any stale data
    restoreFromCloud().then(() => {});
    showApp();
  }

  // Onboarding submit
  document.getElementById('onboard-submit').addEventListener('click', () => {
    const name = document.getElementById('onboard-name').value.trim();
    if (!name) { document.getElementById('onboard-name').focus(); return; }
    const tz = parseInt(document.getElementById('onboard-tz').value);
    profile = { name, utcOffset: tz };
    saveProfile();
    document.getElementById('onboarding').classList.add('hidden');
    showApp();
  });

  function showApp() {
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('username-display').textContent = profile.name;
    startClock();
    // Reload data from localStorage (may have been updated by restoreFromCloud)
    tasks = JSON.parse(localStorage.getItem('mlk_tasks') || 'null') || DEFAULT_TASKS;
    duas = JSON.parse(localStorage.getItem('mlk_duas') || 'null') || DEFAULT_DUAS;
    settings = JSON.parse(localStorage.getItem('mlk_settings') || '{}');
    renderChecklist();
    renderDuas();
    loadSettingsToUI();
    checkNotifStatus();
  }

  // =============================================
  // CLOCK
  // =============================================
  function startClock() {
    function tick() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2,'0');
      const m = String(now.getMinutes()).padStart(2,'0');
      document.getElementById('clock').textContent = `${h}:${m}`;

      const hour = now.getHours();
      let greet = 'Assalomu alaykum';
      if (hour < 5) greet = 'Yarim kechada';
      else if (hour < 12) greet = 'Xayrli tong';
      else if (hour < 17) greet = 'Xayrli kun';
      else if (hour < 21) greet = 'Xayrli kech';
      else greet = 'Xayrli tun';
      document.getElementById('greeting').textContent = greet;
    }
    tick();
    setInterval(tick, 10000);
  }

  // =============================================
  // BOTTOM NAV
  // =============================================
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.remove('hidden');
    });
  });

  // =============================================
  // CHECKLIST RENDER
  // =============================================
  function renderChecklist() {
    const container = document.getElementById('checklist-cards');
    container.innerHTML = '';
    counters = {};
    tasks.forEach(task => {
      counters[task.id] = 0;
      container.appendChild(buildTaskCard(task));
    });
    updateChecklistProgress();
  }

  function buildTaskCard(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.id = `card-${task.id}`;
    card.style.borderLeftColor = task.accent || '#1C5C3E';

    let html = `<div class="card-top">
      <div class="card-name">${task.title}</div>
      <div class="card-badge" id="badge-${task.id}">${task.badge}</div>
    </div>`;

    if (task.is4qul) {
      html += `<div class="qul-grid">`;
      task.surasText.forEach(s => {
        html += `<div class="qul-mini">
          <h5>${s.name}</h5>
          <p class="arabic">${s.arabic}</p>
          <div class="reading-sm">${s.reading}</div>
          <div class="meaning-sm">${s.meaning}</div>
        </div>`;
      });
      html += `</div>`;
    } else {
      if (task.arabic) html += `<div class="card-arabic">${task.arabic}</div>`;
      if (task.reading) html += `<div class="card-reading">${task.reading}</div>`;
      if (task.meaning) html += `<div class="card-meaning">${task.meaning}</div>`;
    }

    if (task.target > 1) {
      html += `<div class="counter-row" id="ctr-${task.id}">
        <div class="counter-info">
          <div class="counter-label">Sanoq</div>
          <div class="counter-nums">
            <span class="counter-cur" id="cn-${task.id}">0</span>
            <span class="counter-sep">/</span>
            <span class="counter-max">${task.target}</span>
          </div>
        </div>
        <div class="progress-mini"><div class="progress-mini-fill" id="pm-${task.id}"></div></div>
        <button class="counter-plus" id="cp-${task.id}" data-id="${task.id}" data-target="${task.target}">+</button>
      </div>`;
    } else {
      html += `<div class="confirm-row">
        <button class="confirm-btn" id="cb-${task.id}" data-id="${task.id}">✓ Bajarildi</button>
      </div>`;
    }

    card.innerHTML = html;

    // Attach events after innerHTML
    if (task.target > 1) {
      card.querySelector(`#cp-${task.id}`).addEventListener('click', () => incrementCounter(task.id, task.target));
    } else {
      card.querySelector(`#cb-${task.id}`).addEventListener('click', () => completeTask(task.id));
    }

    return card;
  }

  function incrementCounter(id, target) {
    if (counters[id] >= target) return;
    counters[id]++;
    const num = document.getElementById(`cn-${id}`);
    const bar = document.getElementById(`pm-${id}`);
    const btn = document.getElementById(`cp-${id}`);
    if (num) num.textContent = counters[id];
    if (bar) bar.style.width = `${(counters[id]/target)*100}%`;
    if (counters[id] >= target) {
      completeTask(id);
      if (btn) { btn.textContent = '✓'; btn.classList.add('done'); }
    }
    // Haptic
    if (navigator.vibrate) navigator.vibrate(10);
  }

  function completeTask(id) {
    const card = document.getElementById(`card-${id}`);
    if (card) card.classList.add('completed');
    const btn = document.getElementById(`cb-${id}`);
    if (btn) { btn.classList.add('done'); btn.textContent = '✓ Bajarildi!'; }
    const badge = document.getElementById(`badge-${id}`);
    if (badge) badge.classList.add('done');
    if (navigator.vibrate) navigator.vibrate([10, 50, 30]);
    updateChecklistProgress();
  }

  function updateChecklistProgress() {
    const total = tasks.length;
    const done = tasks.filter(t => {
      const card = document.getElementById(`card-${t.id}`);
      return card && card.classList.contains('completed');
    }).length;
    const pct = total ? (done / total * 100) : 0;
    const bar = document.getElementById('cl-progress');
    const text = document.getElementById('cl-progress-text');
    if (bar) bar.style.width = `${pct}%`;
    if (text) text.textContent = `${done} / ${total}`;
    const odat = document.getElementById('odat-card');
    if (odat) { done === total && total > 0 ? odat.classList.remove('hidden') : odat.classList.add('hidden'); }
  }

  // =============================================
  // DUAS RENDER
  // =============================================
  function renderDuas() {
    const container = document.getElementById('duas-categories');
    container.innerHTML = '';
    Object.entries(duas).forEach(([catKey, cat]) => {
      if (!cat.items?.length) return;
      const section = document.createElement('div');
      section.className = 'category-section';
      section.innerHTML = `<div class="category-title">${cat.label}</div>`;
      cat.items.forEach(dua => {
        const d = document.createElement('div');
        d.className = 'dua-card';
        d.id = `dua-${dua.id}`;
        d.innerHTML = `<h4>${dua.title}</h4>
          ${dua.arabic ? `<div class="dua-arabic">${dua.arabic}</div>` : ''}
          ${dua.reading ? `<div class="dua-reading">${dua.reading}</div>` : ''}
          ${dua.meaning ? `<div class="dua-meaning">${dua.meaning}</div>` : ''}`;
        section.appendChild(d);
      });
      container.appendChild(section);
    });
  }

  // =============================================
  // EDIT CHECKLIST MODAL
  // =============================================
  let editMode = null; // 'checklist' | 'duas'
  let editingItemIndex = null;

  document.getElementById('edit-checklist-btn').addEventListener('click', () => openEditModal('checklist'));
  document.getElementById('edit-duas-btn').addEventListener('click', () => openEditModal('duas'));
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-body').addEventListener('click', handleModalActions);

  function openEditModal(mode) {
    editMode = mode;
    const modal = document.getElementById('edit-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    title.textContent = mode === 'checklist' ? "Checklistni Tahrirlash" : "Duolarni Tahrirlash";

    if (mode === 'checklist') {
      body.innerHTML = tasks.map((t, i) => `
        <div class="edit-item">
          <div class="edit-item-text">${t.title}<br><small style="color:var(--text-muted)">${t.badge}</small></div>
          <div class="edit-actions">
            ${t.isDefault
              ? `<span style="font-size:11px;color:var(--text-muted);font-weight:600;padding:6px 8px">🔒 Default</span>`
              : `<button class="btn-danger" data-action="delete-task" data-index="${i}">🗑</button>`
            }
          </div>
        </div>`).join('') +
        `<button class="add-new-btn" data-action="add-task">+ Yangi Vazifa Qo'shish</button>`;
    } else {
      let html = '';
      Object.entries(duas).forEach(([catKey, cat]) => {
        html += `<div class="category-title" style="margin-top:14px">${cat.label}</div>`;
        html += cat.items.map((d, i) => `
          <div class="edit-item">
            <div class="edit-item-text">${d.title}</div>
            <div class="edit-actions">
              ${d.isDefault
                ? `<span style="font-size:11px;color:var(--text-muted);font-weight:600;padding:6px 8px">🔒 Default</span>`
                : `<button class="btn-danger" data-action="delete-dua" data-cat="${catKey}" data-index="${i}">🗑</button>`
              }
            </div>
          </div>`).join('');
      });
      html += `<button class="add-new-btn" data-action="add-dua">+ Yangi Duo Qo'shish</button>`;
      body.innerHTML = html;
    }
    modal.classList.remove('hidden');
  }

  function closeModal() {
    document.getElementById('edit-modal').classList.add('hidden');
  }

  function handleModalActions(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    if (action === 'delete-task') {
      const idx = parseInt(btn.dataset.index);
      if (tasks[idx]?.isDefault) return; // default ni o'chirib bo'lmaydi
      if (confirm(`"${tasks[idx].title}" o'chirilsinmi?`)) {
        tasks.splice(idx, 1); saveTasks(); renderChecklist(); openEditModal('checklist');
      }
    } else if (action === 'add-task') {
      closeModal();
      openAddModal();
    } else if (action === 'delete-dua') {
      const cat = btn.dataset.cat; const idx = parseInt(btn.dataset.index);
      if (duas[cat]?.items[idx]?.isDefault) return; // default ni o'chirib bo'lmaydi
      if (confirm(`"${duas[cat].items[idx].title}" o'chirilsinmi?`)) {
        duas[cat].items.splice(idx, 1); saveDuas(); renderDuas(); openEditModal('duas');
      }
    } else if (action === 'add-dua') {
      closeModal();
      openAddDuaModal();
    }
  }

  // =============================================
  // ADD TASK MODAL
  // =============================================
  document.getElementById('add-modal-close').addEventListener('click', () => document.getElementById('add-modal').classList.add('hidden'));
  document.getElementById('add-save-btn').addEventListener('click', saveNewTask);

  function openAddModal() {
    ['add-title','add-arabic','add-reading','add-meaning','add-badge'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('add-target').value = 1;
    document.getElementById('add-modal').classList.remove('hidden');
  }

  function saveNewTask() {
    const title = document.getElementById('add-title').value.trim();
    if (!title) { alert('Sarlavha kiriting'); return; }
    const target = parseInt(document.getElementById('add-target').value) || 1;
    const badge = document.getElementById('add-badge').value.trim() || `${target} marta`;
    const task = {
      id: `task_${Date.now()}`,
      title, badge, target,
      arabic: document.getElementById('add-arabic').value.trim(),
      reading: document.getElementById('add-reading').value.trim(),
      meaning: document.getElementById('add-meaning').value.trim(),
      accent: '#1C5C3E'
    };
    tasks.push(task);
    saveTasks(); renderChecklist();
    document.getElementById('add-modal').classList.add('hidden');
  }

  // =============================================
  // ADD DUA MODAL
  // =============================================
  document.getElementById('add-dua-close').addEventListener('click', () => document.getElementById('add-dua-modal').classList.add('hidden'));
  document.getElementById('add-dua-save-btn').addEventListener('click', saveNewDua);

  function openAddDuaModal() {
    ['dua-title','dua-arabic','dua-reading','dua-meaning'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('add-dua-modal').classList.remove('hidden');
  }

  function saveNewDua() {
    const title = document.getElementById('dua-title').value.trim();
    if (!title) { alert('Sarlavha kiriting'); return; }
    const cat = document.getElementById('dua-category').value;
    const dua = {
      id: `dua_${Date.now()}`,
      title,
      arabic: document.getElementById('dua-arabic').value.trim(),
      reading: document.getElementById('dua-reading').value.trim(),
      meaning: document.getElementById('dua-meaning').value.trim(),
    };
    if (!duas[cat]) duas[cat] = { label: cat, items: [] };
    duas[cat].items.push(dua);
    saveDuas(); renderDuas();
    document.getElementById('add-dua-modal').classList.add('hidden');
  }

  // =============================================
  // SETTINGS
  // =============================================
  function loadSettingsToUI() {
    document.getElementById('s-name').value = profile.name || '';
    document.getElementById('s-tz').value = String(profile.utcOffset ?? 5);
    const t = settings.times || {};
    ['bomdod','peshin','asr','shom','xufton','juma'].forEach(k => {
      const el = document.getElementById(`s-${k}`);
      if (el && t[k]) el.value = t[k];
    });
    if (t['work-start']) document.getElementById('s-work-start').value = t['work-start'];
    if (t['work-end']) document.getElementById('s-work-end').value = t['work-end'];
  }

  document.getElementById('save-settings-btn').addEventListener('click', async () => {
    const name = document.getElementById('s-name').value.trim();
    const tz = parseInt(document.getElementById('s-tz').value);
    profile = { name: name || profile.name, utcOffset: tz };
    saveProfile();
    document.getElementById('username-display').textContent = profile.name;

    const times = {};
    ['bomdod','peshin','asr','shom','xufton','juma'].forEach(k => {
      times[k] = document.getElementById(`s-${k}`)?.value || '';
    });
    times['work-start'] = document.getElementById('s-work-start')?.value || '';
    times['work-end'] = document.getElementById('s-work-end')?.value || '';
    settings.times = times;
    saveSettingsLocal();

    // Save to Supabase
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId, times, utcOffset: tz })
      });
    } catch(e) {}

    alert('✓ Saqlandi!');
  });

  // =============================================
  // PUSH NOTIFICATIONS
  // =============================================
  async function checkNotifStatus() {
    const statusEl = document.getElementById('notif-status-text');
    const btn = document.getElementById('enable-notif-btn');
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      statusEl.textContent = '❌ Bu qurilma bildirishnomalarni qo\'llab-quvvatlamaydi';
      btn.classList.add('hidden');
      return;
    }
    if (Notification.permission === 'granted') {
      statusEl.textContent = '✅ Bildirishnomalar yoqilgan';
      btn.textContent = 'Qayta ulash';
    } else if (Notification.permission === 'denied') {
      statusEl.textContent = '❌ Bildirishnomalar bloklangan. Safari → Sozlamalar dan ruxsat bering.';
      btn.classList.add('hidden');
    } else {
      statusEl.textContent = '⚠️ Bildirishnomalar hali yoqilmagan';
    }
  }

  document.getElementById('enable-notif-btn').addEventListener('click', async () => {
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') { alert('Ruxsat berilmadi'); return; }

    if (!VAPID_PUBLIC) {
      alert('VAPID kalitlari hali sozlanmagan. Vercel ga deploy qilingandan so\'ng ishlaydi.');
      return;
    }

    try {
      const sw = await navigator.serviceWorker.ready;
      const sub = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC)
      });
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId, name: profile.name, subscription: sub.toJSON(), utcOffset: profile.utcOffset })
      });
      checkNotifStatus();
      alert('✅ Bildirishnomalar yoqildi!');
    } catch (err) {
      console.error(err);
      alert('Xatolik yuz berdi: ' + err.message);
    }
  });

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
  }

  // Notification overlay dismiss
  document.getElementById('notif-dismiss').addEventListener('click', () => {
    document.getElementById('notif-overlay').classList.add('hidden');
  });
  // Settings save btn saves to cloud via /api/settings too

  // =============================================
  // MAQSADLAR (GOALS) — Persistent Counters
  // =============================================
  let goals = JSON.parse(localStorage.getItem('mlk_goals') || '[]');
  function saveGoals() {
    localStorage.setItem('mlk_goals', JSON.stringify(goals));
    syncToCloud({ goals }); // Har bosilganda cloud ga ham saqlaydi
  }

  if (!goals.length) {
    goals = [
      { id: 'g1', title: "Sura Ali Imron", text: '', target: 3, current: 0, completed: false, completedAt: null, createdAt: Date.now() },
      { id: 'g2', title: "Sura Al-Moida", text: '', target: 40, current: 0, completed: false, completedAt: null, createdAt: Date.now() },
      { id: 'g3', title: "Sura An'om", text: '', target: 41, current: 0, completed: false, completedAt: null, createdAt: Date.now() },
      { id: 'g4', title: "Sura Anfol", text: '', target: 7, current: 0, completed: false, completedAt: null, createdAt: Date.now() },
      { id: 'g5', title: "Sura Tavba", text: '', target: 17, current: 0, completed: false, completedAt: null, createdAt: Date.now() },
      { id: 'g6', title: "Sura Niso", text: '', target: 1, current: 0, completed: false, completedAt: null, createdAt: Date.now() },
      { id: 'g7', title: "Sura A'rof", text: '', target: 1, current: 0, completed: false, completedAt: null, createdAt: Date.now() },
    ];
    saveGoals();
  }

  function renderGoals() {
    const activeContainer = document.getElementById('goals-active');
    const completedContainer = document.getElementById('goals-completed');
    const completedSection = document.getElementById('goals-completed-section');
    activeContainer.innerHTML = '';
    completedContainer.innerHTML = '';

    const active = goals.filter(g => !g.completed);
    const completed = goals.filter(g => g.completed);

    if (!active.length) {
      activeContainer.innerHTML = `<div style="text-align:center;padding:40px 20px;color:var(--text-muted)">
        <div style="font-size:48px;margin-bottom:12px">🎯</div>
        <p>Hali maqsad qoyilmagan. Yuqoridagi <strong>+</strong> tugmasini bosing.</p>
      </div>`;
    }

    active.forEach(goal => activeContainer.appendChild(buildGoalCard(goal, false)));
    if (completed.length) {
      completedSection.classList.remove('hidden');
      completed.forEach(goal => completedContainer.appendChild(buildGoalCard(goal, true)));
    } else {
      completedSection.classList.add('hidden');
    }
  }

  function buildGoalCard(goal, isDone) {
    const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
    const card = document.createElement('div');
    card.className = 'task-card' + (isDone ? ' completed' : '');
    card.style.borderLeftColor = isDone ? '#48bb78' : '#C5A028';
    card.id = 'goal-card-' + goal.id;

    const catLabels = { sura: 'Sura', oyat: 'Oyat', duo: 'Duo', zikr: 'Zikr', other: 'Boshqa' };
    card.innerHTML = `
      <div class="card-top">
        <div class="card-name">${goal.title}</div>
        <button class="btn-danger" style="padding:6px 10px;font-size:13px" data-del="${goal.id}">🗑</button>
      </div>
      ${goal.category ? `<span class="goal-cat-badge">${catLabels[goal.category] || goal.category}</span>` : ''}
      ${goal.description ? `<div class="goal-description">🤲 ${goal.description}</div>` : ''}
      ${goal.text ? `<div class="card-arabic" style="font-size:16px;margin-bottom:10px">${goal.text}</div>` : ''}
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px">
          <span style="font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase">Jamlangan</span>
          <span style="font-size:24px;font-weight:900;color:var(--text)">${goal.current.toLocaleString()} <span style="font-size:14px;color:var(--text-muted);font-weight:500">/ ${goal.target.toLocaleString()}</span></span>
        </div>
        <div class="progress-bar" style="height:10px">
          <div class="progress-fill" style="width:${pct}%;background:linear-gradient(to right,#C5A028,#f6d365)"></div>
        </div>
        <div style="text-align:right;font-size:12px;color:#C5A028;font-weight:700;margin-top:4px">${pct}%</div>
      </div>
      ${!isDone ? `<div style="display:flex;gap:12px;align-items:center">
        <button class="counter-plus" style="background:linear-gradient(135deg,#C5A028,#f6d365);box-shadow:0 4px 14px rgba(197,160,40,0.35)" data-inc="${goal.id}">+</button>
        <div style="flex:1;font-size:13px;color:var(--text-muted);font-weight:600">Qoldi: ${Math.max(0, goal.target - goal.current).toLocaleString()} marta</div>
      </div>` : `<div style="text-align:center;font-size:14px;color:var(--green);font-weight:700;padding:8px 0">
        Mashaalloh! ${goal.completedAt ? new Date(goal.completedAt).toLocaleDateString() : ''}
      </div>`}`;

    card.querySelector('[data-del]')?.addEventListener('click', () => {
      if (confirm('"' + goal.title + '" maqsadini ochirish?')) {
        goals = goals.filter(g => g.id !== goal.id);
        saveGoals(); renderGoals();
      }
    });
    card.querySelector('[data-inc]')?.addEventListener('click', () => incrementGoal(goal.id));
    return card;
  }

  function incrementGoal(id) {
    const goal = goals.find(g => g.id === id);
    if (!goal || goal.completed) return;
    goal.current++;
    if (navigator.vibrate) navigator.vibrate(15);
    if (goal.current >= goal.target) {
      goal.completed = true;
      goal.completedAt = Date.now();
      saveGoals(); renderGoals();
      showCelebration(goal);
    } else {
      saveGoals(); renderGoals();
    }
  }

  function showCelebration(goal) {
    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 300]);
    document.getElementById('celebration-goal-name').textContent = '"' + goal.title + '"';
    document.getElementById('celebration-stats').innerHTML =
      `<div style="margin-top:12px;padding:14px;background:rgba(255,255,255,0.12);border-radius:12px;font-size:15px;color:rgba(255,255,255,0.9)">
        Jami ${goal.target.toLocaleString()} marta o'qidingiz
      </div>`;
    document.getElementById('celebration-overlay').classList.remove('hidden');
  }

  document.getElementById('celebration-close')?.addEventListener('click', () => {
    document.getElementById('celebration-overlay').classList.add('hidden');
  });

  document.getElementById('add-goal-btn').addEventListener('click', () => {
    document.getElementById('goal-title').value = '';
    document.getElementById('goal-text').value = '';
    document.getElementById('goal-description').value = '';
    document.getElementById('goal-target').value = 1000;
    document.getElementById('add-goal-modal').classList.remove('hidden');
  });
  document.getElementById('add-goal-close').addEventListener('click', () => {
    document.getElementById('add-goal-modal').classList.add('hidden');
  });
  document.getElementById('goal-save-btn').addEventListener('click', () => {
    const title = document.getElementById('goal-title').value.trim();
    const target = parseInt(document.getElementById('goal-target').value);
    if (!title) { alert('Maqsad nomini kiriting'); return; }
    if (!target || target < 1) { alert('Necha marta ekanini kiriting'); return; }
    goals.unshift({
      id: 'goal_' + Date.now(), title, target,
      category: document.getElementById('goal-category').value,
      description: document.getElementById('goal-description').value.trim(),
      text: document.getElementById('goal-text').value.trim(),
      current: 0, completed: false, completedAt: null, createdAt: Date.now()
    });
    saveGoals(); renderGoals();
    document.getElementById('add-goal-modal').classList.add('hidden');
  });

  renderGoals();

  // =============================================
  // BILIMLAR — Personal Knowledge Base
  // =============================================
  let bilimlar = JSON.parse(localStorage.getItem('mlk_bilimlar') || '[]');
  let activeBilimCat = 'all';

  function saveBilimlar() {
    localStorage.setItem('mlk_bilimlar', JSON.stringify(bilimlar));
    syncToCloud({ bilimlar });
  }

  function renderBilimlar() {
    const list = document.getElementById('bilimlar-list');
    list.innerHTML = '';
    const filtered = activeBilimCat === 'all' ? bilimlar : bilimlar.filter(b => b.category === activeBilimCat);

    if (!filtered.length) {
      list.innerHTML = `<div style="text-align:center;padding:40px 20px;color:var(--text-muted)">
        <div style="font-size:48px;margin-bottom:12px">📚</div>
        <p>Hali bilim yig'ilmagan.<br>Yuqoridagi <strong>+</strong> tugmasini bosing.</p>
      </div>`;
      return;
    }

    const catBadge = { hadis: 'badge-hadis', duo: 'badge-duo', fiqh: 'badge-fiqh', tafsir: 'badge-tafsir', other: 'badge-other' };
    const catLabel = { hadis: 'Hadis', duo: 'Duo', fiqh: 'Fiqh', tafsir: 'Tafsir', other: 'Boshqa' };

    filtered.forEach(b => {
      const card = document.createElement('div');
      card.className = 'bilim-card';
      card.setAttribute('data-cat', b.category || 'other');
      card.id = 'bilim-' + b.id;
      card.innerHTML = `
        <div class="bilim-card-top">
          <h4>${b.title}</h4>
          <span class="bilim-cat-badge ${catBadge[b.category] || 'badge-other'}">${catLabel[b.category] || 'Boshqa'}</span>
        </div>
        <div class="bilim-content">${b.content}</div>
        ${b.source ? `<div class="bilim-source">${b.source}</div>` : ''}
        <div class="bilim-actions">
          <button class="btn-danger" style="padding:7px 14px;font-size:12px" data-del-bilim="${b.id}">🗑 O'chirish</button>
        </div>`;
      card.querySelector('[data-del-bilim]')?.addEventListener('click', () => {
        if (confirm('"' + b.title + '" o\'chirilsinmi?')) {
          bilimlar = bilimlar.filter(x => x.id !== b.id);
          saveBilimlar(); renderBilimlar();
        }
      });
      list.appendChild(card);
    });
  }

  // Filter buttons
  document.getElementById('bilim-filter').addEventListener('click', e => {
    const btn = e.target.closest('[data-cat]');
    if (!btn) return;
    activeBilimCat = btn.dataset.cat;
    document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderBilimlar();
  });

  // Add bilim
  document.getElementById('add-bilim-btn').addEventListener('click', () => {
    ['bilim-title', 'bilim-content', 'bilim-source'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('add-bilim-modal').classList.remove('hidden');
  });
  document.getElementById('add-bilim-close').addEventListener('click', () => {
    document.getElementById('add-bilim-modal').classList.add('hidden');
  });
  document.getElementById('bilim-save-btn').addEventListener('click', () => {
    const title = document.getElementById('bilim-title').value.trim();
    const content = document.getElementById('bilim-content').value.trim();
    if (!title) { alert('Sarlavha kiriting'); return; }
    if (!content) { alert('Matn kiriting'); return; }
    bilimlar.unshift({
      id: 'bilim_' + Date.now(),
      title, content,
      category: document.getElementById('bilim-category').value,
      source: document.getElementById('bilim-source').value.trim(),
      createdAt: Date.now()
    });
    saveBilimlar(); renderBilimlar();
    document.getElementById('add-bilim-modal').classList.add('hidden');
  });

  renderBilimlar();
});
