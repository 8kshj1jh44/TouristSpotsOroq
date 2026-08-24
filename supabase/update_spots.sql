-- Apply local images + renames to EXISTING spots already in the database.
-- Run this in the Supabase SQL Editor AFTER your existing rows exist.
-- (The seed scripts use "on conflict do nothing", so re-running them will NOT
--  update rows that already exist — use these UPDATE statements instead.)

-- Point every spot's featured image at its local public/ file
update public.spots set featured_image = '/agriciofarm.jpg'          where slug = 'agricio-farm-and-resort';
update public.spots set featured_image = '/kenjelo.jpg'              where slug = 'kenjelo-farm-and-recreation-resorts';
update public.spots set featured_image = '/libadatama.jpg'           where slug = 'libadatama-dam';
update public.spots set featured_image = '/oroquietaplaza.jpg'       where slug = 'oroquieta-city-plaza-and-sea-wall';
update public.spots set featured_image = '/eltriunfo.jpg'            where slug = 'el-triunfo-beach';
update public.spots set featured_image = '/costadelsol.jpg'          where slug = 'costa-del-sol';
update public.spots set featured_image = '/villaflorbarkobarko.jpg'  where slug = 'villaflor-barko-barko';
update public.spots set featured_image = '/biaknabato.jfif'          where slug = 'biak-na-bato';
update public.spots set featured_image = '/bunga.jfif'               where slug = 'bunga-river';

-- Rename Mialen River -> Manumpait Falls (and update its image + slug)
update public.spots
set name = 'Manumpait Falls',
    slug = 'manumpait-falls',
    category = 'Waterfall & Nature',
    tagline = 'Let the rush of the falls wash your worries away.',
    featured_image = '/manumpait.jpg'
where slug = 'mialen-river';

-- Rename Oroquieta Hot Spring -> Sebucal Hot Spring (and update its slug + image)
update public.spots
set name = 'Sebucal Hot Spring',
    slug = 'sebucal-hot-spring',
    tagline = 'Sink into warm mineral waters and let the day melt away.',
    featured_image = '/hotspring.jfif',
    barangay = 'brgy. Sebucal'
where slug = 'hot-spring';

-- Costa Del Sol -> Costa del Sol Resort Hotel (add name, tagline, description)
update public.spots
set name = 'Costa del Sol Resort Hotel',
    tagline = 'A beachside hotel right in the city',
    description = 'Costa del Sol Resort Hotel is your convenient and efficient venue, for your special moments. It is a beachside hotel right in the city. It is located in Oroquieta City, capital of Misamis Occidental, Philippines.'
where slug = 'costa-del-sol';

-- Villaflor Barko Barko -> landmark with a ship-shaped tagline
update public.spots
set category = 'Landmark',
    tagline = 'A ship-shaped landmark, sailing the streets on dry land.'
where slug = 'villaflor-barko-barko';
