const webpush = require('web-push');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  webpush.setVapidDetails(
    'mailto:admin@example.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

  const now = new Date();
  const tashkentOffset = 5; // UTC+5
  const localHour = (now.getUTCHours() + tashkentOffset) % 24;
  const localMin = now.getUTCMinutes();
  const timeStr = `${String(localHour).padStart(2,'0')}:${String(localMin).padStart(2,'0')}`;
  const dayOfWeek = new Date(now.getTime() + tashkentOffset * 3600000).getUTCDay();

  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('*')
    .not('push_subscription', 'is', null);

  if (!subscribers?.length) return res.json({ sent: 0 });

  let sent = 0;
  for (const user of subscribers) {
    if (!user.push_subscription) continue;

    // Calculate user's local time based on their UTC offset
    const userOffset = user.utc_offset ?? 5;
    const userHour = (now.getUTCHours() + userOffset) % 24;
    const userMin = now.getUTCMinutes();
    const userTime = `${String(userHour).padStart(2,'0')}:${String(userMin).padStart(2,'0')}`;

    let payload = null;
    const times = {
      bomdod: user.bomdod,
      peshin: user.peshin,
      asr: user.asr,
      shom: user.shom,
      xufton: user.xufton,
    };

    for (const [name, time] of Object.entries(times)) {
      if (time === userTime) {
        const names = { bomdod:'BOMDOD', peshin:'PESHIN', asr:'ASR', shom:'SHOM', xufton:'XUFTON' };
        payload = JSON.stringify({
          title: `🕌 ${names[name]} vaqti`,
          body: 'Azonga marhamat, ibodatga tayyorlaning!',
          icon: '/public/icon-192.png',
          data: { type: 'prayer', name }
        });
        break;
      }
    }

    // Juma 11:20 (user local day check)
    const userDate = new Date(now.getTime() + (user.utc_offset ?? 5) * 3600000);
    if (!payload && userDate.getUTCDay() === 5 && userTime === (user.juma_time || '11:20')) {
      payload = JSON.stringify({
        title: '🌙 JUMA KUNI',
        body: 'Juma namoziga shoshiling! Allohning zikriga yuring.',
        icon: '/public/icon-192.png',
        data: { type: 'juma' }
      });
    }

    if (!payload && user.work_start === userTime) {
      payload = JSON.stringify({
        title: '💼 Ish vaqti boshlandi',
        body: 'Bismillah! Bugungi checklist tayyor.',
        icon: '/public/icon-192.png',
        data: { type: 'work_start' }
      });
    }

    if (!payload && user.work_end === userTime) {
      payload = JSON.stringify({
        title: '🤲 Ish yakunlandi',
        body: 'Alhamdu lillah! Kun tugadi. Checklist bajardingizmi?',
        icon: '/public/icon-192.png',
        data: { type: 'work_end' }
      });
    }

    if (payload) {
      try {
        await webpush.sendNotification(user.push_subscription, payload);
        sent++;
      } catch (err) {
        if (err.statusCode === 410) {
          await supabase.from('subscribers').update({ push_subscription: null }).eq('id', user.id);
        }
      }
    }
  }

  return res.json({ sent, time: timeStr });
};
