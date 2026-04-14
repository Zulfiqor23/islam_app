const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET: ma'lumotlarni qaytarish (tiklanish uchun)
  if (req.method === 'GET') {
    const { deviceId } = req.query;
    if (!deviceId) return res.status(400).json({ error: 'Missing deviceId' });
    const { data, error } = await supabase
      .from('subscribers')
      .select('name, utc_offset, goals, duas, tasks, bilimlar, bomdod, peshin, asr, shom, xufton, juma_time, work_start, work_end')
      .eq('id', deviceId)
      .single();
    if (error) return res.status(404).json({ error: 'Not found' });
    return res.json({ ok: true, data });
  }

  // POST: ma'lumotlarni saqlash
  if (req.method === 'POST') {
    const { deviceId, name, utcOffset, goals, duas, tasks, bilimlar, times } = req.body;
    if (!deviceId) return res.status(400).json({ error: 'Missing deviceId' });

    const upsertData = {
      id: deviceId,
      updated_at: new Date().toISOString()
    };
    if (name !== undefined) upsertData.name = name;
    if (utcOffset !== undefined) upsertData.utc_offset = utcOffset;
    if (goals !== undefined) upsertData.goals = goals;
    if (duas !== undefined) upsertData.duas = duas;
    if (tasks !== undefined) upsertData.tasks = tasks;
    if (bilimlar !== undefined) upsertData.bilimlar = bilimlar;
    if (times) {
      if (times.bomdod) upsertData.bomdod = times.bomdod;
      if (times.peshin) upsertData.peshin = times.peshin;
      if (times.asr) upsertData.asr = times.asr;
      if (times.shom) upsertData.shom = times.shom;
      if (times.xufton) upsertData.xufton = times.xufton;
      if (times.juma) upsertData.juma_time = times.juma;
      if (times['work-start']) upsertData.work_start = times['work-start'];
      if (times['work-end']) upsertData.work_end = times['work-end'];
    }

    const { error } = await supabase.from('subscribers').upsert(upsertData, { onConflict: 'id' });
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true });
  }

  return res.status(405).end();
};
