-- Script SQL pour ajouter les colonnes manquantes à la table rsvp
ALTER TABLE public.rsvp ADD COLUMN additional_guests text;
ALTER TABLE public.rsvp ADD COLUMN dietary_restrictions text;
