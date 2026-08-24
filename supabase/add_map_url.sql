-- Add map_url column + populate Google Maps links.
-- Run this ONCE in the Supabase SQL Editor, then refresh the site.

alter table public.spots add column if not exists map_url text;

update public.spots set map_url = 'https://www.google.com/maps/place/Agricio+Farm+and+Resort/@8.485715,123.7769629,17z/data=!3m1!4b1!4m9!3m8!1s0x3254e180f3bea62b:0x96f43d94059e92ed!5m2!4m1!1i2!8m2!3d8.4857097!4d123.7795432!16s%2Fg%2F11ygn22v_8?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D' where slug = 'agricio-farm-and-resort';

update public.spots set map_url = 'https://www.google.com/maps/place/KENJELO+FARM+AND+RECREATION+RESORTS+CORP./@8.4378138,123.7430346,17z/data=!3m1!4b1!4m6!3m5!1s0x3254e392ba414bdb:0xad909526f7191b1!8m2!3d8.4378085!4d123.7456149!16s%2Fg%2F11rq2jr38y?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D' where slug = 'kenjelo-farm-and-recreation-resorts';

update public.spots set map_url = 'https://www.google.com/maps/place/San+Isidro+Labrador+Parish+Villaflor/@8.4676598,123.7881943,3a,75y,221.42h,90t/data=!3m7!1e1!3m5!1sjen-7jZuaFlXROJSR-i_-w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3Djen-7jZuaFlXROJSR-i_-w%26yaw%3D221.4248637212058!7i13312!8i6656!4m15!1m8!3m7!1s0x32551df9254bd13f:0x40293358ca1a5c95!2sTalic,+Oroquieta+City,+Misamis+Occidental!3b1!8m2!3d8.4728991!4d123.8006498!16s%2Fg%2F11fyx9vnxc!3m5!1s0x3254e3001bd3a37b:0xe80b833deb66324d!8m2!3d8.4740111!4d123.7875275!16s%2Fg%2F11xcx_kwyq?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D' where slug = 'libadatama-dam';

update public.spots set map_url = 'https://www.google.com/maps/place/Oroquieta+City+Plaza/@8.4857269,123.8046473,17z/data=!3m1!4b1!4m6!3m5!1s0x32551e057b44f4c1:0xdfd4c92acc26b241!8m2!3d8.4857216!4d123.8072276!16s%2Fg%2F11ck1sbyb3?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D' where slug = 'oroquieta-city-plaza-and-sea-wall';

update public.spots set map_url = 'https://www.google.com/maps/place/El+triunfo+Beach/@8.493199,123.8013481,20.18z/data=!4m6!3m5!1s0x32551e1eb1ed7be3:0x5f3c3b42ca735a92!8m2!3d8.4933069!4d123.801915!16s%2Fg%2F11gf05qbht?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D' where slug = 'el-triunfo-beach';

update public.spots set map_url = 'https://www.google.com/maps/@8.4317183,123.711511,3a,75y,162.67h,82.64t/data=!3m7!1e1!3m5!1sXSDpMdqIHkZvbmnj-EcaPg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D7.364611645863633%26panoid%3DXSDpMdqIHkZvbmnj-EcaPg%26yaw%3D162.6714779282199!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D' where slug = 'biak-na-bato';

update public.spots set map_url = 'https://www.google.com/maps/@8.4470753,123.7233295,3a,75y,93.57h,81.3t/data=!3m7!1e1!3m5!1sZZWpAAkqL4AIjHXkuTkeTw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D8.704337774242532%26panoid%3DZZWpAAkqL4AIjHXkuTkeTw%26yaw%3D93.57102565101432!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D' where slug = 'bunga-river';

update public.spots set map_url = 'https://www.google.com/maps/place/Costa+del+Sol+Resort+Hotel/@8.4912998,123.8000377,17z/data=!3m1!4b1!4m9!3m8!1s0x32551e1bec153fd5:0xb8c5df29fd056382!5m2!4m1!1i2!8m2!3d8.4912945!4d123.802618!16s%2Fg%2F11cspyfnqx?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D' where slug = 'costa-del-sol';

update public.spots set map_url = 'https://www.google.com/maps/place/Barko+-+Barko+House/@8.4688135,123.7700669,16.59z/data=!4m15!1m8!3m7!1s0x3254e23d0484fba1:0xfe6e22de13d63d7c!2sVillaflor,+Oroquieta+City,+Misamis+Occidental!3b1!8m2!3d8.4698815!4d123.7713264!16s%2Fg%2F11gbf9zr43!3m5!1s0x3254e217b5135827:0x1f0033f6ae191b77!8m2!3d8.4695336!4d123.7754832!16s%2Fg%2F11f005rdws?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D' where slug = 'villaflor-barko-barko';

update public.spots set map_url = 'https://www.google.com/maps/place/Manumpait+Falls/@8.4146392,123.6678911,14z/data=!4m15!1m8!3m7!1s0x3254e5377a537c37:0x842888da7b6b3267!2sMialen,+Oroquieta+City,+Misamis+Occidental!3b1!8m2!3d8.425293!4d123.6735151!16s%2Fg%2F11f0wy94y9!3m5!1s0x3254e5005ad93cc7:0x12aece93af4e27d3!8m2!3d8.4222282!4d123.6719098!16s%2Fg%2F11zf_w6p2v?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D' where slug = 'manumpait-falls';

update public.spots set map_url = 'https://www.google.com/maps/place/Sebucal+Hotspring/@8.3239053,123.6354097,17z/data=!3m1!4b1!4m6!3m5!1s0x3254f9006f9616df:0x5f86d9eda954f5ca!8m2!3d8.3239!4d123.63799!16s%2Fg%2F11yf4mtnrf?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D' where slug = 'sebucal-hot-spring';
