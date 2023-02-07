--
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE alumns_2;
--
-- Name: alumns_2; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE alumns_2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE alumns_2 OWNER TO postgres;

\connect alumns_2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: alumnos; Type: TABLE DATA; Schema: public; Owner: postgres
--

\i $$PATH$$/3347.dat

--
-- Data for Name: datos_extraidos_; Type: TABLE DATA; Schema: public; Owner: postgres
--

\i $$PATH$$/3348.dat

--
-- Data for Name: datos_extraidos_s; Type: TABLE DATA; Schema: public; Owner: postgres
--

\i $$PATH$$/3350.dat

--
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: postgres
--

\i $$PATH$$/3351.dat

--
-- Data for Name: tests; Type: TABLE DATA; Schema: public; Owner: postgres
--

\i $$PATH$$/3353.dat

--
-- Name: datos_extraidos_s_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.datos_extraidos_s_id_seq', 40, true);


--
-- Name: tests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tests_id_seq', 7, true);


--
-- PostgreSQL database dump complete
--

