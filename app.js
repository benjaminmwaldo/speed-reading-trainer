/* ==========================================================================
   Speed Reading Trainer - Main Application Logic
   ========================================================================== */

(function () {
  'use strict';

  // ========== FIREBASE CONFIG ==========
  const firebaseConfig = {
    apiKey: "AIzaSyDWU1KzQxERUR7lgVGVThxFkpyWwxf9geA",
    authDomain: "speed-reading-trainer-1e4dc.firebaseapp.com",
    projectId: "speed-reading-trainer-1e4dc",
    storageBucket: "speed-reading-trainer-1e4dc.firebasestorage.app",
    messagingSenderId: "166863218918",
    appId: "1:166863218918:web:021c260e4dc4b711313327"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  // ========== GLOBALS ==========
  let currentUser = null;
  let sessions = [];
  let dashChart = null;
  let progressChart = null;

  // Active test state
  let activeTest = {
    text: null,
    startTime: null,
    endTime: null,
    timerInterval: null,
    questionIndex: 0,
    correctAnswers: 0
  };

  // Exercise state
  let rsvpState = { interval: null, accelInterval: null, paused: false, index: 0, words: [], wpm: 250 };
  let chunkingState = { timeout: null, active: false, score: 0, streak: 0, consecutiveCorrect: 0, chunkSize: 2, displayTime: 800, words: [], usedChunks: [] };
  let eyespanState = { timeout: null, active: false, score: 0, total: 0, consecutiveCorrect: 0, span: 3, displayTime: 600, words: [] };
  let pacerState = { interval: null, paused: false, wpm: 300, lineIndex: 0, lines: [] };
  let fluencyState = { round: 0, baseWpm: 0, targetWpm: 0, text: null, startTime: null, timerInterval: null, lines: [], lineIndex: 0, interval: null, paused: false, roundWpms: [] };
  let regressionState = { text: null, lines: [], lineIndex: 0, interval: null, wpm: 250, startTime: null, wordCount: 0, questionIndex: 0, correctAnswers: 0 };

  // ========== UTILITY FUNCTIONS ==========

  function esc(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function $(id) {
    return document.getElementById(id);
  }

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes + ':' + String(seconds).padStart(2, '0');
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ========== SPA ROUTING ==========

  const routeMap = {
    'dashboard': 'screen-dashboard',
    'test-setup': 'screen-test-setup',
    'test-active': 'screen-test-active',
    'test-questions': 'screen-test-questions',
    'test-results': 'screen-test-results',
    'exercises': 'screen-exercises',
    'exercise-rsvp': 'screen-exercise-rsvp',
    'exercise-chunking': 'screen-exercise-chunking',
    'exercise-eyespan': 'screen-exercise-eyespan',
    'exercise-pacer': 'screen-exercise-pacer',
    'exercise-fluency': 'screen-exercise-fluency',
    'exercise-regression': 'screen-exercise-regression',
    'progress': 'screen-progress'
  };

  // Map nav data-route to which screen group it covers
  const navRouteMap = {
    'dashboard': ['dashboard'],
    'test': ['test-setup', 'test-active', 'test-questions', 'test-results'],
    'exercises': ['exercises', 'exercise-rsvp', 'exercise-chunking', 'exercise-eyespan', 'exercise-pacer', 'exercise-fluency', 'exercise-regression'],
    'progress': ['progress']
  };

  function navigateTo(screenId) {
    // Stop any running exercises when navigating away
    stopAllExercises();

    window.location.hash = '#' + screenId;
  }
  // Expose globally for onclick handlers in HTML
  window.navigateTo = navigateTo;

  function handleRoute() {
    let hash = window.location.hash.replace('#', '') || 'dashboard';

    // Map "test" route from nav link to "test-setup"
    if (hash === 'test') hash = 'test-setup';

    const targetId = routeMap[hash];
    if (!targetId) {
      hash = 'dashboard';
    }

    const finalId = routeMap[hash] || 'screen-dashboard';

    // Hide all screens
    document.querySelectorAll('.screen').forEach(function (s) {
      s.style.display = 'none';
    });

    // Show target
    const target = $(finalId);
    if (target) {
      target.style.display = '';
    }

    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(function (link) {
      const route = link.getAttribute('data-route');
      const routeScreens = navRouteMap[route] || [];
      if (routeScreens.indexOf(hash) !== -1) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Refresh data for specific screens
    if (hash === 'dashboard') renderDashboard();
    if (hash === 'test-setup') renderTestSetup();
    if (hash === 'progress') renderProgress();
    if (hash === 'exercise-rsvp') populateTextSelectors();
    if (hash === 'exercise-pacer') populateTextSelectors();
    if (hash === 'exercise-fluency') initFluencySetup();
    if (hash === 'exercise-regression') initRegressionSetup();
  }

  window.addEventListener('hashchange', handleRoute);

  // ========== FIREBASE AUTH ==========

  function renderAuthArea() {
    const area = $('auth-area');
    if (currentUser) {
      area.innerHTML =
        '<div class="user-info">' +
          (currentUser.photoURL ? '<img src="' + esc(currentUser.photoURL) + '" class="user-avatar" alt="">' : '') +
          '<span class="user-name">' + esc(currentUser.displayName || currentUser.email || 'User') + '</span>' +
        '</div>' +
        '<button class="auth-btn" id="btn-sign-out">Sign Out</button>';
      $('btn-sign-out').addEventListener('click', function () {
        auth.signOut();
      });
    } else {
      area.innerHTML = '<button class="auth-btn" id="btn-sign-in">Sign in with Google</button>';
      $('btn-sign-in').addEventListener('click', function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch(function (err) {
          console.error('Auth error:', err);
        });
      });
    }
  }

  auth.onAuthStateChanged(function (user) {
    const wasGuest = !currentUser;
    currentUser = user;
    renderAuthArea();

    if (user) {
      // Check if there is local data to migrate
      var localData = loadLocalSessions();
      if (wasGuest && localData.length > 0) {
        showMigrationModal(localData);
      }
      loadSessions().then(function () {
        handleRoute();
      });
    } else {
      sessions = loadLocalSessions();
      handleRoute();
    }
  });

  // ========== MODAL ==========

  function showModal(html) {
    $('modal').innerHTML = html;
    $('modal-overlay').style.display = '';
  }

  function hideModal() {
    $('modal-overlay').style.display = 'none';
    $('modal').innerHTML = '';
  }

  $('modal-overlay').addEventListener('click', function (e) {
    if (e.target === $('modal-overlay')) {
      hideModal();
    }
  });

  function showMigrationModal(localData) {
    showModal(
      '<h2>Migrate Local Data?</h2>' +
      '<p>You have ' + localData.length + ' session' + (localData.length > 1 ? 's' : '') +
      ' saved locally. Would you like to import them to your account?</p>' +
      '<div class="modal-buttons">' +
        '<button class="btn btn-secondary" id="modal-skip">Skip</button>' +
        '<button class="btn btn-primary" id="modal-migrate">Migrate Data</button>' +
      '</div>'
    );

    $('modal-skip').addEventListener('click', function () {
      hideModal();
    });

    $('modal-migrate').addEventListener('click', function () {
      migrateLocalToFirestore(localData).then(function () {
        localStorage.removeItem('speedreader-sessions');
        loadSessions().then(function () {
          hideModal();
          handleRoute();
        });
      });
    });
  }

  // ========== DATA PERSISTENCE ==========

  var STORAGE_KEY = 'speedreader-sessions';

  function loadLocalSessions() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveLocalSessions() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }

  function loadSessions() {
    if (currentUser) {
      return db.collection('sessions')
        .where('uid', '==', currentUser.uid)
        .orderBy('date', 'desc')
        .get()
        .then(function (snapshot) {
          sessions = [];
          snapshot.forEach(function (doc) {
            sessions.push(Object.assign({ id: doc.id }, doc.data()));
          });
          // Sort by date ascending for charts
          sessions.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
        })
        .catch(function (err) {
          console.error('Firestore load error:', err);
          sessions = loadLocalSessions();
        });
    } else {
      sessions = loadLocalSessions();
      return Promise.resolve();
    }
  }

  function saveSession(session) {
    session.date = new Date().toISOString();

    if (currentUser) {
      session.uid = currentUser.uid;
      return db.collection('sessions').add(session).then(function (docRef) {
        session.id = docRef.id;
        sessions.push(session);
        // Also update user doc
        return db.collection('users').doc(currentUser.uid).set({
          lastSession: session.date,
          email: currentUser.email || ''
        }, { merge: true });
      });
    } else {
      sessions.push(session);
      saveLocalSessions();
      return Promise.resolve();
    }
  }

  function migrateLocalToFirestore(localData) {
    var batch = db.batch();
    localData.forEach(function (session) {
      var ref = db.collection('sessions').doc();
      session.uid = currentUser.uid;
      batch.set(ref, session);
    });
    return batch.commit();
  }

  // ========== DASHBOARD ==========

  function renderDashboard() {
    var readingSessions = sessions.filter(function (s) { return s.type === 'reading-test'; });

    // Current WPM (latest session)
    if (readingSessions.length > 0) {
      var latest = readingSessions[readingSessions.length - 1];
      $('dash-current-wpm').textContent = Math.round(latest.wpm);

      // Trend
      if (readingSessions.length >= 2) {
        var prev = readingSessions[readingSessions.length - 2];
        var trend = $('dash-trend');
        if (latest.wpm > prev.wpm) {
          trend.textContent = '\u2191';
          trend.className = 'trend-arrow up';
        } else if (latest.wpm < prev.wpm) {
          trend.textContent = '\u2193';
          trend.className = 'trend-arrow down';
        } else {
          trend.textContent = '\u2192';
          trend.className = 'trend-arrow';
        }
      } else {
        $('dash-trend').textContent = '';
        $('dash-trend').className = 'trend-arrow';
      }
    } else {
      $('dash-current-wpm').textContent = '--';
      $('dash-trend').textContent = '';
      $('dash-trend').className = 'trend-arrow';
    }

    // Stats
    $('dash-sessions').textContent = readingSessions.length;

    if (readingSessions.length > 0) {
      var totalWpm = readingSessions.reduce(function (sum, s) { return sum + s.wpm; }, 0);
      $('dash-avg-wpm').textContent = Math.round(totalWpm / readingSessions.length);
      $('dash-best-wpm').textContent = Math.round(Math.max.apply(null, readingSessions.map(function (s) { return s.wpm; })));

      var totalComp = readingSessions.reduce(function (sum, s) { return sum + (s.comprehension || 0); }, 0);
      $('dash-comprehension').textContent = Math.round((totalComp / readingSessions.length) * 100) + '%';
    } else {
      $('dash-avg-wpm').textContent = '--';
      $('dash-best-wpm').textContent = '--';
      $('dash-comprehension').textContent = '--%';
    }

    // Mini chart - last 30 sessions
    renderDashChart(readingSessions.slice(-30));

    // Recent 5 sessions (all types)
    var recent = sessions.slice(-5).reverse();
    var recentList = $('dash-recent-list');
    if (recent.length === 0) {
      recentList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">&#128214;</div><p>No sessions yet. Take a reading test to get started!</p></div>';
    } else {
      recentList.innerHTML = recent.map(function (s) {
        var typeLabel = s.type === 'reading-test' ? 'Reading Test' : (s.type || 'Exercise');
        var wpmDisplay = s.wpm ? Math.round(s.wpm) + ' WPM' : '--';
        return '<div class="recent-item">' +
          '<span class="recent-item-type">' + esc(typeLabel) + '</span>' +
          '<span class="recent-item-wpm">' + esc(wpmDisplay) + '</span>' +
          '<span class="recent-item-date">' + esc(formatDate(s.date)) + '</span>' +
        '</div>';
      }).join('');
    }
  }

  function renderDashChart(data) {
    var canvas = $('dash-chart');
    var ctx = canvas.getContext('2d');

    if (dashChart) {
      dashChart.destroy();
    }

    if (data.length === 0) {
      dashChart = new Chart(ctx, {
        type: 'line',
        data: { labels: [''], datasets: [{ data: [0], borderColor: '#6c63ff', borderWidth: 2, pointRadius: 0 }] },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { display: false },
            y: { display: false }
          }
        }
      });
      return;
    }

    var labels = data.map(function (s, i) { return i + 1; });
    var wpmData = data.map(function (s) { return Math.round(s.wpm); });

    dashChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'WPM',
          data: wpmData,
          borderColor: '#6c63ff',
          backgroundColor: 'rgba(108,99,255,0.1)',
          borderWidth: 2,
          pointRadius: data.length > 15 ? 0 : 3,
          pointBackgroundColor: '#6c63ff',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: '#2a2a2a', drawBorder: false },
            ticks: { color: '#888', font: { size: 10 } }
          },
          y: {
            grid: { color: '#2a2a2a', drawBorder: false },
            ticks: { color: '#888', font: { size: 10 } },
            beginAtZero: false
          }
        }
      }
    });
  }

  // ========== TEST SETUP ==========

  var activeFilterLength = 'all';
  var activeFilterDifficulty = 'all';

  function renderTestSetup() {
    renderTextGrid();
    setupFilterPills();
  }

  function setupFilterPills() {
    // Length pills
    $('filter-length').querySelectorAll('.pill').forEach(function (pill) {
      pill.addEventListener('click', function () {
        $('filter-length').querySelectorAll('.pill').forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        activeFilterLength = pill.getAttribute('data-value');
        renderTextGrid();
      });
    });

    // Difficulty pills
    $('filter-difficulty').querySelectorAll('.pill').forEach(function (pill) {
      pill.addEventListener('click', function () {
        $('filter-difficulty').querySelectorAll('.pill').forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        activeFilterDifficulty = pill.getAttribute('data-value');
        renderTextGrid();
      });
    });
  }

  function getFilteredTexts() {
    return TEXT_LIBRARY.filter(function (t) {
      var matchLength = activeFilterLength === 'all' || t.length === activeFilterLength;
      var matchDiff = activeFilterDifficulty === 'all' || t.difficulty === activeFilterDifficulty;
      return matchLength && matchDiff;
    });
  }

  function renderTextGrid() {
    var filtered = getFilteredTexts();
    var grid = $('text-grid');

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty-state"><p>No texts match the current filters.</p></div>';
      return;
    }

    grid.innerHTML = filtered.map(function (t, i) {
      var wordCount = t.content.split(/\s+/).length;
      var diffClass = 'tag-' + t.difficulty;
      var lenClass = t.length === 'short' ? 'tag-short' : (t.length === 'long' ? 'tag-long' : 'tag-genre');

      return '<div class="text-card" data-text-index="' + TEXT_LIBRARY.indexOf(t) + '">' +
        '<div class="text-card-title">' + esc(t.title) + '</div>' +
        '<div class="text-card-author">' + esc(t.author) + '</div>' +
        '<div class="text-card-meta">' +
          '<span class="text-card-tag ' + diffClass + '">' + esc(t.difficulty) + '</span>' +
          '<span class="text-card-tag ' + lenClass + '">' + esc(t.length) + '</span>' +
          (t.genre ? '<span class="text-card-tag tag-genre">' + esc(t.genre) + '</span>' : '') +
          '<span class="text-card-tag tag-genre">' + wordCount + ' words</span>' +
        '</div>' +
      '</div>';
    }).join('');

    // Bind click events
    grid.querySelectorAll('.text-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var index = parseInt(card.getAttribute('data-text-index'));
        startReadingTest(TEXT_LIBRARY[index]);
      });
    });
  }

  // Random text button
  $('btn-random-text').addEventListener('click', function () {
    var filtered = getFilteredTexts();
    if (filtered.length === 0) return;
    var text = randomPick(filtered);
    startReadingTest(text);
  });

  // ========== READING TEST - ACTIVE ==========

  function startReadingTest(text) {
    activeTest.text = text;
    activeTest.questionIndex = 0;
    activeTest.correctAnswers = 0;
    activeTest.endTime = null;

    var wordCount = text.content.split(/\s+/).length;

    $('test-title').textContent = text.title;
    $('test-author').textContent = text.author;
    $('test-word-count').textContent = wordCount;
    $('test-reading-area').textContent = text.content;
    $('test-timer').textContent = '0:00';
    $('test-live-wpm').textContent = '--';

    navigateTo('test-active');

    // Start timer after a brief delay so the user can orient
    setTimeout(function () {
      activeTest.startTime = performance.now();
      activeTest.timerInterval = setInterval(updateTestTimer, 1000);
    }, 500);
  }

  function updateTestTimer() {
    if (!activeTest.startTime) return;
    var elapsed = performance.now() - activeTest.startTime;
    $('test-timer').textContent = formatTime(elapsed);

    // Live WPM
    var minutes = elapsed / 60000;
    if (minutes > 0.05) { // only show after ~3 seconds
      var wordCount = activeTest.text.content.split(/\s+/).length;
      var liveWpm = Math.round(wordCount / minutes);
      $('test-live-wpm').textContent = liveWpm;
    }
  }

  $('btn-done-reading').addEventListener('click', function () {
    activeTest.endTime = performance.now();
    clearInterval(activeTest.timerInterval);
    activeTest.timerInterval = null;

    // Move to questions
    if (activeTest.text.questions && activeTest.text.questions.length > 0) {
      activeTest.questionIndex = 0;
      activeTest.correctAnswers = 0;
      navigateTo('test-questions');
      renderQuestion();
    } else {
      // No questions - go straight to results
      showTestResults();
    }
  });

  // ========== READING TEST - QUESTIONS ==========

  function renderQuestion() {
    var questions = activeTest.text.questions;
    var q = questions[activeTest.questionIndex];

    $('question-progress').textContent = 'Question ' + (activeTest.questionIndex + 1) + ' of ' + questions.length;

    var html = '<div class="question-text">' + esc(q.question) + '</div>' +
      '<div class="question-options">';

    q.options.forEach(function (opt, i) {
      html += '<button class="question-option" data-index="' + i + '">' + esc(opt) + '</button>';
    });

    html += '</div>';

    $('question-card').innerHTML = html;

    // Bind option clicks
    $('question-card').querySelectorAll('.question-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        handleAnswerClick(parseInt(btn.getAttribute('data-index')));
      });
    });
  }

  function handleAnswerClick(selectedIndex) {
    var questions = activeTest.text.questions;
    var q = questions[activeTest.questionIndex];
    var correctIndex = q.correct;
    var isCorrect = selectedIndex === correctIndex;

    if (isCorrect) {
      activeTest.correctAnswers++;
    }

    // Disable all options and highlight
    var options = $('question-card').querySelectorAll('.question-option');
    options.forEach(function (btn, i) {
      btn.classList.add('disabled');
      if (i === correctIndex) {
        btn.classList.add('correct');
      } else if (i === selectedIndex && !isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    // Show explanation
    var explanationHtml = '';
    if (q.explanation) {
      explanationHtml = '<div class="question-explanation">' + esc(q.explanation) + '</div>';
    }

    // Next button
    var isLast = activeTest.questionIndex >= questions.length - 1;
    var nextLabel = isLast ? 'See Results' : 'Next Question';

    $('question-card').innerHTML += explanationHtml +
      '<div class="question-next"><button class="btn btn-primary" id="btn-next-question">' + nextLabel + '</button></div>';

    $('btn-next-question').addEventListener('click', function () {
      if (isLast) {
        showTestResults();
      } else {
        activeTest.questionIndex++;
        renderQuestion();
      }
    });
  }

  // ========== READING TEST - RESULTS ==========

  function showTestResults() {
    var text = activeTest.text;
    var wordCount = text.content.split(/\s+/).length;
    var timeMs = activeTest.endTime - activeTest.startTime;
    var wpm = wordCount / (timeMs / 60000);

    var questions = text.questions || [];
    var comprehension = questions.length > 0 ? activeTest.correctAnswers / questions.length : 1;
    var adjustedWpm = wpm * comprehension;

    $('result-wpm').textContent = Math.round(wpm);
    $('result-comprehension').textContent = Math.round(comprehension * 100) + '%';
    $('result-adjusted').textContent = Math.round(adjustedWpm);
    $('result-time').textContent = formatTime(timeMs);

    // Context message
    var context = '';
    if (wpm < 200) {
      context = 'You read at <strong>' + Math.round(wpm) + ' WPM</strong>, which is below the average adult reading speed of 200-250 WPM. ' +
        'Don\'t worry -- with regular practice using the exercises, you can improve significantly! Focus on the RSVP trainer and Pacer reading to build speed.';
    } else if (wpm < 300) {
      context = 'You read at <strong>' + Math.round(wpm) + ' WPM</strong>, which is around the average adult reading speed (200-250 WPM) to slightly above. ' +
        'You have a solid foundation. Try the chunking and eye span exercises to push further.';
    } else if (wpm < 500) {
      context = 'You read at <strong>' + Math.round(wpm) + ' WPM</strong>, which is well above average! Most college students read at 200-300 WPM. ' +
        'You\'re in the above-average range. Keep practicing to reach expert-level speeds.';
    } else {
      context = 'You read at <strong>' + Math.round(wpm) + ' WPM</strong> -- that\'s exceptional! Speeds above 500 WPM are considered speed-reading territory. ' +
        'Competitive speed readers can reach 1000+ WPM. Keep pushing your limits!';
    }

    if (comprehension < 0.5 && questions.length > 0) {
      context += '<br><br>Your comprehension was <strong>' + Math.round(comprehension * 100) + '%</strong>. ' +
        'Try slowing down a bit to improve understanding. The adjusted WPM score factors in comprehension.';
    } else if (comprehension >= 0.8 && questions.length > 0) {
      context += '<br><br>Great comprehension at <strong>' + Math.round(comprehension * 100) + '%</strong>! ' +
        'Your adjusted WPM of <strong>' + Math.round(adjustedWpm) + '</strong> reflects strong reading with understanding.';
    }

    $('result-context').innerHTML = context;

    // Save session
    saveSession({
      type: 'reading-test',
      textTitle: text.title,
      wpm: Math.round(wpm * 10) / 10,
      comprehension: Math.round(comprehension * 100) / 100,
      adjustedWpm: Math.round(adjustedWpm * 10) / 10,
      timeMs: Math.round(timeMs),
      wordCount: wordCount,
      correctAnswers: activeTest.correctAnswers,
      totalQuestions: questions.length
    });

    navigateTo('test-results');
  }

  // ========== TEXT SELECTORS (for exercises) ==========

  function populateTextSelectors() {
    var rsvpSelect = $('rsvp-text-select');
    var pacerSelect = $('pacer-text-select');

    [rsvpSelect, pacerSelect].forEach(function (select) {
      if (!select) return;
      // Only repopulate if empty
      if (select.options.length === 0) {
        TEXT_LIBRARY.forEach(function (t, i) {
          var opt = document.createElement('option');
          opt.value = i;
          opt.textContent = t.title + ' (' + t.content.split(/\s+/).length + ' words)';
          select.appendChild(opt);
        });
      }
    });
  }

  function populateSingleSelector(selectEl) {
    if (!selectEl || selectEl.options.length > 0) return;
    TEXT_LIBRARY.forEach(function (t, i) {
      var opt = document.createElement('option');
      opt.value = i;
      opt.textContent = t.title + ' (' + t.content.split(/\s+/).length + ' words)';
      selectEl.appendChild(opt);
    });
  }

  // ========== RSVP TRAINER ==========

  // WPM slider display
  $('rsvp-wpm').addEventListener('input', function () {
    $('rsvp-wpm-display').textContent = this.value + ' WPM';
  });

  $('btn-start-rsvp').addEventListener('click', function () {
    var textIndex = parseInt($('rsvp-text-select').value);
    if (isNaN(textIndex)) return;
    var text = TEXT_LIBRARY[textIndex];
    rsvpState.words = text.content.split(/\s+/);
    rsvpState.index = 0;
    rsvpState.wpm = parseInt($('rsvp-wpm').value);
    rsvpState.paused = false;

    $('rsvp-setup').style.display = 'none';
    $('rsvp-display').style.display = '';
    $('rsvp-speed-indicator').textContent = rsvpState.wpm + ' WPM';
    $('btn-rsvp-pause').textContent = 'Pause';

    startRsvpFlash();

    // Auto-accelerate
    if ($('rsvp-accelerate').checked) {
      rsvpState.accelInterval = setInterval(function () {
        if (!rsvpState.paused) {
          rsvpState.wpm = Math.min(rsvpState.wpm + 25, 1500);
          $('rsvp-speed-indicator').textContent = rsvpState.wpm + ' WPM';
          // Restart with new interval
          clearInterval(rsvpState.interval);
          startRsvpFlash();
        }
      }, 30000);
    }
  });

  function startRsvpFlash() {
    clearInterval(rsvpState.interval);
    var baseInterval = 60000 / rsvpState.wpm;

    rsvpState.interval = setInterval(function () {
      if (rsvpState.paused) return;

      if (rsvpState.index >= rsvpState.words.length) {
        stopRsvp();
        return;
      }

      var word = rsvpState.words[rsvpState.index];
      $('rsvp-word').innerHTML = renderOrpWord(word);

      // Progress
      var pct = ((rsvpState.index + 1) / rsvpState.words.length) * 100;
      $('rsvp-progress-fill').style.width = pct + '%';

      rsvpState.index++;

      // Extra pause on sentence boundaries
      var lastChar = word[word.length - 1];
      if (lastChar === '.' || lastChar === '!' || lastChar === '?') {
        rsvpState.paused = true;
        setTimeout(function () {
          rsvpState.paused = false;
        }, baseInterval * 1.5);
      }
    }, baseInterval);
  }

  function renderOrpWord(word) {
    if (!word) return '';
    // ORP: roughly 1/3 into the word (at least index 0)
    var orpIndex = Math.max(0, Math.floor(word.length / 3) - (word.length > 1 ? 0 : 0));
    if (word.length <= 1) orpIndex = 0;
    else if (word.length <= 3) orpIndex = 0;
    else orpIndex = Math.floor(word.length / 3);

    var before = esc(word.substring(0, orpIndex));
    var orpChar = esc(word.substring(orpIndex, orpIndex + 1));
    var after = esc(word.substring(orpIndex + 1));

    return before + '<span class="orp">' + orpChar + '</span>' + after;
  }

  $('btn-rsvp-pause').addEventListener('click', function () {
    rsvpState.paused = !rsvpState.paused;
    $('btn-rsvp-pause').textContent = rsvpState.paused ? 'Resume' : 'Pause';
  });

  $('btn-rsvp-stop').addEventListener('click', function () {
    stopRsvp();
  });

  function stopRsvp() {
    clearInterval(rsvpState.interval);
    clearInterval(rsvpState.accelInterval);
    rsvpState.interval = null;
    rsvpState.accelInterval = null;
    rsvpState.paused = false;
    $('rsvp-setup').style.display = '';
    $('rsvp-display').style.display = 'none';
    $('rsvp-word').innerHTML = '';
    $('rsvp-progress-fill').style.width = '0%';
  }

  // ========== CHUNKING TRAINER ==========

  $('btn-start-chunking').addEventListener('click', function () {
    // Get words from a random text
    var text = randomPick(TEXT_LIBRARY);
    chunkingState.words = text.content.split(/\s+/).filter(function (w) { return w.length > 0; });
    chunkingState.active = true;
    chunkingState.score = 0;
    chunkingState.streak = 0;
    chunkingState.consecutiveCorrect = 0;
    chunkingState.chunkSize = 2;
    chunkingState.displayTime = 800;
    chunkingState.usedChunks = [];

    $('chunking-setup').style.display = 'none';
    $('chunking-display').style.display = '';
    updateChunkingStats();
    nextChunkingRound();
  });

  function updateChunkingStats() {
    $('chunking-score').textContent = chunkingState.score;
    $('chunking-streak').textContent = chunkingState.streak;
    $('chunking-size').textContent = chunkingState.chunkSize;
  }

  function getChunk(words, size, exclude) {
    var attempts = 0;
    var chunk;
    do {
      var startIdx = Math.floor(Math.random() * (words.length - size));
      chunk = words.slice(startIdx, startIdx + size).join(' ');
      attempts++;
    } while (exclude.indexOf(chunk) !== -1 && attempts < 50);
    return chunk;
  }

  function nextChunkingRound() {
    if (!chunkingState.active) return;

    var words = chunkingState.words;
    var size = chunkingState.chunkSize;

    // Pick a correct chunk
    var correctChunk = getChunk(words, size, chunkingState.usedChunks);
    chunkingState.usedChunks.push(correctChunk);
    if (chunkingState.usedChunks.length > 50) chunkingState.usedChunks.shift();

    // Generate 3 distractor chunks
    var distractors = [];
    for (var d = 0; d < 3; d++) {
      var distractor = getChunk(words, size, [correctChunk].concat(distractors));
      distractors.push(distractor);
    }

    // Flash the correct chunk
    $('chunking-word').textContent = correctChunk;
    $('chunking-word').style.opacity = '1';
    $('chunking-options').innerHTML = '';

    chunkingState.timeout = setTimeout(function () {
      // Hide the word
      $('chunking-word').textContent = '?';

      // Show options
      var options = shuffle([correctChunk].concat(distractors));
      $('chunking-options').innerHTML = options.map(function (opt) {
        return '<button class="chunking-option" data-chunk="' + esc(opt) + '">' + esc(opt) + '</button>';
      }).join('');

      // Bind clicks
      $('chunking-options').querySelectorAll('.chunking-option').forEach(function (btn) {
        btn.addEventListener('click', function () {
          handleChunkingAnswer(btn, btn.getAttribute('data-chunk'), correctChunk);
        });
      });
    }, chunkingState.displayTime);
  }

  function handleChunkingAnswer(btn, selected, correct) {
    if (!chunkingState.active) return;

    // Disable all options
    $('chunking-options').querySelectorAll('.chunking-option').forEach(function (b) {
      b.style.pointerEvents = 'none';
      if (b.getAttribute('data-chunk') === correct) {
        b.classList.add('correct');
      }
    });

    if (selected === correct) {
      btn.classList.add('correct');
      chunkingState.score++;
      chunkingState.streak++;
      chunkingState.consecutiveCorrect++;

      // Adaptive: decrease display time after 3 consecutive correct
      if (chunkingState.consecutiveCorrect % 3 === 0) {
        chunkingState.displayTime = Math.max(200, chunkingState.displayTime - 50);
      }

      // Increase chunk size after 5 consecutive correct
      if (chunkingState.consecutiveCorrect % 5 === 0 && chunkingState.chunkSize < 5) {
        chunkingState.chunkSize++;
      }
    } else {
      btn.classList.add('incorrect');
      chunkingState.streak = 0;
      chunkingState.consecutiveCorrect = 0;
    }

    updateChunkingStats();

    // Next round after a delay
    chunkingState.timeout = setTimeout(function () {
      nextChunkingRound();
    }, 1000);
  }

  $('btn-chunking-stop').addEventListener('click', function () {
    stopChunking();
  });

  function stopChunking() {
    chunkingState.active = false;
    clearTimeout(chunkingState.timeout);
    chunkingState.timeout = null;
    $('chunking-setup').style.display = '';
    $('chunking-display').style.display = 'none';
    $('chunking-word').textContent = 'Ready...';
    $('chunking-options').innerHTML = '';
  }

  // ========== EYE SPAN WIDENER ==========

  $('btn-start-eyespan').addEventListener('click', function () {
    var text = randomPick(TEXT_LIBRARY);
    eyespanState.words = text.content.split(/\s+/).filter(function (w) { return w.length > 1; });
    eyespanState.active = true;
    eyespanState.score = 0;
    eyespanState.total = 0;
    eyespanState.consecutiveCorrect = 0;
    eyespanState.span = 3;
    eyespanState.displayTime = 600;

    $('eyespan-setup').style.display = 'none';
    $('eyespan-display').style.display = '';
    updateEyespanStats();
    nextEyespanRound();
  });

  function updateEyespanStats() {
    $('eyespan-score').textContent = eyespanState.score;
    $('eyespan-span').textContent = eyespanState.span;
    var pct = eyespanState.total > 0 ? Math.round((eyespanState.score / eyespanState.total) * 100) : 0;
    $('eyespan-accuracy').textContent = pct + '%';
  }

  function nextEyespanRound() {
    if (!eyespanState.active) return;

    var span = eyespanState.span;
    var words = eyespanState.words;

    // Pick `span` random words for the row
    var rowWords = [];
    for (var i = 0; i < span; i++) {
      rowWords.push(randomPick(words));
    }

    // Choose a target word - pick a position that is NOT the center
    var centerIndex = Math.floor(span / 2);
    var targetPositions = [];
    for (var p = 0; p < span; p++) {
      if (p !== centerIndex) targetPositions.push(p);
    }
    var targetPos = randomPick(targetPositions);
    var targetWord = rowWords[targetPos];

    // Flash the row
    var flashArea = $('eyespan-flash-area');
    var rowHtml = '';
    for (var w = 0; w < rowWords.length; w++) {
      if (w === centerIndex) {
        rowHtml += '<span class="eyespan-cross">+</span>';
        // If the target is at center index... shouldn't happen due to our filter above, but just in case
      }
      var isTarget = (w === targetPos);
      rowHtml += '<span class="eyespan-word' + (isTarget ? ' target' : '') + '">' + esc(rowWords[w]) + '</span>';
    }
    flashArea.innerHTML = rowHtml;
    $('eyespan-options').innerHTML = '';

    // After display time, hide and show options
    eyespanState.timeout = setTimeout(function () {
      flashArea.innerHTML = '<span class="eyespan-cross">+</span>';

      // Generate options: correct target + 3 distractors from other row words or random words
      var distractors = [];
      // Try to use other words from the row first
      for (var d = 0; d < rowWords.length && distractors.length < 3; d++) {
        if (d !== targetPos && distractors.indexOf(rowWords[d]) === -1 && rowWords[d] !== targetWord) {
          distractors.push(rowWords[d]);
        }
      }
      // Fill remaining distractors from word pool
      while (distractors.length < 3) {
        var rw = randomPick(words);
        if (rw !== targetWord && distractors.indexOf(rw) === -1) {
          distractors.push(rw);
        }
      }

      var options = shuffle([targetWord].concat(distractors));
      $('eyespan-options').innerHTML = options.map(function (opt) {
        return '<button class="eyespan-option" data-word="' + esc(opt) + '">' + esc(opt) + '</button>';
      }).join('');

      $('eyespan-options').querySelectorAll('.eyespan-option').forEach(function (btn) {
        btn.addEventListener('click', function () {
          handleEyespanAnswer(btn, btn.getAttribute('data-word'), targetWord);
        });
      });
    }, eyespanState.displayTime);
  }

  function handleEyespanAnswer(btn, selected, correct) {
    if (!eyespanState.active) return;

    eyespanState.total++;

    // Disable all
    $('eyespan-options').querySelectorAll('.eyespan-option').forEach(function (b) {
      b.style.pointerEvents = 'none';
      if (b.getAttribute('data-word') === correct) {
        b.classList.add('correct');
      }
    });

    if (selected === correct) {
      btn.classList.add('correct');
      eyespanState.score++;
      eyespanState.consecutiveCorrect++;

      // Grow span after 5 consecutive correct
      if (eyespanState.consecutiveCorrect % 5 === 0 && eyespanState.span < 9) {
        eyespanState.span++;
      }

      // Decrease display time with mastery
      if (eyespanState.consecutiveCorrect % 5 === 0) {
        eyespanState.displayTime = Math.max(200, eyespanState.displayTime - 50);
      }
    } else {
      btn.classList.add('incorrect');
      eyespanState.consecutiveCorrect = 0;
    }

    updateEyespanStats();

    eyespanState.timeout = setTimeout(function () {
      nextEyespanRound();
    }, 1000);
  }

  $('btn-eyespan-stop').addEventListener('click', function () {
    stopEyespan();
  });

  function stopEyespan() {
    eyespanState.active = false;
    clearTimeout(eyespanState.timeout);
    eyespanState.timeout = null;
    $('eyespan-setup').style.display = '';
    $('eyespan-display').style.display = 'none';
    $('eyespan-flash-area').innerHTML = '<div class="eyespan-cross">+</div>';
    $('eyespan-options').innerHTML = '';
  }

  // ========== PACER READING ==========

  $('pacer-wpm').addEventListener('input', function () {
    $('pacer-wpm-display').textContent = this.value + ' WPM';
  });

  $('btn-start-pacer').addEventListener('click', function () {
    var textIndex = parseInt($('pacer-text-select').value);
    if (isNaN(textIndex)) return;
    var text = TEXT_LIBRARY[textIndex];

    pacerState.wpm = parseInt($('pacer-wpm').value);
    pacerState.paused = false;
    pacerState.lineIndex = 0;

    // Split text into lines (~8-12 words each)
    var allWords = text.content.split(/\s+/);
    var wordsPerLine = 10;
    pacerState.lines = [];
    for (var i = 0; i < allWords.length; i += wordsPerLine) {
      pacerState.lines.push(allWords.slice(i, i + wordsPerLine).join(' '));
    }

    // Render lines
    var readingArea = $('pacer-reading-area');
    readingArea.innerHTML = pacerState.lines.map(function (line, idx) {
      return '<div class="pacer-line" data-line="' + idx + '">' + esc(line) + '</div>';
    }).join('');

    $('pacer-setup').style.display = 'none';
    $('pacer-display').style.display = '';
    $('pacer-current-wpm').textContent = pacerState.wpm + ' WPM';
    $('btn-pacer-pause').textContent = 'Pause';

    startPacerAdvance();
  });

  function startPacerAdvance() {
    clearInterval(pacerState.interval);

    if (pacerState.lineIndex >= pacerState.lines.length) {
      stopPacer();
      return;
    }

    highlightPacerLine(pacerState.lineIndex);

    pacerState.interval = setInterval(function () {
      if (pacerState.paused) return;

      pacerState.lineIndex++;

      if (pacerState.lineIndex >= pacerState.lines.length) {
        stopPacer();
        return;
      }

      highlightPacerLine(pacerState.lineIndex);
    }, getPacerLineDelay());
  }

  function getPacerLineDelay() {
    if (pacerState.lineIndex >= pacerState.lines.length) return 1000;
    var wordsInLine = pacerState.lines[pacerState.lineIndex].split(/\s+/).length;
    return (wordsInLine / pacerState.wpm) * 60000;
  }

  function highlightPacerLine(index) {
    // Remove previous highlights
    var readingArea = $('pacer-reading-area');
    readingArea.querySelectorAll('.pacer-line.active').forEach(function (line) {
      line.classList.remove('active');
    });

    var activeLine = readingArea.querySelector('[data-line="' + index + '"]');
    if (activeLine) {
      activeLine.classList.add('active');
      // Auto-scroll to keep visible
      activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function updatePacerWpm(delta) {
    pacerState.wpm = Math.max(50, Math.min(1500, pacerState.wpm + delta));
    $('pacer-current-wpm').textContent = pacerState.wpm + ' WPM';

    // Restart interval with new timing
    if (!pacerState.paused) {
      clearInterval(pacerState.interval);
      startPacerAdvance();
    }
  }

  $('btn-pacer-slower').addEventListener('click', function () { updatePacerWpm(-25); });
  $('btn-pacer-faster').addEventListener('click', function () { updatePacerWpm(25); });

  $('btn-pacer-pause').addEventListener('click', function () {
    pacerState.paused = !pacerState.paused;
    $('btn-pacer-pause').textContent = pacerState.paused ? 'Resume' : 'Pause';
  });

  $('btn-pacer-stop').addEventListener('click', function () {
    stopPacer();
  });

  function stopPacer() {
    clearInterval(pacerState.interval);
    pacerState.interval = null;
    pacerState.paused = false;
    $('pacer-setup').style.display = '';
    $('pacer-display').style.display = 'none';
    $('pacer-reading-area').innerHTML = '';
  }

  // ========== FLUENCY BUILDER ==========

  function initFluencySetup() {
    populateSingleSelector($('fluency-text-select'));
    $('fluency-setup').style.display = '';
    $('fluency-active').style.display = 'none';
    $('fluency-summary').style.display = 'none';
  }

  $('btn-start-fluency').addEventListener('click', function () {
    var textIndex = parseInt($('fluency-text-select').value);
    if (isNaN(textIndex)) return;
    fluencyState.text = TEXT_LIBRARY[textIndex];
    fluencyState.round = 1;
    fluencyState.roundWpms = [];
    fluencyState.baseWpm = 0;
    fluencyState.targetWpm = 0;

    $('fluency-setup').style.display = 'none';
    $('fluency-summary').style.display = 'none';
    $('fluency-active').style.display = '';

    startFluencyRound1();
  });

  function startFluencyRound1() {
    fluencyState.round = 1;
    $('fluency-round-indicator').textContent = 'Round 1 of 3 — Free Read';
    $('fluency-stats').textContent = '';

    // Show the text as a plain reading area (like test-active)
    var readingArea = $('fluency-reading-area');
    readingArea.textContent = fluencyState.text.content;

    $('fluency-controls').style.display = 'flex';
    $('fluency-pacer-controls').style.display = 'none';

    fluencyState.startTime = performance.now();
    fluencyState.timerInterval = setInterval(function () {
      var elapsed = performance.now() - fluencyState.startTime;
      var words = fluencyState.text.content.split(/\s+/).length;
      var minutes = elapsed / 60000;
      if (minutes > 0.05) {
        $('fluency-stats').innerHTML = '<span>Time: <strong>' + formatTime(elapsed) + '</strong></span><span>Live WPM: <strong>' + Math.round(words / minutes) + '</strong></span>';
      }
    }, 1000);
  }

  $('btn-fluency-done').addEventListener('click', function () {
    var elapsed = performance.now() - fluencyState.startTime;
    clearInterval(fluencyState.timerInterval);
    fluencyState.timerInterval = null;

    var words = fluencyState.text.content.split(/\s+/).length;
    var wpm = Math.round(words / (elapsed / 60000));
    fluencyState.baseWpm = wpm;
    fluencyState.roundWpms[0] = wpm;

    // Proceed to round 2
    startFluencyPacerRound(2, Math.round(wpm * 1.25));
  });

  $('btn-fluency-stop').addEventListener('click', function () {
    stopFluency();
  });

  function startFluencyPacerRound(roundNum, targetWpm) {
    fluencyState.round = roundNum;
    fluencyState.targetWpm = targetWpm;

    var label = roundNum === 2
      ? 'Round 2 of 3 — Pacer at +25% (' + targetWpm + ' WPM)'
      : 'Round 3 of 3 — Pacer at +50% (' + targetWpm + ' WPM)';
    $('fluency-round-indicator').textContent = label;
    $('fluency-stats').innerHTML = '<span>Target: <strong>' + targetWpm + ' WPM</strong></span>';

    $('fluency-controls').style.display = 'none';
    $('fluency-pacer-controls').style.display = 'flex';
    $('btn-fluency-pause').textContent = 'Pause';
    fluencyState.paused = false;

    // Build lines
    var allWords = fluencyState.text.content.split(/\s+/);
    var wordsPerLine = 10;
    fluencyState.lines = [];
    for (var i = 0; i < allWords.length; i += wordsPerLine) {
      fluencyState.lines.push(allWords.slice(i, i + wordsPerLine).join(' '));
    }
    fluencyState.lineIndex = 0;

    // Render lines
    var readingArea = $('fluency-reading-area');
    readingArea.innerHTML = fluencyState.lines.map(function (line, idx) {
      return '<div class="pacer-line" data-line="' + idx + '">' + esc(line) + '</div>';
    }).join('');

    startFluencyPacerAdvance(targetWpm);
  }

  function startFluencyPacerAdvance(wpm) {
    clearInterval(fluencyState.interval);
    fluencyState.interval = null;

    if (fluencyState.lineIndex >= fluencyState.lines.length) {
      fluencyPacerDone();
      return;
    }

    highlightFluencyLine(fluencyState.lineIndex);
    scheduleNextFluencyLine(wpm);
  }

  function scheduleNextFluencyLine(wpm) {
    if (fluencyState.lineIndex >= fluencyState.lines.length) {
      fluencyPacerDone();
      return;
    }
    var wordsInLine = fluencyState.lines[fluencyState.lineIndex].split(/\s+/).length;
    var delay = (wordsInLine / wpm) * 60000;

    fluencyState.interval = setTimeout(function () {
      if (fluencyState.paused) {
        // If paused, re-check every 200ms
        fluencyState.interval = setInterval(function () {
          if (!fluencyState.paused) {
            clearInterval(fluencyState.interval);
            fluencyState.interval = null;
            fluencyState.lineIndex++;
            if (fluencyState.lineIndex >= fluencyState.lines.length) {
              fluencyPacerDone();
              return;
            }
            highlightFluencyLine(fluencyState.lineIndex);
            scheduleNextFluencyLine(wpm);
          }
        }, 200);
        return;
      }

      fluencyState.lineIndex++;
      if (fluencyState.lineIndex >= fluencyState.lines.length) {
        fluencyPacerDone();
        return;
      }
      highlightFluencyLine(fluencyState.lineIndex);
      scheduleNextFluencyLine(wpm);
    }, delay);
  }

  function highlightFluencyLine(index) {
    var readingArea = $('fluency-reading-area');
    readingArea.querySelectorAll('.pacer-line.active').forEach(function (line) {
      line.classList.remove('active');
    });
    var activeLine = readingArea.querySelector('[data-line="' + index + '"]');
    if (activeLine) {
      activeLine.classList.add('active');
      activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function fluencyPacerDone() {
    var roundNum = fluencyState.round;
    fluencyState.roundWpms[roundNum - 1] = fluencyState.targetWpm;
    $('fluency-pacer-controls').style.display = 'none';

    if (roundNum === 2) {
      // Start round 3
      var round3Target = Math.round(fluencyState.baseWpm * 1.5);
      setTimeout(function () {
        startFluencyPacerRound(3, round3Target);
      }, 800);
    } else {
      // Done — show summary
      showFluencySummary();
    }
  }

  $('btn-fluency-pause').addEventListener('click', function () {
    fluencyState.paused = !fluencyState.paused;
    $('btn-fluency-pause').textContent = fluencyState.paused ? 'Resume' : 'Pause';
  });

  $('btn-fluency-stop-pacer').addEventListener('click', function () {
    stopFluency();
  });

  function showFluencySummary() {
    clearInterval(fluencyState.interval);
    fluencyState.interval = null;
    $('fluency-active').style.display = 'none';
    $('fluency-summary').style.display = '';

    var r1 = fluencyState.roundWpms[0] || 0;
    var r2 = fluencyState.roundWpms[1] || Math.round(r1 * 1.25);
    var r3 = fluencyState.roundWpms[2] || Math.round(r1 * 1.5);

    $('fluency-summary-stats').innerHTML =
      '<div class="fluency-round-card">' +
        '<div class="round-label">Round 1</div>' +
        '<div class="round-wpm">' + r1 + '</div>' +
        '<div class="round-target">Baseline WPM</div>' +
      '</div>' +
      '<div class="fluency-round-card">' +
        '<div class="round-label">Round 2</div>' +
        '<div class="round-wpm">' + r2 + '</div>' +
        '<div class="round-target">Target: ' + Math.round(r1 * 1.25) + ' WPM</div>' +
      '</div>' +
      '<div class="fluency-round-card">' +
        '<div class="round-label">Round 3</div>' +
        '<div class="round-wpm">' + r3 + '</div>' +
        '<div class="round-target">Target: ' + Math.round(r1 * 1.5) + ' WPM</div>' +
      '</div>';

    saveSession({
      type: 'fluency',
      textTitle: fluencyState.text.title,
      wpm: r3,
      wordCount: fluencyState.text.content.split(/\s+/).length
    });
  }

  $('btn-fluency-again').addEventListener('click', function () {
    $('fluency-summary').style.display = 'none';
    $('fluency-setup').style.display = '';
  });

  function stopFluency() {
    clearInterval(fluencyState.timerInterval);
    clearInterval(fluencyState.interval);
    clearTimeout(fluencyState.interval);
    fluencyState.timerInterval = null;
    fluencyState.interval = null;
    fluencyState.paused = false;
    $('fluency-setup').style.display = '';
    $('fluency-active').style.display = 'none';
    $('fluency-summary').style.display = 'none';
    $('fluency-reading-area').innerHTML = '';
    $('fluency-stats').textContent = '';
  }

  // ========== REGRESSION BUSTER ==========

  function initRegressionSetup() {
    populateSingleSelector($('regression-text-select'));
    $('regression-setup').style.display = '';
    $('regression-active').style.display = 'none';
    $('regression-questions').style.display = 'none';
    $('regression-results').style.display = 'none';
  }

  $('regression-wpm').addEventListener('input', function () {
    $('regression-wpm-display').textContent = this.value + ' WPM';
  });

  $('btn-start-regression').addEventListener('click', function () {
    var textIndex = parseInt($('regression-text-select').value);
    if (isNaN(textIndex)) return;
    var text = TEXT_LIBRARY[textIndex];

    regressionState.text = text;
    regressionState.wpm = parseInt($('regression-wpm').value);
    regressionState.lineIndex = 0;
    regressionState.questionIndex = 0;
    regressionState.correctAnswers = 0;
    regressionState.wordCount = text.content.split(/\s+/).length;

    // Build lines (~10 words each)
    var allWords = text.content.split(/\s+/);
    regressionState.lines = [];
    for (var i = 0; i < allWords.length; i += 10) {
      regressionState.lines.push(allWords.slice(i, i + 10).join(' '));
    }

    $('regression-setup').style.display = 'none';
    $('regression-active').style.display = '';
    $('regression-questions').style.display = 'none';
    $('regression-results').style.display = 'none';
    $('regression-speed-label').textContent = regressionState.wpm + ' WPM';

    // Render all lines as empty placeholders first
    var readingArea = $('regression-reading-area');
    readingArea.innerHTML = regressionState.lines.map(function (line, idx) {
      return '<div class="regression-line" id="regression-line-' + idx + '" data-line="' + idx + '"></div>';
    }).join('');

    regressionState.startTime = performance.now();
    advanceRegressionLine();
  });

  function advanceRegressionLine() {
    var idx = regressionState.lineIndex;
    var lines = regressionState.lines;

    if (idx >= lines.length) {
      finishRegression();
      return;
    }

    var lineEl = $('regression-line-' + idx);
    if (!lineEl) {
      finishRegression();
      return;
    }

    // Show the current line
    lineEl.textContent = lines[idx];
    lineEl.classList.add('active');
    lineEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    var words = lines[idx].split(/\s+/).length;
    var delay = (words / regressionState.wpm) * 60000;

    regressionState.interval = setTimeout(function () {
      // Mask the line
      lineEl.classList.remove('active');
      lineEl.innerHTML = '<span class="masked-line">' + '\u2588'.repeat(Math.max(lines[idx].length, 10)) + '</span>';

      regressionState.lineIndex++;
      advanceRegressionLine();
    }, delay);
  }

  function finishRegression() {
    var elapsed = performance.now() - regressionState.startTime;
    var wpm = Math.round(regressionState.wordCount / (elapsed / 60000));
    regressionState.elapsedMs = elapsed;
    regressionState.resultWpm = wpm;

    $('regression-active').style.display = 'none';

    var questions = regressionState.text.questions;
    if (questions && questions.length > 0) {
      regressionState.questionIndex = 0;
      regressionState.correctAnswers = 0;
      $('regression-questions').style.display = '';
      renderRegressionQuestion();
    } else {
      showRegressionResults();
    }
  }

  $('btn-regression-stop').addEventListener('click', function () {
    stopRegression();
  });

  function renderRegressionQuestion() {
    var questions = regressionState.text.questions;
    var q = questions[regressionState.questionIndex];

    $('regression-question-progress').textContent = 'Question ' + (regressionState.questionIndex + 1) + ' of ' + questions.length;

    var html = '<div class="question-text">' + esc(q.question) + '</div><div class="question-options">';
    q.options.forEach(function (opt, i) {
      html += '<button class="question-option" data-index="' + i + '">' + esc(opt) + '</button>';
    });
    html += '</div>';
    $('regression-question-card').innerHTML = html;

    $('regression-question-card').querySelectorAll('.question-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        handleRegressionAnswer(parseInt(btn.getAttribute('data-index')));
      });
    });
  }

  function handleRegressionAnswer(selectedIndex) {
    var questions = regressionState.text.questions;
    var q = questions[regressionState.questionIndex];
    var correctIndex = q.correct;
    var isCorrect = selectedIndex === correctIndex;

    if (isCorrect) regressionState.correctAnswers++;

    var options = $('regression-question-card').querySelectorAll('.question-option');
    options.forEach(function (btn, i) {
      btn.classList.add('disabled');
      if (i === correctIndex) btn.classList.add('correct');
      else if (i === selectedIndex && !isCorrect) btn.classList.add('incorrect');
    });

    var explanationHtml = q.explanation ? '<div class="question-explanation">' + esc(q.explanation) + '</div>' : '';
    var isLast = regressionState.questionIndex >= questions.length - 1;
    var nextLabel = isLast ? 'See Results' : 'Next Question';

    $('regression-question-card').innerHTML += explanationHtml +
      '<div class="question-next"><button class="btn btn-primary" id="btn-regression-next">' + nextLabel + '</button></div>';

    $('btn-regression-next').addEventListener('click', function () {
      if (isLast) {
        showRegressionResults();
      } else {
        regressionState.questionIndex++;
        renderRegressionQuestion();
      }
    });
  }

  function showRegressionResults() {
    $('regression-questions').style.display = 'none';
    $('regression-results').style.display = '';

    var wpm = regressionState.resultWpm;
    var questions = regressionState.text.questions || [];
    var comprehension = questions.length > 0 ? regressionState.correctAnswers / questions.length : 1;

    $('regression-result-wpm').textContent = wpm;
    $('regression-result-comp').textContent = Math.round(comprehension * 100) + '%';

    saveSession({
      type: 'regression',
      textTitle: regressionState.text.title,
      wpm: wpm,
      comprehension: Math.round(comprehension * 100) / 100,
      wordCount: regressionState.wordCount,
      timeMs: Math.round(regressionState.elapsedMs || 0),
      correctAnswers: regressionState.correctAnswers,
      totalQuestions: questions.length
    });
  }

  function stopRegression() {
    clearTimeout(regressionState.interval);
    regressionState.interval = null;
    $('regression-setup').style.display = '';
    $('regression-active').style.display = 'none';
    $('regression-questions').style.display = 'none';
    $('regression-results').style.display = 'none';
    $('regression-reading-area').innerHTML = '';
  }

  // ========== STOP ALL EXERCISES ==========

  function stopAllExercises() {
    // Clear test timer
    if (activeTest.timerInterval) {
      clearInterval(activeTest.timerInterval);
      activeTest.timerInterval = null;
    }

    // Stop RSVP
    if (rsvpState.interval) stopRsvp();

    // Stop Chunking
    if (chunkingState.active) stopChunking();

    // Stop Eye Span
    if (eyespanState.active) stopEyespan();

    // Stop Pacer
    if (pacerState.interval) stopPacer();

    // Stop Fluency Builder
    if (fluencyState.timerInterval || fluencyState.interval) stopFluency();

    // Stop Regression Buster
    if (regressionState.interval) stopRegression();
  }

  // ========== PROGRESS SCREEN ==========

  var progressRangeDays = 30;

  function renderProgress() {
    var readingSessions = sessions.filter(function (s) { return s.type === 'reading-test'; });

    // Summary stats
    if (readingSessions.length > 0) {
      $('prog-best-wpm').textContent = Math.round(Math.max.apply(null, readingSessions.map(function (s) { return s.wpm; })));

      var totalWpm = readingSessions.reduce(function (sum, s) { return sum + s.wpm; }, 0);
      $('prog-avg-wpm').textContent = Math.round(totalWpm / readingSessions.length);
    } else {
      $('prog-best-wpm').textContent = '--';
      $('prog-avg-wpm').textContent = '--';
    }

    $('prog-total-sessions').textContent = sessions.length;

    // Day streak
    $('prog-streak').textContent = calculateStreak(sessions);

    // Words read
    var totalWords = sessions.reduce(function (sum, s) { return sum + (s.wordCount || 0); }, 0);
    $('prog-words-read').textContent = totalWords >= 1000 ? Math.round(totalWords / 1000) + 'k' : totalWords;

    // Time spent
    var totalTimeMs = sessions.reduce(function (sum, s) { return sum + (s.timeMs || 0); }, 0);
    var totalMinutes = Math.round(totalTimeMs / 60000);
    if (totalMinutes >= 60) {
      $('prog-time-spent').textContent = Math.floor(totalMinutes / 60) + 'h ' + (totalMinutes % 60) + 'm';
    } else {
      $('prog-time-spent').textContent = totalMinutes + 'm';
    }

    // Chart
    renderProgressChart(readingSessions);

    // History table
    renderHistoryTable(sessions);

    // Setup range buttons
    setupRangeButtons();
  }

  function calculateStreak(allSessions) {
    if (allSessions.length === 0) return 0;

    // Get unique dates
    var dateSet = {};
    allSessions.forEach(function (s) {
      var d = new Date(s.date);
      var key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      dateSet[key] = true;
    });

    var dates = Object.keys(dateSet).sort().reverse();
    if (dates.length === 0) return 0;

    var streak = 0;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var checkDate = new Date(today);

    // Check if today or yesterday has a session (to handle ongoing streaks)
    var todayKey = checkDate.getFullYear() + '-' + String(checkDate.getMonth() + 1).padStart(2, '0') + '-' + String(checkDate.getDate()).padStart(2, '0');
    if (!dateSet[todayKey]) {
      // Check yesterday
      checkDate.setDate(checkDate.getDate() - 1);
      todayKey = checkDate.getFullYear() + '-' + String(checkDate.getMonth() + 1).padStart(2, '0') + '-' + String(checkDate.getDate()).padStart(2, '0');
      if (!dateSet[todayKey]) {
        return 0; // No recent activity
      }
    }

    // Count consecutive days backward
    while (true) {
      var key = checkDate.getFullYear() + '-' + String(checkDate.getMonth() + 1).padStart(2, '0') + '-' + String(checkDate.getDate()).padStart(2, '0');
      if (dateSet[key]) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  function renderProgressChart(readingSessions) {
    var canvas = $('progress-chart');
    var ctx = canvas.getContext('2d');

    if (progressChart) {
      progressChart.destroy();
    }

    // Filter by date range
    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - progressRangeDays);
    var filtered = readingSessions.filter(function (s) {
      return new Date(s.date) >= cutoff;
    });

    if (filtered.length === 0) {
      progressChart = new Chart(ctx, {
        type: 'line',
        data: { labels: ['No data'], datasets: [{ data: [0], borderColor: '#6c63ff', borderWidth: 2, pointRadius: 0 }] },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { display: false }, y: { display: false } }
        }
      });
      return;
    }

    var labels = filtered.map(function (s) {
      return formatDate(s.date);
    });
    var wpmData = filtered.map(function (s) { return Math.round(s.wpm); });
    var adjustedData = filtered.map(function (s) { return Math.round(s.adjustedWpm || s.wpm * (s.comprehension || 1)); });

    progressChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Raw WPM',
            data: wpmData,
            borderColor: '#6c63ff',
            backgroundColor: 'rgba(108,99,255,0.08)',
            borderWidth: 2,
            pointRadius: filtered.length > 20 ? 0 : 4,
            pointBackgroundColor: '#6c63ff',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Adjusted WPM',
            data: adjustedData,
            borderColor: '#fbbf24',
            backgroundColor: 'rgba(251,191,36,0.08)',
            borderWidth: 2,
            pointRadius: filtered.length > 20 ? 0 : 4,
            pointBackgroundColor: '#fbbf24',
            tension: 0.3,
            fill: true,
            borderDash: [5, 3]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#888',
              font: { size: 11 },
              usePointStyle: true,
              padding: 20
            }
          }
        },
        scales: {
          x: {
            grid: { color: '#2a2a2a', drawBorder: false },
            ticks: { color: '#888', font: { size: 10 }, maxRotation: 45 }
          },
          y: {
            grid: { color: '#2a2a2a', drawBorder: false },
            ticks: { color: '#888', font: { size: 10 } },
            beginAtZero: false
          }
        }
      }
    });
  }

  function renderHistoryTable(allSessions) {
    var tbody = $('history-tbody');
    var sorted = allSessions.slice().reverse();

    if (sorted.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-dim);padding:24px;">No sessions yet.</td></tr>';
      return;
    }

    tbody.innerHTML = sorted.map(function (s) {
      var typeLabel = s.type === 'reading-test' ? 'Reading Test' : (s.type || 'Exercise');
      var wpm = s.wpm ? Math.round(s.wpm) : '--';
      var comp = s.comprehension != null ? Math.round(s.comprehension * 100) + '%' : '--';
      return '<tr>' +
        '<td>' + esc(typeLabel) + '</td>' +
        '<td>' + esc(formatDate(s.date)) + '</td>' +
        '<td>' + wpm + '</td>' +
        '<td>' + comp + '</td>' +
      '</tr>';
    }).join('');
  }

  function setupRangeButtons() {
    var buttons = document.querySelectorAll('.chart-range-buttons .pill');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        progressRangeDays = parseInt(btn.getAttribute('data-range'));
        var readingSessions = sessions.filter(function (s) { return s.type === 'reading-test'; });
        renderProgressChart(readingSessions);
      });
    });
  }

  // ========== KEYBOARD SHORTCUTS ==========

  document.addEventListener('keydown', function (e) {
    // Escape: go back
    if (e.key === 'Escape') {
      var hash = window.location.hash.replace('#', '');

      // From exercises to exercise menu
      if (hash.indexOf('exercise-') === 0) {
        stopAllExercises();
        navigateTo('exercises');
        return;
      }

      // From test screens back to setup
      if (hash === 'test-active' || hash === 'test-questions' || hash === 'test-results') {
        stopAllExercises();
        navigateTo('test-setup');
        return;
      }

      // Default: go to dashboard
      navigateTo('dashboard');
    }

    // Space: pause/resume in exercises
    if (e.key === ' ' || e.code === 'Space') {
      var currentHash = window.location.hash.replace('#', '');

      if (currentHash === 'exercise-rsvp' && rsvpState.interval) {
        e.preventDefault();
        rsvpState.paused = !rsvpState.paused;
        $('btn-rsvp-pause').textContent = rsvpState.paused ? 'Resume' : 'Pause';
      }

      if (currentHash === 'exercise-pacer' && pacerState.interval) {
        e.preventDefault();
        pacerState.paused = !pacerState.paused;
        $('btn-pacer-pause').textContent = pacerState.paused ? 'Resume' : 'Pause';
      }
    }
  });

  // ========== INITIALIZATION ==========

  // Initial route handling will be triggered by onAuthStateChanged callback.
  // If Firebase auth is unavailable or slow, handle the route after a short delay as fallback.
  setTimeout(function () {
    if (sessions.length === 0 && !currentUser) {
      sessions = loadLocalSessions();
      handleRoute();
    }
  }, 2000);

})();
