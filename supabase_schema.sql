-- 1. Create a table for public profiles (for auth users)
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS) for profiles
alter table public.profiles enable row level security;

drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

drop policy if exists "Users can insert their own profile." on public.profiles;
create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

drop policy if exists "Users can update own profile." on public.profiles;
create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Profile Trigger automatically creates profile entry on sign up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage for Avatars
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );


-- 2. Create products table
create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  price numeric not null,
  image text not null,
  rating numeric not null default 5.0,
  reviews integer not null default 0,
  featured boolean not null default false,
  shipping_info text,
  make text,
  model text,
  year integer,
  mileage text,
  transmission text,
  fuel_type text,
  engine text,
  zero_to_sixty text,
  specs jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for products
alter table public.products enable row level security;

create policy "Allow public read access to products"
  on public.products for select
  using ( true );

-- Note: No INSERT/UPDATE/DELETE policies are needed for the frontend,
-- which secures your catalog. You can manage products securely via the Supabase Dashboard Table Editor.


-- 3. Seed Products Data
insert into public.products (id, name, category, price, image, rating, reviews, featured, shipping_info, make, model, year, mileage, transmission, fuel_type, engine, zero_to_sixty, specs)
values 
  (
    'v1', '2013 Honda Fit', 'vehicles', 125000, '/2013_Honda_Fit.jpg', 4.8, 24, true, 'In Stock - Windhoek', 
    'Honda', 'Fit', 2013, '118,000 km', 'Automatic', 'Petrol', '1.5L i-VTEC', '9.5s', 
    '{"hpGain": "Stock (117 HP)", "fitment": "FWD", "material": "Silver Metallic"}'
  ),
  (
    'v2', '2015 Audi Q5', 'vehicles', 285000, '/2015_Audi_Q5.jpg', 4.9, 15, true, 'In Stock - Swakopmund', 
    'Audi', 'Q5', 2015, '105,000 km', 'Automatic', 'Petrol', '2.0T Quattro', '7.0s', 
    '{"hpGain": "Stock (220 HP)", "fitment": "AWD", "material": "Ibis White"}'
  ),
  (
    'v3', '2015 Nissan NP300', 'vehicles', 195000, '/2015_Nissan_Np300.jpg', 4.7, 32, false, 'In Stock - Windhoek', 
    'Nissan', 'NP300', 2015, '155,000 km', 'Manual', 'Diesel', '2.5L Diesel', '12.5s', 
    '{"hpGain": "Stock (131 HP)", "fitment": "RWD", "material": "White"}'
  ),
  (
    'v4', '2016 BMW F30 3 Series', 'vehicles', 320000, '/2016_BMW_F30.jpg', 4.9, 18, true, 'In Stock - Windhoek', 
    'BMW', '3 Series', 2016, '92,000 km', 'Automatic', 'Petrol', '2.0L TwinPower Turbo', '7.3s', 
    '{"hpGain": "Stock (180 HP)", "fitment": "RWD", "material": "Alpine White"}'
  ),
  (
    'v5', '2016 Volkswagen Up', 'vehicles', 110000, '/2016_Volkswagen_Up.jpg', 4.6, 45, false, 'In Stock - Walvis Bay', 
    'Volkswagen', 'Up', 2016, '78,000 km', 'Manual', 'Petrol', '1.0L MPI', '13.2s', 
    '{"hpGain": "Stock (74 HP)", "fitment": "FWD", "material": "Red"}'
  ),
  (
    'v6', '2017 VW Amarok 4Motion', 'vehicles', 450000, '/2017_Amarok_4motion.jpg', 4.9, 28, true, 'In Stock - Windhoek', 
    'Volkswagen', 'Amarok', 2017, '112,000 km', 'Automatic', 'Diesel', '2.0L BiTDI', '10.5s', 
    '{"hpGain": "Stock (177 HP)", "fitment": "4Motion AWD", "material": "Indium Grey"}'
  ),
  (
    'v7', '2017 VW Golf 7 TSI', 'vehicles', 245000, '/2017_Golf_7_TSI.jpg', 4.8, 35, true, 'In Stock - Windhoek', 
    'Volkswagen', 'Golf 7', 2017, '88,000 km', 'DSG', 'Petrol', '1.4L TSI', '8.2s', 
    '{"hpGain": "Stock (148 HP)", "fitment": "FWD", "material": "Tungsten Silver"}'
  ),
  (
    'v8', '2017 Nissan NP200', 'vehicles', 135000, '/2017_Nissan_Np200.jpg', 4.5, 50, false, 'In Stock - Ondangwa', 
    'Nissan', 'NP200', 2017, '125,000 km', 'Manual', 'Petrol', '1.6L 8V', '11.8s', 
    '{"hpGain": "Stock (86 HP)", "fitment": "FWD", "material": "White"}'
  ),
  (
    'v9', '2017 VW Polo 7 1.4', 'vehicles', 165000, '/2017_VW_Polo_7_1.4.jpg', 4.7, 42, false, 'In Stock - Windhoek', 
    'Volkswagen', 'Polo', 2017, '95,000 km', 'Manual', 'Petrol', '1.4L MPI', '12.0s', 
    '{"hpGain": "Stock (84 HP)", "fitment": "FWD", "material": "Flash Red"}'
  ),
  (
    'v10', '2020 VW T-Cross', 'vehicles', 310000, '/2020_VW_T-Cross.jpg', 4.8, 10, true, 'In Stock - Windhoek', 
    'Volkswagen', 'T-Cross', 2020, '45,000 km', 'DSG', 'Petrol', '1.0L TSI', '10.2s', 
    '{"hpGain": "Stock (113 HP)", "fitment": "FWD", "material": "Makena Turquoise"}'
  ),
  (
    '1', 'Vossen HF-5 Gloss Black 20"', 'wheels', 45000, '/Wheels.jpg', 4.8, 124, true, 'In Stock - Windhoek', 
    null, null, null, null, null, null, null, null, 
    '{"weight": "9.8kg", "material": "Forged Aluminum", "fitment": "5x112"}'
  ),
  (
    '2', 'LED Matrix Headlight Kit', 'lighting', 15500, '/Lighting.jpg', 4.6, 89, true, 'Import Order - China (14 Days)', 
    null, null, null, null, null, null, null, null, 
    '{"material": "Polycarbonate", "fitment": "OEM Replacement"}'
  ),
  (
    '3', 'Carbon Fiber Rear Diffuser', 'exterior', 22000, '/Exterior_Styling.jpg', 4.9, 45, true, 'In Stock - Swakopmund', 
    null, null, null, null, null, null, null, null, 
    '{"weight": "-2.5kg vs Stock", "material": "Dry Carbon", "fitment": "Direct Bolt-on"}'
  ),
  (
    '4', 'Pioneer 10" Subwoofer System', 'audio', 6500, '/Car_Audio.jpg', 4.7, 210, false, 'In Stock - Windhoek', 
    null, null, null, null, null, null, null, null, 
    '{}'
  ),
  (
    '5', 'Recaro Sportster CS', 'interior', 18500, '/Interior_Styling.jpg', 4.5, 30, false, 'Import Order - Germany (21 Days)', 
    null, null, null, null, null, null, null, null, 
    '{"weight": "14kg", "material": "Fabric/Steel", "fitment": "Universal Rails"}'
  ),
  (
    '6', 'HKS Hi-Power Exhaust System', 'performance', 18900, '/Performance.jpg', 4.9, 156, true, 'In Stock - Windhoek', 
    null, null, null, null, null, null, null, null, 
    '{"hpGain": "+12 HP", "weight": "-8kg", "material": "Titanium Tips", "fitment": "Cat-back"}'
  ),
  (
    '7', 'Brembo GT Brake Kit', 'performance', 35000, '/Performance.jpg', 5.0, 12, false, 'Import Order - Italy (30 Days)', 
    null, null, null, null, null, null, null, null, 
    '{"weight": "-4kg", "material": "Ceramic", "fitment": "Front Axle"}'
  ),
  (
    '8', 'Alcantara Steering Wheel', 'interior', 8500, '/Interior_Styling.jpg', 4.8, 67, false, 'In Stock - Windhoek', 
    null, null, null, null, null, null, null, null, 
    '{}'
  )
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  price = excluded.price,
  image = excluded.image,
  rating = excluded.rating,
  reviews = excluded.reviews,
  featured = excluded.featured,
  shipping_info = excluded.shipping_info,
  make = excluded.make,
  model = excluded.model,
  year = excluded.year,
  mileage = excluded.mileage,
  transmission = excluded.transmission,
  fuel_type = excluded.fuel_type,
  engine = excluded.engine,
  zero_to_sixty = excluded.zero_to_sixty,
  specs = excluded.specs;
