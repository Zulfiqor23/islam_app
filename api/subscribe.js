const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { deviceId, name, subscription, utcOffset } = req.body;
  if (!deviceId || !subscription) return res.status(400).json({ error: 'Missing fields' });

  const { error } = await supabase.from('subscribers').upsert({
    id: deviceId,
    name: name || 'Foydalanuvchi',
    push_subscription: subscription,
    utc_offset: utcOffset ?? 5,
    updated_at: new Date().toISOString()
  }, { onConflict: 'id' });

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ success: true });
};
