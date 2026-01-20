-- Accommodations data for wedding venue area
-- Updated: January 2026
-- Images: Using local gallery images

-- Clear existing data
DELETE FROM "public"."accommodations";

INSERT INTO "public"."accommodations" ("name", "contact", "website", "chambre", "capacity", "distance", "image", "is_reserved") VALUES
-- RESERVED ACCOMMODATIONS
('Bienvenue à Dalbepierre', 'Nicole et Roger GUILLARD - 04 74 71 27 95 ou 06 71 39 01 88', 'https://www.gites-de-france.com/fr/auvergne-rhone-alpes/rhone', '3 chambres - Capacité totale de 9 personnes', '9 personnes', '200 m', '/gallery/gites/bienvenue-a-dalbepierre.jpg', 'true'),

('Gîte de Dalbepierre', 'Nicole et Georges GUILLARD - 04 74 71 27 25 ou 06 70 10 80 82', 'https://www.gites-de-france.com/fr/auvergne-rhone-alpes/rhone', '6 chambres - Capacité totale de 15 personnes', '15 personnes', '400 m', '/gallery/gites/gite-dalbepierre.jpg', 'true'),

('Gîte de l''Oursonnière', '06 67 44 59 87', 'https://www.gites.fr/gites_gite-de-l-oursonniere_saint-laurent-d-oingt_h4842310.htm', 'Chalet de 35 m² avec coin cuisine et espace Douche-WC séparé - 5 couchages', '5 personnes', '500 m', '/gallery/gites/gite-oursonniere.jpg', 'true'),

('Gîte des vendangeurs', 'Evelyne et Yves BLANC - 04 74 71 62 57', 'https://www.gites-de-france.com/fr/auvergne-rhone-alpes/rhone/val-d-oingt', '4 chambres - 14 couchages', '14 personnes', '4 km - 7 min de voiture', '/gallery/gites/gite_des_vendanges.jpg', 'true'),

('Gîte Nid vu Nid connu', 'Gîtes de France Rhône', 'https://www.gites-de-france-rhone.com/location-vacances-Gite-Val-D-oingt-69G1807.html', 'Maison indépendante de plain-pied avec vue panoramique', '6 personnes', '1 km', '/gallery/gites/nid-vu-nid-connu.jpg', 'true'),

-- AVAILABLE ACCOMMODATIONS
('Gîte A deux pas des Vignes', 'Laëtitia et Pascal - Vignerons', 'https://www.gites-de-france.com/fr/auvergne-rhone-alpes/rhone/deux-pas-des-vignes-69g1974', 'Gîte de charme rénové dans une vieille bâtisse en Pierres Dorées', '6 personnes', '1 km', '/gallery/gites/deux_pas_des_vignes.jpg', 'false'),

('Gîte de Fond-vieille', 'Marie-jo et Lucien Guillard - Viticulteurs', 'https://www.gites-de-france.com/fr/auvergne-rhone-alpes/rhone', 'Gîte aménagé dans un corps de bâtiment en pierres dorées', '4 personnes', '500 m', '/gallery/gites/fond_vieille.jpg', 'false'),

('Gite de la Petite Maison', 'Evelyne et Yves BLANC - 04 74 71 62 57', 'https://www.gites-de-france.com/fr/auvergne-rhone-alpes/rhone/val-d-oingt', '1 chambre avec lit double et 1 mezzanine 3 lits simples + canapé-lit', '5/7 personnes', '4 km - 7 min de voiture', '/gallery/gites/gite-petite-maison.jpg', 'false'),

('GÎTE LUMIÈRE', 'Gîtes de France Rhône', 'https://www.gites-de-france.com/fr/auvergne-rhone-alpes/rhone', 'Gîte d''étape de caractère dans un bâti ancien en pierres dorées', '8 personnes', '1 km', '/gallery/gites/gite-lumiere.jpg', 'false'),

('Gîte Rural Val d''Oingt', 'Mairie de Val d''Oingt', 'https://valdoingt.org/votre-commune-au-quotidien/ciommerce-economie/chambres-dhotes-gites/', 'Ancienne ferme avec une cour fermée', '6 personnes', '1 km', '/gallery/gites/gite_drawing.png', 'false'),

('Golden Rock', 'Mme PERRAT - 06.22.25.59.30', 'https://valdoingt.org/votre-commune-au-quotidien/ciommerce-economie/chambres-dhotes-gites/', 'Maison individuelle - 5 pièces', '8 personnes', '1 km', '/gallery/gites/gite_drawing.png', 'false'),

('La Levée', 'Laurence et Bruno', 'http://www.lalevee.eu/', 'Maison de vignerons - Chambres d''hôtes avec table d''hôte', '4 personnes', '1 km', '/gallery/gites/levee.jpg', 'false'),

('La Rose Trémière', 'Monique et Michel GUILLARD - 04 74 71 21 77 ou 06 35 77 90 92', 'https://www.auvergnerhonealpes-tourisme.com/fiches/la-rose-tremiere/', 'Une chambre avec un lit double - Terrasse privée', '2 personnes', '1 km', '/gallery/gites/nid-vu-nid-connu.jpg', 'false'),

('La Villa Buizantine', 'Villa Beaujolais', 'https://valdoingt.org/votre-commune-au-quotidien/ciommerce-economie/chambres-dhotes-gites/', 'Chambres d''hôtes ou gîte - Chambre accessible handicapés', '6 personnes', '1 km', '/gallery/gites/villa_buizantine.jpg', 'false'),

('Les Herminières', 'Elisabeth et Guy CLAUDEY - 04 74 71 66 36', 'http://www.herminieres.com/', 'Chambres d''hôtes et Gîte face à un paysage typique du Beaujolais', '2-3 personnes', '2 km', '/gallery/gites/herminieres.jpg', 'false'),

('L''Orée du Paradis', 'Nicole et Georges GUILLARD - 04 74 71 27 25 ou 06 70 10 80 82', 'https://www.gites-de-france-rhone.com/location-vacances-Chambre-d-hotes-Val-D-oingt-69G2213.html', '2 chambres de 2 personnes', '4 personnes', '100 m', '/gallery/gites/l-oree-du-paradis.jpg', 'false'),

('Maison Beaujolaise (Airbnb)', 'Airbnb - Réservation en ligne', 'https://www.airbnb.com/rooms/34179111', 'Belle maison traditionnelle du Beaujolais - 3 voyageurs', '3 personnes', '500 m', '/gallery/gites/maison-beaujolaise.jpg', 'false'),

('Studio indépendant Val d''Oingt (Airbnb)', 'Airbnb - Réservation en ligne', 'https://www.airbnb.com/rooms/806213447650908843', 'Studio indépendant avec coin cuisine - Note 4.94/5', '2 personnes', '1 km', '/gallery/gites/independent-studio-val-doingt.avif', 'false');
