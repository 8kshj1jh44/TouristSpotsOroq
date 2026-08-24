-- Discover Oroquieta: Tourism spots schema + seed data

create extension if not exists "uuid-ossp";

create table if not exists public.spots (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    slug text unique not null,
    category text default 'Farm & Resort',
    tagline text,
    description text,
    barangay text not null,
    address text not null,
    opening_hours text not null default '7:00 AM - 9:00 PM',
    is_open_daily boolean default true,
    phone text,
    email text,
    website_url text,
    social_handle text,
    followers_count text,
    map_url text,
    featured_image text,
    gallery text[] default array[]::text[],
    is_featured boolean default false
);

alter table public.spots enable row level security;
create policy "Allow public read access" on public.spots for select using (true);
create policy "Allow public insert/update for demo" on public.spots for all using (true);

-- Seed Initial Oroquieta Spots
insert into public.spots (
  name, slug, category, tagline, barangay, address, opening_hours,
  phone, email, website_url, followers_count, is_featured, featured_image
) values
(
  'Agricio Farm and Resort',
  'agricio-farm-and-resort',
  'Farm & Resort',
  'Serenity and refreshing leisure in Brgy. Mobod',
  'Mobod',
  'Purok 3, Brgy. Mobod, Oroquieta City, Misamis Occidental, Philippines, 7207',
  '7:00 AM - 9:00 PM',
  '0968 151 1640',
  'agriciofarmandresort@gmail.com',
  'https://cloudbeds.com',
  '6.3K',
  true,
  '/agriciofarm.jpg'
),
(
  'Kenjelo Farm and Recreation Resorts',
  'kenjelo-farm-and-recreation-resorts',
  'Farm & Recreation Resort',
  'START THE FUN! Premier eco-tourism and recreation haven.',
  'Dolipos Alto',
  'Purok-6, Dolipos Alto, Oroquieta City, Misamis Occidental, Philippines, 7207',
  '7:00 AM - 9:00 PM',
  '0954 168 1259',
  'contact-us@kenjelofarm.com.ph',
  'https://kenjelofarm.com.ph',
  '28K',
  true,
  '/kenjelo.jpg'
)
on conflict (slug) do nothing;