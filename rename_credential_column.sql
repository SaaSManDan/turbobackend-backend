-- Rename parameter_store_path column to credential in cloud_credentials table
ALTER TABLE turbobackend.cloud_credentials 
RENAME COLUMN parameter_store_path TO credential;
