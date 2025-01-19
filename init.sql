DO
$$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'postgres') THEN
    CREATE ROLE postgres WITH LOGIN PASSWORD 'Nurik123';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'exam') THEN
    CREATE DATABASE exam;
  END IF;

  GRANT ALL PRIVILEGES ON DATABASE exam TO postgres;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'exam12') THEN
    CREATE SCHEMA exam12;
  END IF;
END;
$$;
