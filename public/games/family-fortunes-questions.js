// Family Fortunes question bank — loaded from the published Google Sheet tab
// ("family-fortunes-questions" tab of "Game Questions - private").
// Shared by the game (family-fortunes.html) and the host key (family-fortunes-key.html).
//
// Call window.loadFFQuestions() — it returns a Promise that resolves to an array of
//   { prompt, answers: [[text, points], ...], level, category, id }
// objects (answers ordered exactly as in the sheet: highest → lowest).
// The result is cached, and also mirrored to window.FF_QUESTIONS once loaded.

(function () {
  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQQOA7JYpQHJPodeWxaoJzUqT1L6vftHr-jjo7Y7Y06lHAecXsk6aw5jFPeQhJgKMro7Wu1vzW5E7PS/pub?gid=1144054116&single=true&output=csv';

  // Split one CSV line, honouring quoted fields and "" escaped quotes.
  function splitLine(line) {
    const out = []; let f = ''; let q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (q && line[i + 1] === '"') { f += '"'; i++; }
        else q = !q;
      } else if (c === ',' && !q) { out.push(f); f = ''; }
      else { f += c; }
    }
    out.push(f);
    return out;
  }

  function parseCSV(raw) {
    const lines = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().split('\n');
    if (lines.length < 2) return [];
    const headers = splitLine(lines[0]).map(h => h.trim().toLowerCase());
    return lines.slice(1).filter(l => l.trim()).map(line => {
      const vals = splitLine(line);
      const obj = {};
      headers.forEach((h, i) => obj[h] = (vals[i] || '').trim());
      return obj;
    });
  }

  // A row counts as active unless explicitly switched off.
  function isActive(r) {
    const a = (r['active'] || '').trim().toLowerCase();
    return a !== '0' && a !== 'no' && a !== 'false';
  }

  function rowToQuestion(r) {
    const prompt = (r['prompt'] || '').trim();
    if (!prompt) return null;
    const answers = [];
    for (let i = 1; i <= 10; i++) {
      const text = (r['answer_' + i] || '').trim();
      const pts  = parseInt((r['points_' + i] || '').trim(), 10);
      if (text && !Number.isNaN(pts)) answers.push([text, pts]);
    }
    if (!answers.length) return null;
    return {
      prompt,
      answers,
      level:    r['level'] || '',
      category: r['category'] || '',
      id:       r['id'] || '',
    };
  }

  let cache = null;

  window.loadFFQuestions = async function () {
    if (cache) return cache;
    const res = await fetch(CSV_URL);
    if (!res.ok) throw new Error('Sheet fetch failed: HTTP ' + res.status);
    const text = await res.text();
    const questions = parseCSV(text).filter(isActive).map(rowToQuestion).filter(Boolean);
    if (!questions.length) throw new Error('No questions found in the sheet.');
    cache = questions;
    window.FF_QUESTIONS = questions; // back-compat for anything reading it directly
    return questions;
  };
})();
