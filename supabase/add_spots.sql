-- Add more Oroquieta tourist spots
-- Run this in the Supabase SQL Editor. You can edit barangay/address/hours later via /admin.

insert into public.spots (
  name, slug, category, tagline, description, barangay, address, opening_hours,
  phone, email, website_url, followers_count, is_featured, featured_image
) values
(
  'Libadatama Dam',
  'libadatama-dam',
  'Nature / Landmark',
  'A scenic dam view in Oroquieta',
  NULL,
  'TBD',
  'Oroquieta City, Misamis Occidental, Philippines, 7207',
  '6:00 AM - 6:00 PM',
  NULL, NULL, NULL, NULL, false, '/libadatama.jpg'
),
(
  'Oroquieta City Plaza and Sea Wall',
  'oroquieta-city-plaza-and-sea-wall',
  'Plaza / Landmark',
  'City plaza with a scenic sea wall promenade',
  NULL,
  'TBD',
  'Oroquieta City, Misamis Occidental, Philippines, 7207',
  'Open 24 hours',
  NULL, NULL, NULL, NULL, false, '/oroquietaplaza.jpg'
),
(
  'El Triunfo Beach',
  'el-triunfo-beach',
  'Beach',
  'A peaceful beach destination',
  NULL,
  'TBD',
  'Oroquieta City, Misamis Occidental, Philippines, 7207',
  '7:00 AM - 9:00 PM',
  NULL, NULL, NULL, NULL, false, '/eltriunfo.jpg'
),
(
  'Costa del Sol Resort Hotel',
  'costa-del-sol',
  'Resort / Beach',
  'A beachside hotel right in the city',
  'Costa del Sol Resort Hotel is your convenient and efficient venue, for your special moments. It is a beachside hotel right in the city. It is located in Oroquieta City, capital of Misamis Occidental, Philippines.',
  'TBD',
  'Oroquieta City, Misamis Occidental, Philippines, 7207',
  '7:00 AM - 9:00 PM',
  NULL, NULL, NULL, '13K', false, '/costadelsol.jpg'
),
(
  'Villaflor Barko Barko',
  'villaflor-barko-barko',
  'Landmark',
  'A ship-shaped landmark, sailing the streets on dry land.',
  NULL,
  'TBD',
  'Oroquieta City, Misamis Occidental, Philippines, 7207',
  '7:00 AM - 9:00 PM',
  NULL, NULL, NULL, NULL, false, '/villaflorbarkobarko.jpg'
),
(
  'Biak na Bato',
  'biak-na-bato',
  'Nature & Cave',
  'Carved stone and shaded groves — a hidden natural hideaway.',
  NULL,
  'Placeholder Barangay',
  'Oroquieta City, Misamis Occidental, Philippines',
  '6:00 AM - 6:00 PM',
  NULL, NULL, NULL, NULL, false,
  '/biaknabato.jfif'
),
(
  'Bunga River',
  'bunga-river',
  'River & Nature',
  'Cool, clear waters for a quiet riverside retreat.',
  NULL,
  'Placeholder Barangay',
  'Oroquieta City, Misamis Occidental, Philippines',
  '6:00 AM - 6:00 PM',
  NULL, NULL, NULL, NULL, false,
  '/bunga.jfif'
),
(
  'Manumpait Falls',
  'manumpait-falls',
  'Waterfall & Nature',
  'Let the rush of the falls wash your worries away.',
  NULL,
  'Placeholder Barangay',
  'Oroquieta City, Misamis Occidental, Philippines',
  '6:00 AM - 6:00 PM',
  NULL, NULL, NULL, NULL, false,
  '/manumpait.jpg'
),
(
  'Sebucal Hot Spring',
  'sebucal-hot-spring',
  'Hot Spring & Wellness',
  'Sink into warm mineral waters and let the day melt away.',
  NULL,
  'Placeholder Barangay',
  'Oroquieta City, Misamis Occidental, Philippines',
  '6:00 AM - 8:00 PM',
  NULL, NULL, NULL, NULL, false,
  '/hotspring.jfif'
)
on conflict (slug) do nothing;